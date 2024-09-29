from flask import Flask, request, jsonify
import cv2
from deepface import DeepFace
import os
import requests
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def extract_photo_from_document(document_img_path):
    try:
        document_img = cv2.imread(document_img_path)
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        gray = cv2.cvtColor(document_img, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)

        for (x, y, w, h) in faces:
            face_img = document_img[y:y + h, x:x + w]
            face_img_path = 'extracted_face.jpg'
            cv2.imwrite(face_img_path, face_img)
            return face_img_path

        logger.warning("No face detected in the document image.")
        return None
    except Exception as e:
        logger.error(f"Error in extract_photo_from_document: {str(e)}")
        return None

@app.route('/compare', methods=['POST'])
def compare_faces():
    try:
        if 'img1' not in request.files or 'img2' not in request.files:
            return jsonify({'error': 'Please provide img1 (live photo) and img2 (document photo).'}), 400

        img1 = request.files['img1']
        img2 = request.files['img2']

        img1_path = os.path.join('uploads', 'img1.jpg')
        img2_path = os.path.join('uploads', 'img2.jpg')

        img1.save(img1_path)
        img2.save(img2_path)

        extracted_face_path = extract_photo_from_document(img2_path)
        if extracted_face_path is None:
            return jsonify({'error': 'Could not detect a face in the document.'}), 400

        result = DeepFace.verify(img1_path=img1_path, img2_path=extracted_face_path)
        logger.info(f"Comparison result: {result}")
        return jsonify(result)
    except Exception as e:
        logger.error(f"Error in compare_faces: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'Server is running and responding correctly'}), 200

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)