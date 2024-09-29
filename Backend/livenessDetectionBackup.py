import cv2
import dlib
from imutils import face_utils
import numpy as np
import time

def eye_aspect_ratio(eye):
    A = np.linalg.norm(eye[1] - eye[5])
    B = np.linalg.norm(eye[2] - eye[4])
    C = np.linalg.norm(eye[0] - eye[3])
    return (A + B) / (2.0 * C)

# Initialize dlib's face detector and facial landmark predictor
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

# Extract indexes for the left and right eye and chin
(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]
(chinStart, chinEnd) = (48, 68)

EYE_AR_THRESH = 0.2
EYE_AR_CONSEC_FRAMES = 3

blink_counter = 0
total_blinks = 0
prev_chin_center = None  # To keep track of previous chin position
movement_threshold = 10  # Adjust this value based on your needs

# Timer variables for head movement
last_movement_time = time.time()
movement_timeout = 5  # 5 seconds timeout

# Variables to track face size
face_size_history = []
depth_factor_threshold = 50  # Adjust this value based on your needs

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    rects = detector(gray, 0)

    # Log when multiple faces are detected
    if len(rects) > 1:
        print(f"Multiple Faces Detected: {len(rects)} faces")

    for rect in rects:
        shape = predictor(gray, rect)
        shape = face_utils.shape_to_np(shape)

        leftEye = shape[lStart:lEnd]
        rightEye = shape[rStart:rEnd]
        
        leftEAR = eye_aspect_ratio(leftEye)
        rightEAR = eye_aspect_ratio(rightEye)
        ear = (leftEAR + rightEAR) / 2.0

        leftEyeHull = cv2.convexHull(leftEye)
        rightEyeHull = cv2.convexHull(rightEye)
        cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
        cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)

        if ear < EYE_AR_THRESH:
            blink_counter += 1
        else:
            if blink_counter >= EYE_AR_CONSEC_FRAMES:
                total_blinks += 1
                print("Blink Detected")
            blink_counter = 0

        chin = shape[chinStart:chinEnd]
        chin_center = np.mean(chin, axis=0)

        # If previous chin center is available, check for movement
        if prev_chin_center is not None:
            chin_movement = np.linalg.norm(chin_center - prev_chin_center)

            # If the movement is significant, log it
            if chin_movement > movement_threshold:
                print("Head Movement Detected")
                last_movement_time = time.time()  # Reset the timer
                cv2.putText(frame, "Head Movement Detected", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)

        # Update previous chin center
        prev_chin_center = chin_center

        # Update the face size history for depth factor
        face_width = rect.width()  # Width of the detected face
        face_size_history.append(face_width)

        # Calculate average face size over the last 5 frames
        if len(face_size_history) > 300:
            face_size_history.pop(0)  # Maintain a size history of 5 frames

        if len(face_size_history) == 300:
            avg_face_size = np.mean(face_size_history)
            if abs(avg_face_size - face_width) < depth_factor_threshold:
                print("Possible Video Feed Detected based on Depth Factor")

    # Check if head movement has not been detected for more than the timeout period
    if time.time() - last_movement_time > movement_timeout:
        print("User might just be using an image (no head movement detected for 5 seconds)")

    cv2.imshow("Liveness Detection", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
