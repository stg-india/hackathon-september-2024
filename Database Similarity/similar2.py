import os
import numpy as np
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

# Function to extract features in batches
def extract_features_batch(image_paths, batch_size):
    features = []
    for i in range(0, len(image_paths), batch_size):
        batch = image_paths[i:i + batch_size]
        for img_path in batch:
            try:
                feature_vector = extract_features(img_path)
                features.append(feature_vector)
            except Exception as e:
                print(f"Error processing {img_path}: {e}")
    return features

# Part 2: Create a single FAISS index for all feature vectors
def create_faiss_index(features_array):
    d = features_array.shape[1]  # Dimension of feature vectors
    index = faiss.IndexFlatL2(d)  # Create a single index for L2 distance
    index.add(features_array)  # Add all feature vectors at once
    return index

# Part 3: Search for Similar Images
def search_similar_images(index, query_vector, k=5):
    distances, indices = index.search(np.array([query_vector]).astype('float32'), k)
    return distances, indices

# Part 4: Main Execution Code
if _name_ == "_main_":
    dataset_dir = '/Users/siddharththakur/Downloads/data'  # Update this path
    image_files = os.listdir(dataset_dir)
    image_paths = [os.path.join(dataset_dir, img) for img in image_files]

    # Extract features in batches
    batch_size = 16  # Adjust batch size as needed
    features_array = np.array(extract_features_batch(image_paths, batch_size)).astype('float32')

    # Create a single FAISS index for all feature vectors
    index = create_faiss_index(features_array)

    # New variable for user-specified query image
    query_image_path = '/Users/siddharththakur/Documents/manphoto.jpeg'  # Update this path
    query_vector = extract_features(query_image_path)

    # Search for similar images using the single index
    k = 5  # Number of similar images to retrieve
    distances, neighbors = search_similar_images(index, query_vector, k=k)

    # Output results
    print(f"Similar images for the query image '{os.path.basename(query_image_path)}':")
    for i in range(k):
        print(f"Image: {image_files[neighbors[0][i]]}, Distance: {distances[0][i]:.4f}, Nearest Index in Dataset: {neighbors[0][i]}")