# this dockerfile is used for product deployments
FROM python:3.6-alpine
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . /app
WORKDIR /app
# for the flask config
ENV FLASK_ENV=prod
EXPOSE 8000
ENTRYPOINT [ "gunicorn", "-b", "0.0.0.0:8000", "--log-level", "INFO", "backend:app" ]