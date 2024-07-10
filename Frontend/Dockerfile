# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm update
# Copy the remaining app files
COPY . .
COPY ./src/css/pdf.css ./app/src/css/pdf.css


EXPOSE 5173
# Serve the built application with a lightweight HTTP server
CMD ["npm", "run", "dev"]
