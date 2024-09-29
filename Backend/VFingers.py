import cv2
import numpy as np

def detect_finger_v(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # If no contours are found, return False
    if not contours:
        return False

    # Find the largest contour
    largest_contour = max(contours, key=cv2.contourArea)

    # Filter out small contours based on area
    if cv2.contourArea(largest_contour) < 1000:  # Adjust this threshold as necessary
        return False

    # Approximate the contour to reduce points
    epsilon = 0.01 * cv2.arcLength(largest_contour, True)
    approx_contour = cv2.approxPolyDP(largest_contour, epsilon, True)

    # Compute the convex hull and convexity defects
    hull = cv2.convexHull(approx_contour, returnPoints=False)
    if len(hull) < 3:  # Need at least 3 points for convexity defects
        return False
    
    defects = cv2.convexityDefects(approx_contour, hull)

    if defects is not None:
        count_defects = 0
        for i in range(defects.shape[0]):
            s, e, f, d = defects[i, 0]
            start = tuple(approx_contour[s][0])
            end = tuple(approx_contour[e][0])
            far = tuple(approx_contour[f][0])

            # Calculate the angle to determine if it's a 'V'
            a = np.linalg.norm(np.array(end) - np.array(start))
            b = np.linalg.norm(np.array(far) - np.array(start))
            c = np.linalg.norm(np.array(end) - np.array(far))
            angle = np.arccos((b**2 + c**2 - a**2) / (2 * b * c)) * (180.0 / np.pi)

            # Check if the angle is acute and that the start and end points are sufficiently apart
            if angle <= 90:
                count_defects += 1

        # Condition for recognizing a "V" gesture: two fingers and proper angle
        if count_defects == 2:
            return True

    return False

def main():
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Flip the frame horizontally for a better mirror-like view
        frame = cv2.flip(frame, 1)

        # Call the finger detection function
        if detect_finger_v(frame):
            cv2.putText(frame, "Finger V Detected", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        # Display the frame with the detection result
        cv2.imshow("Finger V Detection", frame)

        # Break the loop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
