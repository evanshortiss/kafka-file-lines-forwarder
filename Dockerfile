FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

CMD [ "node", "index.js" ]
