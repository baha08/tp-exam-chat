FROM node:18-alpine

WORKDIR /app

# Optimisation cache Docker (comme expliqué dans le TP)
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
