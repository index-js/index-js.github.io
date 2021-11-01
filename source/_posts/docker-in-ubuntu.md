---
title: Ubuntu使用Docker
date: 2018-11-07 18:18
updated: 2018-11-07 18:18
tags:
    - Docker
    - Ubuntu
    - MySQL
---
> 参考网站

[Docker Hub，Docker容器平台](https://hub.docker.com/)  
[Docker Practice，Dockerfile最佳实践](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)  

## Shell安装
https://get.docker.com/
```sh
# This script is meant for quick & easy install via:
$ curl -fsSL get.docker.com -o get-docker.sh
$ sh get-docker.sh
```

## 常用命令
帮助: &nbsp; &nbsp;docker [command] --help 

### 镜像
查看镜像：docker images  
查看容器：docker ps [-a]  
拉取镜像：docker pull  

### Dockerfile相关
创建镜像：docker build -t [ContainerName] .  
镜像发布：docker login + docker push

### 删除操作
删除容器：docker rm [-f]  
删除镜像：docker rmi [-f]  
删除卷：&nbsp; docker volume rm [-f]  

```sh
# Delete all containers
$ docker rm $(docker ps -a -q)
# Delete all images
$ docker rmi $(docker images -q)
# Delete all volumes
$ docker volume rm $(docker volume ls -q)
```

### 查看状态、清理
```sh
$ docker system df
$ docker system prune [-a]
```

### 示例 - MySQL
```sh
$ docker pull mysql:5.7
# docker images查看
docker run --name=mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=${PASSWORD} -d mysql:5.7
# docker ps检查

# 进入容器执行命令
docker exec -it mysql sh

# 开启远程授权
# grant all privileges on 库名.表名 to '用户名'@'IP地址' identified by '密码' with grant option;
# flush privileges;

> mysql -uroot -p${PASSWORD}
> grant all privileges on *.* to 'root'@'%' identified by '${PASSWORD}' with grant option;
> flush privileges;
> exit;
```
