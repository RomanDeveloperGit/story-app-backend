FROM node:20.12.2 AS build
WORKDIR /app
COPY package.json yarn.lock ./
COPY prisma ./prisma/
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:20.12.2 AS web-server
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/yarn.lock ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
EXPOSE 8000
CMD [ "yarn", "start:migrate:prod" ]
