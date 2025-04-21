# Base stage with pnpm setup
FROM node:23.11.0-slim AS base

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Start the server
CMD ["node", "dist/index.js"]
