# Use an official Node.js runtime as a builder
FROM node:latest AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Angular project files
COPY . .

# Build the Angular app
RUN npm run build

# Use an NGINX image to serve the app
FROM nginx:alpine
# Copy the built files to NGINX's HTML directory
COPY --from=builder /app/dist/inventory-front /usr/share/nginx/html
# Expose port 80
EXPOSE 80
