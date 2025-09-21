FROM node:20-alpine

WORKDIR /client

COPY ./package*.json ./

# Install dependencies including Tailwind CSS and concurrently globally
RUN npm install
RUN npm install -g tailwindcss concurrently

COPY . .

# You might also want to run the Tailwind CSS init command if needed
# RUN npx tailwindcss init

EXPOSE 3000
CMD ["npm", "run", "dev"]
