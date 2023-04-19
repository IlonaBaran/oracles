FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Copy necessary project files
COPY babel.config.js ./
COPY jsconfig.json ./
COPY vue.config.js ./
COPY public ./public
COPY src ./src

#exposing on default container port 8080
EXPOSE 8080
#running dev server
CMD [ "npm", "run", "serve" ]