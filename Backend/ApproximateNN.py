from flask import Flask, request, jsonify
from annoy import AnnoyIndex
import pickle
from deepface import DeepFace
import pandas as pd
from concurrent.futures import ThreadPoolExecutor
import cv2
import os
import numpy as np
import logging
from logging.handlers import RotatingFileHandler
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
if not os.path.exists('logs'):
    os.mkdir('logs')
file_handler = RotatingFileHandler('logs/app.log', maxBytes=10240, backupCount=10)
file_handler.setFormatter(logging.Formatter(
    '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
))
file_handler.setLevel(logging.INFO)
app.logger.addHandler(file_handler)
app.logger.setLevel(logging.INFO)

# Global variables
index = None
embedding_dim = 0
index_path = "embeddings.ann"
data_path = "embeddings.pkl"
executor = ThreadPoolExecutor(max_workers=4)
is_initialized = False

def load_embeddings():
    global index, embedding_dim
    app.logger.info("Loading embeddings...")
    try:
        # Load the DataFrame from the pickle file
        with open(data_path, 'rb') as f:
            df = pickle.load(f)  # Load the DataFrame
            
        app.logger.info("Embeddings loaded from the pickle file.")
        
        # Extract embeddings as a list
        embedding_vectors = df['embedding'].tolist()
        
        if embedding_vectors:
            embedding_dim = len(embedding_vectors[0])  # Get the dimension from the first embedding
            app.logger.info(f"Embedding dimension: {embedding_dim}")
        else:
            raise ValueError("No embeddings found in the pickle file")

        index = AnnoyIndex(embedding_dim, 'angular')
        for i, embedding in enumerate(embedding_vectors):
            index.add_item(i, embedding)

        index.build(10)  # 10 trees
        index.save(index_path)
        app.logger.info(f"Loaded {len(embedding_vectors)} embeddings with dimension {embedding_dim}")
    except Exception as e:
        app.logger.error(f"Error loading embeddings: {str(e)}")

@app.before_request
def initialize():
    global is_initialized
    if not is_initialized:
        app.logger.info("Initializing embeddings...")
        load_embeddings()  # This will block until the embeddings are loaded
        is_initialized = True
        app.logger.info("Embeddings initialized.")

@app.route('/find_neighbors', methods=['POST'])
def find_neighbors():
    global index, embedding_dim
    
    if index is None:
        return jsonify({"error": "Index is loading. Please try again shortly."}), 503
    
    try:
        data = request.json
        app.logger.info(f"Received request: {data}")
        query_embedding = data.get('embedding')
        k = data.get('k', 5)

        print("embedding_dim  : ", embedding_dim)
        print("query_embedding len : ", len(query_embedding))
        
        if not isinstance(query_embedding, list) or len(query_embedding) != embedding_dim:
            return jsonify({"error": f"Invalid embedding. Expected dimension: {embedding_dim}"}), 400
        
        neighbors, distances = index.get_nns_by_vector(query_embedding, k, include_distances=True)
        
        return jsonify({
            "neighbors": neighbors,
            "distances": distances
        })
    except Exception as e:
        app.logger.error(f"Error processing request: {str(e)}")
        return jsonify({"error": "An unexpected error occurred."}), 500



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



@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "index_loaded": index is not None})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
