---
title: MySQL备份
date: 2019-07-18 12:03
updated: 2019-07-18 12:03
categories:
    - 编程
    - 服务器
tags:
    - MySQL
    - Docker
---
## 导出备份
mysqldump -u{root} -p{password} {database_name} > backup.sql
```sh
--opt 默认开启
--single-transaction 避免锁表
--compress, -C 传输压缩
--compact 去掉头尾注释
--default-character-set=utf8mb4 默认格式
--triggers 备份触发器
--complete-insert, -c 使用完整的insert语句(包含列名称)
--no-data, -d 只导出表结构
--verbose, -v 输出冗余信息
```

## 备份恢复
mysql -h{host} -P{port} -u{root} -p{password} -C < backup.sql

## 在Docker容器外执行
docker exec -i {container_name} mysqldump ...
