# FROM node:17-alpine3.14
# WORKDIR /app
# COPY package*.json .

# FROM base as test
# RUN npm ci
# COPY . .
# RUN npm run test

# FROM base as prod
# RUN npm ci --production
# COPY . .
# EXPOSE 8080
# CMD [ "node", "server.js" ]

FROM node:17-alpine3.14 as base

WORKDIR /app

COPY package*.json .

FROM base as test
RUN npm install
COPY . .
RUN npm run test

# FROM base as prod
# RUN npm ci --production
# COPY . .
# CMD [ "node", "index.js" ]