FROM node:20-alpine

WORKDIR /app

# Copy backend files
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install

# Copy frontend files
WORKDIR /app
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Copy all source code
WORKDIR /app
COPY backend ./backend
COPY frontend ./frontend

# Build frontend with environment variables
WORKDIR /app/frontend
ARG VITE_BACKEND_HOST
ARG VITE_BACKEND_PORT
RUN echo "Building frontend with backend at http://${VITE_BACKEND_HOST}:${VITE_BACKEND_PORT}"
RUN npm run build

# Install serve for frontend
RUN npm install -g serve

# Expose ports
EXPOSE ${BACKEND_PORT} ${FRONTEND_PORT}

# Start both services
CMD cd /app/backend && npm start & cd /app/frontend && serve -s dist -l ${FRONTEND_PORT} 