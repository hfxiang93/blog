---
title: 前端自动化CI/CD
date: 2021-06-18
categories: CI/CD
---

## 什么是 CI/CD？

CICD 是 持续集成（Continuous Integration）和持续部署（Continuous Deployment）简称。指在开发过程中自动执行一系列脚本来减低开发引入 bug 的概率，在新代码从开发到部署的过程中，尽量减少人工的介入。

#### 持续集成：CI

持续集成指在和向远程仓库 push 代码后，在这次提交合并入主分支前进行一系列测试，构建等流程。假设现在有个应用的代码存储在 gitlab 上，每天开发者都 push 很多次提交，针对每次 push，你可以创建一系列脚本进行自动测试，降低往应用里引入错误的概率。这就是持续集成，它可应用在包括开发分支在内的多个分支上。

#### 持续部署：CD

持续部署在持续集成的基础上更进一步，指将推送指仓库默认分支的部署至产品环境。如果这部分需要手动触发，这就是一个持续交付（Continuous Delivery）环节。
Gitlab 内置了 CICD 工具，不需要使用第三方工具，所以我们使用 gitlab-ci 以及 gitlab-runner 来完成我们的前端自动化构建部署

## 实现原理

前端发布流程基于 gitlab-ci 以及 gitlab-runner，runner 运行环境目前为 docker，保证项目之间的开发版本不会有冲突，打包过后的前端包文件，通过**rsync**同步到静态资源文件中，通过监听 master（生产环境）dev（开发环境）变动自动执行发布流程。

## 流程图

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcf006e8565a5~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

## 实现步骤

1.首先用 docker+nginx 部署项目 2.在 gitlab 新建的项目的 CI/CD 配置中填写需要发布到服务器的相关信息 3.将你所需要发布的项目下新建一个.gitlab-ci.yml 文件，让 gitlab 去执行自动化流程 4.打包构建，提交代码，触发钩子执行自动化构建发布

### 1.首先用 docker+nginx 部署项目

docker 下配置 nginx 部署 vue 项目步骤：
1.docker pull nginx 下载 nginx 2.在/data /nginx（这里的/data /nginx 就是服务器上前端静态资源的文件夹）路径下创建 html，conf，conf.d 三个文件夹，html 下放 npm run build 打包后的静态文件
3.conf 下放 nginx.conf,conf.d 下放 default.conf，nginx.conf 和 default.conf 需要自己配置
下面是 nginx 模板文件 可以自己根据需要修改
nginx default.conf 配置：

```shell script
server {
  listen       80;
  server_name  localhost;

  #charset koi8-r;
  #access_log  /var/log/nginx/host.access.log  main;

  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
  }

}
```

nginx nginx.conf 配置：

```shell script
user  nginx;
worker_processes  1;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
events {
  worker_connections  1024;
}
http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;

  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
  '$status $body_bytes_sent "$http_referer" '
  '"$http_user_agent" "$http_x_forwarded_for"';

  access_log  /var/log/nginx/access.log  main;

  sendfile        on;
  #tcp_nopush     on;

  keepalive_timeout  65;
        gzip on;
        gzip_disable "msie6";
        gzip_vary on;
        gzip_proxied any;
        gzip_comp_level 1;
        gzip_buffers 16 8k;
        gzip_http_version 1.0;
        gzip_min_length 256;
        gzip_types text/plain text/css
                   application/json application/x-javascript text/xml
                   application/xml application/xml+rss text/javascript application/javascript
                   application/vnd.ms-fontobject application/x-font-ttf font/opentype 				    image/svg+xml image/x-icon
                   image/jpeg image/gif image/png;


  include /etc/nginx/conf.d/*.conf;
}
```

4.所有文件创建好之后，执行

```shell script
docker run --name *容器名称*
-p 8088:80 -v /data/nginx/html:/usr/share/nginx/html -v
/data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v
/data/nginx/log:/var/log/nginx -d nginx:1.13（镜像名称）
```

常用 docker 指令操作：
--name 命名容器，
-p 映射端口比如 8088:80，
-v 映射当前文件夹到镜像中的文件夹,
-d 后台运行容器，
docker ps -a 查看容器，
docker images -a 查看所有镜像，
docker rm 容器 id 删除容器，
docker rmi 镜像 id 删除镜像，
docker start 容器 id 运行容器，
docker stop 容器 id 停止容器

**到这一步，就先完成了 docker+nginx 部署前端项目了，接下来是配置自动化构建发布**

### 2.在 gitlab 新建的项目的 CI/CD 配置中填写需要发布到服务器的相关信息

#### 2.1Gitlab 上项目中 CI/CD 中的 variables 变量配置（用在.yml 里的，防止代码中泄露服务器信息）

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcfea555c7278~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

#### 2.2 接下来在服务器上操作，配置免密登录

生产密钥对: ssh-keygen -t rsa，配置让 gitlab 服务器和前端代码服务器之间可以免密登录具体免密登录操作如下：
登录服务器，cd .ssh 执行 ssh-keygen -t rsa 命令，会生成 id_rsa（秘钥）和 id_rsa.pub（公钥）两个文件

```shell script
cd .ssh
ssh-keygen -t rsa
```

![image.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcf0070a64b74~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

将公钥 id_rsa.pub 中的内容 copy 到 authorized_keys 中（做免密登录）

#### 2.3 服务器上用 docker 安装 gitlab-runner

用 docker 安装 gitlab-runner:

```shell script
docker pull gitlab/gitlab-runner:latest
```

停止并删除现有容器：

```shell script
docker stop gitlab-runner && docker rm gitlab-runner
```

创建启动容器：

```shell script
docker run -d --name gitlab-runner --restart always \ -v /var/run/docker.sock:/var/run/docker.sock \ -v /srv/gitlab-runner/config:/etc/gitlab-runner \ gitlab/gitlab-runner:latest
```

查看日志：

```shell script
docker logs gitlab-runner
```

#### 2.4 服务器上用 docker 注册 gitlab-runner

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcfbf827653ce~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp) docker 注册 runner

```shell script
docker run --rm -t -i -v /srv/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register
```

接下来会提示你进行一系列的操作
1.Please enter the gitlab-ci coordinator URL (e.g. [https://gitlab.com](https://gitlab.com/) ) [https://gitlab.com](https://gitlab.com/)
输入您的 GitLab 实例 URL：（gitlab 中的 CI/CD 中的 runner 里面有）
2.Please enter the gitlab-ci token for this runner xxx
输入您获得的令牌来注册 token：（gitlab 中的 CI/CD 中的 runner 里面有）
3.Please enter the gitlab-ci description for this runner [hostname] my-runner
输入 Runner 的描述，稍后可以在 GitLab 的 UI 中进行更改：
4.Please enter the gitlab-ci tags for this runner (comma separated): my-tag,another-tag
输入与 Runner 有关的标签，稍后可以在 GitLab 的 UI 中进行更改：
5.Please enter the executor: ssh, docker+machine, docker-ssh+machine, kubernetes, docker, parallels, virtualbox, docker-ssh, shell: docker 6.输入 Runner 执行者：
Please enter the Docker image (eg. ruby:2.1): alpine:latest
如果您选择 Docker 作为执行程序，则会要求您为未在以下项目中定义一个的项目使用默认映像：这里就输入 alpine:latest 就行了

**到这一步服务器上就配置完成了**
**想要看自己的 gitlab-runner 启动没有，可以输入 docker ps -a 查看**
**![image.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcf0074db76d0~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)**

### 3.将你所需要发布的项目下新建一个.gitlab-ci.yml 文件，让 gitlab 去执行自动化流程

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcf007679f2ad~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

#### 3.1gitlab-ci.yml 文件：

```yaml
//做缓存的
cache:
  key: ${CI_PROJECT_NAME}
  paths:
    - node_modules/
//测试
# test_e2e:
#   image: cypress/browsers:chrome67
#   stage: test
#   script:
#     - npm i
#     - npm run test:e2e -- --headless --record --key b2a22185-8eeb-4f0e-9b21-2d61f769d8c7
#   only:
#     - master
//dev环境构建
dev:build:
  image: node
  stage: build
  script:
    - yarn
    - yarn build:dev
  only:
    - dev
  tags:
    - eye-runner
  artifacts:
    expire_in: 1 week
    paths:
      - dist //项目打包后的文件夹
//dev环境发布
dev:deploy:
  image: alpine:3.7
  stage: deploy
  script:
    - echo "http://mirrors.aliyun.com/alpine/v3.7/main/" > /etc/apk/repositories
    - apk add --no-cache rsync openssh
    - mkdir -p ~/.ssh
    - echo "$SSH_KEY_DEMO_PRIVATE" >> ~/.ssh/id_rsa
    - echo "$SSH_KEY_DEMO_PUB" >> ~/.ssh/id_rsa.pub
    - chmod 600 ~/.ssh/id_rsa
    - chmod 600 ~/.ssh/id_rsa.pub
    - echo -e "Host *\n\t StrictHostKeyChecking no \n\n" > ~/.ssh/config
    - rsync -rav --delete ./dist/ "$SERVER_DEMO_HOST:$SERVER_DEMO_PATH"//同步打包后的文件夹里的内容到nginx指定的静态资源文件夹
  only:
    - dev
  tags:
    - eye-runner
```

上述为 dev 环境配置，生产环境同理配置即可

#### 3.2 变量说明：

SERVER_DEMO_HOST：目标 CICD 服务器 IP 地址
SERVER_DEMO_PATH：服务器上 nginx 指向的静态资源目录
SSH_KEY_DEMO_PRIVATE： 服务器私钥
SSH_KEY_DEMO_PUB：服务器公钥

#### 3.3 注意：

在 webpack 项目中配置导出的文件名为你需要同步的文件夹的名称，并且访问路径按需为相对路径，或者绝对路径，具体看项目需求。上面的./dist/就是我们项目中的打包后生成的文件夹

**到此我们就配置完成了，提交代码到指定分支，触发 CI/CD**

### 4.打包构建，提交代码，触发钩子执行自动化构建发布

#### 提交代码触发 CI/CD 流程

然后在 gitlab 项目中的 CI/CD 流水线中能看到自己的刚刚触发的 CI/CD 任务，如下图所示

### ![image.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcf009e19906e~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

点击状态或者阶段都可以进入构建发布详情页面查看内容
![image.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcf00bc62d806~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

#### 构建：build

![image.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcf00c633a522~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

#### 发布：deploy

![image.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcf00d45c09e8~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

至此，大功告成，妈妈再也不用担心我发布线上代码耗费时间和出错了

## 自动化构建发布（CI/CD）的优势

项目建立仅需配置一次，即可实现自动化部署，docker 环境与宿主环境不会发生环境上的冲突，gitlab 控制权限，发布过程更为安全，添加自动化测试，项目上线更为省心。

## 写在最后

之前部署前端服务，修改完某个东西之后都要手动打包上传部署，很难受，而且容易出错，自从尝试了自动化部署之后就深深的爱上了，CI/CD 是真香，用了都说好。
自己也是爬坑怕了很久，总结出来的这一套，希望能给大家带来一些帮助，文档中有啥地方写的不对的地方，欢迎指正，谢谢~
