FROM node:18.14.2-alpine3.17
RUN apk add git

COPY src /app/src
COPY scripts/init.sh /app/
COPY package.json /app/
WORKDIR /app
RUN npm install -g npm
RUN npm install pnpm -g
RUN pnpm i 
CMD '/app/init.sh'