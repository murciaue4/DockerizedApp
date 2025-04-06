# Usa una imagen base de Node (ajusta la versión si es necesario)
FROM node:20.19.0-alpine

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia y instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto en el que corre tu servidor
EXPOSE 3333

# Comando para iniciar el servidor (ajusta según tu configuración)
CMD ["npm", "run", "dev"]
