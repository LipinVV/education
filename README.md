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