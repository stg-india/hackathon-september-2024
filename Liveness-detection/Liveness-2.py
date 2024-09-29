import os
import random
import shutil
from itertools import islice

outputFolderPath = "Dataset/SplitData"
inputFolderPath = "Dataset/all"
splitRatio = {"train": 0.7, "val": 0.2, "test": 0.1}
classes = ["fake", "real"]

# Check if input folder exists
if not os.path.exists(inputFolderPath):
    raise FileNotFoundError(f"The input folder {inputFolderPath} does not exist.")

# Remove output folder if exists and create new one
if os.path.exists(outputFolderPath):
    shutil.rmtree(outputFolderPath)
os.makedirs(outputFolderPath, exist_ok=True)

# Directories to create
os.makedirs(f"{outputFolderPath}/train/images", exist_ok=True)
os.makedirs(f"{outputFolderPath}/train/labels", exist_ok=True)
os.makedirs(f"{outputFolderPath}/val/images", exist_ok=True)
os.makedirs(f"{outputFolderPath}/val/labels", exist_ok=True)
os.makedirs(f"{outputFolderPath}/test/images", exist_ok=True)
os.makedirs(f"{outputFolderPath}/test/labels", exist_ok=True)

# Get the names of all files
listNames = os.listdir(inputFolderPath)

uniqueNames = []
for name in listNames:
    uniqueNames.append(name.split('.')[0])
uniqueNames = list(set(uniqueNames))

# Shuffle names
random.shuffle(uniqueNames)

# Determine number of images for each set
lenData = len(uniqueNames)
lenTrain = int(lenData * splitRatio['train'])
lenVal = int(lenData * splitRatio['val'])
lenTest = int(lenData * splitRatio['test'])

# Adjust for any remaining images
if lenData != lenTrain + lenTest + lenVal:
    remaining = lenData - (lenTrain + lenTest + lenVal)
    lenTrain += remaining

# Split the list of filenames
lengthToSplit = [lenTrain, lenVal, lenTest]
Input = iter(uniqueNames)
Output = [list(islice(Input, elem)) for elem in lengthToSplit]
print(f'Total Images: {lenData} \nSplit: Train={len(Output[0])} Val={len(Output[1])} Test={len(Output[2])}')

# Copy files into corresponding directories
sequence = ['train', 'val', 'test']
for i, out in enumerate(Output):
    for fileName in out:
        imagePath = f'{inputFolderPath}/{fileName}.jpg'
        labelPath = f'{inputFolderPath}/{fileName}.txt'

        if os.path.exists(imagePath) and os.path.exists(labelPath):
            shutil.copy(imagePath, f'{outputFolderPath}/{sequence[i]}/images/{fileName}.jpg')
            shutil.copy(labelPath, f'{outputFolderPath}/{sequence[i]}/labels/{fileName}.txt')
        else:
            print(f"Warning: {fileName}.jpg or {fileName}.txt not found, skipping.")

print("Split Process Completed...")

# Creating Data.yaml file
dataYaml = f'path: ../Data\n\
train: ../train/images\n\
val: ../val/images\n\
test: ../test/images\n\
\n\
nc: {len(classes)}\n\
names: {classes}'

with open(f"{outputFolderPath}/data.yaml", 'a') as f:
    f.write(dataYaml)

print("Data.yaml file Created...")
