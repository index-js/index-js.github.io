---
title: MySQL备份
date: 2019-07-18 12:03
updated: 2019-07-18 12:03
tags:
    - MySQL
    - Docker
---
## 导出备份
mysqldump -u{root} -p{password} {database_name} > backup.sql
```sh
--opt 默认
--default-character-set=utf8mb4 默认格式
-C 传输压缩
--skip-disable-keys 避免导入重置自增ID
--single-transaction 避免锁表
--triggers 备份触发器
```

## 备份恢复
mysql -h{host} -P{port} -u{root} -p{password} -C < backup.sql

## 在Docker容器外执行
docker exec -i {container_name} mysql/mysqldump ...
