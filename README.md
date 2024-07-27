без Dockerfile:
// в проекте на забыть: nodemon -L - обязательно в package.json выставляем такой ключ

// создаём образ
docker pull node:22.3.0

// в powershell
docker run -it --rm --name main -v C:\Users\vitli\Desktop\NT\cli:/app -w /app node:22.3.0 /bin/bash
docker run -it --rm --name main -e PORT=3003 -p 80:3003 -v /c/Users/vitli/Desktop/NT/cli:/app -w /app node:22.3.0 /bin/bash

с Dockerfile:

***
сам Dockerfile:
FROM node:22.3.0

WORKDIR /app

ARG NODE_ENV=production

COPY ./*json ./
RUN npm install
COPY . .

CMD ["npm", "start"]
***

// docker build -t main .
// docker run -it --rm --name main -e PORT=3003 -p 80:3003 main
