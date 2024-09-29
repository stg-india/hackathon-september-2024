from deepface import DeepFace
import pandas as pd
import os


def create_embeddings(image_folder):
    embeddings = []
    image_names = []
    total_images = len(os.listdir(image_folder))
    
    print(f"Total images to process: {total_images}")

    for index, image_name in enumerate(os.listdir(image_folder)):
        image_path = os.path.join(image_folder, image_name)
        
        try:
            # Generate the embedding
            embedding = DeepFace.represent(image_path, model_name="Facenet")  # You can choose your model here
            embeddings.append(embedding[0]['embedding'])  # Adjust based on output format
            image_names.append(image_name)

            # Print progress
            print(f"Processed {index + 1}/{total_images}: {image_name}")
        
        except Exception as e:
            print(f"Error processing {image_name}: {str(e)}")  # Report any errors

    # Store embeddings in a DataFrame
    df = pd.DataFrame({'image_name': image_names, 'embedding': embeddings})
    df.to_pickle('embeddings.pkl')  # Save embeddings for later use

    print(f"Embeddings saved to 'embeddings.pkl' with {len(embeddings)} entries.")

if __name__ == "__main__":
    # Specify the folder containing images
    image_folder = "images"  # Folder named 'images' in the same directory
    create_embeddings(image_folder)
