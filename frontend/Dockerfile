FROM node:20-alpine

WORKDIR /app

# Add build arguments for environment variables
ARG VITE_BACKEND_HOST
ARG VITE_BACKEND_PORT
ARG FRONTEND_PORT

# Create .env file
RUN echo "VITE_BACKEND_HOST=${VITE_BACKEND_HOST:-localhost}" > .env && \
    echo "VITE_BACKEND_PORT=${VITE_BACKEND_PORT:-3131}" >> .env && \
    echo "FRONTEND_PORT=${FRONTEND_PORT:-5151}" >> .env

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app with environment variables
RUN echo "Building frontend with backend at http://${VITE_BACKEND_HOST:-localhost}:${VITE_BACKEND_PORT:-3131}"
RUN npm run build

# Install serve to run the built app
RUN npm install -g serve

# Expose port
EXPOSE ${FRONTEND_PORT:-5151}

# Start the app using shell form to allow environment variable substitution
CMD serve -s dist -l tcp://0.0.0.0:${FRONTEND_PORT:-5151} 