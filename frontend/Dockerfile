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

# Expose port 3000 for the React app
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]