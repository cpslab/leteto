# Build Frontend Staticfiles
FROM node:14.15.1-stretch as front-build

WORKDIR /frontend
COPY ./frontend /frontend

RUN yarn install
RUN yarn build

# Build Backend Django Packages
FROM python:3.8.6-buster

WORKDIR /backend
COPY ./backend /backend
COPY --from=front-build /frontend/build /backend/build

RUN pip install --upgrade pip
RUN pip install pipenv
RUN pip install gunicorn
RUN pipenv install --system
RUN pip uninstall -y pipenv

CMD gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 4 --threads 4