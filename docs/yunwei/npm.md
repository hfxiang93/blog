---
title: npm与yarn与pnpm
date: 2024-06-25
categories: 工程化
---

## npm 与 yarn 与 pnpm 区别

npm 和 yarn 都是 node 的包管理工具， 它们都用于管理 node 项目的依赖包。 它们之间有一些区别， 下面是它们的区别：

1. 安装速度：npm 的安装速度比 yarn 慢， 因为 npm 需要从远程仓库下载依赖包， 而 yarn 则可以从本地缓存中获取依赖包。
2. 依赖包管理：npm 和 yarn 都支持依赖包的管理， 但是 npm 的依赖包管理相对简单， 而 yarn 的依赖包管理更加复杂。
3. 依赖包扁平化：npm 和 yarn 都支持依赖包扁平化， 即把依赖包平铺展示在 node_module 中， 这样可以减少重复依赖包的数量。
4. 依赖包版本管理：npm 和 yarn 都支持依赖包版本管理， 即可以使用不同的版本号来管理依赖包。
5. 依赖包安装方式：npm 和 yarn 都支持依赖包的安装， 即可以使用 npm install 或 yarn install 命令来安装依赖包。
6. 依赖包更新方式：npm 和 yarn 都支持依赖包的更新， 即可以使用 npm update 或 yarn upgrade 命令来更新依赖包。
7. 依赖包卸载方式：npm 和 yarn 都支持依赖包的卸载， 即可以使用 npm uninstall 或 yarn remove 命令来卸载依赖包。
8. 依赖包锁定方式：npm 和 yarn 都支持依赖包的锁定， 即可以使用 npm shrinkwrap 或 yarn.lock 文件来锁定依赖包的版本号。
9. 依赖包发布方式：npm 和 yarn 都支持依赖包的发布， 即可以使用 npm publish 或 yarn publish 命令来发布依赖包。
10. 依赖包搜索方式：npm 和 yarn 都支持依赖包的搜索， 即可以使用 npm search 或 yarn search 命令来搜索依赖包。

## 注意

npm 和 yarn 的依赖包都会在 node_module 中平铺展示， 通过扁平的这种方式导致在项目中可以使用未声明的依赖（即项目本身没有在 package.json 中声明的依赖）会有幽灵依赖问题，同一个依赖不同版本，npm 和 yarn 只能将其中的一个版本放在 node_module 中，其他的版本还是只能安装在对应依赖包的依赖中

pnpm 完美的解决了这些问题，node_module 中只有项目本身对的依赖，且全部是通过链接的方式指向.pnpm 中的对应依赖包，速度快且节省了大量的磁盘空间，并支持离线下载，缺点是时间久了 pnpm store 会越来越大，需要定期的清理 pnpm store prune

## package.json

项目的配置文件

```json
{
  "name": "xhfblog",
  "version": "1.0.0",
  "author": "xianghaifeng",
  "scripts": {
    "dev": "vuepress dev . --temp .temp",
    "build": "vuepress build .",
    "deploy": "npm run build && gh-pages -d public",
    "deployed": "gh-pages -d public"
  },
  "devDependencies": {
    "async-validator": "^1.11.5",
    "node-sass": "^4.12.0",
    "sass-loader": "^7.1.0",
    "vuepress": "^1.9.7",
    "vuepress-plugin-dynamic-title": "^1.0.0",
    "vuepress-plugin-go-top": "^1.0.4",
    "vuepress-plugin-ribbon-animation": "^1.1.3",
    "vuepress-plugin-sakura": "^1.2.1",
    "vuepress-theme-jabinblog": "0.0.1"
  },
  "dependencies": {
    "gh-pages": "^4.0.0",
    "vue-class-component": "^7.2.3",
    "vuepress-plugin-helper-live2d": "^1.0.2"
  },
  "description": ""
}
```

## package-lock.json

为什么要使用 package-lock.json？为了在不同的环境下能生成相同的 node_modules

因为 npm 不同版本的下载依据不同，有些依赖可能已经发了新版本，依赖的依赖也更新了版本，可能会导致依赖的变更从而导致项目环境不同，会出现一些奇怪的问题

## npm install 做了什么?

- 1.检查 npm config 信息

- 2.判断是否存在 lockfile，如果存在，要判断 lockfile 和 package.json 的依赖信息是否一致，不同版本的 npm 下载的依据不同,npm5.0 是直接根据 lockfile 下载，5.1-5.4.2 是根据 package.json 下载，然后更新 lockfile，5.4.2 以上是当 lockfile 和 package.json 版本有兼容时根据 lockfile 文件下载，否则根据 package.json 下载然后更新 lockfile

- 3.如果不存在，需要读取 package.json 中的依赖信息，构建版本依赖树，依赖关系扁平化处理，去重

- 4.判断是否有依赖缓存，没有的话，从 config 配置的源中下载依赖包并检查完整性，如果有缓存，就直接使用缓存，解压到 node_modules 中

- 5. 生成/更新 lockfile
