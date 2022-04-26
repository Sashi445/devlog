FROM node:17-alpine3.14
WORKDIR /app
COPY package*.json .
RUN npm install
RUN export NODE_OPTIONS=--openssl-legacy-provider
COPY . ./
EXPOSE 3000
CMD ["npm", "start"]
# WORKDIR /app

# COPY package*.json /app/

# RUN npm install

# COPY ./ /app/

# RUN npm run test -- --browsers ChromeHeadlessNoSandbox --watch=false

# ARG configuration=production

# RUN npm run build -- --output-path=./dist/out --configuration $configuration


# # Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
# FROM nginx:1.15

# COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

# COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf