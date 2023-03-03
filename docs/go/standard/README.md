#   Go语言常用标准库
##  1. 标准库之fmt与格式化占位符
::: tip 提示
标准库fmt提供了以下几种输出相关函数。
:::
### 1.1 fmt.Print和fmt.PrintIn
::: tip 都是打印输出
1. Println 打印的每一项之间都会有空行，Print没有
2. Println 会自动换行，Print 不会
:::
```go
package main

import "fmt"

func main() {
	fmt.Println("我", "要", "好", "好", "学习")
	fmt.Println("我", "要", "好", "好", "学习")
	fmt.Print("我", "要", "好", "好", "学习")
	fmt.Print("我", "要", "好", "好", "学习")
}
```
输出结果
```text
PS F:\go> go run .\main.go
我 要 好 好 学习
我 要 好 好 学习        
我要好好学习我要好好学习
PS F:\go> 
```
### 1.2 fmt.Printf
::: tip 格式化输出, 其常用占位符
1. `%s` 字符串或切片的无解译字节
2. `%d` 整数的十进制表示
3. `%g` 浮点数, 例如123.456 
4. `%t` 布尔型
::: 
```go
package main
import "fmt"
func main() {
	fmt.Printf("a=%s, b=%d, c=%g", "开心", 20, 12.222)
}
```
输出结果:
```text
PS F:\go> go run .\main.go
a=开心, b=20, c=12.222
```
##  2. 标准库之reflect
::: tip 提示
1. 反射指的是一个程序可以在运行时检查变量以及它的值并查找他们的类型
2. 在Go语言的反射机制中，任何接口值都由是`一个具体类型`和`具体类型的值`两部分组成的
:::
### 2.1 TypeOf获取具体类型
```shell
import ("reflect")
reflect.TypeOf(变量名称)
```
```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	array := [5]int{1, 2, 3, 4, 5}
	fmt.Println(array)
	fmt.Println(reflect.TypeOf(array)) // 对象的类型: [5]int 
}
```
### 2.2 ValueOf获取具体类型的值
```shell
import ("reflect")
reflect.ValueOf(变量名称)
```
```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	array := [5]int{1, 2, 3, 4, 5}
	fmt.Println(array)
	fmt.Println(reflect.ValueOf(array)) // 对象的值: [1 2 3 4 5]
}
```