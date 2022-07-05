FROM node:18.4.0-slim as build

WORKDIR /usr/src/app

RUN mkdir -p app/src

COPY package.json yarn.lock .

RUN yarn

COPY . .

RUN yarn build

FROM nginx:1.21.6-alpine as prod

COPY --chown=nginx:nginx --from=build /usr/src/app/node_modules/ \
    /usr/share/nginx/html/node_modules/

COPY --chown=nginx:nginx \
    --from=build /usr/src/app/app/dist \
    /usr/share/nginx/html/dist

COPY docker/conf/nginx.conf /etc/nginx/conf.d/default.conf
