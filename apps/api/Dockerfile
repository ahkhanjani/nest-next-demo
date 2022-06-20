FROM node:16-alpine

WORKDIR /app

COPY ./dist/apps/api .

EXPOSE 3000

RUN npm install -g yarn

RUN yarn install --production

CMD ["node", "./main.js"]
