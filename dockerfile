FROM node:18-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start", "--", "--port", "3001"]
