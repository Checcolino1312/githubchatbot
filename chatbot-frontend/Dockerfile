# Fase di build
FROM node:20-alpine as builder

WORKDIR /app

COPY . .

RUN npm install && npm run build

# Fase di produzione con NGINX
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
