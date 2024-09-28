#!/bin/bash

# Check if the script is executable
if [ ! -x "$0" ]; then
    echo "Making the script executable..."
    chmod +x "$0"
    echo "Re-running the script..."
    exec "$0" "$@"
    exit 0
fi

# Function to apply Kubernetes YAML and check pod status
apply_and_check() {
    local yaml_file=$1
    echo "Applying ${yaml_file}"
    kubectl apply -f "${yaml_file}"

    # Check pod status
    echo "Checking pod status for ${yaml_file}..."
    kubectl get pods
}

# Function to fetch logs for specific pods
fetch_logs() {
    local app_name=$1
    echo "Fetching logs for ${app_name} pod..."
    kubectl logs -l app="${app_name}"
}

# Function to expose a service (if needed)
expose_service() {
    local service_name=$1
    local port=$2
    echo "Exposing ${service_name} service on port ${port}..."
    kubectl expose deployment "${service_name}" --type=LoadBalancer --port="${port}"
}

# Apply logger-hackathon (Spring Boot app) deployment
kubectl apply -f logger-hackathon-deployment.yaml

# Spring boot
kubectl apply -f spring-boot-deployment.yaml
kubectl apply -f spring-boot-service.yaml


