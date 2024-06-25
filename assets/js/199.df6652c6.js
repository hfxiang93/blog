(window.webpackJsonp=window.webpackJsonp||[]).push([[199],{689:function(s,a,t){"use strict";t.r(a);var n=t(0),e=Object(n.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"什么是-ci-cd"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是-ci-cd"}},[s._v("#")]),s._v(" 什么是 CI/CD？")]),s._v(" "),a("p",[s._v("CICD 是 持续集成（Continuous Integration）和持续部署（Continuous Deployment）简称。指在开发过程中自动执行一系列脚本来减低开发引入 bug 的概率，在新代码从开发到部署的过程中，尽量减少人工的介入。")]),s._v(" "),a("h4",{attrs:{id:"持续集成-ci"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#持续集成-ci"}},[s._v("#")]),s._v(" 持续集成：CI")]),s._v(" "),a("p",[s._v("持续集成指在和向远程仓库 push 代码后，在这次提交合并入主分支前进行一系列测试，构建等流程。假设现在有个应用的代码存储在 gitlab 上，每天开发者都 push 很多次提交，针对每次 push，你可以创建一系列脚本进行自动测试，降低往应用里引入错误的概率。这就是持续集成，它可应用在包括开发分支在内的多个分支上。")]),s._v(" "),a("h4",{attrs:{id:"持续部署-cd"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#持续部署-cd"}},[s._v("#")]),s._v(" 持续部署：CD")]),s._v(" "),a("p",[s._v("持续部署在持续集成的基础上更进一步，指将推送指仓库默认分支的部署至产品环境。如果这部分需要手动触发，这就是一个持续交付（Continuous Delivery）环节。\nGitlab 内置了 CICD 工具，不需要使用第三方工具，所以我们使用 gitlab-ci 以及 gitlab-runner 来完成我们的前端自动化构建部署")]),s._v(" "),a("h2",{attrs:{id:"实现原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#实现原理"}},[s._v("#")]),s._v(" 实现原理")]),s._v(" "),a("p",[s._v("前端发布流程基于 gitlab-ci 以及 gitlab-runner，runner 运行环境目前为 docker，保证项目之间的开发版本不会有冲突，打包过后的前端包文件，通过"),a("strong",[s._v("rsync")]),s._v("同步到静态资源文件中，通过监听 master（生产环境）dev（开发环境）变动自动执行发布流程。")]),s._v(" "),a("h2",{attrs:{id:"流程图"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#流程图"}},[s._v("#")]),s._v(" 流程图")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcf006e8565a5~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp",alt:"img"}})]),s._v(" "),a("h2",{attrs:{id:"实现步骤"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#实现步骤"}},[s._v("#")]),s._v(" 实现步骤")]),s._v(" "),a("p",[s._v("1.首先用 docker+nginx 部署项目 2.在 gitlab 新建的项目的 CI/CD 配置中填写需要发布到服务器的相关信息 3.将你所需要发布的项目下新建一个.gitlab-ci.yml 文件，让 gitlab 去执行自动化流程 4.打包构建，提交代码，触发钩子执行自动化构建发布")]),s._v(" "),a("h3",{attrs:{id:"_1-首先用-docker-nginx-部署项目"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-首先用-docker-nginx-部署项目"}},[s._v("#")]),s._v(" 1.首先用 docker+nginx 部署项目")]),s._v(" "),a("p",[s._v("docker 下配置 nginx 部署 vue 项目步骤：\n1.docker pull nginx 下载 nginx 2.在/data /nginx（这里的/data /nginx 就是服务器上前端静态资源的文件夹）路径下创建 html，conf，conf.d 三个文件夹，html 下放 npm run build 打包后的静态文件\n3.conf 下放 nginx.conf,conf.d 下放 default.conf，nginx.conf 和 default.conf 需要自己配置\n下面是 nginx 模板文件 可以自己根据需要修改\nnginx default.conf 配置：")]),s._v(" "),a("div",{staticClass:"language-shell script line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("server "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  listen       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  server_name  localhost"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#charset koi8-r;")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#access_log  /var/log/nginx/host.access.log  main;")]),s._v("\n\n  location / "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    root   /usr/share/nginx/html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    index  index.html index.htm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])]),a("p",[s._v("nginx nginx.conf 配置：")]),s._v(" "),a("div",{staticClass:"language-shell script line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("user  nginx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nworker_processes  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nerror_log  /var/log/nginx/error.log warn"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\npid        /var/run/nginx.pid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nevents "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  worker_connections  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1024")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\nhttp "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  include       /etc/nginx/mime.types"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  default_type  application/octet-stream"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  log_format  main  "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'$remote_addr - $remote_user [$time_local] \"$request\" '")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'$status $body_bytes_sent \"$http_referer\" '")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('\'"$http_user_agent" "$http_x_forwarded_for"\'')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  access_log  /var/log/nginx/access.log  main"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  sendfile        on"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#tcp_nopush     on;")]),s._v("\n\n  keepalive_timeout  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("65")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("gzip")]),s._v(" on"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        gzip_disable "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"msie6"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        gzip_vary on"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        gzip_proxied any"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        gzip_comp_level "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        gzip_buffers "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v(" 8k"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        gzip_http_version "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        gzip_min_length "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("256")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        gzip_types text/plain text/css\n                   application/json application/x-javascript text/xml\n                   application/xml application/xml+rss text/javascript application/javascript\n                   application/vnd.ms-fontobject application/x-font-ttf font/opentype \t\t\t\t    image/svg+xml image/x-icon\n                   image/jpeg image/gif image/png"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n\n  include /etc/nginx/conf.d/*.conf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br")])]),a("p",[s._v("4.所有文件创建好之后，执行")]),s._v(" "),a("div",{staticClass:"language-shell script line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--name")]),s._v(" *容器名称*\n"),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-p")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8088")]),s._v(":80 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" /data/nginx/html:/usr/share/nginx/html "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v("\n/data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v("\n/data/nginx/log:/var/log/nginx "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-d")]),s._v(" nginx:1.13（镜像名称）\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("p",[s._v("常用 docker 指令操作：\n--name 命名容器，\n-p 映射端口比如 8088:80，\n-v 映射当前文件夹到镜像中的文件夹,\n-d 后台运行容器，\ndocker ps -a 查看容器，\ndocker images -a 查看所有镜像，\ndocker rm 容器 id 删除容器，\ndocker rmi 镜像 id 删除镜像，\ndocker start 容器 id 运行容器，\ndocker stop 容器 id 停止容器")]),s._v(" "),a("p",[a("strong",[s._v("到这一步，就先完成了 docker+nginx 部署前端项目了，接下来是配置自动化构建发布")])]),s._v(" "),a("h3",{attrs:{id:"_2-在-gitlab-新建的项目的-ci-cd-配置中填写需要发布到服务器的相关信息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-在-gitlab-新建的项目的-ci-cd-配置中填写需要发布到服务器的相关信息"}},[s._v("#")]),s._v(" 2.在 gitlab 新建的项目的 CI/CD 配置中填写需要发布到服务器的相关信息")]),s._v(" "),a("h4",{attrs:{id:"_2-1gitlab-上项目中-ci-cd-中的-variables-变量配置-用在-yml-里的-防止代码中泄露服务器信息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1gitlab-上项目中-ci-cd-中的-variables-变量配置-用在-yml-里的-防止代码中泄露服务器信息"}},[s._v("#")]),s._v(" 2.1Gitlab 上项目中 CI/CD 中的 variables 变量配置（用在.yml 里的，防止代码中泄露服务器信息）")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcfea555c7278~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp",alt:"img"}})]),s._v(" "),a("h4",{attrs:{id:"_2-2-接下来在服务器上操作-配置免密登录"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-接下来在服务器上操作-配置免密登录"}},[s._v("#")]),s._v(" 2.2 接下来在服务器上操作，配置免密登录")]),s._v(" "),a("p",[s._v("生产密钥对: ssh-keygen -t rsa，配置让 gitlab 服务器和前端代码服务器之间可以免密登录具体免密登录操作如下：\n登录服务器，cd .ssh 执行 ssh-keygen -t rsa 命令，会生成 id_rsa（秘钥）和 id_rsa.pub（公钥）两个文件")]),s._v(" "),a("div",{staticClass:"language-shell script line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" .ssh\nssh-keygen "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-t")]),s._v(" rsa\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[a("img",{attrs:{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcf0070a64b74~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp",alt:"image.png"}})]),s._v(" "),a("p",[s._v("将公钥 id_rsa.pub 中的内容 copy 到 authorized_keys 中（做免密登录）")]),s._v(" "),a("h4",{attrs:{id:"_2-3-服务器上用-docker-安装-gitlab-runner"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-服务器上用-docker-安装-gitlab-runner"}},[s._v("#")]),s._v(" 2.3 服务器上用 docker 安装 gitlab-runner")]),s._v(" "),a("p",[s._v("用 docker 安装 gitlab-runner:")]),s._v(" "),a("div",{staticClass:"language-shell script line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" pull gitlab/gitlab-runner:latest\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("停止并删除现有容器：")]),s._v(" "),a("div",{staticClass:"language-shell script line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" stop gitlab-runner "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" gitlab-runner\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("创建启动容器：")]),s._v(" "),a("div",{staticClass:"language-shell script line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-d")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--name")]),s._v(" gitlab-runner "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--restart")]),s._v(" always "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" /var/run/docker.sock:/var/run/docker.sock "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" /srv/gitlab-runner/config:/etc/gitlab-runner "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v(" gitlab/gitlab-runner:latest\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("查看日志：")]),s._v(" "),a("div",{staticClass:"language-shell script line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" logs gitlab-runner\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h4",{attrs:{id:"_2-4-服务器上用-docker-注册-gitlab-runner"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-服务器上用-docker-注册-gitlab-runner"}},[s._v("#")]),s._v(" 2.4 服务器上用 docker 注册 gitlab-runner")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcfbf827653ce~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp",alt:"img"}}),s._v(" docker 注册 runner")]),s._v(" "),a("div",{staticClass:"language-shell script line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--rm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-t")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-i")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" /srv/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("接下来会提示你进行一系列的操作\n1.Please enter the gitlab-ci coordinator URL (e.g. "),a("a",{attrs:{href:"https://gitlab.com/",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://gitlab.com"),a("OutboundLink")],1),s._v(" ) "),a("a",{attrs:{href:"https://gitlab.com/",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://gitlab.com"),a("OutboundLink")],1),s._v("\n输入您的 GitLab 实例 URL：（gitlab 中的 CI/CD 中的 runner 里面有）\n2.Please enter the gitlab-ci token for this runner xxx\n输入您获得的令牌来注册 token：（gitlab 中的 CI/CD 中的 runner 里面有）\n3.Please enter the gitlab-ci description for this runner [hostname] my-runner\n输入 Runner 的描述，稍后可以在 GitLab 的 UI 中进行更改：\n4.Please enter the gitlab-ci tags for this runner (comma separated): my-tag,another-tag\n输入与 Runner 有关的标签，稍后可以在 GitLab 的 UI 中进行更改：\n5.Please enter the executor: ssh, docker+machine, docker-ssh+machine, kubernetes, docker, parallels, virtualbox, docker-ssh, shell: docker 6.输入 Runner 执行者：\nPlease enter the Docker image (eg. ruby:2.1): alpine:latest\n如果您选择 Docker 作为执行程序，则会要求您为未在以下项目中定义一个的项目使用默认映像：这里就输入 alpine:latest 就行了")]),s._v(" "),a("p",[a("strong",[s._v("到这一步服务器上就配置完成了")]),s._v(" "),a("strong",[s._v("想要看自己的 gitlab-runner 启动没有，可以输入 docker ps -a 查看")]),s._v(" "),a("strong",[a("img",{attrs:{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcf0074db76d0~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp",alt:"image.png"}})])]),s._v(" "),a("h3",{attrs:{id:"_3-将你所需要发布的项目下新建一个-gitlab-ci-yml-文件-让-gitlab-去执行自动化流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-将你所需要发布的项目下新建一个-gitlab-ci-yml-文件-让-gitlab-去执行自动化流程"}},[s._v("#")]),s._v(" 3.将你所需要发布的项目下新建一个.gitlab-ci.yml 文件，让 gitlab 去执行自动化流程")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcf007679f2ad~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp",alt:"img"}})]),s._v(" "),a("h4",{attrs:{id:"_3-1gitlab-ci-yml-文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-1gitlab-ci-yml-文件"}},[s._v("#")]),s._v(" 3.1gitlab-ci.yml 文件：")]),s._v(" "),a("div",{staticClass:"language-yaml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[s._v("//做缓存的\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("cache")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("key")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" $"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("CI_PROJECT_NAME"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("paths")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" node_modules/\n//测试\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# test_e2e:")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#   image: cypress/browsers:chrome67")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#   stage: test")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#   script:")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#     - npm i")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#     - npm run test:e2e -- --headless --record --key b2a22185-8eeb-4f0e-9b21-2d61f769d8c7")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#   only:")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#     - master")]),s._v("\n//dev环境构建\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("dev:build")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" node\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("stage")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" build\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" yarn\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" yarn build"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("dev\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("only")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" dev\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("tags")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" eye"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("runner\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("artifacts")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("expire_in")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 1 week\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("paths")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" dist //项目打包后的文件夹\n//dev环境发布\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("dev:deploy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" alpine"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.7")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("stage")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" deploy\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(' echo "http'),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v('//mirrors.aliyun.com/alpine/v3.7/main/" '),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")]),s._v(" /etc/apk/repositories\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" apk add "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("no"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("cache rsync openssh\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" mkdir "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("p ~/.ssh\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(' echo "$SSH_KEY_DEMO_PRIVATE" '),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")]),s._v(" ~/.ssh/id_rsa\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(' echo "$SSH_KEY_DEMO_PUB" '),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")]),s._v(" ~/.ssh/id_rsa.pub\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" chmod 600 ~/.ssh/id_rsa\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" chmod 600 ~/.ssh/id_rsa.pub\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" echo "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v('e "Host '),a("span",{pre:!0,attrs:{class:"token important"}},[s._v("*\\n\\t")]),s._v(' StrictHostKeyChecking no \\n\\n" '),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")]),s._v(" ~/.ssh/config\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" rsync "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("rav "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v('delete ./dist/ "$SERVER_DEMO_HOST'),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v('$SERVER_DEMO_PATH"//同步打包后的文件夹里的内容到nginx指定的静态资源文件夹\n  '),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("only")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" dev\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("tags")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" eye"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("runner\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br"),a("span",{staticClass:"line-number"},[s._v("47")]),a("br")])]),a("p",[s._v("上述为 dev 环境配置，生产环境同理配置即可")]),s._v(" "),a("h4",{attrs:{id:"_3-2-变量说明"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-变量说明"}},[s._v("#")]),s._v(" 3.2 变量说明：")]),s._v(" "),a("p",[s._v("SERVER_DEMO_HOST：目标 CICD 服务器 IP 地址\nSERVER_DEMO_PATH：服务器上 nginx 指向的静态资源目录\nSSH_KEY_DEMO_PRIVATE： 服务器私钥\nSSH_KEY_DEMO_PUB：服务器公钥")]),s._v(" "),a("h4",{attrs:{id:"_3-3-注意"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-注意"}},[s._v("#")]),s._v(" 3.3 注意：")]),s._v(" "),a("p",[s._v("在 webpack 项目中配置导出的文件名为你需要同步的文件夹的名称，并且访问路径按需为相对路径，或者绝对路径，具体看项目需求。上面的./dist/就是我们项目中的打包后生成的文件夹")]),s._v(" "),a("p",[a("strong",[s._v("到此我们就配置完成了，提交代码到指定分支，触发 CI/CD")])]),s._v(" "),a("h3",{attrs:{id:"_4-打包构建-提交代码-触发钩子执行自动化构建发布"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-打包构建-提交代码-触发钩子执行自动化构建发布"}},[s._v("#")]),s._v(" 4.打包构建，提交代码，触发钩子执行自动化构建发布")]),s._v(" "),a("h4",{attrs:{id:"提交代码触发-ci-cd-流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#提交代码触发-ci-cd-流程"}},[s._v("#")]),s._v(" 提交代码触发 CI/CD 流程")]),s._v(" "),a("p",[s._v("然后在 gitlab 项目中的 CI/CD 流水线中能看到自己的刚刚触发的 CI/CD 任务，如下图所示")]),s._v(" "),a("h3",{attrs:{id:""}},[a("a",{staticClass:"header-anchor",attrs:{href:"#"}},[s._v("#")]),s._v(" "),a("img",{attrs:{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcf009e19906e~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp",alt:"image.png"}})]),s._v(" "),a("p",[s._v("点击状态或者阶段都可以进入构建发布详情页面查看内容\n"),a("img",{attrs:{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcf00bc62d806~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp",alt:"image.png"}})]),s._v(" "),a("h4",{attrs:{id:"构建-build"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#构建-build"}},[s._v("#")]),s._v(" 构建：build")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcf00c633a522~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp",alt:"image.png"}})]),s._v(" "),a("h4",{attrs:{id:"发布-deploy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#发布-deploy"}},[s._v("#")]),s._v(" 发布：deploy")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbcf00d45c09e8~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp",alt:"image.png"}})]),s._v(" "),a("p",[s._v("至此，大功告成，妈妈再也不用担心我发布线上代码耗费时间和出错了")]),s._v(" "),a("h2",{attrs:{id:"自动化构建发布-ci-cd-的优势"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自动化构建发布-ci-cd-的优势"}},[s._v("#")]),s._v(" 自动化构建发布（CI/CD）的优势")]),s._v(" "),a("p",[s._v("项目建立仅需配置一次，即可实现自动化部署，docker 环境与宿主环境不会发生环境上的冲突，gitlab 控制权限，发布过程更为安全，添加自动化测试，项目上线更为省心。")]),s._v(" "),a("h2",{attrs:{id:"写在最后"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#写在最后"}},[s._v("#")]),s._v(" 写在最后")]),s._v(" "),a("p",[s._v("之前部署前端服务，修改完某个东西之后都要手动打包上传部署，很难受，而且容易出错，自从尝试了自动化部署之后就深深的爱上了，CI/CD 是真香，用了都说好。\n自己也是爬坑怕了很久，总结出来的这一套，希望能给大家带来一些帮助，文档中有啥地方写的不对的地方，欢迎指正，谢谢~")])])}),[],!1,null,null,null);a.default=e.exports}}]);