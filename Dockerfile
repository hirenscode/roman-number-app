FROM node:20-alpine as builder

WORKDIR /app

# Build frontend
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install
COPY frontend ./
ENV VITE_BACKEND_HOST=
ENV VITE_BACKEND_PORT=
RUN npm run build

# Build backend
WORKDIR /app
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install
COPY backend ./

# Final stage
FROM node:20-alpine

WORKDIR /app

# Install nginx and curl for debugging
RUN apk add --no-cache nginx curl

# Copy built frontend
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copy backend
COPY --from=builder /app/backend ./backend

# Copy nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Create startup script
RUN echo '#!/bin/sh\n\
echo "Starting services..."\n\
# Start nginx\n\
nginx\n\
# Start backend\n\
cd /app/backend\n\
node app.js &\n\
BACKEND_PID=$!\n\
# Wait for backend to be ready\n\
echo "Waiting for backend to be ready..."\n\
for i in $(seq 1 30); do\n\
  if curl -s http://localhost:8080/metrics > /dev/null; then\n\
    echo "Backend is ready!"\n\
    break\n\
  fi\n\
  if [ $i -eq 30 ]; then\n\
    echo "Backend failed to start within timeout"\n\
    exit 1\n\
  fi\n\
  echo "Waiting for backend... attempt $i/30"\n\
  sleep 1\n\
done\n\
# Keep container running\n\
wait $BACKEND_PID\n\
' > /app/start.sh && chmod +x /app/start.sh

# Set environment variables
ENV PORT=8080
ENV NODE_ENV=production

# Expose port
EXPOSE ${PORT}

# Start services
CMD ["/app/start.sh"] 