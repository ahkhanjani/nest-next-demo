FROM node:lts-alpine

WORKDIR /app
COPY ./dist/apps/material-web .

ENV PORT=3335
EXPOSE ${PORT}

ENV NODE_ENV=production
RUN npm install --omit=dev
CMD ["node", "./main.js"]
