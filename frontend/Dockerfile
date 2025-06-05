# Build della React app
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps && npm run build


# Serve con Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
