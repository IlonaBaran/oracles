# syntax=docker/dockerfile:1
# based on standard python image
FROM python:3.7-alpine as my_flask_app
#create flask dir
WORKDIR /flask
#creating flask app from scenario.py
ENV FLASK_APP=scenario.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
#copying requirements for pip install
COPY requirements.txt /flask
#copying scenario.py 
COPY scenario.py /flask
#installing requirements
RUN pip install -r requirements.txt
#exposing on default container port
EXPOSE 5000
#running the app
CMD ["flask", "run"]
