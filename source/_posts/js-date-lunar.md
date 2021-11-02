---
title: JS原生获取农历新写法
date: 2021-10-25 10:03
updated: 2021-10-25 10:03
categories:
    - 编程
    - 前端
tags:
    - JavaScript
---
```js
const time = new Date('2020-01-01').getTime()
new Intl.DateTimeFormat('zh-u-ca-chinese', {dateStyle: 'full'}).format(time)
// '2019己亥年腊月初七星期三'
new Intl.DateTimeFormat('zh-u-ca-chinese', {dateStyle: 'long'}).format(time)
// '2019己亥年腊月初七'
new Intl.DateTimeFormat('zh-u-ca-chinese', {dateStyle: 'medium'}).format(time)
// '2019年腊月初七'
new Intl.DateTimeFormat('zh-u-ca-chinese', {dateStyle: 'short'}).format(time)
// '2019/12/7'
```
更多用法查看[MDN WEB](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
