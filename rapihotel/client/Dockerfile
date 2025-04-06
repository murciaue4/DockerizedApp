# Usa una imagen base de Node (puedes ajustar la versión)
FROM node:20.19.0-alpine

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias y luego instala
COPY package*.json ./
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto que usa tu app (ajusta según tu configuración de Vite)
EXPOSE 3000

# Comando para iniciar la aplicación (por ejemplo, "npm run dev" o "npm start")
CMD ["npm", "run", "dev"]
