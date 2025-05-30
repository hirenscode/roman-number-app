FROM node:20-alpine

WORKDIR /app

# Add build arguments for environment variables
ARG VITE_BACKEND_HOST
ARG VITE_BACKEND_PORT

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app with environment variables
RUN npm run build

# Install serve to run the built app
RUN npm install -g serve

# Expose port
EXPOSE 5151

# Start the app
CMD ["serve", "-s", "dist", "-l", "5151"] 