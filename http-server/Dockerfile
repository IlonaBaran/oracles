FROM node:latest
WORKDIR /api
COPY data data
RUN npm install -g http-server
EXPOSE 8080
CMD ["http-server", "data"]