#or declare specific node version
FROM node:latest
#create http-server dir
WORKDIR /http-server
#install http-server on container
RUN npm install -g http-server
#on container port 8080
EXPOSE 8080
#expose data folder qllowing cors
CMD ["http-server", "data", "--cors"]