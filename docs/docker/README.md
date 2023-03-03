# notes
## docker配置镜像加速器
>   使用加速器可以提升获取Docker官方镜像的速度
```
1. docker配置文件目录/etc/docker
2. 如果无配置文件,创建配置文件daemon.json
3. 配置文件如下:
参考: https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors?accounttraceid=7ab6846acf66447dae76a6606a677deeyejb
{
  #地址为阿里云加速器地址
  "registry-mirrors": ["https://yg4swn7f.mirror.aliyuncs.com"]
}
4. 重启配置,重启docker生效
4.1 systemctl daemon-reload
>   重新加载某个服务的配置文件，如果新安装了一个服务，归属于 systemctl 管理，要是新服务的服务程序配置文件生效，需重新加载
4.2 systemctl restart docker
>   重启docker服务
```
## Centos8.2安装docker
>   ubuntu 根据命令提示安装即可, centos需要注意一些细节

Centos8.2安装参考: <br>
https://blog.csdn.net/weixin_41887155/article/details/107232529

## docker基本命令
### 查看docker版本
`docker -v`
### 查看版本详情
`docker version`
### 查看docker有关进程
`ps -ef | grep docker`
##  docker启动|重启|停止命令
### systemctl 方式
+ 设置开机自启动 `systemctl enable docker`
+ 启动 `systemctl start docker`
+ 重启 `systemctl restart docker`
+ 停止 `systemctl stop docker`
+ 重载所有修改过的配置文件 `systemctl daemon-reload`
### service方式
+ 启动 `service docker start`
+ 停止 `service docker stop`
+ 重启 `service docker restart`

## 镜像基本命令
### 镜像搜索命令
+   搜索镜像nginx<br>
    `docker search nginx`
+   搜索官方提供的nginx镜像<br>
    `docker search --filter "is-official=true" nginx`
+   搜索自动化构建的nginx镜像<br>
    `docker search --filter "is-automated=true" nginx`
+   搜索大于等于3颗星的nginx镜像<br>
    `docker search --filter stars=3 nginx`
### 下载镜像命令
`docker pull nginx`
### 本地镜像查看
`docker images`
### 本地镜像删除
`docker rmi nginx`
## 容器的基本操作
### 容器创建
`docker run -itd --name=container_name image_name/镜像id`
+   -i 表示以交互模式运行容器
+   -d 表示后台运行容器, 并返回容器id
+   -t 为容器重新分配一个伪输入终端
+   –name为容器指定名称
+   注意: 一个镜像可以创建多个容器,只要名字不一样就可以
### 查看容器(运行中的)
`docker ps`
### 查看容器(包括已停止的)
`docker ps -a`
### 停止容器
`docker stop container_name/container_id`
### 启动容器
`docker start container_name/container_id`
### 重启容器
`docker restart container_name/container_id`
### 删除容器
> 注意: 删除容器需要先停止容器<br>
`docker rm container_name/container_id`
### 进入容器
`docker exec -it container_name/container_id /bin/bash`
### 退出容器
`exit`
### 容器提交修改
`docker commit -a "author" -m "message" container_name/container_id new_image_name:tag_name`
```
参数说明:
-a：参数可选，用于指定作者，可以写你的名字
-m：参数可选，提交信息，可以说一下你做了哪些修改
container_id：该参数为被修改的容器ID
new_image_name：此为新镜像的名字，可自定义
tag_name：此为新镜像的标签，可不写，不写时标签默认为latest
```
+   修改完,停掉容器,重新启动,修改的内容还在;
+   容器删除了,再次通过镜像创建容器,如果没有把容器修改内容保存到镜像中,再次创建的容器没有修改的内容;
+   每个容器都很干净的,里面没有多余的命令,需要自己安装;
### 查看容器日志
>   当容器启动或者运行中发现问题, 需要查看运行日志时使用

`docker logs 容器id/容器名称`

## 端口映射
>   解决的是客户端发送过来的请求和容器之间的交互

`docker run -itd -p 宿主机端口号:容器端口号 + 镜像名字/镜像id`
## 文件挂载
>   解决的是宿主机和容器之间的交互;<br>
>   文件挂载和复制都要用绝对路径;<br>
>   文件挂载的意义:本地代码或者文件通过容器挂载的方式,放到容器里面,交由其来运行;

`docker run -itd -v /宿主机/文件目录/文件名:/容器/目录/文件名`
```
#   例子:
1. docker run -itd --name=nginx -p 80:80 -v /wwwroot/html:/usr/share/nginx/html nginx
2. docker run -itd --name=nginx -p 80:80 -v /wwwroot/:/usr/share/nginx/html/ 584256c85bdd
```
### 文件挂载举例实证
+ 宿主机把不存在的文件挂载到存在该文件的容器, 挂载后容器启动失败;
+ 宿主机把本地不存在的文件夹挂载到容器内存在的文件夹,会用一个空的文件夹覆盖容器原有的文件夹,启动启动正常,但容器内对应的目录被清空;
+ 宿主机存在文件挂载到容器不存在文件,挂载成功,容器内多一个挂载文件;
+ 宿主机存在文件夹挂载到容器不存在文件夹,挂载成功,容器内多一个文件夹;
+ 宿主机文件夹挂载到容器文件,启动失败;
+ 同名文件夹挂载,启动成功, 宿主机文件夹会覆盖容器内部的文件夹
+ 同名文件挂载,启动成功,宿主机会覆盖容器的文件
+ 宿主机文件挂载到容器文件夹,启动失败;

## 文件复制
> 文件挂载和复制都要用绝对路径
### 将容器的文件复制到本地
`docker cp 容器名:/容器目录/文件名 /宿主机目录/文件名`
### 将本地的文件复制到容器
`docker cp /宿主机目录/文件名 容器名:/容器目录/文件名`

## 容器互联
>   解决的是容器与容器之间的交互

`docker run -itd --link 被关联的容器名字:被关联的容器的别名`
## 细品docker技术
+ docker的容器,容器启动之后,会自动运行容器里面的服务;类似nginx, nginx启动之后,我们会得到一个运行nginx软件的虚拟机; nginx是运行在容器里面的,对外提供服务的是我们的服务器, 这里的服务器可以理解为我们的***宿主机***;

+  给用户提供的访问,是宿主机在提供,而不是容器再提供,那我们怎么把用户的请求,,请求到宿主机之后,自动分配给容器呢?  `这个就是端口映射的操作;`

+ 端口映射就是把宿主机的80端口和容器的80端口两者之间关联起来;用户的所有请求到了宿主机的80端口就会自动被转发到容器的80端口;这样一来,我们所有的http请求到了宿主机之后,就会被容器里面的nginx接收到进行处理;

+  docker里面的容器, 每一个容器都提供一种服务; 它不是一个容器里面提供所有的服务; 我们不会在一个服务里面, 把php, mysql, nginx都装进去, 为什么呢? `分开装的好处便于切换版本, 不需要动环境的东西,只需要装一个新版的容器, 切换一下容器就可以了;`
## 容器定时任务
> eg: 宿主机执行php容器定时任务

`1 * * * * docker exec 容器ID php php文件`

```
docker exec php容器ID php /var/www/html/api/artisan schedule:run >> /dev/null 2>&1
```
## 举例: nginx容器安装
### 容器创建
`docker run -itd --name=container_name 镜像id`
### 进入容器查看nginx配置,日志,根目录
`docker exec -it container_id /bin/bash`
```
容器中 nginx配置文件在/etc/nginx/ 目录下面;
容器中 nginx日志在/var/log/nginx/ 目录下面;
容器中 nginx根目录在/usr/share/nginx/html/ 目录下面

特别注意: 本地挂载到容器后, 会清空或者覆盖对应的容器目录,具体规则自己体会;
```
### 创建本地宿主机挂载目录
`mkdir -p /data/nginx/{conf,html,logs}`
### 拷贝容器中nginx所有配置文件到本地
`docker cp 容器名:/容器目录/文件名 /宿主机目录/文件名`
```
docker cp 45744:/etc/nginx /data/nginx/conf
很多人启动容器报错,就是因为没有这一步,挂载覆盖目录问题;

上面例子表示:拷贝容器中目录nginx放到宿主机/data/nginx/conf目录下面;

上面创建的容器只是为了查看对应配置的位置,查看后可以删除了;
```
### 创建容器,映射端口, 挂载配置文件目录和项目根目录
`docker run -itd --name=nginx -p 80:80 -v /data/nginx/html:/usr/share/nginx/html -v /data/nginx/conf/nginx:/etc/nginx -v /data/nginx/logs:/var/log/nginx 2622`
### 验证
+   在本地/data/nginx/html目录下写一个index.html文件,能访问就正常了;
+   如果docker ps发现容器未启动, 就要思考你的挂载和我的挂载的区别了;
+   如果不能访问,查看本地防火墙是否开通80端口;
## docker-compose 容器编排
>   lnmp环境安装
参考:<br>
1. https://gitee.com/zenglingchuan/docker-compose-environment
2. https://www.jianshu.com/p/d15c4e5239da
```
# docker-compose.yml文件的版本
version: "3"
# 管理的服务
services: 
  php:
    hostname: php #指定容器的主机名
    restart: always #当值为 always 时，容器总是重新启动
    container_name: php #为自定义的容器指定一个名称，而不是使用默认的名称
    image: registry.cn-chengdu.aliyuncs.com/php-version/php-redis-pdo_mysql:v-1 #已经构建好的php 7.4.8
    # build: 
    #   context: ./docker/php 
    #   dockerfile: Dockerfile 
    depends_on:
      - mysql
      - redis
    ports:
      - "9000:9000" 
    links: 
      - mysql:mysql #指定服务容器名称:别名;避免ip方式导致的容器重启动态改变的无法连接情况
      - redis:redis 
    volumes: #容器目录  ro 容器只读; rw容器对数据卷是可读可写; 默认rw
      - ${NGINX_HTML}:/var/www/html
      - ./docker/php/php-config:/usr/local/etc   
    working_dir: /var/www/html
  nginx:
    hostname: nginx
    restart: always
    container_name: nginx
    image: nginx:1.19.2
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - nginx_api
    links:
      - "nginx_api:nginx_api"
    volumes:
      - ./docker/nginx/nginx-html:/usr/share/nginx/html
      - ./docker/nginx/nginx-config:/etc/nginx
      - ./docker/nginx/nginx-log:/var/log/nginx
    working_dir: /usr/share/nginx/html
  nginx_api:
    hostname: nginx
    restart: always
    container_name: nginx_api
    image: nginx:1.19.2
    ports:
      - "8080:80"
    depends_on:
      - php      
    links:
      - "php:php"
    volumes:   
      - ${NGINX_HTML}:/usr/share/nginx/html
      - ./docker/nginx-api/nginx-config:/etc/nginx
      - ./docker/nginx-api/nginx-log:/var/log/nginx
    working_dir: /usr/share/nginx/html
  mysql:
    hostname: mysql
    restart: always
    container_name: mysql
    image: mysql:8.0.21   
    ports:
      - "${MYSQL_PORTS}:3306"
    volumes:   
      - ./docker/mysql/database:/var/lib/mysql  
      - ./docker/mysql/mysql-config/mysql.cnf:/etc/mysql/conf.d/mysql.cnf:ro 
      - ./docker/mysql/shell:/docker-entrypoint`-initdb.d
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}     
  redis:
    hostname: redis
    restart: always
    container_name: redis
    image: redis:alpine3.12
    command: redis-server /etc/redis/redis.conf #容器启动后默认执行命令
    ports:
      - "6379:6379"   
    volumes:   
      - ./docker/redis/data:/data 
      - ./docker/redis/redis-config:/etc/redis 
    environment:
      - TZ=Asia/Shanghai
```
## docker-compose 常用指令
### 启动
`docker-compose up -d`
### 重启
`docker-compose restart`
### 重启某一个容器nginx
`docker-compose restart nginx`
### 停止所有容器
`docker-compose stop`
### 删除所有容器
`docker-compose rm`
### 查看容器里面的日志
`docker-compose logs -f nginx`
### 验证容器内composer安装情况
`docker exec 容器id composer`
### 验证php容器内扩展安装情况
`docker exec 容器id php -m`
### 在宿主机中下执行项目composer install
`docker exec 容器id composer install`
## docker处理占用空间过大问题
+   https://blog.csdn.net/qq_28001193/article/details/79555177
