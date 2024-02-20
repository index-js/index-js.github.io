---
key: TODO
title: 服务器部署，Docker & Compose
date: 2019-09-02 14:32
updated: 2019-09-02 14:32
categories:
    - 编程
    - 服务器
tags:
    - Ubuntu
    - Docker
    - Docker Compose
---

## Docker & Docker-Compose
```sh
# 下载Docker
curl -fsSL https://get.docker.com/ | sh
# 下载最新Docker-Compose
curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
# 增加权限
chmod +x /usr/local/bin/docker-compose
# 创建目录
mkdir -p /home/docker
# 安装nginx, mysql, node...
```
