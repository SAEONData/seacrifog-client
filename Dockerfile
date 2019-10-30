# Build environment
FROM node:12.13-alpine as build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Production environment
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80