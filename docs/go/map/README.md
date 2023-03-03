#   Map,指针,值传递,引用传递
##  1. 数据类型之Map
::: tip 提示
1. Go语言中提供的映射关系容器为`map`，其内部使用`散列表（hash）`实现
2. `map`是一种无序的基于`key-value`的数据结构
3. `map`和切片类型一样, 是引用类型，必须初始化才能使用。
:::
### 1.1 map定义
<font color="blue"><b>map的定义语法</b></font>
```shell
map[KeyType]ValueType
```
1. KeyType: 表示键的类型。
2. ValueType:表示键对应的值的类型。

<font color="color"><b>`map`类型的变量默认初始值为`nil`，需要使用`make()`函数来分配内存。语法为：</b></font>
```shell
make(map[KeyType]ValueType, [cap])
```
::: danger 特别注意
其中`cap`表示`map`的容量，该参数虽然不是必须的，但是我们应该在初始化`map`的时候就为其指定一个合适的容量。
:::
### 1.2 map的基本使用
::: tip 提示
1. map中的数据都是成对出现的
2. map也支持在声明的时候填充元素
:::
<font color="blue"><b>声明一个map,如果只声明,但不初始化，那么就会创建一个 nil map。nil map 不能用来存放键值对</b></font>
```go
package main

import "fmt"

func main() {
	var school map[string]int  // 声明一个map,名字叫school
	fmt.Println(school)        // map[] 声明没有初始化, 会创建一个nil map
	fmt.Println(school == nil) //true
}
```

<font color="blue"><b>make内存之后才能存放键值对</b></font>
```go
package main

import "fmt"

func main() {
	var school map[string]int        // 声明创建
	school = make(map[string]int, 8) // 分配内存
	// school := make(map[string]int, 8) // 直接这样写也可以
	school["age"] = 19
	school["money"] = 2000
	fmt.Println(school) // map[age:19 money:2000]
}
```

<font color="blue"><b>map也支持在声明的时候填充元素</b></font>
```go
package main

import "fmt"

func main() {
	userInfo := map[string]string{
		"username": "沙河小王子",
		"password": "123456",
	}
	fmt.Println(userInfo) //map[password:123456 username:沙河小王子]
}
```
### 1.3 判断某个键是否存在
::: tip 提示
Go语言中有个判断map中键是否存在的特殊写
:::
<font color="blue"><b>格式:</b></font>
```shell
value, ok := map[key]
```
1. 如果key存在ok为true,value为对应的值
2. 不存在ok为false,value为值类型的零值
### 1.4 map的遍历
::: tip 提示
1. Go语言中使用for range遍历map
2. 注意： 遍历map时的元素顺序与添加键值对的顺序无关
:::
```go
package main

import "fmt"

func main() {
	scoreMap := make(map[string]int)
	scoreMap["张三"] = 90
	scoreMap["小明"] = 100
	scoreMap["娜扎"] = 60
	fmt.Println("遍历kv")
	for k, v := range scoreMap {
		fmt.Println(k, v)
	}
	fmt.Println("遍历k")
	for k := range scoreMap {
		fmt.Println(k)
	}
	fmt.Println("遍历v")
	for _, v := range scoreMap {
		fmt.Println(v)
	}
}
```
### 1.5 使用delete()函数删除键值对
::: tip 提示
使用delete()内建函数从map中删除一组键值对
:::
<font color="blue"><b>格式:</b></font>
```shell
delete(map, key)
```
1. map:表示要删除键值对的map
2. key:表示要删除的键值对的键
```go
package main

import "fmt"

func main() {
	scoreMap := make(map[string]int)
	scoreMap["张三"] = 90
	scoreMap["小明"] = 100
	scoreMap["娜扎"] = 60
	delete(scoreMap, "小明") //将小明:100从map中删除
	for k, v := range scoreMap {
		fmt.Println(k, v)
	}
}
```
### 1.6 按照指定顺序遍历map
```go
package main

import (
	"fmt"
	"math/rand"
	"sort"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano()) //初始化随机数种子

	var scoreMap = make(map[string]int, 200)

	for i := 0; i < 100; i++ {
		key := fmt.Sprintf("stu%02d", i) //生成stu开头的字符串
		value := rand.Intn(100)          //生成0~99的随机整数
		scoreMap[key] = value
	}
	//取出map中的所有key存入切片keys
	var keys = make([]string, 0, 200)
	for key := range scoreMap {
		keys = append(keys, key)
	}
	//对切片进行排序
	sort.Strings(keys)
	//按照排序后的key遍历map
	for _, key := range keys {
		fmt.Println(key, scoreMap[key])
	}
}
```
### 1.7 元素为map类型的切片
```go
package main

import (
	"fmt"
)

func main() {
	var mapSlice = make([]map[string]string, 3)
	for index, value := range mapSlice {
		fmt.Printf("index:%d value:%v\n", index, value)
	}
	fmt.Println("after init")
	// 对切片中的map元素进行初始化
	mapSlice[0] = make(map[string]string, 10)
	mapSlice[0]["name"] = "小王子"
	mapSlice[0]["password"] = "123456"
	mapSlice[0]["address"] = "沙河"
	for index, value := range mapSlice {
		fmt.Printf("index:%d value:%v\n", index, value)
	}
}
```
### 1.8 值为切片类型的map
```go
package main

import (
	"fmt"
)

func main() {
	var sliceMap = make(map[string][]string, 3)
	fmt.Println(sliceMap)     //map[]
	fmt.Println("after init") //after init
	key := "中国"
	value, ok := sliceMap[key]
	if !ok {
		value = make([]string, 0, 2)
	}
	value = append(value, "北京", "上海")
	sliceMap[key] = value
	fmt.Println(sliceMap) //map[中国:[北京 上海]]
}
```
##  2. range 关键字
::: tip 提示
go 语言中 range 关键字用于 for 循环中迭代数组(array)、切片(slice)、通道(channel)或集合(map)的元素。在数组和切片中它返回元素的索引和索引对应的值，在集合中返回 key-value 对。
:::
```go
package main

import "fmt"

func main() {
	nums := map[string]string{
		"name":  "小明",
		"class": "二班",
	}
	fmt.Println(nums)
	for k, v := range nums {
		fmt.Println(k, v)
	}
}
```
##  3. 指针
::: tip 提示
1. 任何程序数据载入内存后，在内存都有他们的地址，这就是指针。
2. 为了保存一个数据在内存中的地址，我们就需要指针变量。
3. Go语言中的指针不能进行偏移和运算
:::
### 3.1 取地址`&`
::: tip 提示
1. 每个变量在运行时都拥有一个地址，这个地址代表变量在内存中的位置。Go语言中使用&字符放在变量前面对变量进行“取地址”操作。
2.  Go语言中的值类型（int、float、bool、string、array、struct）都有对应的指针类型，如：*int、*int64、*string等。
:::
<font color="blue"><b>取变量指针的语法</b></font>
```shell
ptr := &v    // v的类型为T
```
1. v:代表被取地址的变量，类型为T
2. ptr:用于接收地址的变量，ptr的类型就为*T，称做T的指针类型。*代表指针。
```go
package main

import "fmt"

func main() {
	a := 10
	b := &a
	c := &b
	fmt.Printf("a:%d ptr:%p\n", a, &a) // a:10 ptr:0xc00001a078
	fmt.Printf("b:%p type:%T\n", b, b) // b:0xc00001a078 type:*int
	fmt.Println(c)                     // 0xc00000e018
	fmt.Println(&b)                    // 0xc00000e018
}
```
### 3.2 指针取值`*`
:::tip 提示
1. 就是这个内存地址对应的值
2. 在对普通变量使用&操作符取地址后会获得这个变量的指针，然后可以对指针使用*操作，也就是指针取值
:::
```go
package main

import "fmt"

func main() {
	//指针取值
	a := 10
	b := &a // 取变量a的地址，将指针保存到b中
	fmt.Printf("type of b:%T\n", b) //type of b:*int
	c := *b // 指针取值（根据指针去内存取值）
	fmt.Printf("type of c:%T\n", c) //type of c:int
	fmt.Printf("value of c:%v\n", c) //value of c:10
	fmt.Println(c) // 10
}
```
::: danger 注意
总结： 取地址操作符&和取值操作符*是一对互补操作符，&取出地址，*根据地址取出地址指向的值。
1. 对变量进行`取地址（&）`操作，可以获得这个变量的指针变量
2. 指针变量的值是指针地址
3. 对指针变量进行取值（*）操作，可以获得指针变量指向的原变量的值。
:::
### 3.3 指针传值
```go
package main

import "fmt"

func modify1(x int) {
	x = 100
}

func modify2(x *int) {
	*x = 100
}

func main() {
	a := 10
	modify1(a)
	fmt.Println(a) // 10
	modify2(&a)
	fmt.Println(a) // 100
}
```
##  4. 值传递和引用传递
::: danger 理解
1.  Go语言中五个`引用类型`变量(其他都是值类型),`slice`,`map`,`channel`,`interface`,`func()`
2.  `引用类型`作为参数时,称为浅拷贝,形参改变,实参数跟随变化.因为传递的是地址,形参和实参都指向同一块地址
3.  `值类型`作为参数时,称为深拷贝,形参改变,实参不变,因为传递的是值的副本,形参会新开辟一块空间,与实参指向不同
4.  如果希望值类型数据在修改形参时实参跟随变化,可以把参数设置为指针类型
:::
### 4.1 值类型作为参数,形参改变,实参不变
```go
package main

import "fmt"

func demo(i int, s string) {
	i = 5
	s = "改变"
}

func main() {
	i := 1
	s := "原值"
	demo(i, s)
	fmt.Println(i, s) //输出:1 原值
}
```
### 4.2 引用类型作为参数,形参改变,实参跟随改变
```go
ackage main

import "fmt"

func demo(i map[string]string) {
	i["type"] = "类型"
}

func main() {
	i := map[string]string{
		"name":  "小明",
		"class": "二班",
	}
	demo(i)
	fmt.Println(i) //map[class:二班 name:小明 type:类型]
}
```
### 4.3 利用指针实现实参跟随形参变化
```go
package main

import "fmt"

func demo(i *int, s *string) {
	*i = 5
	*s = "改变"
}

func main() {
	i := 1
	s := "原值"
	demo(&i, &s)
	fmt.Println(i, s) //输出:5 改变
}
```