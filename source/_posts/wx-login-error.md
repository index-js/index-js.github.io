---
title: wx.login获取session_key失败
date: 2021-09-19 09:28
updated: 2021-09-19 09:28
categories:
    - 编程
    - 小程序
tags:
    - JavaScript
    - 前端
    - 小程序
---
新用户直接授权，然后wx.login()获取js_code，后端接口会报错  
```js
{ errcode: 40029, errmsg: 'invalid code, hints: [ req_id: 1iiCP0yFe-KWV ]' }
```

## 解决办法
1. bindgetuserinfo之前，需要先调用一下wx.login()，确定session_key
1. bindgetuserinfo回调里面，调用wx.login()，然后通过wx.getUserInfo()获取和回调一样的信息
