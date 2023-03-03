#   Golang前言和环境篇
##  1. 为什么你应该学习Go语言 
### 1.1 什么是Go语言
1. Google开源
2. 编译型语言
3. 21世纪的C语言
### 1.2 为现代软件工程而生的Go语言
1. 支持交叉编译, 编译快速
2. 开发效率高
3. 执行性能好
4. 天生支持并发
### 1.3 Go语言的特点
1. 简单易学习
2. 开发效率高
3. 执行性能好
### 1.4 为什么要学习Go语言
1. 机会多
2. 薪资高
3. 发展好
### 1.5 Go语言在中国
1. 中国是世界上Go语言爱好最多的国家
2. Go语言开发岗位需求持续快速增长
3. Go语言开发岗位平均薪资较高
### 1.6 Go代码片段
```go
import "fmt"

func main() {
	fmt.Println("人生苦短, 我学Go")
}
```
##  2. Go语言开发环境搭建
::: danger 注意
Go语言1.14版本之后推荐使用`go modules`管理依赖，也不再需要把代码写在`GOPATH`目录下了
:::
### 2.1 下载并安装Go环境
[Go安装包下载地址, 这里只演示windows下安装](https://studygolang.com/dl)
<img :src="$withBase('/image/go01.png')" alt="foo">
### 2.2 Go语言环境检查
::: tip 检查
上一步安装过程执行完毕后，可以打开终端窗口，输入下面命令，查看安装的Go版本。
:::
```shell
go version
```
<img :src="$withBase('/image/go02.png')" alt="foo">

### 2.3 GOROOT
::: tip 提示
`GOROOT`是环境变量, 是我们安装Go开发包的路径
:::
### 2.4 GOPATH
::: tip 提示
`GOPATH`是环境变量, 从Go 1.8版本开始，Go开发包在安装完成后会为`GOPATH`设置一个默认目录，并且在Go1.14及之后的版本中启用了`Go Module`模式之后，不一定非要将代码写到`GOPATH`目录下，所以也就<font color="red"><strong>不需要我们再自己配置GOPATH了，使用默认的即可</strong></font>。
::: 
### 2.5 [GOPROXY](https://github.com/goproxy/goproxy.cn/blob/master/README.zh-CN.md)
::: danger 非常重要的一个配置,国内代理设置
1. Go1.14版本之后，都推荐使用go mod模式来管理依赖环境了，也不再强制我们把代码必须写在GOPATH下面的src目录了，你可以在你电脑的任意位置编写go代码。
2. GOPROXY控制Go mod下载的来源,Go mod是Golang中的标准包管理器
:::
默认GOPROXY配置是`GOPROXY=https://proxy.golang.org,direct`, 由于国内访问不到`https://proxy.golang.org`, 所以我们需要换一个PROXY，这里推荐使用https://goproxy.io或https://goproxy.cn。

可以执行下面的命令修改`GOPROXY`：
```shell
go env -w GOPROXY=https://goproxy.cn,direct
```
### 2.6 查看Go环境配置
```shell
go env
```
::: tip 注意
修改环境配置之后, 一般需要执行 source ~/.bash_profile 使环境变量生效
:::
## 3. [VS Code](https://pc.qq.com/detail/16/detail_22856.html)
### 3.1 安装`chinese`和`Go`扩展
### 3.2 VS Code界面介绍

<img :src="$withBase('/image/go03.png')" alt="foo">

##  4. 依赖管理
1. 依赖的概念, 别人写的一些库, 直接拿过来用, 依赖它来写一些功能编译; <font style="color:blue;font-weight:bold">go mod</font> 2018年出来的, 比较完善的依赖管理, 现在都在朝这个<font style="color:blue;font-weight:bold">go mod</font>迁移;
2. 从Go1.13版本开始，go module将是Go语言默认的依赖管理工具。
### 4.1 开启 go mod 环境变量
::: tip 提示
要启用go module支持首先要设置环境变量GO111MODULE，通过它可以开启或关闭模块支持，它有三个可选值：off、on、auto，默认值是auto
1. GO111MODULE=off禁用模块支持，编译时会从GOPATH和vendor文件夹中查找包。
2. GO111MODULE=on启用模块支持，编译时会忽略GOPATH和vendor文件夹，只根据 go.mod下载依赖。
3. GO111MODULE=auto，当项目在$GOPATH/src外且项目根目录有go.mod文件时，开启模块支持。

简单来说，设置GO111MODULE=on之后就可以使用go module了，以后就没有必要在GOPATH中创建项目了，并且还能够很好的管理项目依赖的第三方包信息。

使用 go module 管理依赖后会在项目根目录下生成两个文件go.mod和go.sum。
:::
```shell
go env -w GO111MODULE=on
```
### 4.2 国内代理设置
::: tip 提示
Go1.13之后GOPROXY默认值为https://proxy.golang.org，在国内是无法访问的，所以十分建议大家设置GOPROXY，这里我推荐使用goproxy.cn。
:::
```shell
go env -w GOPROXY=https://goproxy.cn,direct
```
### 4.3 初始化项目
1. 创建一个文件夹 `G:\golang\code`
2. 初始化项目,    进入创建这个项目文件夹里面       `cd G:\golang\code`,  初始化模块,   生成go mod文件,      语法:` go mod init + 模块名称`
```shell
go mod init code
```
::: tip 注意
1. 初始化之后, 当前目录下就会多一个`go.mod`文件; 此时如果继续安装依赖, go.mod文件下会多一个`go.sum`文件
2. go.mod文件: 可以理解为包管理文件, 类似php的composer.json
3. go.sum文件: 包的版本控制文件, 类似php的composer.lock,更准确地来说，go.sum是一个构建状态跟踪
4. GoLang编辑器提醒设置的GOROOT可以通过go env查看后设置完成
5. go安装依赖包的目录在系统默认的GOPATH目录下面, 可以通过`go env`查看该目录的位置
6. 使用go mod之后，包下载之后是放在了$GOPATH/pkg/mod下
:::
### 4.4 其他依赖向go mod迁移
1. 把整个go.mod删除, golang编辑器会提示生成go.mod,运行程序,相应的引入就会生成;这是一个文件的
2. 所有文件迁移,直接在项目根目录,执行
   1. 把整个go.mod删除
   2. `go mod init study`
   3. `go bulid ./...`就会触发它去拉取所有库放到我们go.mod里面
### 4.5 goLang安装格式化工具
作用是格式化代码,不管代码怎么乱,保存的时候都会格式化我们代码 
1. 执行安装命令
```shell
go get -v golang.org/x/tools/cmd/goimports
```
2. `GoLang`编辑器设置

`设置`=>`工具`=>`File Watchers`=>`+` 选择`goimports`
### 4.5 go mod常用指令
1.  初始化项目, 生成`go.mod`文件

    ```go
    go mod init + 模块名
    ```

2. 移除`go.mod`中无用的依赖

    ```go
    go mod tidy
    ```

3. 下载项目依赖

    ```go
    go get ./...
    ```

`./...`这个表示路径，代表当前目录下所有的文件

4. 安装依赖包

    ```go
    go get -u + 包名
    ```

+ 安装的依赖包后面不接版本号,就是最新的
+ 升级或者更新一个依赖包,此时`go.mod`文件中版本号就会自动更新到最新

5. 拉取所有库放到我们`go.mod`里面

    ```go
    go bulid ./...
    ```

6. 构建当前目录及其所有子目录

    1. 不会产生结果

      ```go
      go build ./...
      ```

    2.  会产生结果, 默认在`gopath`下的`bin`目录里面

      ```go
       go install ./...  
      ```
7. 格式化 go.mod 文件
    ```shell
    go mod edit -fmt
    ```
##  5. 入门案例`Hello World`
文件名: `main.go`
```shell
package main

import "fmt"

func main() {
	fmt.Println("Hello World")
}
```
### 5.1 运行go文件
1. 运行方式一:
    1. 编译go代码, 生成一个可执行文件
    ```shell
    go build main.go 
    ```
    2. 运行可执行程序main.exe
    ```shell
    ./hello.exe
    ```
2. 运行方式二:
  ```shell
  go run hello.go
  ```
不生成程序,直接运行,实际内部也有生成,就是看不到

### 5.2 windows清屏命令
```shell
cls
```
##  6. [如何使用go mod导入本地包](https://www.liwenzhou.com/posts/Go/import_local_package_in_go_module/)