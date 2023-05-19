FROM alpine AS base

RUN apk add --update nodejs npm
RUN npm install -g corepack
RUN apk update && apk add --no-cache libc6-compat libssl1.1
RUN corepack enable && corepack prepare pnpm@7.18.2 --activate 

FROM base AS dependencies

COPY ["package.json","pnpm-lock.yaml","/usr/src/"]
WORKDIR /usr/src
RUN pnpm install
COPY ["prisma/schema.prisma","/usr/src/"]
RUN npx prisma generate

FROM base AS build

COPY [".","/usr/src/"]
WORKDIR /usr/src
COPY --from=dependencies /usr/src/node_modules ./node_modules
RUN pnpm build

FROM base AS deploy

WORKDIR /usr/src

COPY --from=dependencies /usr/src/package.json .
COPY --from=build /usr/src/.env .
COPY --from=build /usr/src/dist ./dist
COPY --from=build /usr/src/node_modules ./node_modules

CMD ["node","dist/src/main.js"]
