# Usa una imagen oficial de Node.js
FROM node:18-alpine

# Setea el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto de la app
COPY . .

# Compila TypeScript
RUN npm run build

# Expone el puerto
EXPOSE 4000

# Comando para arrancar la app
CMD ["node", "dist/index.js"]
