#!/bin/bash

# Use the PORT provided by Cloud Run, or default to 8080
PORT=${PORT:-8080}
echo "Starting services on port: $PORT"

# Start backend
cd /app/backend
PORT=$PORT npm start &

# Wait for backend to be ready
echo "Waiting for backend to be ready..."
sleep 5

# Start frontend
cd /app/frontend
serve -s dist -l $PORT &

# Keep the container running
tail -f /dev/null 