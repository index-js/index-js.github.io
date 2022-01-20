---
title: SSH登录服务器
date: 2021-11-02 11:11
categories:
    - 其它
tags:
    - Ubuntu
    - SSH
---
## 进入命令行，生成自己的公私钥
```sh
ssh-keygen -t rsa

# Linux在~/.ssh目录下，Windows在C盘根目录
# 目录结构如下
-- .ssh
  |-- id_rsa
  |-- id_rsa.pub
```
## 连接服务器，设置访问凭证
```sh
# 将公钥传到服务器，追加到~/.ssh/authorized_keys文件里
cat id_dsa.pub >> ~/.ssh/authorized_keys
```
