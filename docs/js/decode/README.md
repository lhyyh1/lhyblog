# js
## 1. [jwt令牌解码](https://jwt.io/)
### 1.1 本地解码
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>jwt解码</title>
</head>
<body>
<script>
    let Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR' +
        '5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjM2NTExNjg4LCJuYmYiOjE2M' +
        'zY1MTE2ODgsImV4cCI6MTYzNzcyMTI4OCwicmVmIjoxNjM3NzI' +
        'xMjg4LCJhdWQiOiJhcGkiLCJqdGkiOiI2YTVmZmNiYzRlOTl' +
        'kNDVlMzAwYzgxNzE0YjA3YmYyNyJ9.Q0wi1RJrN8KSxA9J2dEBT2yG5YGdv' +
        'WK4o6zVs7FDZjM'
    let tokens = Authorization.split(" ")[1];
    console.log('第一次分割', tokens)
    let tokenUser = tokens.split(".")[1];
    console.log('获取jwt主体部分', tokenUser)
    obj = JSON.parse(atob(tokenUser))
    console.log('转换对象', obj)
    console.log('获取刷新时间', obj.ref)
</script>

</body>
</html>
```
### 1.2 uni-app下解码

相关依赖包: `npm install --save base-64`

```vue
getTokenInfo(){
    // 解码jwt
    let Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR
    5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTYzNzA2OTgzNSwi
    bmJmIjoxNjM3MDY5ODM1LCJleHAiOjE2MzgyNzk0MzUsInJlZi
    I6MTYzODI3OTQzNSwiYXVkIjoiYXBpIiwianRpIjoiZDRjNjU2M
    mJiZmQ2YzM0NDI0YTNiMjc1ZWQxOTBmMmIifQ.J0rCZq9k2fUp
    B3f0Ug2sBFZ3uWDxX6uulhrSl-KCzM4'
    let tokens = Authorization.split(" ")[1];
    let tokenUser = tokens.split(".")[1];
    let obj  = JSON.parse(base64.decode(tokenUser))
    console.log('jwt转换对象', obj)
    console.log('获取jwt刷新时间', obj.ref)       
}  
```
##  2. dayjs处理时间
:::   tip 
一个极简的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持一样, 但体积仅有2KB。
:::
###   2.1 安装方式
```shell
npm install dayjs
```
###   2.2 基本使用
```javascript
import dayjs from 'dayjs'

dayjs().format('YYYY-MM-DD HH:mm') // => 2022-01-03 15:06
dayjs('2022-1-3 15:06').toDate() // => Mon Jan 03 2022 15:06:00 GMT+0800 (中国标准时间)
```
##  3.  数组常用函数
### 3.1 push数组末尾添加新元素
::: tip 提示
1. push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度
2. 注意： 新元素将添加在数组的末尾
3. 注意： 此方法改变数组的长度
4. 注意：这种方法会改变原始数组
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let arr = ['Banana', 'Orange', 'Apple', 'Mango']
    length = arr.push('Kiwi') // 添加一个元素
    arr.push('nice', 'age') // 依次添加多个元素
    console.log('返回数组长度:', length)
    console.log('输出数组:', arr)
  </script>
</html>
```
### 3.2 unshift数组开头添加新元素
::: tip 提示
1. unshift() 方法可向数组的开头添加一个或多个元素，并返回新的长度
2. 注意： 新元素将添加在数组的开头
3. 注意： 此方法改变数组的长度
4. 注意：这种方法会改变原始数组
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let arr = ['Banana', 'Orange', 'Apple', 'Mango']
    length = arr.unshift('Kiwi') // 添加一个元素
    arr.unshift('nice', 'age') // 依次添加多个元素
    console.log('返回数组长度:', length)
    console.log('输出数组:', arr)
  </script>
</html>
```
### 3.3 pop移除数组最后一个元素
::: tip 提示
1. pop()  方法可用于删除数组的最后一个元素并返回删除的元素
2. 注意： 此方法改变数组的长度
3. 注意：这种方法会改变原始数组
:::
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let arr = ['Banana', 'Orange', 'Apple', 'Mango']
    obj = arr.pop() // 移除最后一个元素Mango
    console.log('返回删除的元素:', obj)
    console.log('输出数组:', arr)
  </script>
</html>
```
### 3.4 shift移除数组第一个元素
::: tip 提示
1. shift()  方法可用于删除数组的第一个元素并返回删除的元素
2. 注意： 此方法改变数组的长度
3. 注意：这种方法会改变原始数组
:::
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let arr = ['Banana', 'Orange', 'Apple', 'Mango']
    obj = arr.shift() // 移除第一个元素Banana
    console.log('返回删除的元素:', obj)
    console.log('输出数组:', arr)
  </script>
</html>
```
### 3.5 [splice指定位置添加或者删除数组中的元素](https://www.runoob.com/jsref/jsref-splice.html)
::: tip 提示
1. splice() 方法用于添加或删除数组中的元素
2. 注意：这种方法会改变原始数组
3. 如果仅删除一个元素，则返回一个元素的数组。 如果未删除任何元素，则返回空数组。
:::
```text
array.splice(index,howmany,item1,.....,itemX)
参数
1. index 必需。规定从何处添加/删除元素。
该参数是开始插入和（或）删除的数组元素的下标，必须是数字。
2. howmany 可选。规定应该删除多少元素。必须是数字，但可以是 "0"。
如果未规定此参数，则删除从 index 开始到原数组结尾的所有元素。
3. item1, ..., itemX: 可选。要添加到数组的新元素
返回值
如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。
```
<font color="blue">删除元素</font>
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let arr = ['Banana', 'Orange', 'Apple', 'Mango']
    obj = arr.splice(2) // 移除从索引2开始的所有元素
    obj1 = arr.splice(1, 0) // 不移除任何元素
    obj2 = arr.splice(1, 1) // 移除1个元素
    console.log('返回删除元素的数组:', obj)
    console.log('返回删除元素的数组:', obj1)
    console.log('返回删除元素的数组:', obj2)
    console.log('输出数组:', arr)
  </script>
</html>
```
<font color="blue">新增元素</font>
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let arr = ['Banana', 'Orange', 'Apple', 'Mango']
    obj = arr.splice(1, 0, 'nice', 'age') // 新增元素
    console.log('返回删除元素的数组:', obj)
    console.log('输出数组:', arr)
  </script>
</html>
```
<font color="blue">删除元素的同时新增元素</font>
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let arr = ['Banana', 'Orange', 'Apple', 'Mango']
    obj = arr.splice(1, 1, 'nice', 'age') // 删除1个元素Orange,新增两个元素
    console.log('返回删除元素的数组:', obj)
    console.log('输出数组:', arr)
  </script>
</html>
```
### 3.6 sort对数组元素升序排列
::: tip 提示
1. sort() 方法用于对数组的元素进行排序。
2. 排序顺序可以是字母或数字，并按升序或降序。默认排序顺序为按字母升序。
3. 注意：这种方法会改变原始数组
:::
<font color="blue">字母升序降序排列</font>
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let arr = ['Banana', 'Orange', 'Apple', 'Mango']
    arr.sort()
    console.log('输出升序排列数组:', arr)
    arr.reverse() // 降序就是先升序排列, 再颠倒数组升序元素
    console.log('输出降序排列数组:', arr)
  </script>
</html>
```
<font color="blue">数字升序降序排列</font>
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let arr = [9, 10, 1, 2, 5, 100, 99]
    arr.sort(function (a, b) {
      return a - b
    })
    console.log('输出升序排列数组:', arr)
    arr.sort(function (a, b) {
      return b - a
    })
    console.log('输出降序排列数组:', arr)
  </script>
</html>
```
### 3.7 reverse颠倒数组中元素的顺序
::: tip 提示
1. reverse() 方法用于颠倒数组中元素的顺序。
2. 返回颠倒顺序后的数组
3. 注意：这种方法会改变原始数组
:::
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let arr = ['Banana', 10, 'php', 'python']
    arr.reverse()
    console.log('颠倒后的元素顺序:', arr)
  </script>
</html>
```
### 3.8 [filter数组过滤](https://www.runoob.com/jsref/jsref-filter.html)
::: tip 提示
1. filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
2. 注意： 不会对空数组进行检测。
3. 注意： 不会改变原始数组。
3. 注意： 返回一个新数组。
:::
<font color="blue">基本使用:返回大于70的数字</font>
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let array = [1, 10, 99, 22, 44, 66, 101, 92]
    // 返回大于70的数字
    let newArray = array.filter(function (x) {
      return x > 70
    })
    console.log('旧数组没变化', array)
    console.log('返回一个新数组', newArray)
  </script>
</html>
```
<font color="blue">数组中元素去重</font>
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let array = [1, 10, 10, 22, 22, 101, 101, 92]
    // 过滤数组中重复的值
    let newArray = array.filter(function (v, n, k) {
      /*
        indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
        1. v 当前元素的值
        2. n 当前元素的索引值
        3. k 前元素属于的数组对象
        4. k.indexOf(v) 表示,元素v在数组k中第一次出现的索引值
      */
      return k.indexOf(v) == n
    })
    console.log('旧数组没变化', array)
    console.log('返回一个新数组', newArray)
  </script>
</html>
```
### 3.9 concat合并数组的值
::: tip 提示
1. concat() 方法用于连接两个或多个数组。
2. 注意： 不会改变原始数组。
3. 注意： 返回一个新数组。
:::
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let array = [1, 10]
    let array1 = ['nice', 66]
    let array2 = ['开心就好', 'student', ['疫情当前']]
    let newArray = array.concat(array1, array2)
    console.log('旧数组没变化', array, array1, array2)
    console.log('返回一个新数组', newArray)
  </script>
</html>
```
### 3.10 slice数组切片
::: tip 提示
1. slice() 方法可从已有的数组中返回选定的元素。
2. slice() 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。
3. 注意： 不会改变原始数组。
4. 注意： 返回一个新数组。
:::
```text
语法
array.slice(start, end)

参数
1. start 可选。规定从何处开始选取。如果该参数为负数，则表示从原数组
中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元
素到最后一个元素（包含最后一个元素）。
2. end 可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。
如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。
如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。
 slice(-2,-1) 表示抽取了原数组中的倒数第二个元素到最后一个元素
 （不包含最后一个元素，也就是只有倒数第二个元素）。

返回值
array 返回一个新的数组，包含从 start（包括该元素） 到 end 
（不包括该元素）的 arrayObject 中的元素。
```
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let array = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']

    let newArray = array.slice(2, 4)
    console.log('旧数组没变化', array)
    console.log('返回一个新数组', newArray)
  </script>
</html>
```
### 3.11 indexOf数组中某个指定的元素位置
::: tip 提示
1. 数组中某个指定的元素位置
2. 该方法将从头到尾地检索数组，看它是否含有对应的元素。开始检索的位置在数组 start 处或数组的开头（没有指定 start 参数时）。如果找到一个 item，则返回 item 的第一次出现的位置。开始位置的索引为 0。
3. 如果在数组中没找到指定元素则返回 -1。
:::
```text
语法
array.indexOf(item,start)
参数

参数	描述
item 必须。查找的元素。
start 可选的整数参数。规定在数组中开始检索的位置。
      它的合法取值是 0 到 stringObject.length - 1。
      如省略该参数，则将从字符串的首字符开始检索

返回值
Number 元素在数组中的位置，如果没有搜索到则返回 -1。
```
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let array = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
    let number = array.indexOf('Orange') //Orange出现的索引位置
    console.log('元素出现的索引位置', number)
  </script>
</html>
```
##  4. 字符串常用函数
### 4.1 [indexOf字符串中某个指定的元素首次位置](https://www.runoob.com/jsref/jsref-indexof.html)
::: tip 提示
1. indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
2. 如果没有找到匹配的字符串则返回 -1。
3. 注意： indexOf() 方法区分大小写。
4. 语法: string.indexOf(searchvalue,start)
    1. searchvalue: 必需。规定需检索的字符串值。
    2. start: 可选的整数参数,规定在字符串中开始检索的位置
5. 返回值:Number 查找指定字符串第一次出现的位置，如果没找到匹配的字符串则返回 -1
:::
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let str = '开心每一天,好好学习, 天天向上'
    // 好学第一次出现的位置
    let number = str.indexOf('好学')
    console.log('元素出现的位置', number)
  </script>
</html>
```
###   4.2 lastIndexOf字符串中某个指定的元素最后一次位置
::: tip 提示
1. lastIndexOf() 方法可返回一个指定的字符串值最后出现的位置
2. 如果没有找到匹配的字符串则返回 -1。
3. 注意： lastIndexOf() 方法区分大小写。
4. 语法: string.lastIndexOf(searchvalue,start)
    1. searchvalue: 必需。规定需检索的字符串值。
    2. start: 可选的整数参数,规定在字符串中开始检索的位置
5. 返回值:Number 查找的字符串最后出现的位置，如果没有找到匹配字符串则返回 -1。
:::
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    /*
      1.下面的表达式, 表示从字符串str的索引为4的数字开始, 也就是'我要好好学',
       从后往前搜字符串`学`出现为位置,得出是索引值`4`;
      2. 注意了, 是在`我要好好学`中的搜, 这是有lastIndexOf中第二个参数决定的
    */
    let str = '我要好好学习,做一个好学生哈哈哈哈哈哈'
    let number = str.lastIndexOf('学', 4)
    console.log('元素出现的位置', number)
  </script>
</html>
```
## 5. 其他函数
###   5.1 [对象或数组转换JSON字符串](https://www.runoob.com/js/javascript-json-stringify.html)
::: tip 提示
1. JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
2. JSON.stringify(value[, replacer[, space]])
:::
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let p = { name: '张三', age: 18 }
    let array = ['nice', 19, 20, '开心就好']
    console.log('array', array)
    console.log(typeof p) // object
    let jsonStr = JSON.stringify(p)
    let arrayStr = JSON.stringify(array)
    console.log('对象转json字符串', typeof jsonStr) //string
    console.log('数组转json字符串', typeof arrayStr) //string
    console.log('对象转json字符串', jsonStr)
    console.log('数组转json字符串', arrayStr)
  </script>
</html>
```
###   5.2 JSON字符串转对象或者数组
::: tip 提示
1. JSON.parse() 方法用于将数据转换为 JavaScript 对象
2. JSON.parse(text[, reviver])
:::
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    let p = { name: '张三', age: 18 }
    let array = ['nice', 19, 20, '开心就好']
    let jsonStr = JSON.stringify(p)
    let arrayStr = JSON.stringify(array)

    console.log('对象式json字符串解析', JSON.parse(jsonStr))
    console.log('数组式json字符串解析', JSON.parse(arrayStr))
  </script>
</html>
```