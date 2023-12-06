# build stage
FROM node:18.19.0 as build
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

# production
FROM nginx:stable-alpine
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]