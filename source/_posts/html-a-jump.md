---
title: 网页a标签跳转
date: 2023-03-22 15:56
updated: 2023-03-22 15:56
categories:
    - 编程
    - H5
tags:
    - JavaScript
---

## 打电话
```html
<a href="tel:10000">中国电信</a>
```
## 发邮件
```html
<a href="mailto:i@yangl.in">发邮件给我</a>
<!-- 带主题和内容 -->
<a href="mailto:i@yangl.in?subject=Test&body=Content">发邮件给我(带主题和内容)</a>
<!-- 多个收件人 -->
<a href="mailto:i@yangl.in;mail@yanglin.me">发送</a>
```
## 发短信
```html
<a href="sms:10000?body=Content">发短信(安卓)</a>
<a href="sms:10000&body=Content">发短信(iOS)</a>
<!-- 多个收件人 -->
<a href="sms:10000,10010,10086">发送</a>
```
