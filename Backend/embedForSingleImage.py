from flask import Flask, request, jsonify
from deepface import DeepFace
import cv2
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Route for generating embeddings
@app.route('/generate_embedding', methods=['POST'])
def generate_embedding():
    # Ensure an image file was sent
    if 'image' not in request.files:
        return jsonify({'error': 'No image file found in the request'}), 400
    
    image_file = request.files['image']

    # Convert the file to a format readable by OpenCV
    file_bytes = np.fromstring(image_file.read(), np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    try:
        # Generate 128-dimensional embedding using the Facenet model
        embedding = DeepFace.represent(img_path=image, model_name="Facenet")
        embedding_vector = embedding[0]['embedding']

        # Return the embedding as JSON
        return jsonify({
            'embedding': embedding_vector,
            'length': len(embedding_vector)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
