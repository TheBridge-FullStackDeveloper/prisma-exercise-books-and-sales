# Usar una imagen base de Node.js. Puedes elegir la versión que prefieras.
FROM node:21-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar 'package.json' y 'package-lock.json' (si está disponible)
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todos los archivos del proyecto al contenedor
COPY . .

# Tu aplicación se ejecuta en el puerto 3000. Exponer ese puerto al exterior del contenedor.
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
