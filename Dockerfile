FROM node:20-alpine as frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
ENV VITE_BACKEND_HOST=
ENV VITE_BACKEND_PORT=
RUN npm run build

FROM node:20-alpine

WORKDIR /app

# Copy backend files
COPY backend/package*.json ./
RUN npm install

# Copy backend source code
COPY backend ./

# Copy built frontend
COPY --from=frontend-builder /app/frontend/dist ./public

# Set environment variables
ENV PORT=8080
ENV NODE_ENV=production

# Expose port
EXPOSE ${PORT}

# Start the backend
CMD ["node", "app.js"] 