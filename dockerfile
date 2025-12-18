FROM node:20-alpine

# Instalar herramientas necesarias para desarrollo
RUN apk add --no-cache \
    git \
    nano

WORKDIR /usr/src/app

# Cache de dependencias
COPY package*.json ./
RUN npm install

# Código (igual lo sobreescribe el volumen)
COPY . .

EXPOSE 3000
CMD ["npm", "run", "start:dev"]
