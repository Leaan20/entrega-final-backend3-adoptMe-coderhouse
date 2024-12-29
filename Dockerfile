# Definimos una imagen base
FROM node

# Se crea una carpeta interna donde se va a guardar el proyecto
WORKDIR /app

# Se copia el package.json , a la carpeta dockerOperations
COPY package*.json ./

# copiamos las variables de entorno (debe recibir 2 parametros COPY)
COPY .env .env

# se jecuta luego npm install para instalar las dependencias
RUN npm install --production

#Despues de instalarse, se copia todo el codigo de la app
COPY . .

# Se expone un puerto para que se escuche
EXPOSE 8080

# Se debe ejecutar "npm start" para iniciar la app
CMD ["npm" ,"start"]