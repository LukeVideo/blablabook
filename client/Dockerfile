FROM node:20-alpine

WORKDIR /client

COPY ./package*.json ./

# Install dependencies including Tailwind CSS globally
RUN npm install
RUN npm install -g tailwindcss

COPY . .

# You might also want to run the Tailwind CSS init command if needed
# RUN npx tailwindcss init

EXPOSE 3000
CMD ["sh", "-c", "ls -la /client && node index.js"]
