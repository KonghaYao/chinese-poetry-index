FROM node:18.14.2-alpine3.17
RUN apk add git
WORKDIR /app
COPY . .
RUN npm install pnpm -g
RUN pnpm i 
RUN chmod 777 /app/init.sh
CMD '/app/init.sh'