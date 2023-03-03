# Python行天下
## pip包管理工具
pip 是 Python 包管理工具，该工具提供了对Python 包的查找、下载、安装、卸载的功能。目前只要你正常安装python之后, 则是已经自带了该工具。
### pip最常用命令
+ 显示pip版本和路径

  ```python
  pip --version
  ```

+ 升级pip

  ```python
  # windows
  python -m pip install --upgrade pip
  # linux
  pip install --upgrade pip
  ```

+ pip安装某个包

  ```python
  pip install SomePackage              # 最新版本
  pip install SomePackage==1.0.4       # 指定版本
  pip install 'SomePackage>=1.0.4'     # 最小版本
  ```

  <font style="color:blue">eg:</font>  安装Django , 只需要执行

  ```python
  pip install Django==1.7
  ```

+ 升级包

  ```python
  pip install --upgrade SomePackage
  ```

  <font style="color:blue">注意:</font>升级指定的包，通过使用==, >=, <=, >, < 来指定一个版本号。

+ 卸载包

  ```python
  pip uninstall SomePackage
  ```

+ 搜索包

  ```python
  pip search SomePackage
  ```

+ 显示安装包信息

  ```python
  pip show 
  ```

+ 查看指定包的详细信息

  ```python
  pip show -f SomePackage
  ```

+ 列出已安装的包

  ```python
  pip list
  ```

+ 查看可升级的包

  ```python
  pip list -o
  ```

### pip源选择

很多时候，比如网络不给力，连接超时、防火墙阻挡等等各种原因，我们可能无法从Python官方的PyPi仓库进行pip安装，这时候可以选择国内的第三方源，推荐使用豆瓣源，速度不错。

+ 查看当前源

  ```python
  pip config list
  ```

+ 命令行修改源

  <font style="color:blue">临时使用某个源安装包:</font> 

  ```python
  pip install -i https://pypi.tuna.tsinghua.edu.cn/simple Django
  ```

  <font style="color:blue">永久配置源地址为某个源:</font>   比如修改源地址为豆瓣源

  ```python
  pip config set global.index-url https://pypi.douban.com/simple/
  ```

+ 常用源

  + 默认源

    ```python
    https://pypi.Python.org/simple/
    ```

  + 阿里云

    ```python
    http://mirrors.aliyun.com/pypi/simple/
    ```

  + 清华大学

    ```python
    https://pypi.tuna.tsinghua.edu.cn/simple/
    ```

  + 中国科技大学

    ```python
    https://pypi.mirrors.ustc.edu.cn/simple/
    ```

  + 豆瓣

    ```python
    https://pypi.douban.com/simple/
    ```

### python多版本情况

如果 Python2 和 Python3 同时有 pip，则使用方法如下：

+ Python2

  ```python
  python2 -m pip install XXX
  ```

+ python3

  ```python
  python3 -m pip install XXX
  ```

## 虚拟环境和Git管理

+ 就是用来为每一个项目创建一套“独立隔离”的Python运行环境的工具; 

+ 利用`PyCharm`工具直接创建项目的时候生成虚拟环境; 避免手工配置产生的问题!

+ venv配合pip快速建立开发环境

  + venv虚拟环境配合pip的freeze功能，可以一次性快捷的将整个环境下的第三方模块全部记录下来：

    ```python
    pip freeze > requirements.txt
    ```

  + 对应的，也可以用它一次性通过在别的机器上或虚拟环境里，将文件里列出的第三方库安装起来。只需要使用命令:

    ```python
    pip install -r requirements.txt
    ```

+ git管理: 提交模块库列表记录和代码记录, 然后批量下载安装模块

  + `.gitignore`

    ```gitignore
    .idea/
    */__pycache__/*
    __pycache__/
    venv/
    ```

  + 每次git前, 记录下第三方模块

    ```python
    pip freeze > requirements.txt
    ```

  + 安装记录下来的所有第三方模块

    ```python
    pip install -r requirements.txt
    ```

## 常用语法

###	zip压缩文件

```python
import os
import zipfile


def zip_dir(source_dir, output_filename):
    """
     压缩指定文件夹
     :param source_dir: 目标文件夹路径 eg: E:\\test
     :param output_filename:  压缩文件保存路径+XXXX.zip# 压缩包存放目录 eg:  order_100
     :return:
     """
    source_store = './source_store/orderZip/'
    if not os.path.exists(source_store):
        os.makedirs(source_store, mode=0o755)
    source_zip = zipfile.ZipFile(source_store + output_filename + '.zip', 'w', zipfile.ZIP_DEFLATED)
    for root, dirs, files in os.walk(source_dir):
        for file in files:
            # 第二个参数名表示的是文件的名字，这样做就可以保证压缩以后不会出现多层文件目录的情况。
            source_zip.write(os.path.join(root, file), './%s/%s' % (output_filename, file))
    source_zip.close()
```



### 递归创建文件夹

```python
source_store = './source_store/order_%s/'%100
if not os.path.exists(source_store):
    os.makedirs(source_store, mode=0o755)
```

### 断点打印

```python
import sys    
sys.exit() # 断点, 后面不执行
```

### 打印函数

打印函数, 把括号内的内容显示

```python
print(123123)
```

### 获取长度

Python `len()` 方法返回对象（字符、列表、元组、字典等）长度或项目个数。

<font style="color:blue">语法:</font>

```python
len( s )
+	参数: s -- 对象
+	返回: 对象长度
```

<font style="color:blue">demo:</font>

```python
str = 'a国6美6人'
list = [1, 2, 3, 4]
dict = {'name': 'runoob', 'likes': 123, 'url': 'www.runoob.com'}
tup2 = (1, 2, 3, 4, 5)
# 获取长度
print(len(str))  # 6
print(len(list))  # 4
print(len(dict))  # 3
print(len(tup2))  # 5
```

### 获取对象类型

`type() `函数如果你只有第一个参数则返回对象的类型

<font style="color:blue">语法:</font>

```python
type(object)

+ 返回对象类型
```

```python
demoStr = 'a国6美6人'
print(type(demoStr))  # <class 'str'>
print(type([1, 2, 3]))  # <class 'list'>
print(type((1, 2, 3)))  # <class 'tuple'>
print(type({'a': 123}))  # <class 'dict'>
```

### 对象和字符串互转

**json** 模块提供了一种很简单的方式来编码和解码JSON数据, 列表, 字典, 元组等python数据结构编码成json字符串用: <font style="color:blue"> json.dumps()</font>, json字符串解码还原为python数据结构: <font style="color:blue">json.loads() </font> 。

```python
import json

data = {'name': 'ACME', 'shares': 100, 'price': 542.23}
print(type(data)) # <class 'dict'>
# 将python对象data转换为json字符串
json_str = json.dumps(data)
print(type(json_str)) # <class 'str'>
print(json_str) # {"name": "ACME", "shares": 100, "price": 542.23}
origin_data = json.loads(json_str)
print(type(origin_data)) # <class 'dict'>
print(origin_data) # {'name': 'ACME', 'shares': 100, 'price': 542.23}
```

<font style="color:blue">如果你要处理的是文件而不是字符串，你可以使用 json.dump() 和 json.load() 来编码和解码JSON数据</font>

```python
import json

data = {'name': 'ACME', 'shares': 100, 'price': 542.23}
# Writing JSON data
with open('data.json', 'w') as f:
    # data字典转成字符串写入文件data.json
    json.dump(data, f)

# Reading data back
with open('data.json', 'r') as f:
    data = json.load(f)
    print(type(data))  # <class 'dict'>
    print(data)  # {'name': 'ACME', 'shares': 100, 'price': 542.23}
```

### 条件控制

Python 条件语句是通过一条或多条语句的执行结果（True 或者 False）来决定执行的代码块。

<font style="color:blue">if语句的关键字为：**if – elif – else**</font>

```python
a = 1
if a == 3:
    print('a等于3')
elif a > 3:
    print('a大于3')
else:
    print('a小于3')
```

### while循环

Python 中的循环语句有 for 和 while

```python
n = 100
sum = 0
counter = 1;
while counter <= n:
    sum += counter
    counter += 1
print("1 到 %d 之和为: %d" % (n,sum)) # 1 到 100 之和为: 5050
```

<font style="color:blue">如果 while 后面的条件语句为 false 时，则执行 else 的语句块:</font>

```python
count = 0
while count < 5:
   print (count, " 小于 5")
   count = count + 1
else:
   print (count, " 大于或等于 5")
```

### for循环

```python
data = [1,2,3,4]
for i in data:
    print(i)
else:
    # 正常结束for循环, 执行, for循环中出现了break跳出了循环, else不执行
    print('最后一次')
```

### break和continue

+ **break** 可以跳出 for 和 while 的循环体; 如果你从 for 或 while 循环中终止，任何对应的循环 else 块将不执
+ **continue** 语句被用来告诉 Python 跳过当前循环块中的剩余语句，然后继续进行下一轮循环

### pass语句

Python pass是空语句，是为了保持程序结构的完整性。

pass 不做任何事情，一般用做占位语句，如下实例

```python
data = [1,2,3,4]
for i in data:
    pass # 空语句, 保持程序结构的完整性。pass 不做任何事情，一般用做占位语句
else:
    print('最后一次')
```

##	时间和日期

### 获取当前格式化时间

```python
import datetime
import time

# 获取当前格式化时间
now_time = datetime.datetime.now()  # 2021-11-25 10:47:31.140344
# 转换为指定的格式
otherStyleTime = now_time.strftime("%Y-%m-%d %H:%M:%S")
print('当前时间格式化为: ', otherStyleTime)  # 当前时间格式化为:  2021-11-25 10:47:31
```

### 指定时间戳格式化

```python
import datetime
import time
# 指令时间戳格式化
timeStamp = 1557502800
# 格式化本地时间
# time.struct_time(tm_year=2019, tm_mon=5, tm_mday=10, tm_hour=23,
# ........tm_min=40, tm_sec=0, tm_wday=4, tm_yday=130, tm_isdst=0)
timeArray = time.localtime(timeStamp)
otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
print('指定时间格式化为:', otherStyleTime)  # 指定时间格式化为: 2019-05-10 23:40:00
```

### 指定格式化时间转时间戳

```python
import time

new_time = '2019-04-27 07:01:46'
# 把格式化好的时间转换成元祖
time_tuple  = time.strptime(new_time, '%Y-%m-%d %H:%M:%S')
# 把时间元祖转换成时间戳
result = time.mktime(time_tuple)
print(int(result))
```

### 获取当前时间戳

```python
# 获取当前时间戳
now = time.time()  # 返回float数据 1637808088.3227932
#  获取当前时间戳---秒级
print('当前秒级时间戳为: ', int(now))  # 当前秒级时间戳为:  1637808451
#  获取当前时间戳---毫秒级
print('当前秒级时间戳为: ', int(round(now * 1000)))  # 当前秒级时间戳为:  1637808451140
```

## 字符串

### 字符串拼接

+ %s的方式, 字符串中使用%s占位，在字符串后使用%替换值来替换

  ```python
  str = '开心的%s唱%s' % ('小明', '快乐的小鸟')
  print(str)  # 开心的小明唱快乐的小鸟
  ```

+ format()方式, 字符串中使用{}占位，在字符串后使用format替换值来替换

  ```python
  str = '开心的{}唱{}'.format('小明', 1234567)
  print(str)  # 开心的小明唱1234567
  ```

  

###	字符串截取

单字符在 Python 中也是作为一个字符串使; 

Python 访问子字符串，可以使用方括号 **[]** 来截取字符串，字符串的截取的语法格式如下:

```python
变量[头下标:尾下标] 
# 索引值以 0 为开始值，-1 为从末尾的开始位置; 截取包含头下标元素, 不包含尾下标元素
```

<font style="color:blue">demo:</font>

```python
demoStr = 'a国6美6人'
print(demoStr[0:3]) # a国6
print(demoStr[-3:]) # 美6人
print(demoStr[-3:-1]) # 美6
```

### 字符串第一次出现的位置

`find() `方法检测字符串中是否包含子字符串 str ，如果指定 beg（开始） 和 end（结束） 范围，则检查是否包含在指定范围内，如果指定范围内如果包含指定索引值，返回的是索引值在字符串中的起始位置。如果不包含索引值，返回-1。 <font style="color:blue">返回`-1`则表示没有查找到这个字符串</font>

<font style="color:blue">语法:</font>

```python
str.find(str, beg=0, end=len(string))

参数:
    1. str -- 指定检索的字符串
    2. beg -- 开始索引，默认为0
    3. end -- 结束索引，默认为字符串的长度
返回值:
    如果包含子字符串返回开始的索引值，否则返回-1。
```

<font style="color:blue">demo:</font>

```python
demoStr = 'a国6美6人'
print(demoStr.find('美6'))  # 3
print(demoStr[demoStr.find('美6'):])  # 美6人
```

### 字符串最后一次出现的位置

`rfind()` 返回字符串最后一次出现的位置，如果没有匹配项则返回-1。 <font style="color:blue">返回`-1`则表示没有查找到这个字符串</font>

```python
str.rfind(str, beg=0 end=len(string))

参数:
    1. str -- 指定检索的字符串
    2. beg -- 开始索引，默认为0
    3. end -- 结束索引，默认为字符串的长度
返回值:
    如果包含子字符串返回开始的索引值，否则返回-1。
```

<font style="color:blue">用法同find; 不同之处: find()从左往右查, rfind()是从右往左查的。</font>

## Django安装和运行

### 安装Diango

[安装参考](http://www.byhy.net/tut/webdev/django/02/)

Django 框架是用Python语言开发的, 所以可以直接pip安装

```python
pip install django
```

### 查看安装的Django版本

```python
python -m django --version
```

<font style="color:blue">demo:</font>

```python
PS D:\wwwroot\python> python -m django --version
3.2.9
```

### 创建Django项目

+ <font style="color:blue">创建一个空的文件夹作为项目目录, 这里新建目录`D:\wwwroot\python\studyDjango`</font>

  ```python
  mkdir studyDjango && cd studyDjango
  ```

  

+ 进入项目目录, 执行命名, 创建`manage.py` 和 `项目配置目录` 名为 `config`

  ```python
  django-admin startproject config .
  ```

  ```python
  # window下创建
  PS D:\wwwroot\python> cd .\studyDjango\
  PS D:\wwwroot\python\studyDjango> django-admin startproject config .
  PS D:\wwwroot\python\studyDjango>
  ```

### 项目目录
+ `studyDjango` 项目目录,  项目文件都放在里面
+ `manage.py` 是一个工具脚本，用作项目管理的。以后我们会使用它执行管理操作。
+ 里面的 `config/` 目录是python包。 里面包含项目的重要配置文件。这个目录名字不能随便改，因为manage.py 要用到它。
+ `config/settings.py` 是 Django 项目的配置文件. 包含了非常重要的配置项，以后我们可能需要修改里面的配置。
+ `config/urls.py` 里面存放了 一张表， 声明了前端发过来的各种http请求，分别由哪些函数处理.。
+ `config/wsgi.py` 提供给`wsgi web server`调用 的接口文件，里面的变量application对应对象实现了 wsgi入口，供`wsgi web server`调用

### 运行Django Web服务

<font style="color:blue">项目根目录执行:</font>

```python
python manage.py runserver 0.0.0.0:80
```

+ `0.0.0.0:80` 是指定 web服务绑定的 IP 地址和端口

+ `0.0.0.0` 表示绑定本机所有的IP地址， 就是可以通过任何一个本机的IP (包括 环回地址 `127.0.0.1 `) 都可以访问我们的服务
+ `80` 表示是服务启动在80端口上
+ 此时, 请打开浏览器，地址栏输入`127.0.0.1` 就可以正常访问了!

### ip访问报错

```python
DisallowedHost at /
Invalid HTTP_HOST header: '192.168.0.110'. You may need to add '192.168.0.110' to ALLOWED_HOSTS.
```

<font style="color:blue">处理:</font>

`config/settings.py`中添加允许访问的域名, 默认是`127.0.0.1` 不用添加, 如果添加了其他的ip, `127.0.0.1`也需要添加

```python
ALLOWED_HOSTS = ['127.0.0.1', '192.168.0.110','localhost']
```

### git上拉Django项目快速运行

1. 项目拉到本地文件夹
2. pycharm 新建纯python项目, 位置选择为项目拉到本地的文件夹
3. 执行`pip install -r requirements.txt` 安装所有依赖
4. 运行`python manage.py runserver 0.0.0.0:80`

## Django践行

[Django学习参考博客](https://www.liujiangblog.com/)

### 创建项目app(模块)

```python
python manage.py startapp api
```

+ api是项目app名称
+ Django 中的一个app 就是项目里面的一个应用的意思; 类似于php的一个模块, 比如管理后台模块, 里面包含了常用的文件
+ app本质是一个Python包, 里面包含了应用相关的代码文件

### 返回页面内容给浏览器

我们刚才创建的api应用里面有个`views.py`文件, 这个文件里面通常是写处理http请求的代码的;

比如, 我们 设计 凡是浏览器访问的http请求的url地址是`/tests/`, 就由`view.py`里面的函数`tests`来处理, 返回一段字符串给浏览器。

打开`api/view.py`文件, 在里面加入如下内容

```python
from django.http import HttpResponse


def tests(request):
    return HttpResponse("我是一条http测试记录")
```

<font style="color:blue">注意:</font>

+ 这里面最终的返回结果是 `HttpResponse` 对象的参数字符串 ，也就是这句话 `我是一条http测试记录`

+ `tests`的参数 `request` 是Django中的 `HttpRequest` 对象，包含了HTTP请求中的信息。

  后端程序处理请求，常常要根据**请求中的数据**进行相应的处理：

  比如请求添加一个用户，那么HTTP请求消息中就会携带要添加用户的信息（姓名、登录账号等）。

  我们写后端的代码，这些信息就在 `HttpRequest`对象中获取。

  所以这个参数非常重要

`HttpRequest` 对象的属性和用法，具体可以[参考官方文档这里](https://docs.djangoproject.com/zh-hans/3.1/ref/request-response/)



光是定义了这样一个函数不行的，我们需要 **告诉 Django** ：

当前端发送过来的HTTP请求 url地址 是 `/tests/` , 就由 views.py 里面的函数 `tests` 来处理

怎么告诉Django呢？

这就是 Django中的 url路由设置。

### url路由

`config/urls.py`文件, 是url路由设置的入口文件, 打开这个文件, 在`urlpatterns`列表变量中添加一个路由信息, 结果如下:

```python
from django.urls import path
# 别忘了导入 tests 函数
import api.views
from api.views import tests

urlpatterns = [
    path('admin/', admin.site.urls),
    # 添加如下的路由记录
    path('tests/', tests)
]
```

`urlpatterns` 列表 就是 Django 的 url 路由的入口。

里面是一条条的路由记录，我们添加的

```python
path('tests/', tests)
```

就是告诉 当前端过来的请求 url地址 是 `/tests/` , 就由 views.py 里面的函数 `tests` 来处理。

`路由` 就是指 ： 根据 HTTP请求的url路径， 设置 由哪个 函数来处理这个请求。

通常我们项目代码的修改， Django的测试服务可以自动检测到，并且重新加载，不需要我们重启 Django Web 服务。

如果大家想重新启动 Django web 服务， 大家可以在启动web服务的命令行窗口，按ctrl + break（也就是Pause按钮）先停止服务。 然后再次运行启动命令。

我们这时, 浏览器输入http://127.0.0.1:1234/tests/, 回车后;  浏览器的请求经过 Django路由后, 选择执行我们定义的函数 `tests`, 该函数 返回的字符串， 被作为http响应的消息体中的内容返回给 浏览器了。

所以浏览器最终显示的就是 我们 `tests` 函数返回的字符串。

<font style="color:blue">注意:</font>

1. 只要修改了路由表配置，添加了我们自己的路由记录，再去浏览器访问 首页，这里就是 `http://127.0.0.1` ，前面曾经出现的小火箭欢迎页就不见了！ 会出现一个 404 Not Found 的报错页面。
2. 这是正常的，小火箭欢迎页面 是Django在调试模式下，发现路由记录没有添加的时候，缺省作为首页的。 真正的产品是不会使用这个首页的。一旦路由记录发生变动， 就会消失。

### 路由子表

url 路由表就是可以像上面这样，一个请求对应一个处理函数。

但是有的时候，我们的项目比较大的时候， 请求的url 会特别多。这时，我们通常可以将不同的路由记录 按照功能 分拆到不同的 **url路由子表** 文件中。



比如，这里我们可以把 访问 的 url 凡是 以 `api` 开头的全部都 由 `api`目录下面的 子路由文件 `urls.py` 处理。

首先我们需要在 sales 目录下面创建一个新的文件 `api\urls.py` 。

然后在这个 `api\urls.py` 文件中输入如下内容

```python
from django.urls import path
from . import views

urlpatterns = [
    path('tests/', views.tests),
]
```

然后，我们再修改主url路由文件 `config/urls.py` , 如下

```python
from django.contrib import admin
# 导入一个include函数
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # 凡是 url 以 api/  开头的，
    # 都根据 api.urls 里面的 子路由表进行路由
    path('api/', include('api.urls')),
]
```

当一个http请求过来时， Django检查 url，比如这里是`api/tests/`，

先到主url路由文件 `config/urls.py`中查看 是否有匹配的路由项。

如果有匹配 ( 这里匹配了 `api/` )， 并且匹配的对象 不是 函数， 而是 一个子路由设置 , 比如这里是 `include('api.urls')`

就会去子路由文件中查看， 这里就是 api.urls 对应的文件 `api\urls.py` 。

注意这时，会从请求url中去掉 前面主路由文件 已经匹配上的部分（这里是 `api/` ）, 将剩余的部分 （这里是 `tests/` ）去子路由文件中查看是否有匹配的路由项。

这里就匹配了 `tests/` ，匹配的对象，这里是 `views.tests` ，它是一个处理函数，就调用该函数处理 这个http请求， 将该函数的返回对象 构建 HTTP响应消息，返回给客户端。

### Django链接MYSQL

Django官方已经不建议使用pymysql库了，而是改用mysqlclient，直接pip安装即可。

```python
pip install mysqlclient
```

<font style="color:blue">Django的基础配置文件:</font> `config/settings.py`

默认情况下, Django连接的是自带的`sqlite`数据库

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

<font style="color:blue">连接mysql分两步:</font> 

+ 第一步: Mysql提前创建好数据库

+ 第二步: 修改Django的`settings.py`文件

  ```python
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.mysql',  # 数据库类型
          'NAME': 'Django',  # 数据库名称
          'USER': 'root',  # 数据库账号
          'PASSWORD': 'chuan123456@',  # 数据库密码
          'HOST': 'mysql',  # mysql的地址
          'PORT': '3306',  # mysql的端口号
      }
  }
  ```

  

  

