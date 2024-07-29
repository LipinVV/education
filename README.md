# Проект с использованием Docker и Docker Compose

## Описание

Этот проект демонстрирует, как использовать Docker и Docker Compose для управления Node.js приложением.

## Установка и запуск

### Без Dockerfile

1. Не забываем добавить ключ `nodemon -L` в `package.json`, чтобы `nodemon` корректно работал в Docker контейнере.

    ```json
    "scripts": {
        "start": "nodemon -L"
    }
    ```

2. Скачиваем образ Node:

    ```sh
    docker pull node:22.3.0
    ```

3. Запустите контейнер:

    ```sh
    docker run -it --rm --name main -v C:\Users\vitli\Desktop\NT\cli:/app -w /app node:22.3.0 /bin/bash
    ```

   или

    ```sh
    docker run -it --rm --name main -e PORT=3003 -p 80:3003 -v /c/Users/vitli/Desktop/NT/cli:/app -w /app node:22.3.0 /bin/bash
    ```

### С Dockerfile

1. Создаём Dockerfile:

    ```Dockerfile
    FROM node:22.3.0

    WORKDIR /app

    ARG NODE_ENV=production

    COPY ./*json ./
    RUN npm install
    COPY . .

    CMD ["npm", "start"]
    ```

2. Рисуем Docker образ:

    ```sh
    docker build -t main .
    ```

3. Запускаем контейнер:

    ```sh
    docker run -it --rm --name main -e PORT=3003 -p 80:3003 main
    ```

## Композиция

1. Сборка и запуск композиции:

    ```sh
    docker-compose up --build
    ```

2. Удаление всех контейнеров и томов:

    ```sh
    docker-compose down -v
    ```
