# [Gin](https://www.liwenzhou.com/posts/Go/Gin_framework/)

## 1. Gin框架入门

<font color="blue"><b>Gin框架介绍</b></font>

1. `Gin` 是一个用 `Go` 语言编写的 `web` 框架
2. 拥有更好性能的API框架
3. 中文文档齐全
4. 是目前 `Go` 里面使用最广泛的框架之一

<font color="blue"><b>Gin框架安装</b></font>

```shell
go get -u github.com/gin-gonic/gin
```

<font color="blue"><b>第一个Gin示例:</b></font>

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// 1. 创建一个默认的路由引擎
	r := gin.Default()
	/*
		   2. 绑定路由规则，执行的函数
			 2.1 GET：请求方式；/hello：请求的路径
			 2.2 当客户端以GET方法请求/hello路径时，会执行后面的匿名函数
			 2.3 gin.Context，封装了request和response
	*/

	r.GET("/hello", func(c *gin.Context) {
		// c.JSON：返回JSON格式的数据
		c.JSON(http.StatusOK, gin.H{
			"message": "你好, 伟大的程序员!!",
		})
	})
	/*
			3. 监听端口，默认在8080
		  3.1 启动HTTP服务，默认在0.0.0.0:8080启动服务
	*/
	r.Run(":8089")
}
```

<font color="color"><b>将上面的代码保存并编译执行，然后使用浏览器打开http://localhost:8089/hello就能看到一串JSON字符串。</b></font>
##  2.  获取参数
### 2.1 获取query参数
::: tip 提示
`query`指的是`URL ?` 后面携带的参数, 例如`user/info?username=张三&password=123`。
:::

<font color="blue"><b>当使用DefaultQuery时，如果没有获取到浏览器输入的username，则返回设置defaultValue</b></font>

```shell
username := c.DefaultQuery("username","张三")
```

<font color="blue"><b>当使用Query时，如果没有获取到浏览器输入的password，则默认返回""空串</b></font>

```shell
password := c.Query("password")
```

<font color="color"><b>完整示例</b></font>

浏览器输入为:
```text
http://localhost:8089/hello?name=小红&age=18
```
后端处理逻辑如下：
```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	// 获取querystring参数
	r.GET("/hello", func(c *gin.Context) {
		//1. 如果没有获取到浏览器输入的name，则返回设置defaultValue给name
		name := c.DefaultQuery("name", "小燕子")
		//2. 如果没有获取到浏览器输入的age，则默认返回""空串
		age := c.Query("age")
		// 返回json给浏览器
		c.JSON(http.StatusOK, gin.H{
			"code":        http.StatusOK,
			"studentName": name,
			"studentAge":  age,
		})
	})
	// 启动HTTP服务，默认在8080端口启动服务，也可以设置为其他端口如8089
	r.Run(":8089")
}
```
### 2.2 获取form表单参数
::: tip 提示
当前端请求的数据通过form表单提交时，例如向`/user/info`发送一个`POST`请求
:::
<font color="blue"><b>当使用DefaultPostForm时，如果没有在请求中获取到表单参数username，则返回设置defaultValue</b></font>

```shell
username := c.DefaultPostForm("username","张三")
```

<font color="blue"><b>当使用PostForm时，如果没有在请求中获取到表单参数，则返回""空串</b></font>

```shell
password := c.PostForm("password")
```

<font color="blue"><b>获取复选框多个数据</b></font>

```shell
info := c.PostFormArray("info")
```

<font color="color"><b>后端处理逻辑:</b></font>
```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// 创建一个默认的路由引擎
	r := gin.Default()
	// GET：请求方式； /hello：请求的路径
	r.POST("/user/info", func(c *gin.Context) {
		//提交单个表单数据时
		//如果没有在请求中获取到表单参数，则返回默认值"张三"
		username := c.DefaultPostForm("username", "张三")
		//如果没有在请求中获取到表单参数，则返回""空串
		password := c.PostForm("password")
		//提交复选框多个数据时
		info := c.PostFormArray("info")
		// 输出json结果给调用方
		c.JSON(http.StatusOK, gin.H{
			"message":  "success",
			"username": username,
			"password": password,
			"info":     info,
		})

	})
	r.Run(":8089")
}
```
<font color="color"><b>请求示例:</b></font>

<img :src="$withBase('/image/post01.png')" alt="foo">

::: danger 注意
注意`接收数组参数类型`需要指定发送的到服务端的数据类型: `Content-Type: multipart/form-data`
:::
### 2.3 获取path参数
::: tip 提示
请求的参数通过URL路径传递，例如：/user/search/小王子/沙河。 获取请求URL路径中的参数的方式如下。
:::
<font color="blue"><b>没有获取到相关路径参数，则返回""空串</b></font>

```shell
username := c.Param("username")
```

<font color="color"><b>后端处理逻辑:</b></font>
```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	//Default返回一个默认的路由引擎
	r := gin.Default()
	r.GET("/user/search/:username/:address", func(c *gin.Context) {
		username := c.Param("username")
		address := c.Param("address")
		//输出json结果给调用方
		c.JSON(http.StatusOK, gin.H{
			"message":  "ok",
			"username": username,
			"address":  address,
		})
	})
	r.Run(":8089")
}
```
<font color="color"><b>请求示例:</b></font>

<img :src="$withBase('/image/go04.png')" alt="foo">

##  3. RESTful API

REST与技术无关，代表的是一种软件架构风格，REST是Representational State Transfer的简称，中文翻译为“表征状态转移”或“表现层状态转化”。

简单来说，REST的含义就是客户端与Web服务器之间进行交互的时候，使用HTTP协议中的4个请求方法代表不同的动作。

+ GET用来获取资源
+ POST用来新建资源
+ PUT用来更新资源
+ DELETE用来删除资源。

只要`API`程序遵循了`REST`风格，那就可以称其为`RESTful API`。目前在前后端分离的架构中，前后端基本都是通过`RESTful API`来进行交互。

例如，我们现在要编写一个管理书籍的系统，我们可以查询对一本书进行查询、创建、更新和删除等操作，我们在编写程序的时候就要设计客户端浏览器与我们Web服务端交互的方式和路径。按照经验我们通常会设计成如下模式：


| 请求方法	| URL	|  含义  |
| :----- | :--- | :----------------- |
|GET|	/book	|查询书籍信|
|POST|	/create_book	|创建书籍记录|
|POST|	/update_book|	更新书籍信息|
|POST	|/delete_book	|删除书籍信息|

<font color="color"><b>同样的需求我们按照RESTful API设计如下：</b></font>
|请求方法|	URL	|含义|
| :----- | :--- | :----------------- |
|GET	|/book	|查询书籍信息|
|POST	|/book	|创建书籍记录|
|PUT	|/book	|更新书籍信息|
|DELETE|	/book	|删除书籍信息|

<font color="color"><b>Gin框架支持开发RESTful API的开发。</b></font>
```go
func main() {
	r := gin.Default()
	r.GET("/book", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "GET",
		})
	})

	r.POST("/book", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "POST",
		})
	})

	r.PUT("/book", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "PUT",
		})
	})

	r.DELETE("/book", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "DELETE",
		})
	})
}
```
##  4. Gin中请求设计

<img :src="$withBase('/image/go10.png')" alt="foo">



### 4.1 列表请求(GET,参数:query)
::: tip 提示
query参数
:::
<font color="bule"><b>请求地址:</b></font>
```shell
http://localhost:8089/hello?name=小明&age=18
```
<font color="color"><b>请求示例:</b></font>

<img :src="$withBase('/image/go05.png')" alt="foo">

<font color="color"><b>逻辑代码示例:</b></font>
```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/hello", func(c *gin.Context) {
		name := c.DefaultQuery("name", "小燕子")
		age := c.Query("age")
		c.JSON(http.StatusOK, gin.H{
			"code":        http.StatusOK,
			"studentName": name,
			"studentAge":  age,
		})
	})
	r.Run(":8089")
}
```
### 4.2 详情请求(GET,path和query)
::: tip 提示
path参数也叫uri参数,参数可以再path中, 也可以在query中
:::
<font color="bule"><b>请求地址:</b></font>
```shell
http://localhost:8089/hello/12?name=小明&age=18
```
<font color="color"><b>请求示例:</b></font>

<img :src="$withBase('/image/go06.png')" alt="foo">

<font color="color"><b>逻辑代码示例:</b></font>

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/hello/:id", func(c *gin.Context) {
		id := c.Param("id")
		name := c.DefaultQuery("name", "小燕子")
		age := c.Query("age")
		c.JSON(http.StatusOK, gin.H{
			"code":        http.StatusOK,
			"studentName": name,
			"studentAge":  age,
			"id":          id,
		})
	})
	r.Run(":8089")
}
```
### 4.3 数据提交请求(POST,body)
<font color="bule"><b>请求地址:</b></font>
```shell
http://localhost:8089/hello
```
<font color="color"><b>请求示例:</b></font>

<img :src="$withBase('/image/go07.png')" alt="foo">

<font color="color"><b>逻辑代码示例:</b></font>

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.POST("/hello", func(c *gin.Context) {
		name := c.DefaultPostForm("name", "小燕子")
		age := c.PostForm("age")
		c.JSON(http.StatusOK, gin.H{
			"studentName": name,
			"studentAge":  age,
		})
	})
	r.Run(":8089")
}
```
### 4.4 数据删除请求(DELETE,uri和body)
::: tip 提示
一般情况为uri，同样也可以为body传参数
:::
<font color="bule"><b>请求地址:</b></font>
```shell
http://localhost:8089/hello/168
```
<font color="color"><b>请求示例:</b></font>

<img :src="$withBase('/image/go08.png')" alt="foo">

<font color="color"><b>逻辑代码示例:</b></font>
```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.DELETE("/hello/:id", func(c *gin.Context) {
		id := c.Param("id")
		name := c.DefaultPostForm("name", "小燕子")
		age := c.PostForm("age")
		c.JSON(http.StatusOK, gin.H{
			"studentName": name,
			"studentAge":  age,
			"id":          id,
		})
	})
	r.Run(":8089")
}
```
### 4.5 数据编辑请求(PUT,uri和body)
::: tip 提示
参数在body或者uri中
:::
<font color="bule"><b>请求地址:</b></font>
```shell
http://localhost:8089/hello/168
```
<font color="color"><b>请求示例:</b></font>

<img :src="$withBase('/image/go09.png')" alt="foo">

<font color="color"><b>逻辑代码示例:</b></font>
```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.PUT("/hello/:id", func(c *gin.Context) {
		id := c.Param("id")
		name := c.DefaultPostForm("name", "小燕子")
		age := c.PostForm("age")
		c.JSON(http.StatusOK, gin.H{
			"studentName": name,
			"studentAge":  age,
			"id":          id,
		})
	})
	r.Run(":8089")
}
```
##  5.  Gin路由
### 5.1 普通路由
```go
r.GET("/index", func(c *gin.Context) {...})
r.GET("/login", func(c *gin.Context) {...})
r.POST("/login", func(c *gin.Context) {...})
```
### 5.2 匹配所有请求`Any`
```go
r.Any("/test", func(c *gin.Context) {...})
```
### 5.3 miss路由
```go
r.NoRoute(func(c *gin.Context) {
    c.JSON(http.StatusNotFound, gin.H{
        "code":    404,
        "message": "我是miss路由",
    })
})
```
### 5.4 路由组
::: tip 提示
1. 我们可以将拥有共同URL前缀的路由划分为一个路由组。
2. 其基本原理就是构造一个路由地址的前缀树。
:::
```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	userGroup := r.Group("/user")
	userGroup.Any("/index", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "我是user测试代码",
		})
	})
	shopGroup := r.Group("/shop")
	shopGroup.Any("/index", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "我是shop测试代码",
		})
	})
	r.Run(":8089")
}
```
<font color="bule"><b>请求地址:</b></font>

```text
1. http://localhost:8089/shop/index
2. http://localhost:8089/user/index
```

### 5.5 路由组嵌套
```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	shopGroup := r.Group("/shop")
	// shopGroup路由组下面嵌套路由组sonGroup
	sonGroup := shopGroup.Group("user")
	sonGroup.Any("/index", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "我是shop测试代码",
		})
	})
	r.Run(":8089")
}
```
<font color="bule"><b>请求地址:</b></font>
```text
http://localhost:8089/shop/user/index
```

##  6. gin路由拆分与注册
### 6.1 基本的路由注册
::: tip 提示
下面最基础的gin路由注册方式，适用于路由条目比较少的简单项目或者项目demo。
:::
```go
package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func helloHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "你好, 伟大的程序员666!!",
	})
}

func main() {
	r := gin.Default()
	r.GET("/hello", helloHandler)

	if err := r.Run(":8089"); err != nil {
		fmt.Printf("startup service failed, err:%v\n", err)
	}
}
```
### 6.2 路由拆分成单独文件
::: tip 提示
当项目的规模增大后就不太适合继续在项目的main.go文件中去实现路由注册相关逻辑了，我们会倾向于把路由部分的代码都拆分出来，形成一个单独的文件或包：
:::
<font color="bule"><b>我们在`routers.go`文件中定义并注册路由信息：</b></font>
```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func helloHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "你好, 伟大的程序员",
	})
}

func setupRouter() *gin.Engine {
	r := gin.Default()
	r.GET("/hello", helloHandler)
	return r
}
```

<font color="bule"><b>此时`main.go`中调用上面定义好的`setupRouter`函数：</b></font>
```go
package main

import "fmt"

func main() {
	r := setupRouter()
	if err := r.Run(":8089"); err != nil {
		fmt.Printf("startup service failed, err:%v\n", err)
	}
}
```
<font color="bule"><b>此时的目录结构：</b></font>
```text
gin_demo
├── go.mod
├── go.sum
├── main.go
└── routers.go
```
### 6.3 路由拆分成单独的包
::: tip 提示
和拆分成单独的文件相似
:::
<font color="bule"><b>拆分后的目录结构如下：</b></font>
```text
gin_demo
├── go.mod
├── go.sum
├── main.go
└── routers
    └── routers.go
```

<font color="bule"><b>`routers/routers.go`需要注意此时`setupRouter`需要改成`首字母`大写：</b></font>
```go
package routers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func helloHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "您好, 伟大的程序员",
	})
}

// SetupRouter 配置路由信息
func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.GET("/hello", helloHandler)
	return r
}
```

<font color="bule"><b>`main.go`文件内容如下：</b></font>
```go
package main

import (
	"fmt"
	"study/routers"
)

func main() {
	r := routers.SetupRouter()
	if err := r.Run(":8089"); err != nil {
		fmt.Printf("startup service failed, err:%v\n", err)
	}
}
```
### 6.4 路由拆分成多个文件
::: tip 提示
当我们的业务规模继续膨胀，单独的一个`routers`文件或`包`已经满足不了我们的需求了
:::
```go
func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.GET("/hello", helloHandler)
    r.GET("/xx1", xxHandler1)
   ...
   r.GET("/xx30", xxHandler30)
   return r
}
```
<font color="blue"><b>因为我们把所有的路由注册都写在一个SetupRouter函数中的话就会太复杂,比如, 上面就很复杂了!</b></font>

<font color="color"><b>我们可以分开定义多个路由文件，例如：</b></font>
```text
gin_demo
├── go.mod
├── go.sum
├── main.go
└── routers
    ├── blog.go
    └── shop.go
```

<font color="blue"><b>`routers/shop.go`中添加一个LoadShop的函数，将shop相关的路由注册到指定的路由器：</b></font>
```go
package routers

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func userHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "您好, 伟大的用户",
	})
}

// LoadShop 配置路由信息
func LoadShop(c *gin.Engine) {
	c.GET("/user", userHandler)
}
```
<font color="blue"><b>`routers/blog.go`中添加一个LoadBlog的函数，将blog相关的路由注册到指定的路由器：</b></font>
```go
package routers

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func blogHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "您好, 伟大的程序员",
	})
}

// SetupRouter 配置路由信息
func LoadBlog(c *gin.Engine) {
	c.GET("/hello", blogHandler)
}
```

<font color="color"><b>在`main`函数中实现最终的注册逻辑如下：</b></font>
```go
package main

import (
	"fmt"
	"study/routers"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	routers.LoadBlog(r)
	routers.LoadShop(r)
	if err := r.Run(":8089"); err != nil {
		fmt.Printf("startup service failed, err:%v\n", err)
	}
}
```
### 6.5 路由拆分到不同的APP
::: tip 提示
1. 有时候项目规模实在太大，那么我们就更倾向于把业务拆分的更详细一些，例如把不同的业务代码拆分成不同的APP。
2. 因此我们在项目目录下单独定义一个app目录，用来存放我们不同业务线的代码文件，这样就很容易进行横向扩展。
:::
<font color="blue"><b>大致目录结构如下：</b></font>
```text
gin_demo
├── app
│   ├── blog
│   │   ├── handler.go  
│   │   └── router.go
│   └── shop
│       ├── handler.go
│       └── router.go
├── go.mod
├── go.sum
├── main.go
└── routers
    └── routers.go    
```
<font color="blue"><b>其中`app/blog/router.go`用来定义`blog`相关的路由信息，具体内容如下：</b></font>
```go
package blog

import "github.com/gin-gonic/gin"

func Routers(e *gin.Engine) {
	e.GET("/hello", helloHandler)
}
```

<font color="blue"><b>`app/shop/router.go`用来定义shop相关路由信息，具体内容如下：</b></font>
```go
package shop

func Routers(e *gin.Engine) {
	e.GET("/goods", goodsHandler)
	e.GET("/checkout", checkoutHandler)
}
```

<font color="color"><b>`routers/routers.go`中根据需要定义`Include`函数用来注册子`app`中定义的路由，`Init`函数用来进行路由的初始化操作：</b></font>
```go
package routers

import "github.com/gin-gonic/gin"

type Option func(*gin.Engine)

var options = []Option{}

// 注册app的路由配置
func Include(opts ...Option) {
	options = append(options, opts...)
}

// 初始化
func Init() *gin.Engine {
	r := gin.Default()
	for _, opt := range options {
		opt(r)
	}
	return r
}
```
<font color="color"><b>`main.go`中按如下方式先注册子`app`中的路由，然后再进行路由的初始化：</b></font>
```go
package main

import (
	"fmt"
	"study/app/blog"
	"study/app/shop"
	"study/routers"
)

func main() {
	// 加载多个APP的路由配置
	routers.Include(shop.Routers,blog.Routers)
	// 初始化路由
	r := routers.Init()
	if err := r.Run(":8089"); err != nil {
		fmt.Printf("startup service failed, err:%v\n", err)
	}
}
```
::: danger 总结
gin框架是一个非常容易扩展的web框架，本文是我在日常编码中总结的一点点经验，因为世界上不可能有完全相同的项目，每个人也都有自己的编程习惯，关于gin框架路由注册的方式我就在此抛砖引玉了。
:::