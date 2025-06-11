# Build della React app
FROM node:20 AS builder
WORKDIR /app

# Copia i file necessari prima dell'installazione
COPY package*.json ./
COPY chatbot-widget-1.0.0.tgz ./

# Installa il pacchetto tgz e le dipendenze
RUN npm install ./chatbot-widget-1.0.0.tgz --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Ora copia il resto dei file (src, public, ecc.)
COPY . .

# Build della tua app React
RUN npm run build

# Serve con Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
