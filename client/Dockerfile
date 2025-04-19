FROM node:20-alpine
WORKDIR /client
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 10000
CMD ["sh", "-c", "ls -la /client && node index.js"]
