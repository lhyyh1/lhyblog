#   函数和数组(切片)
##  1. 函数
::: tip 提示
1. 函数是组织好的、可重复使用的、用于执行指定任务的代码块。
2. Go语言中支持函数、匿名函数和闭包，并且函数在Go语言中属于“一等公民”。
:::
### 1.1 函数的定义
::: danger 提示
Go语言中定义函数使用`func`关键字
:::
具体格式如下:
```shell
func 函数名(参数)(返回值){
    函数体
}
```
1. 函数名：由字母、数字、下划线组成。但函数名的第一个字母不能是数字。在同一个包内，函数名也称不能重名;
2. 参数：<font color="blue"><b>参数由参数变量和参数变量的类型组成，多个参数之间使用,分隔</b></font>。
3. 返回值：<font color="color"><b>返回值由返回值变量和其变量类型组成，也可以只写返回值的类型，多个返回值必须用()包裹，并用,分隔。</b></font>
4. 函数体：实现指定功能的代码块。

<font color="blue"><b>定义一个求两个数之和的函数</b></font>
```go
package main

import "fmt"

func main() {
	sumNum := sumNum(100, 200)
	fmt.Println(sumNum) //300
}

// 定义获取两个数之和的函数
func sumNum(x int, y int) int {
	return x + y
}
```

<font color="blue"><b>函数的参数和返回值都是可选的</b></font>
```go
package main

import "fmt"

func main() {
	sumNum := sayHello()
	fmt.Println(sumNum) //300
	sayWorld()          //无敌多磨寂寞
	sayGirl("你好呀,妹子")   //你好呀,妹子
}

// 没有参数, 有返回值
func sayHello() string {
	return "开心就好"
}

// 没有参数,没有返回值
func sayWorld() {
	fmt.Println("无敌多磨寂寞")
}

// 有参数, 没有返回值
func sayGirl(talk string) {
	fmt.Println(talk)
}
```
### 1.2 函数的调用
::: tip 提示
定义了函数之后，我们可以通过`函数名()`的方式调用函数
:::
<font color="blue"><b>我们调用上面定义的函数，代码如下：</b></font>
```go
func main() {
	sumNum := sayHello()
	fmt.Println(sumNum) //300
	sayWorld()          //无敌多磨寂寞
	sayGirl("你好呀,妹子")   //你好呀,妹子
}
```
<font color="blue"><b>注意，调用有返回值的函数时，可以不接收其返回值。</b></font>

### 1.3 参数类型简写
::: tip 提示
函数的参数中如果相邻变量的类型相同，则可以省略类型
:::
```go
package main

import "fmt"

func main() {
	sumNum := sumNum(100, 200)
	fmt.Println(sumNum) //300
}

// 定义获取两个数之和的函数
func sumNum(x, y int) int {
	return x + y
}
```
上面代码中, `sumNum`函数有两个参数, 这两个参数的类型均为`int`, 因此可以省略`x`的类型, 因为`y`后面有类型说明,`x`参数也是该类型。
### 1.4 可变参数
::: danger 注意
1. 可变参数是指函数的参数数量不固定。Go语言中的可变参数通过在参数名后加...来标识。
2. 注意：可变参数通常要作为函数的最后一个参数。
3. 本质上，函数的可变参数是通过切片来实现的。
:::
```go
package main

import "fmt"

func main() {
	sumNum := sumNum(1, 2, 3, 4)
	fmt.Println(sumNum) // 10
}

func sumNum(x ...int) int {
	sum := 0
	for _, v := range x {
		sum += v
	}
	return sum
}
```
<font color="blue"><b>固定参数搭配可变参数使用时，可变参数要放在固定参数的后面</b></font>
```go
package main

import "fmt"

func main() {
	name, sumNum := sumNum("我叫命名", 1, 2, 3, 4)
	fmt.Println(name, sumNum) //我叫命名 10
}

func sumNum(name string, x ...int) (string, int) {
	sum := 0
	for _, v := range x {
		sum += v
	}
	return name, sum
}
```
### 1.5 返回值之多返回值
::: tip 提示
1. Go语言中通过return关键字向外输出返回值。
2. Go语言中函数支持多返回值，函数如果有多个返回值时必须用`()`将所有返回值包裹起来。
:::
```go
func calc(x, y int) (int, int) {
	sum := x + y
	sub := x - y
	return sum, sub
}
```
### 1.6 返回值之返回值命名
::: danger 注意了
函数定义时可以给返回值命名，并在函数体中直接使用这些变量，最后通过return关键字返回。
:::
```go
func calc(x, y int) (sum, sub int) {
	sum = x + y
	sub = x - y
	return
}
```
### 1.7 返回值补充
::: tip 提示
当我们的一个函数返回值类型为slice时，nil可以看做是一个有效的slice，没必要显示返回一个长度为0的切片。
:::
```go
func someFunc(x string) []int {
	if x == "" {
		return nil // 没必要返回[]int{}
	}
	...
}
```
###   1.8 函数类型
:::   tip 提示
1. 我们可以使用type关键字来定义一个函数类型
2. 函数也是一种数据类型，可以通过type给它取别名
3. calculation是一种函数类型，后面的函数没有名称，没有{}，只要参数和返回值类型相同就行
4. 这种用法便于实现多态性
:::
<font color="blue"><b>具体格式如下:</b></font>
```shell
type calculation func(int, int) int
```
上面语句定义了一个calculation类型，它是一种函数类型，这种函数接收两个int类型的参数并且返回一个int类型的返回值。

简单来说，凡是满足这个条件的函数都是calculation类型的函数，例如下面的add和sub是calculation类型
```go
func add(x, y int) int {
	return x + y
}

func sub(x, y int) int {
	return x - y
}
```
add和sub都能赋值给calculation类型的变量。
```go
var c calculation
c = add
```
<font color="blue"><b>demo:</b></font>
```go
package main

import "fmt"

type calculation func(int, int) int

func add(x, y int) int {
	return x + y
}

func main() {
	var c calculation
	c = add
	result := c(10, 30)
	fmt.Println(result)
}
```
###   1.9 函数类型变量
::: tip 提示
我们可以声明函数类型的变量并且为该变量赋值
:::
```go
package main

import "fmt"

type calculation func(int, int) int

func add(x, y int) int {
	return x + y
}

func main() {
	var c calculation   //声明一个calculation类型的变量c
	c = add             //把add赋值给c
	result := c(10, 30) //像调用add一样调用c
	fmt.Println(result)
}
```
###   1.10 函数作为参数
::: tip 提示
1. 函数是一种类型，因此可以将某个定义的函数作为参数传递给其他的函数
2. 函数是可以执行的，带有返回值的; 因此，可以将一个`执行函数`作为参数传递给其他函数，`执行函数`的返回值作为参数传递给其他的函数，因此`执行函数`的返回值满足参数的类型即可
:::
```go
package main

import "fmt"

func add(x, y int) int {
	return x + y
}
func calc(x, y int, op func(int, int) int) int {
	return op(x, y)
}

func main() {
	ret2 := calc(10, 21, add)
	fmt.Println(ret2) //31
}
```
###   1.11 函数作为返回值
func()是一个是没有参数，没有返回值的一个函数
```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func sayHello() {
	fmt.Println("hello")
}

func sayHi() {
	fmt.Println("hi")
}

func genFunc() func() {
	rand.Seed(time.Now().Unix())
	if rand.Int()%2 == 0 {
		return sayHello
	} else {
		return sayHi
	}

}

func main() {
	a := genFunc()
	a()
}
```
###   1.12 匿名函数
::: tip 提示
1. 匿名函数就是没有函数名的函数
2. 匿名函数因为没有函数名，所以没办法像普通函数那样调用，所以匿名函数需要保存到某个变量或者作为立即执行函数;
3. 匿名函数多用于实现回调函数和闭包。
:::
格式: 
```shell
func(参数)(返回值){
    函数体
}
```
```go
package main

import "fmt"

func main() {
	// 将匿名函数保存到变量
	add := func(x, y int) {
		fmt.Println(x + y)
	}
	add(10, 20) // 通过变量调用匿名函数

	//自执行函数：匿名函数定义完加()直接执行
	func(x, y int) {
		fmt.Println(x + y)
	}(10, 20)
}
```
###   1.13 [闭包](https://www.bilibili.com/video/av50143975/)
::: tip 提示
闭包指的是一个函数和与其相关的引用环境组合而成的实体。简单来说，`闭包=函数+引用环境`
:::
```go
package main

import "fmt"

func adder() func(int) int {
	var x int
	return func(y int) int {
		x += y
		return x
	}
}
func main() {
	f := adder()
	fmt.Println(f(10)) // 10
	fmt.Println(f(10)) // 20
	fmt.Println(f(10)) // 30
}
```
###   1.14 [defer语句](https://www.bilibili.com/video/av50143975/)
::: danger 注意
1. Go语言中的defer语句会将其后面跟随的语句进行延迟处理。在defer归属的函数即将返回时，将延迟处理的语句按defer定义的逆序进行执行，也就是说，先被defer的语句最后被执行，最后被defer的语句，最先被执行。
2. 由于defer语句延迟调用的特性，所以defer语句能非常方便的处理资源释放问题。比如：资源清理、文件关闭、解锁及记录时间等。
3. defer执行时机: 在Go语言的函数中return语句在底层并不是原子操作，它分为给返回值赋值和RET指令两步。而defer语句执行的时机就在返回值赋值操作后，RET指令执行前。
4. return 语句并不是一条原子指令,有返回值的且带有 defer 函数的方法中， return 语句执行
   1. 返回值赋值
   2. 调用 defer 函数 (在这里是可以修改返回值的)
   3. return 返回值
:::
demo:
```go
func main() {
	fmt.Println("start")
	defer fmt.Println(1)
	defer fmt.Println(2)
	defer fmt.Println(3)
	fmt.Println("end")
}
```
输出结果:
```text
start
end
3
2
1
```
```go
package main

import "fmt"

func f1() int {
	x := 5
	defer func() {
		x++
	}()
	return x
}

func f2() (x int) {
	defer func() {
		x++
	}()
	return 5
}

func f3() (y int) {
	x := 5
	defer func() {
		x++
	}()
	return x
}
func f4() (x int) {
	defer func(x int) {
		x++
	}(x)
	return 5
}
func main() {
	fmt.Println(f1()) //5
	fmt.Println(f2()) //6
	fmt.Println(f3()) //5
	fmt.Println(f4()) //5
}
```
##  2. 变量作用域
::: danger 提示
1. 全局变量是定义在函数外部的变量，它在程序整个运行周期内都有效。 在函数中可以访问到全局变量。
2. 局部变量又分为两种:
    1. 函数内定义的变量无法在该函数外使用
    2. 如果局部变量和全局变量重名，优先访问局部变量。
:::
## 3. 数据类型之数组
:::   tip 提示
1. 数组是同一种数据类型元素的集合。 
2. 在Go语言中，数组从声明时就确定，使用时可以修改数组成员，但是数组长度不可变
:::
<font color="blue"><b>基本语法：定义一个长度为3元素类型为int的数组a</b></font>
```shell
var a [3]int
```
### 3.1 数组定义
```shell
var 数组变量名 [元素数量] 变量类型
```
<font color="blue"><b>比如: `var a [5]int` :</b></font>
   1. 数组的长度必须是常量
   2. 并且长度是数组类型的一部分
   3. 数组一旦定义，长度不能变
   4. `[5]int`和`[10]int`是不同的类型, 因为长度不一样
```go
var a [3]int
var b [4]int
a = b //不可以这样做，因为此时a和b是不同的类型,会报错的!
```
数组可以通过下标进行访问，下标是从0开始，最后一个元素下标是：len-1，访问越界（下标在合法范围之外），则触发访问越界，会panic。
###   3.2 数组的初始化方式一
::: tip 提示
初始化数组时可以使用初始化列表来设置数组元素的值
:::
```go
package main

import (
	"fmt"
)

func main() {
	var testArray [3]int                        //数组会初始化为int类型的零值
	var numArray = [3]int{1, 2}                 //使用指定的初始值完成初始化
	var cityArray = [3]string{"北京", "上海", "深圳"} //使用指定的初始值完成初始化
	fmt.Println(testArray)                      //[0 0 0]
	fmt.Println(numArray)                       //[1 2 0]
	fmt.Println(cityArray)                      //[北京 上海 深圳]
}
```
###   3.3 数组的初始化方式二
::: tip 提示
按照上面的方法每次都要确保提供的初始值和数组长度一致，一般情况下我们可以让编译器根据初始值的个数自行推断数组的长度
:::
```go
package main

import (
	"fmt"
)

func main() {
	var testArray [3]int
	var numArray = [...]int{1, 2}
	var cityArray = [...]string{"北京", "上海", "深圳"}
	fmt.Println(testArray)                          //[0 0 0]
	fmt.Println(numArray)                           //[1 2]
	fmt.Printf("type of numArray:%T\n", numArray)   //type of numArray:[2]int
	fmt.Println(cityArray)                          //[北京 上海 深圳]
	fmt.Printf("type of cityArray:%T\n", cityArray) //type of cityArray:[3]string
}
```
###   3.4 数组的初始化方式三
::: tip 提示
我们还可以使用指定索引值的方式来初始化数组
:::     
```go
package main

import (
	"fmt"
)

func main() {
	a := [...]int{1: 1, 3: 5}
	fmt.Println(a)                  // [0 1 0 5]
	fmt.Println(a[3])               // 5
	fmt.Printf("type of a:%T\n", a) //type of a:[4]int
}
```
###   3.5 数组的遍历
::: tip 提示
遍历数组a有以下两种方法
:::
```go
package main

import (
	"fmt"
)

func main() {
	var a = [...]string{"北京", "上海", "深圳"}
	// 方法1：for循环遍历
	for i := 0; i < len(a); i++ {
		fmt.Println(i, a[i])
	}
	fmt.Println("..........................")
	// 方法2：for range遍历   index索引  value元素值
	for index, value := range a {
		fmt.Println(index, value)
	}
}
```
###   3.6 多纬数组
::: tip 提示
1. Go语言是支持多维数组的，我们这里以二维数组为例（数组中又嵌套数组）
2. 注意： 多维数组只有第一层可以使用`...`来让编译器推导数组长度。
:::
<font color="blue"><b>二维数组的定义</b></font>
```go
package main

import (
	"fmt"
)

func main() {
	a := [3][2]string{
		{"北京", "上海"},
		{"广州", "深圳"},
		{"成都", "重庆"},
	}
	fmt.Println(a)       //[[北京 上海] [广州 深圳] [成都 重庆]]
	fmt.Println(a[2][1]) //支持索引取值:重庆
}
```
<font color="blue"><b>二维数组的遍历</b></font>
```go
package main

import (
	"fmt"
)

func main() {
	a := [3][2]string{
		{"北京", "上海"},
		{"广州", "深圳"},
		{"成都", "重庆"},
	}
	for _, v1 := range a {
		for _, v2 := range v1 {
			fmt.Println(v2)
		}
	}
}
```
###   3.7 数组是值类型
::: tip 提示
1. 数组是值类型，赋值和传参会复制整个数组。因此改变副本的值，不会改变本身的值
2. 数组支持 “==“、”!=” 操作符，因为内存总是被初始化过的。
3. [n]*T表示指针数组，*[n]T表示数组指针 。
:::
```go
package main

import "fmt"

func modifyArray(x [3]int) {
	x[0] = 100
}

func main() {
	a := [3]int{10, 20, 30}
	modifyArray(a) //在modify中修改的是a的副本x
	fmt.Println(a) //[10 20 30]
}
```
## 4. 数组和切片的区别
:::   danger 重要来了
1. 长度方面
   1. 数组的长度是固定的,长度是数组的一部分, 例如`[5]int`
   2. 切片长度不固定, 例如`[]int`
2. 切片的底层是是数组, 切片可以看做是动态数组
3. 还有其他区别, 以后理解透彻之后再完善
:::
## 5. 数据类型之切片
::: tip  提示
1. Go 语言切片是对数组的抽象。
2. 数组长度不可改变, 操作起来不方便, go专门提供了切片("动态数组")
3. 切片与数组相比, 可以动态操作元素, 使用的频率更高
4. 切片是一个引用类型，它的内部结构包含`地址`、`长度`和`容量`。切片一般用于快速地操作一块数据集合。
:::
###   5.1 切片的定义和初始化
<font color="blue"><b>定义切片：</b></font>
```shell
var name []T
```
1. `name`: 表示变量名
2. `T`: 表示切片中的元素类型 
3. `[]`: 表示是切片类型

<font color="blue"><b>切片的初始化：</b></font>
```shell
s :=[] int {1,2,3 } 
```
直接初始化切片，[] 表示是切片类型，{1,2,3} 初始化值依次是 1,2,3，其 cap=len=3。
```go
package main

import (
	"fmt"
)

func main() {
	// 声明切片类型
	var a []string              //声明一个字符串切片
	var b = []int{1, 2, 3}      //声明一个整型切片并初始化为1,2,3
	var c = []bool{false, true} //声明一个布尔切片并初始化
	// var d = []bool{false, true} //声明一个布尔切片并初始化
	fmt.Println(a)        //[]
	fmt.Println(b)        //[1 2 3]
	fmt.Println(c)        //[false true]
	fmt.Println(a == nil) //true
	fmt.Println(b == nil) //false
	fmt.Println(c == nil) //false
	// fmt.Println(c == d)  //切片是引用类型，不支持直接比较，只能和nil比较
}
```
###   5.2 make()函数动态构造切片
::: tip 提示
如果需要动态的创建一个切片，我们就需要使用内置的`make()`函数
:::
```shell
make([]T, size, cap)
```
1. T:切片的元素类型
2. size:切片中元素的数量
3. cap:切片的容量

```go
package main

import (
	"fmt"
)

func main() {
	a := make([]int, 2, 10)
	fmt.Println(a)      //[0 0]
	fmt.Println(len(a)) //2 切片的长度
	fmt.Println(cap(a)) //10 切片的容量
}
```
::: danger 示例说明
上面代码中`a`的内部存储空间已经分配了`10`个，但实际上只用了`2`个。 容量并不会影响当前元素的个数，所以`len(a)`返回`2`，`cap(a)`则返回该切片的容量。
:::
###   5.3 切片的长度和容量
切片拥有自己的长度和容量，我们可以通过使用内置的`len(变量)`函数求长度，使用内置的`cap(变量)`函数求切片的容量。
###   5.4  判断切片是否为空
要检查切片是否为空，请始终使用`len(s) == 0`来判断，而不应该使用`s == nil`来判断。
###   5.5 切片不能直接比较
1. 切片之间是不能比较的，我们不能使用==操作符来判断两个切片是否含有全部相等元素
2. 切片唯一合法的比较操作是和`nil`比较
3. 一个`nil`值的切片并没有底层数组，一个`nil`值的切片的长度和容量都是`0`;
4. 但是我们不能说一个长度和容量都是0的切片一定是nil，例如下面的示例：
```go
package main

import (
	"fmt"
)

func main() {
	s2 := []int{}
	fmt.Println(len(s2))   //0
	fmt.Println(cap(s2))   //0
	fmt.Println(s2 == nil) //false
}
```
::: danger 特别注意
所以要判断一个切片是否是空的，要是用len(s) == 0来判断，不应该使用s == nil来判断。
:::
###   5.6 空(nil)切片
一个切片在未初始化之前默认为 `nil`，长度和容量都为 `0`
###   5.7 对数组进行切片操作
```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	a := [11]int{1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4}
	b := a[2:4] // 含左不含右
	c := a[:4]
	d := a[:] // 拷贝数组所有元素
	e := a[5:]
	fmt.Println(reflect.TypeOf(b)) //[]int
	fmt.Println(b)                 // [3 4]
	fmt.Println(c)                 // [1 2 3 4]
	fmt.Println(d)                 // [1 2 3 4 5 6 7 1 2 3 4]
	fmt.Println(e)                 // [6 7 1 2 3 4]
}
```
###   5.8 切片的拷贝复制
::: danger 特别注意
切片拷贝前后两个变量共享底层数组，对一个切片的修改会影响另一个切片的内容
:::
```go
package main

import (
	"fmt"
)

func main() {
	s1 := []int{20, 50, 100}
	s2 := s1        //将s1直接赋值给s2，s1和s2共用一个底层数组
	s2[0] = 100     //s2修改第一个元素后,s1的第一个元素值也会变化
	fmt.Println(s1) //[100 50 100]
	fmt.Println(s2) //[100 50 100]
}
```
###   5.9 切片的遍历访问和数组一样
```go
package main

import (
	"fmt"
)

func main() {
	var a = []string{"北京", "上海", "深圳"}
	// 方法1：for循环遍历
	for i := 0; i < len(a); i++ {
		fmt.Println(i, a[i])
	}
	fmt.Println("..........................")
	// 方法2：for range遍历   index索引  value元素值
	for index, value := range a {
		fmt.Println(index, value)
	}
}
```
###   5.10 切片元素修改值
```go
package main

import (
	"fmt"
)

func main() {
	s1 := []int{20, 50, 100}
	fmt.Println("修改之前的切片", s1) //修改之前的切片 [20 50 100]
	s1[1] = 501
	//切片第二个元素修改为501后的切片 [20 501 100]
	fmt.Println("切片第二个元素修改为501后的切片", s1)
}
```
###   5.11 append()方法为切片添加元素
:::   tip 提示
Go语言的内建函数append()可以为切片动态添加元素。
1. 可以一次添加一个元素
2. 可以添加多个元素
3. 可以添加另一个切片中的元素（后面加`…`）
:::
```go
package main

import "fmt"

func main() {
	var s []int
	// 添加一个元素
	s = append(s, 1)
	fmt.Println(s) // [1]
	// 添加多个元素
	s = append(s, 2, 3, 4)
	fmt.Println(s) // [1 2 3 4]
	// 添加另一个切片的元素
	s2 := []int{5, 6, 7}
	s = append(s, s2...)
	fmt.Println(s) // [1 2 3 4 5 6 7]
}
```
<font color="blue"><b>注意：通过var声明的零值切片可以在append()函数直接使用，无需初始化。</b></font>
```go
var s []int
s = append(s, 1, 2, 3)
```
<font color="color"><b>没有必要像下面的代码一样初始化一个切片再传入`append()`函数使用</b></font>
```go
s := []int{}  // 没有必要初始化{} 
s = append(s, 1, 2, 3)

var s = make([]int)  // 没有必要初始化
s = append(s, 1, 2, 3)
```
每个切片会指向一个底层数组，这个数组的容量够用就添加新增元素。当底层数组不能容纳新增的元素时，切片就会自动按照一定的策略进行“扩容”，此时该切片指向的底层数组就会更换。“扩容”操作往往发生在append()函数调用时，所以我们通常都需要用原变量接收append函数的返回值。
###   5.12 从切片中删除元素
::: tip 提示
1. Go语言中并没有删除切片元素的专用方法，我们可以使用切片本身的特性来删除元素
2. 要从切片a中删除索引为index的元素，操作方法是a = append(a[:index], a[index+1:]...)
:::
```go
package main

import "fmt"

func main() {
	// 从切片中删除元素
	a := []int{30, 31, 32, 33, 34, 35, 36, 37}
	// 要删除索引为2的元素
	a = append(a[:2], a[3:]...)
	fmt.Println(a) //[30 31 33 34 35 36 37]
}
```
###   5.13 使用copy()函数复制切片
::: tip 提示
Go语言内建的copy()函数可以迅速地将一个切片的数据复制到另外一个切片空间中，copy()函数的使用格式如下：

copy(destSlice, srcSlice []T)
1. srcSlice: 数据来源切片
2. destSlice: 目标切片
:::
```go
package main

import "fmt"

func main() {
	// copy()复制切片
	a := []int{1, 2, 3, 4, 5}
	c := make([]int, 5, 5)
	copy(c, a)     //使用copy()函数将切片a中的元素复制到切片c
	fmt.Println(a) //[1 2 3 4 5]
	fmt.Println(c) //[1 2 3 4 5]
	c[0] = 1000    // 修改切片c, 但a不会发生变化
	fmt.Println(a) //[1 2 3 4 5]
	fmt.Println(c) //[1000 2 3 4 5]
}
```



