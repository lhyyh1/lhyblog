#   技巧篇
##  1. 使用Air实现Go程序实时热重载
::: tip 提示
1. Air能够实时监听项目的代码文件，在代码发生变更之后自动重新编译并执行，大大提高gin框架项目的开发效率。

2. 在使用Go语言的gin框架在本地做开发调试的时候，经常需要在变更代码之后频繁的按下Ctrl+C停止程序并重新编译再执行，这样就不是很方便。

3. 这里以windows本地为例, 说明如何安装使用
:::

<font color="blue"><b>windows安装Air</b></font>

1. 在[git上下载Air](https://github.com/cosmtrek/air/releases)或者笔者提供的[阿里云盘下载](https://www.aliyundrive.com/s/aJaKT8ZMM5P); 下载好之后, 放其入GO的安装目录(安装目录就是`GOROOT`目录)下的bin目录，重命名为`air.exe`;

2. 安装好之后, 我们可以在GoLand内置的命令行终端使用`air -v`命令检查是否安装成功

<img :src="$withBase('/image/air.png')" alt="foo">

<font color="blue"><b>使用并测试,通过`air`命令启用Air管理web项目启动和重启</b></font>

<img :src="$withBase('/image/air1.png')" alt="foo">

<font color="color"><b>Air自动重载Go项目成功!!</b></font>

::: tip 提示
1. 项目根目录中出现 `tmp` 目录，该目录是Air编译文件的存放地。我们需要设置版本控制器将tmp目录排除在外
2. 在根目录中新建一个.gitignore文件,该文件指示 Git 在您进行提交时要忽略哪些文件和目录。创建后，将tmp目录添加到.gitignore文件
:::
##  2. go编译成二进制文件
::: tip 提示
在windows中将go项目编译成Linux下可执行的二进制文件
:::
1. 打开`Terminal` 执行命令
<font color="blue"><b>修改配置GOARCH,GOARCH是目标可执行程序操作系统构架</b></font>
```shell
go env -w GOARCH=amd64
```
<font color="blue"><b>修改配置GOOS,GOOS表示目标可执行程序运行操作系统</b></font>
```shell
go env -w GOOS=linux
```
<font color="blue"><b>查看配置修改是否成功</b></font>
```shell
go env
```
<font color="blue"><b>执行编译构建</b></font>
```shell
go build xx.go
```
2. 会生成一个没有后缀的`xx`二进制文件
3. 将该文件放入`linux`系统某个文件夹下
4. 赋予权限 `chmod 777 xx`
5. 执行 `./xx`
6. 执行后，记得改回来
```shell
go env -w GOOS=windows
```
##  3. gin自定义目录结构
```text 
├── gin
│   ├──  Config // 项目的配置文件夹
│            └── config.go  //可以有多个配置文件
│   ├──  Controllers // 控制器层
│          └── testController.go // 验证提交的数据，将验证完成的数据传递给 service。
│   ├──  Services   // 业务层  
│          └── testService.go // 只完成业务逻辑的开发，不进行操作数据库。
│   ├──  Repository // 数据库操作层
│          └── testRepository.go // 比如写，多表插入，多表查询等，不写业务代码。
│   ├──  Models // 数据库的ORM
│          └── testModel.go
│   ├──  Entity // 写返回数据的结构体。
│          └── testEntity.go // 写 controller 层方法参数验证的结构体。
│   ├──  Router // 为路由目录
│          └── router.go
│   ├──  Middlewares // 为中间件目录
│          └── corsMiddleware.go
└── main.go // 为入口文件
```
##  4. [gin案例](https://blog.csdn.net/weixin_45304503/article/details/120680957)
##  5. [go mod tidy](https://wenku.baidu.com/view/d2f2fbd7920ef12d2af90242a8956bec0975a5cb.html)
##  6. go读取ini配置文件
<font color="blue"><b>安装包</b></font>
```shell
go get gopkg.in/ini.v1
```
<font color="color"><b>示例</b></font>

<font color="blue"><b>my.ini文件:</b></font>
```ini
app_name = gin框架
app_env  = dev

# mysql是分区
[mysql]
db_name = gin_study
db_user = root
db_pwd  = root123456
db_host = 127.0.0.1
db_port = 3306
db_type = mysql

; redis分区
[redis]
redis_host     = 127.0.0.1
redis_port     = 6379
redis_password = 123456
```
<font color="blue"><b>go读取示例</b></font>
```go
package main

import (
	"fmt"

	"gopkg.in/ini.v1"
)

func main() {
	test()
}

func test() {
	conf, err := ini.Load("./my.ini")
	if err != nil {
		fmt.Println("配置文件读取失败, err = ", err)
	}
	// 读取操作
	fmt.Println(conf.Section("redis").Key("redis_host").String())
	fmt.Println(conf.Section("redis").Key("redis_password").String())
	fmt.Println(conf.Section("redis").Key("redis_port").String())
	// 默认分区可以使用空字符串表示
	fmt.Println(conf.Section("").Key("app_name").String())
	fmt.Println(conf.Section("mysql").Key("db_name").String())
	fmt.Println(conf.Section("mysql").Key("db_user").String())
	fmt.Println(conf.Section("mysql").Key("db_pwd").String())
	fmt.Println(conf.Section("mysql").Key("db_host").String())
	// 获取到的值转成int
	fmt.Println(conf.Section("mysql").Key("db_port").MustInt())
	fmt.Println(conf.Section("mysql").Key("db_type").String())
	fmt.Println(conf.Section("").Key("app_env").String())
	// 修改配置文件app_env的值为dev,然后进行保存
	conf.Section("").Key("app_env").SetValue("dev")
	conf.SaveTo("my.ini")
}
```
##  7. go读取yaml配置文件
<font color="blue"><b>安装包</b></font>
```shell
go get gopkg.in/yaml.v2
```
<font color="color"><b>示例1</b></font>

<font color="blue"><b>my.yaml</b></font>
```yaml
url: 127.0.0.1
userName: root
password: root123456
dbname: gin_study
post: 3306
```
<font color="blue"><b>go读取</b></font>
```go
package main

import (
	"fmt"
	"io/ioutil"

	"gopkg.in/yaml.v2"
)

func main() {
	test()
}

//配置参数映射结构体
type database struct {
	Url      string `yaml:"url"`
	UserName string `yaml:"userName"`
	Password string `yaml:"password"`
	DbName   string `yaml:"dbname"`
	Port     string `yaml:"post"`
}

//利用结构体方法获取配置参数数据
func (c *database) getConf() *database {
	//读取resources/application.yaml文件
	yamlFile, err := ioutil.ReadFile("my.yaml")
	//若出现错误，打印错误提示
	if err != nil {
		fmt.Println(err.Error())
	}
	//将读取的字符串转换成结构体database
	err = yaml.Unmarshal(yamlFile, c)
	if err != nil {
		fmt.Println(err.Error())
	}
	return c
}
func test() {
	var c database
	//获取yaml配置参数
	databaseConf := c.getConf()
	fmt.Println(databaseConf)
}
```
<font color="color"><b>示例2</b></font>

<font color="blue"><b>my.yaml</b></font>
```yaml
name: testsvr
blackip:
  - 1.1.1.1
  - 2.2.2.2
auto: false
port: 9999
clusterip: [3.3.3.3,4.4.4.4]
health:
  url: http://localhost:5444 # 地址
  cmd: netstat -anlt # 命令
  interval: 3s # 间隔时间
  timeout: 20s # 超时时间
  disable: true # 是否启用
```
<font color="blue"><b>go读取</b></font>
```go
package main

import (
	"fmt"
	"io/ioutil"
	"os"

	"gopkg.in/yaml.v2"
)

type Cfg struct {
	Name      string `yaml:"name"`
	Auto      bool   `yaml:"auto"`
	Port      int    `yaml:"port"`
	Blackip   []string
	Clusterip []string
	Health    Health
}

type Health struct {
	Url      string
	Cmd      string
	Interval string
	Timeout  string
	Disable  bool
}

func main() {
	file, err := os.Open("my.yaml")
	if err != nil {
		panic(err)
	}
	bytes, err := ioutil.ReadAll(file)
	if err != nil {
		panic(err)
	}
	cfg := Cfg{}
	err = yaml.Unmarshal(bytes, &cfg)
	if err != nil {
		panic(err)
	}
	fmt.Println(cfg.Name)
}
```
##  8. 结构体标签（Tag）
::: warning 注意
1. Tag是结构体的元信息，可以在运行的时候通过反射的机制读取出来。 Tag在结构体字段的后方定义，由一对`反引号`包裹起来
2. 它是一个附属于字段的字符串，可以是文档或其他的重要标记。比如在我们解析json或生成json文件时，常用到`encoding/json`包，它提供一些默认标签，例如：`omitempty`标签可以在序列化的时候忽略0值或者空值。而-标签的作用是不进行序列化，其效果和和直接将结构体中的字段写成小写的效果一样。
3. 在序列化和反序列化的时候，也支持类型转化等操作。
:::
<font color="blue"><b>具体的格式如下：</b></font>
```shell
`key1:"value1" key2:"value2"`
```
1. 结构体`tag`由一个或多个键值对组成。`键与值`使用冒号分隔，`值`用双引号括起来。
2. 同一个结构体字段可以设置`多个键值对tag`，不同的键值对之间使用空格分隔。
::: danger 注意事项
1. 为结构体编写Tag时，必须严格遵守键值对的规则。
2. 结构体标签的解析代码的容错能力很差，一旦格式写错，编译和运行时都不会提示任何错误，通过反射也无法正确取值。例如不要在key和value之间添加空格。
:::
```go
package main

import (
	"encoding/json"
	"fmt"
)

//Student 学生
type Student struct {
	ID     int    `json:"ids"` //通过指定tag实现json序列化该字段时的key
	Gender string //json序列化是默认使用字段名作为key
	name   string //私有不能被json包访问
	Age    int    `json:"age,omitempty"` // omitempty 之后, age等于0或者空,就不显示出来
	Money  int    `json:"money,string"`  // string 这样生成的json对象中，age就为字符串
}

func main() {
	s1 := Student{
		ID:     1,
		Gender: "男",
		name:   "沙河娜扎",
		Age:    0,
		Money:  100,
	}
	data, err := json.Marshal(s1)
	if err != nil {
		fmt.Println("json marshal failed!")
		return
	}
	fmt.Printf("json str:%s\n", data) //json str:{"ids":1,"Gender":"男","money":"100"}
}
```