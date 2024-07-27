FROM node:22.3.0

WORKDIR /app

ARG NODE_ENV=production

COPY ./*json ./
RUN npm install
COPY . .

CMD ["npm", "start"]
