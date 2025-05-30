#!/bin/sh

echo "Starting services with configuration:"
echo "Backend: http://${VITE_BACKEND_HOST:-localhost}:${BACKEND_PORT:-3131}"
echo "Frontend: http://localhost:${FRONTEND_PORT:-5151}"

# Start backend
cd /app/backend
export PORT=${BACKEND_PORT:-3131}
echo "Starting backend on port ${PORT}"
npm start &

# Start frontend
cd /app/frontend
echo "Starting frontend on port ${FRONTEND_PORT:-5151}"
serve -s dist -l ${FRONTEND_PORT:-5151} &

# Keep container running
wait 