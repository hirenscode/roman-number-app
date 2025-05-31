#!/bin/bash

# Exit on error
set -e

# Configuration
PROJECT_ID="your-project-id"  # Replace with your Google Cloud project ID
REGION="us-central1"          # Replace with your preferred region
SERVICE_NAME="roman-numeral-app"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "gcloud CLI not found. Please install it first: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if user is logged in
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" &> /dev/null; then
    echo "Please login to Google Cloud first:"
    gcloud auth login
fi

# Set the project
echo "Setting project to ${PROJECT_ID}..."
gcloud config set project ${PROJECT_ID}

# Enable required APIs
echo "Enabling required APIs..."
gcloud services enable \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    containerregistry.googleapis.com

# Build and push the Docker image
echo "Building and pushing Docker image..."
gcloud builds submit --tag ${IMAGE_NAME}

# Deploy to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
    --image ${IMAGE_NAME} \
    --platform managed \
    --region ${REGION} \
    --allow-unauthenticated \
    --set-env-vars="BACKEND_PORT=8080,FRONTEND_PORT=8080" \
    --port 8080

# Get the deployed URL
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --platform managed --region ${REGION} --format 'value(status.url)')
echo "Service deployed successfully!"
echo "Access your application at: ${SERVICE_URL}" 