# Usa uma imagem leve do Node.js
FROM node:20-alpine

# Define o diretório de trabalho no container
WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (melhora cache do Docker)
COPY package.json package-lock.json ./

# Instala as dependências de forma determinística
RUN npm ci

# Copia o restante do código para o container
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# host e polling já configurados em vite.config.ts
CMD ["npm", "run", "dev"]
