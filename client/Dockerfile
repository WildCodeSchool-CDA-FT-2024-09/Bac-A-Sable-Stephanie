# Use Node.js LTS version on Alpine Linux
FROM node:lts-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json first to take advantage of Docker's cache
COPY *.json ./

# Install dependencies
RUN npm install

# Copy the application source code to /app
COPY . . 

# Expose port 5173 inside the container
EXPOSE 5173

# Define the command to start the application
CMD ["npm", "run", "dev"]