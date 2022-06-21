FROM node:lts-alpine
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY build .

EXPOSE 8082

RUN chown -R node /usr/src/app

USER node

CMD ["node", "src/server.js"]
