FROM node:lts-alpine

WORKDIR /app
COPY ./dist/apps/api .

ENV PORT=3333
EXPOSE ${PORT}

ENV NODE_ENV=production
RUN npm install --omit=dev
CMD ["node", "./main.js"]
