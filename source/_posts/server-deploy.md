---
key: TODO
title: 服务器部署，Docker & Vsftpd
date: 2019-09-02 14:32
updated: 2019-09-02 14:32
tags:
    - Ubuntu
    - Docker
    - FTP
    - Docker Compose
---

## Docker & Docker-Compose
```sh
# 下载Docker
curl -fsSL https://get.docker.com/ | sh
# 下载最新Docker-Compose
curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose chmod +x /usr/local/bin/docker-compose
# 创建目录
mkdir -p /home/docker
# 安装nginx / mysql / node / phpmyadmin
```

## Vsftpd

1. apt update
1. apt install -y vsftpd
1. Append to /etc/vsftp.conf
1. Add User
1. chomd -R 777 /home/docker/nginx/html

```sh
# 设置ftp用户密码
$ useradd -m uftp
$ passwd uftp
```
```sh
# 修改配置文件
write_enable=YES

userlist_file=/etc/vsftpd.user_list
userlist_enable=YES
userlist_deny=NO

pasv_promiscuous=YES
pasv_address=0.0.0.0
local_root=/home/docker/nginx/html
```
