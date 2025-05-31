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

# Install nginx
RUN apk add --no-cache nginx

# Copy built frontend
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copy backend
COPY --from=builder /app/backend ./backend

# Copy nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Set environment variables
ENV PORT=8080
ENV NODE_ENV=production

# Expose port
EXPOSE ${PORT}

# Start both services
CMD sh -c "nginx && cd backend && node app.js" 