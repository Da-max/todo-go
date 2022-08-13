FROM node:latest

WORKDIR /usr/src/app
COPY package.json yarn.lock ./

