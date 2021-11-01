---
title: iOS机型new Date问题
date: 2021-09-02 15:02
updated: 2021-09-02 15:02
tags:
    - JavaScript
    - 前端
---
> 在iOS下，new Date('2020-02-02 01:01')这种格式，会返回Invalid Date

## 解决办法

1. 替换为年/月/日 时-分-秒格式，兼容其它PC和手机浏览器，如new Date('2020/02/02 01:01')
1. 替换中间空格为字母T，也是兼容的，如new Date('2020-02-02T01:01')

注意new Date('2020/02/02T01:01')也为Invalid Date，混用🙅‍♀️
