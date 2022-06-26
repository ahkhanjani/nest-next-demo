FROM node:lts-alpine

WORKDIR /app
COPY ./dist/apps/main-web .

ENV PORT=3334
EXPOSE ${PORT}

ENV NODE_ENV=production
RUN npm install --omit=dev
CMD ["node", "./main.js"]
