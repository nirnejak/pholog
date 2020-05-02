FROM alpine
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN apk update && apk add git nodejs npm redis && npm install

CMD redis-server --daemonize yes && npm start

EXPOSE 5000