FROM node:latest

WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .

ENTRYPOINT ["docker/scripts/entrypoint-app.sh"]
