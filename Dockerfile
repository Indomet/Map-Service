# Use an official Node.js runtime as a base image
FROM node:18.11.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .


# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "run", "start"]

# docker build -t map-service .
# docker run -p 3000:3000 --rm --name map-service map-service
