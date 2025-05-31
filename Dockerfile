FROM node:20-alpine

WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

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
ENV VITE_BACKEND_HOST=localhost
ENV VITE_BACKEND_PORT=8081
RUN echo "Building frontend with backend at http://${VITE_BACKEND_HOST}:${VITE_BACKEND_PORT}"
RUN npm run build

# Install serve for frontend
RUN npm install -g serve

# Create start script
WORKDIR /app
COPY container-start.sh .
RUN chmod +x container-start.sh

# Set environment variables
ENV PORT=8080
ENV NODE_ENV=production

# Expose port
EXPOSE ${PORT}

# Start both services
CMD ["./container-start.sh"] 