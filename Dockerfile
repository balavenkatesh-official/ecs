# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install cors
RUN npm install dotenv

# Copy the rest of the application code
COPY . .

# Copy index.html from the parent directory to the app directory
COPY public/index.html /usr/src/app/
#COPY public/style.css /usr/src/app
COPY public/crud.js /usr/src/app
COPY public/.env /usr/src/app

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
