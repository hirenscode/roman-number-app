#!/bin/sh

echo "Starting services with configuration:"
echo "Backend: http://${VITE_BACKEND_HOST}:${BACKEND_PORT}"
echo "Frontend: http://localhost:${FRONTEND_PORT}"

# Start backend
cd /app/backend
export PORT=${BACKEND_PORT}
echo "Starting backend on port ${PORT}"
npm start &

# Start frontend
cd /app/frontend
echo "Starting frontend on port ${FRONTEND_PORT}"
serve -s dist -l ${FRONTEND_PORT} &

# Keep container running
wait 