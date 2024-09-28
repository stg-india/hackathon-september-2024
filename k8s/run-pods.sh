#!/bin/bash

# Check if the script is executable
if [ ! -x "$0" ]; then
    echo "Making the script executable..."
    chmod +x "$0"
    echo "Re-running the script..."
    exec "$0" "$@"
    exit 0
fi

# If executable, proceed with the rest of the script
echo "Applying app-1-deployment.yaml"
kubectl apply -f app-1-deployment.yaml

# Optionally check pod status
echo "Checking pod status..."
kubectl get pods

# If executable, proceed with the rest of the script
echo "Applying app-2-deployment.yaml"
kubectl apply -f app-2-deployment.yaml

# Optionally check pod status
echo "Checking pod status..."
kubectl get pods

# Add other kubectl apply commands as needed
# kubectl apply -f another-deployment.yaml
