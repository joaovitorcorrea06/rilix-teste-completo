# # backend/Dockerfile
# FROM node:18

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# # Copia o script de espera e dá permissão de execução
# COPY wait-for-db.sh /wait-for-db.sh
# RUN chmod +x /wait-for-db.sh

# EXPOSE 4000

# # Usa o script para aguardar o banco antes de iniciar
# CMD ["/wait-for-db.sh", "npm", "run", "dev"]


FROM node:18

RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

EXPOSE 4000

# Aqui está o segredo: esse CMD será injetado como "$@" no script
CMD ["/wait-for-db.sh", "npm", "run", "start"]


