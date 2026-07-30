# Usa uma imagem leve do Node.js
FROM node:20-alpine

# Define o diretório de trabalho no container
WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (melhora cache do Docker)
COPY package.json package-lock.json* ./

# Instala as dependências
RUN npm install

# Copia o restante do código para o container
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# Inicia o servidor do Vite, garantindo que ele escute em todas as interfaces de rede (--host)
CMD ["npm", "run", "dev", "--", "--host"]
