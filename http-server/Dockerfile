FROM node:latest
WORKDIR /http-server
RUN npm install -g http-server
EXPOSE 8080
CMD ["http-server", "data", "--cors"]