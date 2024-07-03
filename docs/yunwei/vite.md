---
title: vite 和 webpack
date: 2024-06-25
categories: 工程化
---

## 区别

1.构建速度，vite 比 webpack 快很多，因为 vite 开发模式使用的是 esbuild（go 语言编写），使用 es 模块标准，避免了打包和编译的时间，webpack （nodejs）打包时需要对所有的模块进行解析和编译

2.webpack 配置比较繁多，vite 相对配置较少就可以完成更多的功能，webpack 是 nodejs 编写的，遵循 commonjs 规范，vite 支持 esmodule

3.weppack 生态非常庞大，有很多插件，vite 比较新，生态不如 webpack

4.webpack 是先把所有的资源打包之后再发送给浏览器，vite 是把需要用到的资源先发送给浏览器，然后再根据浏览器请求的资源进行打包，这样就实现了按需加载

## 小提示

vite 第一次构建的时候稍微慢一点，但也比 webpack 快，因为要做依赖预构建（使用 esbuild 将其他的依赖 commonjs 和 umd 的转成 esm）

## 热更新原理

起两个服务，一个客户端服务，一个 websocket，当监听到文件发生变化的时候，通过 ws 通知客户端，修改对应的文件内容即可，不需要打包
