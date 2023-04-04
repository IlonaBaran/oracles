# syntax=docker/dockerfile:1
FROM python:3.7-alpine as my_flask_app
WORKDIR /flask
ENV FLASK_APP=scenario.py
ENV FLASK_ENV=development
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt /flask
COPY scenario.py /flask
COPY Data /flask/data/
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["flask", "run"]
