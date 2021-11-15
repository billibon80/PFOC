# pull official base image
FROM python:3


# set work directory
WORKDIR /usr/src/app

# set enveironment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev
RUN apt-get -y update && \
 apt-get add postgresql-server-dev gcc python3-dev musl-dev


# install dependecies
COPY . /usr/src/app
RUN pip install -r requirements.txt
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
