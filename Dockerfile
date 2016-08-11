FROM node:6.3

RUN npm i -g pm2 webpack rimraf cross-env
RUN mkdir -p /var/www/app
ADD . /var/www/app
WORKDIR /var/www/app
RUN npm i
RUN npm run build

EXPOSE 2999
CMD ["pm2", "start", "processes.json", "--no-daemon"]
