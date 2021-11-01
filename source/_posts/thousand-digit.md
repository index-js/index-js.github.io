---
title: JavaScript千分位
date: 2021-08-24 15:29
updated: 2021-08-24 15:29
tags:
    - JavaScript
---

## 正则千分位
```js
'1234567890.012345'.replace(/\B(?=(\d{3})+(\.|$))/g, ',')
"1,234,567,890.012,345"
// 此处有个小问题，小数位大于3，也会加上分隔符
```

## ES函数，JS原生方法
[Number.toLocaleString()，详见MDN Web](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)
```js
Number('1234567890.012345').toLocaleString()
"1,234,567,890.012"

// 有些浏览器默认最大3个小数位，解决办法是maximumFractionDigits(取值0-20)
Number('1234567890.012345').toLocaleString(undefined, { maximumFractionDigits: 10 })
"1,234,567,890.012345"
```
