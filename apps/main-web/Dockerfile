FROM node:16-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile --prod

ENV NEXT_TELEMETRY_DISABLED=1

COPY ./dist/apps/main-web .

ENV PORT=4200

EXPOSE ${PORT}

CMD ["node", "./main.js"]
