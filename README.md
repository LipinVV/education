# Задание 1 - Docker CLI

## 1. Загружаем образ busybox последней версии:
```sh
$ docker pull busybox:latest                        
latest: Pulling from library/busybox
ec562eabd705: Pull complete
Digest: sha256:9ae97d36d26566ff84e8893c64a6dc4fe8ca6d1144bf5b87b2b85a32def253c7
Status: Downloaded newer image for busybox:latest
docker.io/library/busybox:latest
```

## 2. Запускаем новый контейнер с именем pinger при помощи образа busybox с командой ping сайта netology.ru с количеством пингов 7:
```sh
$ docker run --name pinger busybox ping -c 7 netology.ru
PING netology.ru (104.22.41.171): 56 data bytes
64 bytes from 104.22.41.171: seq=0 ttl=63 time=14.112 ms
64 bytes from 104.22.41.171: seq=1 ttl=63 time=12.491 ms
64 bytes from 104.22.41.171: seq=2 ttl=63 time=12.449 ms
64 bytes from 104.22.41.171: seq=3 ttl=63 time=12.542 ms
64 bytes from 104.22.41.171: seq=4 ttl=63 time=12.726 ms
64 bytes from 104.22.41.171: seq=5 ttl=63 time=13.305 ms
64 bytes from 104.22.41.171: seq=6 ttl=63 time=12.635 ms 
                                                         
--- netology.ru ping statistics ---                      
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 12.449/12.894/14.112 ms
```

## 3. Выводим списком все контейнеры, запущенные и остановленные:
```sh
$ docker ps -a
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS                      PORTS     NAMES
ca91c8627775   busybox   "ping -c 7 netology.…"   28 seconds ago   Exited (0) 20 seconds ago             pinger
```

## 4 Выводим логи контейнера pinger:
```sh
$ docker logs pinger
PING netology.ru (104.22.41.171): 56 data bytes
64 bytes from 104.22.41.171: seq=0 ttl=63 time=14.112 ms
64 bytes from 104.22.41.171: seq=1 ttl=63 time=12.491 ms
64 bytes from 104.22.41.171: seq=2 ttl=63 time=12.449 ms
64 bytes from 104.22.41.171: seq=3 ttl=63 time=12.542 ms
64 bytes from 104.22.41.171: seq=4 ttl=63 time=12.726 ms
64 bytes from 104.22.41.171: seq=5 ttl=63 time=13.305 ms
64 bytes from 104.22.41.171: seq=6 ttl=63 time=12.635 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 12.449/12.894/14.112 ms
```

## 5 Запускаем второй раз контейнер pinger
```sh
$ docker start pinger
pinger
```

## 6.  Выводим списком все контейнеры, запущенные и остановленные:
```sh
$ docker ps -a
CONTAINER ID   IMAGE     COMMAND                  CREATED              STATUS                      PORTS     NAMES
ca91c8627775   busybox   "ping -c 7 netology.…"   About a minute ago   Exited (0) 15 seconds ago             pinger
```

## 7. Выводим логи контейнера pinger:
```sh
$ docker logs pinger
PING netology.ru (104.22.41.171): 56 data bytes
64 bytes from 104.22.41.171: seq=0 ttl=63 time=14.112 ms
64 bytes from 104.22.41.171: seq=1 ttl=63 time=12.491 ms
64 bytes from 104.22.41.171: seq=2 ttl=63 time=12.449 ms
64 bytes from 104.22.41.171: seq=3 ttl=63 time=12.542 ms
64 bytes from 104.22.41.171: seq=4 ttl=63 time=12.726 ms
64 bytes from 104.22.41.171: seq=5 ttl=63 time=13.305 ms
64 bytes from 104.22.41.171: seq=6 ttl=63 time=12.635 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 12.449/12.894/14.112 ms
PING netology.ru (104.22.41.171): 56 data bytes
64 bytes from 104.22.41.171: seq=0 ttl=63 time=11.742 ms
64 bytes from 104.22.41.171: seq=1 ttl=63 time=12.738 ms
64 bytes from 104.22.41.171: seq=2 ttl=63 time=12.100 ms
64 bytes from 104.22.41.171: seq=3 ttl=63 time=12.047 ms
64 bytes from 104.22.41.171: seq=4 ttl=63 time=12.397 ms
64 bytes from 104.22.41.171: seq=5 ttl=63 time=15.046 ms
64 bytes from 104.22.41.171: seq=6 ttl=63 time=12.018 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 11.742/12.584/15.046 ms
```

## 8. По логам общее количество запусков команды ping - 14, общее количество отправленых запросов - 2.

## 9. Удаляем контейнер pinger
```sh
$ docker rm pinger
pinger
```

## 10. Удаляем образ busybox
```sh
$ docker rmi busybox:latest
Untagged: busybox:latest
Untagged: busybox@sha256:9ae97d36d26566ff84e8893c64a6dc4fe8ca6d1144bf5b87b2b85a32def253c7
Deleted: sha256:65ad0d468eb1c558bf7f4e64e790f586e9eda649ee9f130cd0e835b292bbc5ac
Deleted: sha256:d51af96cf93e225825efd484ea457f867cb2b967f7415b9a3b7e65a2f803838a
```

# Задание 2 -  Environment Variables

## 1. Загружаем образ node версии 15.14:
```sh
$ docker pull node:15.14
15.14: Pulling from library/node
bfde2ec33fbc: Pull complete
787f5e2f1047: Pull complete
7b6173a10eb8: Pull complete
dc05be471d51: Pull complete
55fab5cadd3c: Pull complete
bd821d20ef8c: Pull complete
6041b69671c6: Pull complete
989c5d2d2313: Pull complete
4b57d41e8391: Pull complete
Digest: sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
Status: Downloaded newer image for node:15.14
docker.io/library/node:15.14
```

## 2. Запускаем контейнер node с именем mynode. Передаём две переменные среды NAME=<моё имя> и SURNAME=<моя фамилия>:
```sh
$ docker run -it --name mynode -e NAME=Vitalii -e SURNAME=Lipin node:15.14
Welcome to Node.js v15.14.0.
Type ".help" for more information.
```

## 3. В node исполняем скрипт, который выводит приветствие: Привет, <моё имя> <моё фамилия>!:
```sh
console.log('Привет, ' + process.env.NAME + ' ' + process.env.SURNAME + '!');
Привет, Vitalii Lipin!
```

## 4. Останавливаем контейнер:
```sh
.exit
$ docker stop mynode
mynode
```

## 5. Удаляем образ node версии 15.14:
```sh
$ docker rmi node:15.14
Untagged: node:15.14
Untagged: node@sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
Deleted: sha256:3d3f41722daf1a77c34d6eade6676bbffa2d6a2a21095de2ab0c427a5c942fc9
Deleted: sha256:601382991a159cfc5013ad973158f30b7b7a913e8d7e547b3456deab3ad98022
Deleted: sha256:d5db49eecae8c02c9ea3a79f89c43ded9162bac118a0302a7b514d0df82aa112
Deleted: sha256:a2c1973858d0aad3de0927294602b17c8ef9050c30e0f461e0868997a08552a4
Deleted: sha256:a0153172017a08a521a8be971ca4dcb5fbc4b7227642c12bbb2da6265bd66b50
Deleted: sha256:f1123940e954d335d91b52a40fab4f8144f38ff113ade7d65663071d0f06da6f
Deleted: sha256:f1f4fbb0e7e6e0ce2d9eae1e577f9f6df0a719dd874bff00b2d08895c75c297d
Deleted: sha256:1eb455ab6d45fdbbd90fccff791ffa228080c052acf464f8da1b1d78650bd706
Deleted: sha256:1dbe832a694971a925d7d216f49b700c95f402bd72288f9d37eceb1d59dcf72d
Deleted: sha256:2f4ee6a2e1b5dfb9236cd262e788f9d39109242ca27a4aacb583c8af66ec3ff7
```