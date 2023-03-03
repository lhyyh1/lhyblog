#   Go语言语法基础
##  1. 一些基本常识理解
### 1.1 文件名--命名规范
::: tip 提示
1.  Go的源文件以`.go` 为后缀名存储在计算机中;
2.  Go的文件名均由`小写字母`组成, 如: `test.go` 
3.  文件名由多个部分组成, 使用下划线`_`对他们进行分割连接, 如: `my_school.go`
4.  文件名不能包含空格或其他特殊字符
:::
### 1.2 标识符
::: tip 提示
1. 在编程语言中标识符就是程序员定义的具有特殊意义的词，比如变量名、常量名、函数名等等。
2. Go语言中标识符由字母数字和_(下划线）组成，并且只能以字母和_开头。 举几个例子：`abc`, `_`, `_123`, `a123`。
:::
::: danger 空白标识符 _
1. `_`本身就是一个特殊的标识符，被称为空白标识符
2. 它可以像其他标识符那样用于变量的声明或赋值（任何类型都可以赋值给它）,但任何赋给这个标识符的值都将被抛弃，因此这些值不能在后续的代码中使用，也不可以使用这个标识符作为变量对其它变量进行赋值或运算。
:::
### 1.3 关键字
::: tip 注意
关键字是指编程语言中预先定义好的具有特殊含义的标识符。 关键字和保留字都不建议用作变量名。
:::
Go语言中有25个关键字
```text
break        default      func         interface    select
case         defer        go           map          struct
chan         else         goto         package      switch
const        fallthrough  if           range        type
continue     for          import       return       var
```
此外，Go语言中还有37个保留字。
```text
Constants:    true  false  iota  nil

    Types:    int  int8  int16  int32  int64  
              uint  uint8  uint16  uint32  uint64  uintptr
              float32  float64  complex128  complex64
              bool  byte  rune  string  error

Functions:   make  len  cap  new  append  copy  close  delete
             complex  real  imag
             panic  recover
```
### 1.4 常用规范
::: tip 目录(包)
1. 同一层目录下, 只有一个  <font style="color:blue;font-weight:bold">main</font> 函数 ,   <font style="color:blue;font-weight:bold">main</font> 函数也叫入口函数
   
2. 一般一个大的项目 , 就一两个可执行文件, 每个执行文件必须有单独的自己的目录 , 同一层目录下, 只有一个  <font style="color:blue;font-weight:bold">main</font> 函数
:::
::: warning main函数
1. <font style="color:blue;font-weight:bold">main</font> 函数是这个文件的入口函数, 也是函数的灵魂所在
   
2. 不是每个`.go`文件必备的, 但生成可执行文件, 必须有这个函数
:::
::: danger package main
1. 申明程序所属的包
   
2. 表达的意思是`main.go`这个文件属于main包
   
3. 每一个`.go`文件必须要有 <font style="color:blue;font-weight:bold">package</font>这个关键字, 且必须在程序的开头
:::
::: warning  main包
1. 在 Go 语言里，命名为 main 的包具有特殊的含义。 Go 语言的编译程序会试图把这种名字的包编译为二进制可执行文件。所有用 Go 语言编译的可执行程序都必须有一个名叫 main 的包。一个可执行程序有且仅有一个 main 包。
   
2. 当编译器发现某个包的名字为 main 时，它一定也会发现名为 main()的函数，否则不会创建可执行文件。 main()函数是程序的入口，所以，如果没有这个函数，程序就没有办法开始执行。程序编译时，会使用声明 main 包的代码所在的目录的目录名作为二进制可执行文件的文件名。
:::
::: danger 其他注意
1. go语言语句结尾  <font style="color:blue;font-weight:bold">是没有分号的</font>
   
2. go语言以包作为管理单位, 每个文件必须先声明包
   
3. 同一个目录下不能定义不同的  <font style="color:blue;font-weight:bold">package</font>
   
4. go语言程序必须有一个main包
:::
##  2. 变量
::: danger 特别注意
1. Go语言中的变量需要声明后才能使用，同一作用域内不支持重复声明。 并且Go语言的变量声明后必须使用。
2. 命名规范,单个字母一般小写, 多个字母一般小驼峰, 但如果是专业词汇的首字母缩写均应当写成大写形式,比如`ServeHTTP` 以及 `IDProcessor`
:::
::: tip 提示
1. 变量（Variable）的功能是存储数据。不同的变量保存的数据类型可能会不一样。
2. 常见变量的数据类型有：整型、浮点型、布尔型等。
3. Go语言中的每一个变量都有自己的类型，并且变量必须经过声明才能开始使用。
4. 变量可以通过变量名访问。Go 语言变量名由字母、数字、下划线组成，其中首个字符不能为数字。
:::
::: danger 注意事项
1. 函数外的每个语句都必须以关键字开始（var、const、
2. `:=`不能使用在函数外。
3. `_`多用于占位，表示忽略值。
:::
### 2.1 变量的标准声明
::: tip Go语言的变量声明格式为
var 变量名 变量类型
:::
变量声明以关键字`var`开头，变量类型放在变量的后面，行尾无需分号。 举个例子：
```go
var name string
var age int
var isOk bool
```
### 2.2 变量的批量声明
每声明一个变量就需要写`var`关键字会比较繁琐，go语言中还支持批量变量声明：
```go
var (
    a string
    b int
    c bool
    d float32
)
```
### 2.3 函数内部的短变量声明
1. 在函数内部，可以使用更简略的赋值操作符`:=` 方式声明并初始化变量。函数内部推荐定义变量的方式
2. 这种方式只能在函数内部使用,不能在包内直接使用
3. 对于已证明的变量不可以用这个赋值操作符,直接`=`重新赋值就可以
```go
func main() {
	n := 10
	m := 200 // 此处声明局部变量m
	fmt.Println(m, n)
}
```
### 2.4 匿名变量
::: tip 提示
1. 在使用多重赋值时，如果想要忽略某个值，可以使用匿名变量; 匿名变量用一个下划线`_`表示;
2. 匿名变量不占用命名空间，不会分配内存，所以匿名变量之间不存在重复声明。
:::
```go
package main

import "fmt"

func test() (int, string) {
	return 10, "开心就好"
}

func main() {
	x, _ := test() //忽略开心就好
	_, y := test() //忽略10
	fmt.Println(x, y)
}
```
### 2.5 类型推导
有时候我们会将变量的类型省略，这个时候编译器会根据等号右边的值来推导变量的类型完成初始化。
```go
package main

import "fmt"

func main() {
	var name = "好好学习"
	fmt.Println(name)
}
```
### 2.6 变量的初始化
::: danger 注意了
1. Go语言在声明变量的时候，会自动对变量对应的内存区域进行初始化操作
2. 每个变量会被初始化成其类型的默认值
    1. 整型和浮点型变量的默认值为`0`
    2. 字符串变量的默认值为`空字符串`
    3. 布尔型变量默认为`false`
    4. 切片、函数、指针变量的默认为`nil`
:::
当然我们也可在声明变量的时候为其指定初始值。变量初始化的标准格式如下：
```shell
var 变量名 类型 = 表达式
```
举个例子：
```go
var name string = "Q1mi"
var age int = 18
var school  = "清华大学"
```
或者一次初始化多个变量
```go
package main

import "fmt"

func main() {
	var name1, age1 = "Q1mi", 20
	var (
		name string = "清华大学"
		age         = 18
	)
	fmt.Println(name, age, age1, name1)
}
```
## 3. 常量
::: tip 提示
1. 常量是一个简单值的标识符，在程序运行时，不会被修改的量
2. 常量中的数据类型只可以是布尔型、数字型（整数型、浮点型和复数）和字符串型
3. 常量的声明和变量声明非常类似，只是把`var`换成了`const`，常量在定义的时候必须赋值
:::
常量的定义:
```shell
const identifier [type] = value
```
```go
func test() {
   const LENGTH = 10         //隐式类型定义,编译器根据变量的值来推断其类型
   const WIDTH string = "开心" // 显式类型定义
   fmt.Println(LENGTH, WIDTH)
}
```

const同时声明多个常量时，如果省略了值则表示和上面一行的值相同。 例如：
```go
package main

import "fmt"

func main() {
	const (
		n1 = 100
		n2
		n3
	)
	fmt.Println(n1, n2, n3) // 常量n1、n2、n3的值都是100。
}
```
## 3. 数据类型之布尔类型bool
::: tip 提示
1. 一个简单的例子：`var b bool = true`
2. 布尔型的值只可以是常量 `true` 或者 `false`
3. `两个类型相同的值`可以使用相等 `==` 或者不等 `!=` 运算符来进行比较并获得一个布尔型的值
4. 当相等运算符两边的值是完全相同的值的时候会返回 true，否则返回 false，并且只有`在两个的值的类型相同的情况下`才可以使用。
5. 布尔型变量命名,可以以 `is` 或者 `Is` 开头的 `isSorted`、`isFinished`、`isVisible`，使用这样的命名能够在阅读代码的获得阅读正常语句一样的良好体验
:::
## 4. 运算符
[go语言运算符](https://www.runoob.com/go/go-operators.html)
###   4.1 算术运算符

下表列出了所有Go语言的算术运算符。假定 A 值为 10，B 值为 20。

| 运算符 | 描述 | 实例               |
| :----- | :--- | :----------------- |
| +      | 相加 | A + B 输出结果 30  |
| -      | 相减 | A - B 输出结果 -10 |
| *      | 相乘 | A * B 输出结果 200 |
| /      | 相除 | B / A 输出结果 2   |
| %      | 求余 | B % A 输出结果 0   |
| ++     | 自增 | A++ 输出结果 11    |
| --     | 自减 | A-- 输出结果 9     |

###   4.2   关系运算符

下表列出了所有Go语言的关系运算符。假定 A 值为 10，B 值为 20。

| 运算符 | 描述                                                         | 实例              |
| :----- | :----------------------------------------------------------- | :---------------- |
| ==     | 检查两个值是否相等，如果相等返回 True 否则返回 False。       | (A == B) 为 False |
| !=     | 检查两个值是否不相等，如果不相等返回 True 否则返回 False。   | (A != B) 为 True  |
| >      | 检查左边值是否大于右边值，如果是返回 True 否则返回 False。   | (A > B) 为 False  |
| <      | 检查左边值是否小于右边值，如果是返回 True 否则返回 False。   | (A < B) 为 True   |
| >=     | 检查左边值是否大于等于右边值，如果是返回 True 否则返回 False。 | (A >= B) 为 False |
| <=     | 检查左边值是否小于等于右边值，如果是返回 True 否则返回 False。 | (A <= B) 为 True  |

###   4.3   逻辑运算符

下表列出了所有Go语言的逻辑运算符。假定 A 值为 True，B 值为 False。

| 运算符 | 描述                                                         | 实例               |
| :----- | :----------------------------------------------------------- | :----------------- |
| &&     | 逻辑 AND 运算符。 如果两边的操作数都是 True，则条件 True，否则为 False。 | (A && B) 为 False  |
| \|\|   | 逻辑 OR 运算符。 如果两边的操作数有一个 True，则条件 True，否则为 False。 | (A \|\| B) 为 True |
| !      | 逻辑 NOT 运算符。 如果条件为 True，则逻辑 NOT 条件 False，否则为 True。 | !(A && B) 为 True  |

###   4.4   赋值运算符

| 运算符 | 描述                                           | 实例                                  |
| :----- | :--------------------------------------------- | :------------------------------------ |
| =      | 简单的赋值运算符，将一个表达式的值赋给一个左值 | C = A + B 将 A + B 表达式结果赋值给 C |
| +=     | 相加后再赋值                                   | C += A 等于 C = C + A                 |
| -=     | 相减后再赋值                                   | C -= A 等于 C = C - A                 |
| *=     | 相乘后再赋值                                   | C *= A 等于 C = C * A                 |
| /=     | 相除后再赋值                                   | C /= A 等于 C = C / A                 |
| %=     | 求余后再赋值                                   | C %= A 等于 C = C % A                 |
| <<=    | 左移后赋值                                     | C <<= 2 等于 C = C << 2               |
| >>=    | 右移后赋值                                     | C >>= 2 等于 C = C >> 2               |
| &=     | 按位与后赋值                                   | C &= 2 等于 C = C & 2                 |
| ^=     | 按位异或后赋值                                 | C ^= 2 等于 C = C ^ 2                 |
| \|=    | 按位或后赋值                                   | C \|= 2 等于 C = C \| 2               |

## 5. 数据类型之字符串类型string
::: tip 提示
1. 字符串就是一串固定长度的字符连接起来的字符序列。
2. Go 的字符串是由单个字节连接起来的。
3. Go 语言的字符串的字节使用 UTF-8 编码标识 Unicode 文本。
:::
###   5.1 字符串定义

[go语言中的单引号,双引号和反引号](https://blog.csdn.net/random_w/article/details/101544069)

go语言中字符串定义:  建议直接用 <font style="color:blue;font-weight:bold">双引号</font>
###   5.2 字符串拼接
:::   danger 注意
 <font style="color:red;font-weight:bold">总结: </font> 一般对于少量的字符串拼接可以直接用+来连接，不过最好的方法还是Builder。
:::

[golang中的字符串拼接](https://www.cnblogs.com/mambakb/p/10352138.html)

 <font style="color:blue;font-weight:bold">+ 连接两个字符串</font> 

这与python类似，不过由于golang中的字符串是不可变的类型，因此用 + 连接会产生一个新的字符串对效率有影响。

```gp
func main() {
	s := "开心"
	b := "一下"
	sb := s + b
	fmt.Println(sb)
}

输出:
开心一下
```

 <font style="color:blue;font-weight:bold">Builder</font>

性能较优, 官网推荐

```go
func main() {
	s := "开心1"
	b := "一下"
	// 需要先导入Strings包
	var build strings.Builder
	build.WriteString(s)
	build.WriteString(b)
	sb := build.String()
	fmt.Println(sb)
}
```
## 6. 流程控制之条件语句
###   6.1 if语句
```go
package main

import (
	"fmt"
)

func main() {
	a := 1
	if a > 5 {
		fmt.Println("a大于5")
	} else if a == 5 {
		fmt.Println("a等于5")
	} else {
		fmt.Println("a小于5")
	}
}
```
###   6.2 switch语句
::: tip 提示
<font style="color:blue;font-weight:bold">fallthrough </font> 使用 `fallthrough`会强制执行后面的 case 语句，`fallthrough` 不会判断下一条 case 的表达式结果是否为 true; `fallthrough`必须是 `case` 语句块中的最后一条语句
:::
```go
package main

import (
	"fmt"
)

func main() {
	a := 99
	switch {
	case a >= 90:
		fmt.Println("优秀")
		//fallthrough
	case a >= 80:
		fmt.Println("良好")
	default:
		fmt.Println("一般")
	}
}
```
##  7. 流程控制之循环语句for
### 7.1 循环控制语句break和continue
1. `break` 跳出全部循环
2. `continue` 跳出本次循环 ,进行下一轮循环
### 7.2 第一种写法
和 C 语言的 for 一样
```shell
for condition { }
```
示例:
```go
func test() {
   a := 1
   for a <= 10 {
      a += a
   }
   fmt.Println(a)
}
```
### 7.3 第二种写法
和 C 语言的 for 一样
```shell
for init; condition; post { }
```
1. init： 一般为赋值表达式，给控制变量赋初值；
2. condition： 关系表达式或逻辑表达式，循环控制条件；
3. post： 一般为赋值表达式，给控制变量增量或减量。

示例
```go
func test() {
	sum := 0
	for i := 0; i <= 10; i++ {
		sum += i
	}
	fmt.Println(sum)
}
```
### 7.4 第三种写法
和 C 的 `for(;;)` 一样
```shell
for { }
```
示例
```go
func test() {
	sum := 0
	for {
		sum++ // 无限循环下去
	}
	fmt.Println(sum) // 无法输出
}
```
### 7.5 goto跳转到指定标签
```go
package main

import (
	"fmt"
)

func main() {
	gotoDemo2()
}
func gotoDemo2() {
	for i := 0; i < 10; i++ {
		for j := 0; j < 10; j++ {
			if j == 2 {
				// 设置退出标签
				goto breakTag
			}
			fmt.Printf("%v-%v\n", i, j)
		}
	}
	return
	// 标签
breakTag:
	fmt.Println("结束for循环")
}
```

