FROM node:20-alpine

WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy backend files
COPY backend/package*.json ./
RUN npm install

# Copy backend source code
COPY backend ./

# Set environment variables
ENV PORT=8080
ENV NODE_ENV=production

# Expose port
EXPOSE ${PORT}

# Start the backend
CMD ["node", "app.js"] 