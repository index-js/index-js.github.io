---
title: Callback，Promise，Async
date: 2019-09-04 22:32
updated: 2019-09-04 22:32
categories:
    - 编程
    - 前端
tags:
    - JavaScript
---

## Callback - 回调函数
```js
// 假设存在A，B两个函数，有先后顺序
A = () => {}
B = () => {} 

// 正常情况下，顺序执行即可
A()  // A执行
B()  // B执行

// 当A为异步函数(JavaScript很常见，网上一大堆例子)
// 如果想顺序执行，设C为两个函数共同体
C(B) => {
  A()  // A的内容体
  B()  // 最后执行B
}

// 把函数B当做一个变量，当A全部执行完毕，才执行函数B
// 这个就是回调函数
C = A() => B()
```

## Promise
Promise是一种函数体，原型链包含then和catch
```js
// A、B函数想要顺序执行，先把A函数Promisify，封装成一个Promise

// 设D为A的Promise化的函数
D = new Promise((resolve, reject) => {
  A()
  resolve()  // 执行完毕，退出
  reject()  // 出错
})

// 当A函数执行完之后，再执行B，语义化也很好理解
D().then(B).catch()
```

## Async
Async和await是联合起来使用的，基于Promise
```js
A = async () => {}
B = async () => {}

// 这里的A和B都是Promise
// 顺序执行，只需
(async () => {
  await A()
  await B()
  return true  // 可以直接return
})
// 这里有个问题就是，如果内容函数使用了async，外部函数也必须使用async或者promise，否则会接收不到返回值
```

## 结语
本文基于作者熟悉的内容编写，未包含yield

JavaScript的这三种形态变化，其实都是语法糖，内容都是基于事件回调，因为JavaScript是单线程的
