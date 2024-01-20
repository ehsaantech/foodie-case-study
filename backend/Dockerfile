# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the remaining app files to the working directory
COPY . .

# Expose the port that your Node.js app is running on
EXPOSE 3000

# Start the Node.js app
CMD ["npm", "start"]