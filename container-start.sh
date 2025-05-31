#!/bin/bash

# Use the PORT provided by Cloud Run, or default to 8080
PORT=${PORT:-8080}
BACKEND_PORT=8081
echo "Starting services on ports: Frontend=$PORT, Backend=$BACKEND_PORT"

# Start backend
cd /app/backend
echo "Starting backend on port $BACKEND_PORT..."
PORT=$BACKEND_PORT npm start &
BACKEND_PID=$!

# Wait for backend to be ready
echo "Waiting for backend to be ready..."
for i in {1..30}; do
    if curl -s http://localhost:$BACKEND_PORT/metrics > /dev/null; then
        echo "Backend is ready!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "Backend failed to start within timeout"
        exit 1
    fi
    echo "Waiting for backend... attempt $i/30"
    sleep 1
done

# Start frontend
cd /app/frontend
echo "Starting frontend on port $PORT..."
serve -s dist -l $PORT &
FRONTEND_PID=$!

# Function to handle shutdown
function cleanup {
    echo "Shutting down services..."
    kill $BACKEND_PID
    kill $FRONTEND_PID
    exit 0
}

# Set up signal handling
trap cleanup SIGTERM SIGINT

# Keep the container running and monitor processes
while true; do
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        echo "Backend process died"
        exit 1
    fi
    if ! kill -0 $FRONTEND_PID 2>/dev/null; then
        echo "Frontend process died"
        exit 1
    fi
    sleep 1
done 