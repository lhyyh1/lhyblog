# nginx
::: tip
整理一些常用的nginx技巧, 以便后面查阅, 好记性不如烂笔头!
:::
##  命令连接符
::: tip 提示
一般情况下, 我们常用`&&`, 用来保证每条命令都顺利执行
:::
### `&&`
语法格式:
```shell
command1 && command2
```
::: warning 注意
`&&`左边的command1执行成功(返回0表示成功)后，`&&`右边的command2才能被执行
:::
### `;`
每个命令之间用`;`隔开, 不会影响其它命令的执行, 换句话说, 各个命令都会执行, 但不保证每个命令都执行
### `||`
每个命令之间用`||`隔开, `||`是或的意思, 只有前面的命名执行失败后才去执行下一条命名, 指到执行成功一条命令为止
##  shell脚本
::: tip 注意
1. date和后面的`+`之间有空格
2. 示例是 Shell 脚本一次性执行多条语句，并可以统计时间
   :::
```shell
#! /bin/bash
startTime=`date +%Y%m%d-%H:%M` # 脚本执行的开始时间
startTime_s=`date +%s` # 秒
cd /wwwroot &&  # 切换到/wwwroot目录
mkdir test && # 创建test目录
cd test && # 切换到test目录
pwd  # 显示当前工作目录
endTime=`date +%Y%m%d-%H:%M`
endTime_s=`date +%s`
sumTime=$[ $endTime_s - $startTime_s ] # $[] ：用于整数运算
# echo shell中输出变量
echo "$startTime ---->  $endTime"  "Totl: $sumTime seconds"
```
##  ./test.sh和source test.sh区别
::: tip 区别
1. `./test.sh` 重新建立一个子shell，在子shell中执行脚本里面的语句，该子shell继承父shell的环境变量，但子shell新建的、改变的变量不会被带回父shell，除非使用

2. source test.sh 这个命令其实只是简单地读取脚本里面的语句依次在当前shell里面执行，没有建立新的子shell。那么脚本里面所有新建、改变变量的语句都会保存在当前shell里
   :::
## 文件权限问题
```text
 ypy@ubuntu:~$ ls -l
754    drwxr-xr--  2 ypy  ypy     4096 Nov 30 18:33 Desktop/
754    drwxr-xr--  2 ypy  ypy     4096 Nov 30 18:33 Documents/
754    drwxr-xr--  2 ypy  ypy     4096 Dec  1 16:01 Downloads/
774    -rwxrwxr--  2 ypy  ypy     4096 Feb  8 19:59 exercise
664    -rw-rw-r--  2 ypy  ypy     4096 Dec  1 16:02 file.sh
       0123456789  ~~~ 左边的数字0到9是最`drwxr-xr--`的标号, 方便注释描述
```
1. r=4, w=2, x=1, 这个数值是linux定义的; 7 = 4 + 2 + 1
2. r=4表示读权限, w=2表示写权限, x=1表示可执行权限
3. 标号0的位置, d 代表的是目录文件, - 代表普通文件
4. 标号123的位置表示用户,用u表示; 标号456的位置表示用户组, 用g表示; 标号789的位置表示其他用户, 用o表示;
5. 修改文件访问权限的方法--mode法
```text
权限     	    数值
rwx rw- r–	    764
rw- r–  r–	    644
rw- rw- r–	    664

u 代表用户.
g 代表用户组.
o 代表其他.
a 代表所有

chmod u+x file 只授予这个文件的所属者执行的权限 
chmod ugo+r file 所有人皆可读取

修改文件访问权限的方法--数字法
chmod 600 file 只授予这个文件的所属者读写权限 
chmod -R 600 file 授予这个文件夹及其里面的所有文件的所属者读写权限
```
## nginx配置反向代理
::: warning 提示
Nginx作为近年来较火的反向代理服务器，安装在目的主机端，主要用于转发客户机请求，后台有多个http服务器提供服务，nginx的功能就是把请求转发给后面的服务器，决定哪台目标主机来处理当前请求。
:::
> 需求:<br>
> vue项目和后端项目之间跨域问题<br>
> API请求地址为:  http://127.0.0.1:8000/upload/image<br>
> 前端访问地址为: http://127.0.0.1:8001/api/upload/image<br>
> 目前前端访问多了一个`api`, 且端口号不一样; 我们要利用`rewrite`指令对地址进行重写, 移除`api`

+ 代理配置
```sh
location /api/upload {
    proxy_pass http://127.0.0.1:8000;
    proxy_connect_timeout 600;
    proxy_read_timeout 600;
    rewrite "^/api/(.*)$" /$1 break; 
}
```
+ 配置说明
    + `proxy_pass` 反向代理, 这次我们代理到`http://127.0.0.1:8000`这个地址
    + `<font color='red'>`rewrite "^/api/(.*)$ /$1 break;`</font>` 路径重写
    +  `rewrite`语法: `rewrite`(关键字) + `<regex>`(正则) + `<replacement>`(替代内容) + `[flag]`;(flag标记)
    + `proxy_connect_timeout`后端服务器连接的超时时间_发起握手等候响应超时时间
    + `proxy_read_timeout` 该指令设置与代理服务器的读超时时间
    + `rewrite "^/api/(.*)$" /$1 break;`<br>配置说明:
        + `rewrite`为固定关键字，表示开始进行rewrite匹配规则
        + `^/api/(.*)$` 这是一个正则表达式，匹配含有`/api/`的域名和后面的路径地址
        + `/$1` 是取自 `^/api/(.*)$`部分()里的内容, 匹配成功后跳转到的URL
        + `break` 本条规则匹配完成即终止，不再匹配后面的任何规则

##  Vue打包部署后刷新404问题
::: tip
处理Vue部署history模式刷新404问题
:::

+ 原因分析<br>
  浏览器地址栏  `http://localhost:8080/#/home/news`  带#号路径为hash模式, 不带#号的为history模式
  ::: warning
  hash工作模式中,  url路径`#`及其之后的路径字符串,这里就是`#/home/news`是hash值,  <font style="color:red">**hash值**</font>在http请求中, 不会带给服务器,  所以部署上线不会出现404问题; 然后history工作模式中, 所有路径在http中都会带给服务器, 服务器区分不开前端路由和后端路由, 服务器识别不了前端路由的时候, 刷新就会报404问题;
  :::

+ 解决思路

::: warning
解决问题的核心就是通过配置文件<font style="color:red">**区分开前端路由和后端路由**</font>; 找不到后端路由, 通过重定向, 访问`index.html`
:::

+ nginx解决方案

```sh
location / {
    root   /root; // 项目根目录
    try_files $uri $uri/ @router;
}

location @router {
  rewrite ^.*$ /index.html last;
  # 匹配所有  /index.html last;
}
```

+ 配置分析
  示例说明: `/root 项目根目录`<br>

    + 理解: `try_files $uri $uri/ @aab`
  > @ 表示配置文件中预定义标记点
    + `try_files` 尝试读取文件, 它尝试读取的事静态文件
    + 第一个参数`$url` , 它是nginx的一个变量, 存放着用户访问的地址
      ```sh
      比如: 
      1. http://www.xxx.com/index.html,  那么$uri就是 /index
      2. http://localhost:8080/home/news, 那么$uri就是 /home/news
      3. http://localhost/example, 那么$uri就是 /example
      ```
    + 第二个参数`$uri/` 代表访问的是一个目录
      ```sh
      比如：
      1. http://www.xxx.com/hello/test/ ，那么$uri/就是 /hello/test/
      2. http://localhost/example, 那么$url就是 /example/
      ```
    + 配置理解
      ::: warning

  当用户尝试请求 ` http://localhost/example`时<br><br>
  `try_files` 尝试去网站根目录 ( `/root` ) 读取用户这个文件,  如果存在名为 `/root/example` (这个就是$uri文件, 第一个变量) 的文件, 就直接把这个文件的内容返回给用户;   如果不存在, 继续读取第二个变量`$uri/`, 增加了一个`/`, 也就是看 `/root/example`/ 这个目录是否存在, 如果存在, 这个目录直接返回给用户, 如果不存在, 直接跳转到第三个参数`@aab`, 这里就是通提供给预定义标记点, 跳转到下面的`@router`, 标记点`@router`和下面的`@router`保持一致
  ```sh
    location @router {
      rewrite ^.*$ /index.html last;  
    #     匹配所有 /index.html last;
    }
    # last标记 重写 url 后，会再从 server 走一遍匹配流程
  ```
  :::
    + `rewrite ^.*$ /index.html last;`:   匹配所有  /index.html last;  所有的`$url`替换成真实的url(/index.html),后, (last)再从server走一遍匹配流程, 就走到了http://localhost/index.html; 访问到了文件
    + 扩展: laravel伪静态<br>
      如果都找不到, 就会 fall back 到 try_files 的最后一个选项 /index.php，发起一个内部 “子请求”，也就是相当于 nginx 发起一个 HTTP 请求到 http://localhost/index.php
      ```sh
        try_files $uri $uri/ /index.php?$query_string;   
      ```
##  后台启动任务
+ 背景<br>
  当我们在终端启动服务或者训练模型时，启动命令往往会阻塞自己，即无法在终端继续输入，同时为了保证终端关闭不影响进程中断，需要在后台启动进程 ;
+ 命令
    + 后台启动常用的命令:  `nohup command 2>&1 & 或者 nohup command 2>>&1 &`
    + 示例： `nohup python my.py >>/home/xxx/my.log 2>&1 &`
    + 在bash shell中：
        + `0`：代表标准输入，即键盘输入的
        + `1`：代表标准输出，即输出到显示屏的内容
        + `2`：代表标准错误，即报错内容
        + `>>`: 代表追加, `>`会让日志文件的内容清空
        + `nohup`: 表示不挂断地执行命令，即便退出当前终端。同时会将屏幕的标准输出追加到默认文件`nohup.out`文件
        + `&`：表示在后台执行命令
        + `2>&1`: 不能用空格，代表将错误内容重定向到标准输出中。
+ 命令解析<br>
  ::: warning
  <font style="color:red">**假如有如下命令**</font>:<br>
  `nohup /usr/bin/php /www/wwwroot/school/artisan swoole >> /home/my.log 2>&1 &`
+ `nohup /usr/bin/php /www/wwwroot/school/artisan swoole` 表示php不间断低执行swoole脚本
+ `/www/wwwroot/school/artisan swoole >> /home/my.log`这部分等同于 `/www/wwwroot/school/artisan swoole 1>> /home/my.log`，即省略了标准输出1;
+ 上面命令可以拆解为:
  ```sh
  nohup /usr/bin/php /www/wwwroot/school/artisan swoole 1>> /home/my.log &
  nohup /usr/bin/php /www/wwwroot/school/artisan swoole 2>> /home/my.log &
  
  2>&1中的 & 是为了区分 1 是文件名 还是标准输出1 ，如果省略掉则变成了输出到文件1中
  ```
  :::

+ nohup不输出到文件
    + nohup启动服务时，会默认生成 nohup.out 文件，这样可能会占据相当一部分的磁盘空间，所以便会有一种需求 - 不让nohup 产生日志。
    + 其实是没办法不让 nohup 产生日志的，但是可以利用 linux 的 黑洞 /dev/null ，重定向到它的信息会消失，如果我们不需要保存程序运行时的所有信息时，就可以将信息重定向到 /dev/null 。
    + <font style="color:red">**示例如下**</font>:
      ```sh
      nohup /usr/bin/php /www/wwwroot/school/artisan swoole > /dev/null 2>&1 &
      ```
## 反向代理之后获取真实ip(php版本)
::: tip
使用VUE前后端分离开发, 后端使用Laravel框架, 想要获取到用户的真实IP地址;

因为分离开发不同源跨域问题 所以只能进行前端Nginx反向代理; 反向代理之后, 发现返回的只是代理服务器的IP地址。
:::
<font color="blue"><strong>在前端Nginx代理配置写入</strong></font>
```sh
# 在前端Nginx代理配置写入
location /web {
    proxy_pass http://127.0.0.1:9099;
    proxy_connect_timeout 600;
    proxy_read_timeout 600;
    rewrite "^/web/(.*)$" /$1 break; 
}
# 新增配置下面两行
proxy_set_header X-Forwarded-For $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```
<font color="blue"><strong>插入之后进行Nginx重启发现warning错误</strong></font>

::: danger
Starting nginx: nginx: [warn] could not build optimal proxy_headers_hash, you should increase either proxy_headers_hash_max_size: 512 or proxy_headers_hash_bucket_size: 64;

ignoring proxy_headers_hash_bucket_size
:::

<font color="blue"><strong>在nginx.conf配置文件里面的http代码块里面加入下面配置代码解决</strong></font>
```sh
http{
...
# 新加入配置代码
proxy_headers_hash_max_size 51200;
proxy_headers_hash_bucket_size 6400;
```
<font color="blue"><strong>真实的ip地址就是:  `$_SERVER['HTTP_X_FORWARDED_FOR']`</strong></font> 。

## 常用linux命令
### ls命令
::: tip
用于显示指定工作目录下之内容（列出目前工作目录所含之文件及子目录)。
:::

<font color="blue"><strong>语法: </strong></font>
```sh
ls [-alrtAFR] [name...]
```
+ -a 显示所有文件及目录 (. 开头的隐藏文件也会列出)
+ -l 除文件名称外，亦将文件型态、权限、拥有者、文件大小等资讯详细列出
+ -r 将文件以相反次序显示(原定依英文字母次序)
+ -t 将文件依建立时间之先后次序列出
+ -A 同 -a ，但不列出 "." (目前目录) 及 ".." (父目录)
+ -F 在列出的文件名称后加一符号；例如可执行档则加 "*", 目录则加 "/"
+ -R 若目录下有文件，则以下之文件亦皆依序列出

<font color="blue"><strong>按照时间升序显示文件信息:</strong></font>
```sh
ls -lrt --full-time
```

<font color="blue"><strong>按照时间降序显示文件信息(最新修改的排在前面):</strong></font>
```sh
ls -lt --full-time
```
### top命令
```sh
root@iZjalzfbm2offnZ:/wwwroot# top
top - 10:33:18 up 184 days, 17:19,  1 user,  load average: 0.11, 0.09, 0.23
Tasks: 506 total,   1 running, 505 sleeping,   0 stopped,   0 zombie
%Cpu(s):  1.0 us,  1.0 sy,  0.0 ni, 98.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   3936.1 total,    400.0 free,   1066.8 used,   2469.4 buff/cache
MiB Swap:   4096.0 total,    658.5 free,   3437.5 used.   2590.7 avail Mem 
```

<font color="red"><strong>第一行:</strong></font>
当前时间，系统运行时间，登录用户数量，平均负载（分别在5，10，15分钟内)
```sh
top - 10:33:18 up 184 days, 17:19,  1 user,  load average: 0.11, 0.09, 0.23
```
+ 当前时间是10:33:18
+ 系统运行了184天,17小时19分
+ 当前登录用户的数量: 1个用户
+ 相应最近5、10和15分钟内的平均负载为 0.11, 0.09, 0.23

<font color="red"><strong>第二行:</strong></font>
显示了系统的进程总数，后面是相应的状态下的进程
```sh
Tasks: 506 total,   1 running, 505 sleeping,   0 stopped,   0 zombie
```
+ 一共506个进程
+ 1个是running状态进程
+ 505个sleeping状态进程
+ 0个stopped状态进程
+ 0个zombie状态进程, 也叫僵尸进程, 就是，这个进程其实已经结束了，它仅仅在进程列表中保留一个位置，记载该进程的状态信息等，僵尸进程不再占有内存空间，没有可执行程序，也不能被调用。这个进程中存储着进程的各种信息，占用cpu啊，运行时间之类的。这个进程会被其父进程收集它的信息。

<font color="red"><strong>第三行:</strong></font>
显示cpu的各种信息
```sh
%Cpu(s):  1.0 us,  1.0 sy,  0.0 ni, 98.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
```
+ us：用户空间占cpu百分比
+ sy：内核空间占cpu百分比
+ ni：用户进程空间内改变过优先级的进程占用cpu百分比
+ id：空闲cpu百分比
+ wa：等待输入输出的cpu时间百分比
+ hi：硬中断（处理硬件中断的cpu时间）
+ si：软中断（处理软件中断的cpu时间）

<font color="red"><strong>第四,五行:</strong></font>
内存使用, 第四行是物理内存使用, 第五行是虚拟内存使用(交换空间)。
```sh
MiB Mem :   3936.1 total,    400.0 free,   1066.8 used,   2469.4 buff/cache
MiB Swap:   4096.0 total,    658.5 free,   3437.5 used.   2590.7 avail Mem 
```
物理内存:  全部可用内存(total);   空闲内存(free);   已使用内存(used);   缓存内存(buff/cache)  
虚拟内存:  全部可用内存(total);   空闲内存(free);   已使用内存(used);   缓冲交换空间(avail Mem)

<font color="red"><strong>字段/列</strong></font>
```sh
 PID   USER     PR    NI    VIRT    RES    SHR     S   %CPU   %MEM      TIME+           COMMAND                                                                                                                                                                 
1131801 root    10   -10   157164   59152  10332   S   2.3    1.5     908:26.95          AliYunDun                                                                                                                                                               
 743108 root    20   0     1278484  46284  8984    S   0.7    1.1     991:45.21          python3                                                                                                                                                                 
2712198 root    20   0     658016   58448  9996    S   0.7    1.5     554:13.99          python3 
```
+ PID   进程ID，进程的唯一标识符
+ USER  进程所有者的实际用户名
+ PR    进程的调度优先级。这个字段的一些值是’rt’。这意味这这些进程运行在实时态。
+ NI    进程的nice值（优先级）。越小的值意味着越高的优先级。
+ VIRT  进程使用的虚拟内存。
+ RES   驻留内存大小。驻留内存是任务使用的非交换物理内存大小。
+ SHR   SHR是进程使用的共享内存。
+ S     这个是进程的状态。它有以下不同的值:
    + D – 不可中断的睡眠态。
    + R – 运行态
    + S – 睡眠态
    + T – 被跟踪或已停止
    + Z – 僵尸态
+ %CPU 自从上一次更新时到现在任务所使用的CPU时间百分比。
+ %MEM  进程使用的可用物理内存百分比。
+ TIME+ 任务启动后到现在所使用的全部CPU时间，精确到百分之一秒。
+ COMMAND 运行进程所使用的命令。

## nginx代理之后, 访问不到静态资源

nginx配置修改：配置静态文件的映射

```conf
location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
{
    # 图片代理地址
    proxy_pass http://localhost:1111;  
}
location ~ .*\.(js|css)?$
{
    # js/css
	proxy_pass http://www.xxx.com:8978;
}
	
```



