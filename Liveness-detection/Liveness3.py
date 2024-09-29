from ultralytics import YOLO

# Load the YOLO model
model = YOLO('yolov8n.pt')

def main():
    # Train the model with your dataset
    model.train(data='Dataset/SplitData/dataOffline.yaml', epochs=3, imgsz=640, batch=16)

if __name__ == '__main__':
    main()
