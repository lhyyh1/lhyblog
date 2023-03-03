#   go并发
::: tip 提示
<font color="blue"><b>并发编程</b></font>在当前软件领域是一个非常重要的概念，随着CPU等硬件的发展，我们无一例外的想让我们的程序运行的快一点、再快一点。Go语言在语言层面天生支持并发，充分利用现代CPU的多核优势，这也是Go语言能够大范围流行的一个很重要的原因。
:::
##  1. 基本概念
### 1.1 串行、并发与并行
1. 串行：我们都是先读小学，小学毕业后再读初中，读完初中再读高中。
2. 并发：<font color="blue"><b>同一时间段</b></font>执行多个任务（你在用微信和两个女朋友聊天）。
3. 并行：<font color="blue"><b>同一时刻</b></font>执行多个任务（你和你朋友都在用微信和女朋友聊天）。
### 1.2 [进程、线程和协程](http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html)
1. 进程（process）：程序在操作系统中的一次执行过程，系统进行资源分配和调度的一个独立单位; 一个进程必须包含至少一个线程;
2. 线程（thread）：操作系统基于进程开启的轻量级进程，是操作系统调度执行的最小单位。
3. 协程（goroutine）：非操作系统提供而是由用户自行创建和控制的<font color="color"><b>用户态‘线程’</b></font>，比线程更轻量级。
### 1.3 并发模型
业界将如何实现并发编程总结归纳为各式各样的并发模型，常见的并发模型有以下几种：

1. 线程&锁模型
2. Actor模型
3. CSP模型
4. Fork&Join模型

Go语言中的并发程序主要是通过基于CSP（communicating sequential processes）的goroutine和channel来实现，当然也支持使用传统的多线程共享内存的并发方式。

##  2. goroutine
1. <font color="color"><b>Goroutine</b></font> 是 Go 语言支持并发的核心，在一个Go程序中同时创建成百上千个goroutine是非常普遍的，一个goroutine会以一个很小的栈开始其生命周期，一般只需要2KB。
   
2. 区别于操作系统线程由系统内核进行调度， goroutine 是由Go运行时（runtime）负责调度。例如Go运行时会智能地将 m个goroutine 合理地分配给n个操作系统线程，实现类似m:n的调度机制，不再需要Go开发者自行在代码层面维护一个线程池。
   
3. Goroutine 是 Go 程序中最基本的并发执行单元。每一个 Go 程序都至少包含一个 `goroutine`——`main goroutine`，当 Go 程序启动时它会自动创建。

4. 在Go语言编程中你不需要去自己写进程、线程、协程，你的技能包里只有一个技能——`goroutine`，当你需要让某个任务并发执行的时候，你只需要把这个任务包装成一个函数，开启一个 `goroutine` 去执行这个函数就可以了，就是这么简单粗暴。

### 2.1 使用Goroutine
::: tip 提示
Go语言中使用 goroutine 非常简单，只需要在函数或方法调用前加上go关键字就可以创建一个 goroutine ，从而让该函数或方法在新创建的 goroutine 中执行。
:::
```go
go f()  // 创建一个新的 goroutine 运行函数f
```
匿名函数也支持使用go关键字创建 goroutine 去执行。
```go
go func(){
  // ...
}()
```
一个 goroutine 必定对应一个函数/方法，可以创建多个 goroutine 去执行相同的函数/方法。
### 2.2 启动单个goroutine
启动 goroutine 的方式非常简单，只需要在调用函数（普通函数和匿名函数）前加上一个go关键字。

我们先来看一个在 main 函数中执行普通函数调用的示例。
```go
package main

import (
	"fmt"
)

func hello() {
	fmt.Println("您好, 李白")
}
func main() {  // 开启一个主goroutine去执行main函数
	hello()
	fmt.Println("您好, main函数")
}
```
将上面的代码编译后执行，得到的结果如下：
```text
PS F:\go\study> go run .\main.go
您好, 李白
您好, main函数
```
代码中 hello 函数和其后面的打印语句是串行的。

接下来我们在调用 hello 函数前面加上关键字go，也就是启动一个 goroutine 去执行 hello 这个函数。
```go
package main

import (
	"fmt"
)

func hello() {
	fmt.Println("您好, 李白")
}
func main() { // 开启一个主goroutine去执行main函数
	go hello() // 开启一个goroutine去执行hello函数
	fmt.Println("您好, main函数")
}
```
将上述代码重新编译后执行，得到输出结果如下
```text
您好, main函数
```
这一次的执行结果只在终端打印了`您好, main函数`，并没有打印 `您好, 李白`。这是为什么呢？

1. 其实在 Go 程序启动时，Go 程序就会为 main 函数创建一个默认的 `主goroutine`; 
   
2. 在上面的代码中我们在 `main` 函数中使用 `go` 关键字创建了另外一个 `goroutine` 去执行 `hello` 函数，而此时 `main goroutine` 还在继续往下执行，我们的程序中此时存在两个并发执行的 `goroutine`。

3. 当 `main` 函数结束时整个程序也就结束了，同时 `main goroutine` 也结束了，所有由 `main goroutine` 创建的 `goroutine` 也会一同退出。也就是说我们的 `main` 函数退出太快，另外一个 `goroutine` 中的函数还未执行完程序就退出了，导致未打印出`您好, 李白`。

所以我们要想办法让 main 函数‘“等一等”将在另一个 goroutine 中运行的 hello 函数。其中最简单粗暴的方式就是在 main 函数中“time.Sleep”一秒钟了（这里的1秒钟只是我们为了保证新的 goroutine 能够被正常创建和执行而设置的一个值）。

按如下方式修改我们的示例代码。

```go
package main

import (
	"fmt"
	"time"
)

func hello() {
	fmt.Println("您好, 李白")
}
func main() { // 开启一个主goroutine去执行main函数
	go hello() // 开启一个goroutine去执行hello函数
	fmt.Println("您好, main函数")
	time.Sleep(time.Second)
}
```
将我们的程序重新编译后再次执行，程序会在终端输出如下结果，并且会短暂停顿一会儿。
```text
PS F:\go\study> go run .\main.go
您好, main函数
您好, 李白
```

为什么会先打印`您好, main函数`呢？

这是因为在程序中创建 goroutine 执行函数需要一定的开销，而与此同时 main 函数所在的 goroutine 是继续执行的。


在上面的程序中使用time.Sleep让 main goroutine 等待 hello goroutine执行结束是不优雅的，当然也是不准确的。

<font color="blue"><b>sync包等待</b></font>

Go 语言中通过`sync包`为我们提供了一些常用的并发原语，我们会在后面的小节单独介绍sync包中的内容。在这一小节，我们会先介绍一下 sync 包中的WaitGroup。当你并不关心并发操作的结果或者有其它方式收集并发操作的结果时，WaitGroup是实现等待一组并发操作完成的好方法。

下面的示例代码中我们在 main goroutine 中使用sync.WaitGroup来等待 hello goroutine 完成后再退出。

```go
package main

import (
	"fmt"
	"sync"
)

// 声明全局等待组变量
var wg sync.WaitGroup

func hello() {
	fmt.Println("您好, 李白")
	wg.Done() // 告知当前goroutine完成  通知wg计数牌-1
}
func main() { // 开启一个主goroutine去执行main函数
	wg.Add(1)  // 登记1个goroutine, 通知wg计数牌+1
	go hello() // 开启一个goroutine去执行hello函数
	fmt.Println("您好, main函数")
	wg.Wait() // 阻塞等待登记的goroutine完成  计数牌等于0的时候, 执行完成
}
```
将代码编译后再执行，得到的输出结果和之前一致，但是这一次程序不再会有多余的停顿，`hello goroutine` 执行完毕后程序直接退出。

示例
```go
package main

import (
	"fmt"
	"sync"
)

// 声明全局等待组变量
var wg sync.WaitGroup

func hello(i int) {
	fmt.Println("您好, 李白", i)
	wg.Done() // 告知当前goroutine完成,通知wg计数牌-1
}
func main() { // 开启一个主goroutine去执行main函数
	wg.Add(100) // 登记100个goroutine
	for i := 0; i < 100; i++ {
		go hello(i) // 开启一个goroutine去执行hello函数
	}
	fmt.Println("您好, main函数")
	wg.Wait() // 阻塞等待登记的goroutine完成,计数牌等于0的时候, 执行完成
}
```

示例2: 匿名函数
```go
package main

import (
	"fmt"
	"sync"
)

// 声明全局等待组变量
var wg sync.WaitGroup

func main() { // 开启一个主goroutine去执行main函数
	wg.Add(100) // 登记100个goroutine
	for i := 0; i < 100; i++ {
		go func() {
			fmt.Println("你好", i)
			wg.Done()
		}()
	}
	fmt.Println("您好, main函数")
	wg.Wait() // 阻塞等待登记的goroutine完成,计数牌等于0的时候, 执行完成
}
```
此时打印出来的`i`大量重复, 原因是这个匿名函数是一个闭包, 引入的外面的变量i, 此时又是goroutine开启,识别不出来是哪一个参数的作用域,需要在闭包里面传参数,把i传进去,解决这个问题
```go
package main

import (
	"fmt"
	"sync"
)

// 声明全局等待组变量
var wg sync.WaitGroup

func main() { // 开启一个主goroutine去执行main函数
	wg.Add(100) // 登记100个goroutine
	for i := 0; i < 100; i++ {
		go func(i int) {
			fmt.Println("你好", i)
			wg.Done()
		}(i)
	}
	fmt.Println("您好, main函数")
	wg.Wait() // 阻塞等待登记的goroutine完成,计数牌等于0的时候, 执行完成
}
```
### 2.3 启动多个goroutine
在 Go 语言中实现并发就是这样简单，我们还可以启动多个 goroutine 。让我们再来看一个新的代码示例。这里同样使用了sync.WaitGroup来实现 goroutine 的同步。
```go
package main

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup

func hello(i int) {
	defer wg.Done() // goroutine结束就登记-1
	fmt.Println("hello", i)
}
func main() {
	for i := 0; i < 10; i++ {
		wg.Add(1) // 启动一个goroutine就登记+1
		go hello(i)
	}
	wg.Wait() // 等待所有登记的goroutine都结束
}
```
多次执行上面的代码会发现每次终端上打印数字的顺序都不一致。这是因为10个 goroutine 是并发执行的，而 goroutine 的调度是随机的。
### 2.4 动态栈
操作系统的线程一般都有固定的栈内存（通常为2MB）,而 Go 语言中的 goroutine 非常轻量级，一个 goroutine 的初始栈空间很小（一般为2KB），所以在 Go 语言中一次创建数万个 goroutine 也是可能的。并且 goroutine 的栈不是固定的，可以根据需要动态地增大或缩小， Go 的 runtime 会自动为 goroutine 分配合适的栈空间。
### 2.5 GOMAXPROCS
Go运行时的调度器使用`GOMAXPROCS`参数来确定需要使用多少个 `OS` 线程来同时执行`Go` 代码。默认值是机器上的 `CPU` 核心数。例如在一个 8 核心的机器上，GOMAXPROCS 默认为 8。Go语言中可以通过runtime.GOMAXPROCS函数设置当前程序并发时占用的 CPU逻辑核心数。（Go1.5版本之前，默认使用的是单核心执行。Go1.5 版本之后，默认使用全部的CPU 逻辑核心数。）
```go
package main

import (
	"fmt"
	"runtime"
	"sync"
	"time"
)

var wg sync.WaitGroup

func a() {
	for i := 0; i < 10; i++ {
		fmt.Println("a", i)
	}
}
func b() {
	for i := 0; i < 10; i++ {
		fmt.Println("b", i)
	}
}

func main() {
	runtime.GOMAXPROCS(2) // 开启2核执行Go代码
	go a()
	go b()
	time.Sleep(time.Second)
}
```

