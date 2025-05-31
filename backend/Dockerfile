FROM node:20-alpine

WORKDIR /app

# Add build arguments for environment variables
ARG BACKEND_PORT
ARG FRONTEND_PORT
ARG FRONTEND_HOST

# Set environment variables
ENV BACKEND_PORT=${BACKEND_PORT:-3131}
ENV FRONTEND_PORT=${FRONTEND_PORT:-5151}
ENV FRONTEND_HOST=${FRONTEND_HOST:-localhost}

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE ${BACKEND_PORT}

# Start the app
CMD ["npm", "start"] 