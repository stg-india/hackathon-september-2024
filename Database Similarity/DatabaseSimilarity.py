import os
import numpy as np
from concurrent.futures import ThreadPoolExecutor
import torch
from torchvision import models, transforms
from PIL import Image
import faiss

# Part 1: Load the Pre-trained Model
model = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)
model.eval()  # Set model to evaluation mode

# Preprocessing function for images
preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Function to extract feature vector from an image
def extract_features(image_path):
    img = Image.open(image_path).convert("RGB")
    img_t = preprocess(img)
    batch_t = torch.unsqueeze(img_t, 0)
    with torch.no_grad():
        features = model(batch_t)
    return features.numpy().flatten()

# Function to extract features in batches using multi-threading
def extract_features_threaded(image_paths, max_workers=4):
    features = []
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(extract_features, img_path): img_path for img_path in image_paths}
        for future in futures:
            try:
                feature_vector = future.result()  # Get the result from the future
                features.append(feature_vector)
            except Exception as e:
                print(f"Error processing {futures[future]}: {e}")
    return features

# Part 2: Create a FAISS IVF index for all feature vectors
def create_faiss_index(features_array, nlist=10):
    d = features_array.shape[1]  # Dimension of feature vectors
    # Create an IVF index with L2 distance
    quantizer = faiss.IndexFlatL2(d)  # This is the quantizer
    index = faiss.IndexIVFFlat(quantizer, d, nlist, faiss.METRIC_L2)  # IVF index
    index.train(features_array)  # Train the index
    index.add(features_array)  # Add the feature vectors to the index
    return index

# Part 3: Search for Similar Images
def search_similar_images(index, query_vector, k=5):
    distances, indices = index.search(np.array([query_vector]).astype('float32'), k)
    return distances, indices

# Part 4: Main Execution Code
if _name_ == "_main_":
    dataset_dir = '/Users/siddharththakur/Downloads/data'  # Update this path to your dataset
    image_files = os.listdir(dataset_dir)
    image_paths = [os.path.join(dataset_dir, img) for img in image_files]

    # New variable for user-specified query image
    query_image_path = '/Users/siddharththakur/Documents/manphoto.jpeg'  # Update this path with the user's image

    max_workers = 2  # You can increase this based on your CPU cores

    # Multi-threaded feature extraction for dataset images
    image_features = extract_features_threaded(image_paths, max_workers=max_workers)

    # Convert to NumPy array
    features_array = np.array(image_features).astype('float32')

    # Extract features for the user-provided query image
    query_vector = extract_features(query_image_path)

    # Create a FAISS IVF index
    index = create_faiss_index(features_array, nlist=10)  # You can adjust nlist for performance

    # Search for similar images using the IVF index
    k = 5  # Number of similar images to retrieve
    distances, neighbors = search_similar_images(index, query_vector, k=k)

    # Output results
    print(f"Top similar images for the query image '{os.path.basename(query_image_path)}':")
    for i in range(k):
        print(f"Image: {image_files[neighbors[0][i]]}, Distance: {distances[0][i]:.4f}, Nearest Index in Dataset: {neighbors[0][i]}")