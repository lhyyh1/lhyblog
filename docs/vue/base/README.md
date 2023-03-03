# Vue基础
## 1. Vue介绍
1. Vue是什么?
<br> 一套用于<font color="red">构建用户界面</font>的<font color="red">渐进式</font>JavaScript框架
<br /><font color="blue"><b>理解两个概念:</b></font><br>
   1. <font color="red">构建用户界面</font>指的是把拿到手的数据通过某种办法变成用户可以看见的界面
   2. <font color="red">渐进式</font>指自底向上逐层的应用, 直白点就是简单应用只需一个轻量小巧的核心库,复杂应用可以引入各式各样的vue插件库 
2. Vue是尤雨溪开发的
   1. 2016年10月1日发布Vue2.0.0(攻壳机动队)
   2. 2020年9月18日发布Vue3.0.0(海贼王)
   <br>总得来说,Vue后起之秀, 生态完善, 已然成为国内前端工程师必备技能
3. Vue的特点
   1. 采用<font color="red">组件化</font>模式, 提高代码复用率, 且让代码更好维护; 组件化是指在Vue里面, 一个`.vue`文件, 就是一个组件;
   2. <font color="red">声明式</font>编码, 让编码人员无需直接操作DOM, 提高开发效率; 传统的js编码是命令式代码, Vue是声明式编码,声明式要想用得好, Vue里面的指令就得熟练掌握;
   3. 使用<font color="red">虚拟DOM</font>+优秀的<font color="red">Diff算法</font>, 尽量复用DOM节点;  数据量大的时候, 新数据替换旧数据时, Diff算法之后, 原有的数据直接拿过去复用, 只有不一样的数据才会重新渲染, 极大低提高了效率; 
4. 学习vue之前要掌握的JavaScript基础知识
   +  ES6语法规范
   +  ES6模块化
   +  包管理器
   +  原型和原型链(<font color="red">*</font>)
   +  数组常用方法
   +  axios
   +  promise
## 2. [Vue官网](https://cn.vuejs.org/)
+  学习->教程: 官网提供的入门小案例, 重要!
+  学习->API: Vue的字典, 不会的方法, 都可以打开查看, 重要!
+  学习->风格指南: 教我们怎么写出风格优雅的代码!
+  学习->示例: 官方提供的一些示例代码
+  学习->Cookbook: vue想教我们一些编码的技巧,js和vue的小技巧
+  生态系统->工具和核心插件: 掌握
+  资源列表->Awesome Vue和浏览和Vue相关的包: 是官方给我们整理的一些好用的包
## 3. [搭建Vue开发环境](https://cn.vuejs.org/v2/guide/installation.html#%E7%9B%B4%E6%8E%A5%E7%94%A8-lt-script-gt-%E5%BC%95%E5%85%A5)
::: tip 提示
直接下载并用 `<script>` 标签引入，`Vue` 会被注册为一个全局变量。
:::
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>初识Vue</title>
  <!--引入Vue,引入之后, 全局就多了一个Vue的构造函数  -->
  <script type="text/javascript" src="../js/vue.js"></script>
</head>
<body>
</body>
</html>
```
::: warning 注意
此时, 浏览器控制台`Console`, 输入`Vue`,就会出现一个Vue的构造函数, 表示Vue引入成功!
:::
## 4. 初识Vue(Hello World)
::: tip 提示
1. 准备好一个容器,为Vue提供模板,以及把Vue的工作成功呈现出来
2. 创建一个Vue实例, 且要传入一个配置对象,目前掌握el和data配置
   1. el: 用于指定当前Vue实例为哪个容器服务, 值通常为css选择器字符串
   2. data: 用于存储数据, 数据供el指定的容器去使用,值常为对象形式
3. 容器里的代码被称为`Vue模板`,依然符合html规范, 只不过混入了一些特殊的Vue语法
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>初识Vue</title>
    <!--引入Vue,引入之后, 全局就多了一个Vue的构造函数  -->
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!-- 准备好一个容器,我们之所以使用Vue,是想让Vue帮我们构建界面,但这个界面放在
    什么位置呢? 所以要准备一个容器,用来承载Vue的工作成果 -->
    <div id="root">
      <!-- 两组花括号是插值语法, 显示变量 -->
      <h1>Hello: {{name}}</h1>
    </div>
    <script type="text/javascript">
      // 阻止 vue 在启动时生成生产提示
      Vue.config.productionTip = false
      // 创建Vue实例,这是使用Vue的开端,Vue里面要传一些配置
      new Vue({
        // el: document.getElementById('root') //找到这个元素, 配置到el里面, 一般不常用
        el: '#root', //el用于指定当前Vue实例为哪个容器服务, 值通常为css选择器字符串
        data: {
          //data中用于存储数据, 数据供el指定的容器去使用,值我们暂时写成一个对象
          name: '成都市',
        },
      })
    </script>
  </body>
</html>
```
::: warning 注意
Vue解析流程:
   1. 首先准备好一个id等于root的容器,然后创建一个Vue实例; 
   2. 当Vue实例开始工作的时候,根据el的配置,就会把整个容器拿过来,进行解析, 解析容器中有没有Vue自己设计的特殊语法;
   3. 解析到{{name}}, data中也有name,就会拿data中name的值去替换容器中name的,然后就会生成一个全新的div,id等于
      root的容器;里面的name都相应替换成成都市了; 
   4. 最后再把解析完的东西 重新放在页面上, 替换刚才的整个容器。
:::
## 5.分析Hello World案例
::: warning 注意
1. Vue实例和容器是一一对应关系; 不能多个容器对应一个实例, 也不能一个容器对应多个实例;
2. 真实开发中只有一个Vue实例, 并且会配合着组件一起使用;
3. 容器中,{{xxx}}中的xxx要写js表达式, 且xxx可以自动读取到data中的所有属性
4. 一旦data中的数据发生改变, 那么页面中用到该数据的地方也会自动更新;
:::
### 5.1 js表达式和js代码(语句)
1. <font color="red">js表达式</font>: 一个表达式会产生一个值, 可以放在任何一个需要值的地方; 是一种特殊的js代码(语句);
   1. 比如定义一个变量a, 变量a就是js表达式
   2. 定义变量a和变量b, a+b就是一个js表达式
   3. 函数demo(1),也是一个js表达式, 如果没有return, 返回undefined也是一种值, 也属于js表达式
   4. x===y ? 'a' : 'b';三元运算, 也是js表达式
2. <font color="red">js代码(语句)</font>: 不会产生一个值, 控制代码走向
   1. 判断语句 if(){}
   2. 循环语句 for(){}
## 6.模板语法
::: warning 注意
容器里面的代码被称为<font color="red">Vue模板</font>; 模板语法里面的内容都是<font color="red">js表达式</font>。
:::
###   6.1 Vue模板语法有两大类
1. 插值语法
2. 指令语法(用于解析标签, 这里先学习v-bind)
###   6.2 v-bind绑定属性指令
::: tip 提示
动态绑定属性,简写:  <font color="red"><b>:</b></font> ;可以动态绑定标签中的所有属性, 比如src,class,title,style,name,value等, 且可以读取到data中的所有属性。
:::
```html
<a :href="school.url" :class="school.className">点我跳转百度</a>
```
::: warning 注意
1. 如果是`href="school.url"`, 此时`school.url`就是一个普通的标签属性, 值是字符串"school.url";
2. 如果写成`:href="school.url"`,加了`v-bind`指令, Vue就会把`school.url`拿出来当js表达式去执行;就会去Vue实例data参数中读取变量school下的url变量;
:::
### 6.3 插值语法
```text
1. 功能: 用于解析标签体内容
2. 写法: {{xxx}} , xxx是js表达式, 且可以直接读取到data中的所有属性
```
###  6.4 demo
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>初识Vue</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <div id="root">
      <h1>插值语法</h1>
      <h3>{{name}}</h3>
      <hr />
      <h1>指令语法</h1>
      <h3>
        <a 
                :href="school.url"
                :class="school.className"
                :name="school.name"
        >点我跳转百度</a>
      </h3>
      <h3><a v-bind:href="school.url">点我跳转百度</a></h3>
    </div>
    <script type="text/javascript">
      // 阻止 vue 在启动时生成生产提示
      Vue.config.productionTip = false
      new Vue({
        el: '#root',
        data: {
          name: '成都市',
          school: {
            url: 'https://www.baidu.com/',
            className: 'baidu',
            name: 'myBaiDu',
          },
        },
      })
    </script>
  </body>
</html>
```
## 7.数据绑定
###   7.1 Vue数据绑定有三种方式
```text
1. 插值, 也就是{{xxx}}的形式, 就是以文本的形式和实例data中对应的属性进行绑定;
   当实例中data对应的属性发生变化时, 视图也发生变化; 绑定的是标签体内容;单向绑定,
   数据只能从实例data中流向页面。
2. v-bind, 属性绑定, 绑定的是标签元素的属性,比如src,class,title,style,name,
   value等属性; 单向绑定, 数据只能从实例data中流向页面。
3. v-model, 数据双向绑定, 主要是用在表单元素中, 只能绑定表单元素的value属性;
   数据不仅能从实例data流向页面, 还可以从页面流向实例data。
```
###   7.2 v-model:value 双向绑定
::: tip 理解
v-model:value : 可以简写为v-model,因为v-model默认收集的就是value值; 该指定用来在 input、select、textarea、checkbox、radio 等表单控件元素上创建双向数据绑定，根据表单上的值，自动更新绑定的元素的值。
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>数据绑定</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <div class="root">
      <h1>双向绑定</h1>
      <!-- 完整写法 -->
      <input v-model:value="content" />
      <!-- 简写 -->
      <input v-model="content" />
      <h1>单向绑定</h1>
      <input type="text" :value="content" />
    </div>
    <script type="text/javascript">
      Vue.config.productionTip = false
      new Vue({
        el: '.root',
        data: {
          content: '开心就好',
        },
      })
    </script>
  </body>
</html>
```
::: danger 警告
v-model 绑定的是标签的属性值value, 非表单类(输入类)元素没有属性值value, 所以只能绑定表单元素标签的value; 不能去绑定标签的其他属性, 比如name, src, class等等!
:::
## 8. el和data的两种写法
###   8.1 el的两种写法
::: tip 
el两种写法都可以, 没啥区别, 就是`v.$mount('#root')`更灵活一点,比如延时几秒再挂载容器;
:::

<img :src="$withBase('/image/vue01.png')" alt="foo">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>el的两种写法</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <div id="root">
      <h1>您好, {{name}}</h1>
    </div>
    <script type="text/javascript">
      // 阻止 vue 在启动时生成生产提示
      Vue.config.productionTip = false
      // 用v接受vue实例
      const v = new Vue({
        // el:'#root', el第一种写法
        data: {
          name: '成都市',
        },
      })
      // $mount 是Vue实例原型上的方法,实例继承过来了, 可以直接使用
       //el第二种写法, 这种写法更灵活一些, 比如页面显示后,过1秒在把数据挂载到页面上
      v.$mount('#root')
      // 输出vue实例
      console.log(v)
    </script>
  </body>
</html>
```
### 8.2 data的两种写法
::: danger data的两种写法和1个注意
1. 对象式
2. 函数式, 函数必须返回一个对象, 以后学到组件时, data必须时函数式, 否则会报错!
3. 由Vue管理的函数, 一定不要写箭头函数, 一旦写了箭头函数, this就不再是Vue实例了, 就是全局的window了; 箭头函数没有自己的this, 就往外找; 就找到了全局的window;
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>data的两种写法</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <div id="root">
      <h1>您好, {{name}}</h1>
    </div>
    <script type="text/javascript">
      // 阻止 vue 在启动时生成生产提示
      Vue.config.productionTip = false
      // 用v接受vue实例
      new Vue({
        el: '#root',
        // data的第一种写法: 对象式
        // data: {
        //   name: '成都市',
        // },

        // data的第二种写法, 函数式,组件中基本都用函数式
        // data的值是一个函数, 是当前Vue实例帮我们调用的
        /*
        data: function () {
          // 此处的this是Vue实例对象
          console.log('@@', this)
          return {
            name: '成都市',
          }
        },
        */

        /*
          这里this就是window全局函数,箭头函数没有this,
          会往外找, 找到的就是window全局函数
        */
        /*
        data: () => {
          console.log('@@', this)
          return {
            name: '成都市',
          }
        },
        */

        //我们一般在对象里面写方法, 都要省去冒号和function
        data() {
          console.log('@@', this) //此处的this是Vue实例对象
          return {
            name: '成都市',
          }
        },
      })
    </script>
  </body>
</html>
```
## 9. MVVM模型理解
::: tip 提示
Vue虽然没有完全遵循MVVM模型, 但是Vue的设计也受到了它的启发; 因此, 经常使用vm(ViewModel)这个变量名称表示Vue实例
1. M 模型(Model): 对应data中的数据
2. V 视图(View): 模板
3. VM 视图模型(ViewModel): Vue实例对象
:::
###   9.1 观察发现
1. data中所有属的属性, 最后都会出现在了`vm`身上;
2. `vm`身上所有的属性及`Vue`原型上的所有属性, 在Vue模板中都可以直接使用,插值语法输出;
<br><br><br>
<img :src="$withBase('/image/vue03.png')" alt="foo">
###   9.2 Vue中的MVVM模型
<br>

<img :src="$withBase('/image/vue02.png')" alt="foo">

## 10. 数据代理
###   10.1 [Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
::: tip 提示
1. 几乎所有使用Vue的开发者都知道，Vue的双向绑定是通过`Object.defineProperty()`实现的，也知道在getter中收集依赖，在setter中通知更新。
2. 该用法比直接操作对象属性的添加或者修改更为高级, 可以灵活控制属性是否可以枚举, 删除, 修改等;
3. 利用这个方法增加的属性, 属性值, 通过get现去取, 通过set去修改;
:::

<font color="blue"><b>定义:</b></font>

该方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

<font color="blue"><b>语法:</b></font>
```javascript
Object.defineProperty(obj, prop, descriptor)
```
<font color="blue">参数:</font>
+  `obj` 
<br>要定义属性的对象。
+  `prop`
<br>要定义或修改的属性的名称或 [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
+ `descriptor`
<br>要定义或修改的属性描述符。
   1. `value`
      <br>该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）;默认为 undefined;
   2. `enumerable`
      <br>控制属性是否可以枚举(遍历出来), 默认值是false;
   3. `writable`
      <br>控制属性是否可以被修改, 默认值是false;
   4. `configurable`
      <br>控制属性是否可以被删除, 默认值是false;
   5. `get`
      <br>属性的`getter`函数,如果没有`getter`，则为`undefined`,当访问该属性时，会调用此函数。执行时不传入任何参数，但是
      会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。默认为`undefined`。
   6. `set`
      <br>属性的`setter`函数，如果没有`setter`，则为`undefined`,当属性值被修改时，会调用此函数。该方法接受一个参
      数（也就是被赋予的新值），会传入赋值时的 this 对象。默认为`undefined`。
  
<font color="blue">返回值:</font>
  
被传递给函数的对象。

::: tip 案例
下面案例, person类应该有一个年龄, 这个年龄是读取number读取出来的,年龄随着number变化而变化
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Object.defineProperty</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script>
      Vue.config.productionTip = false
      let number = 18
      let person = {
        name: '张三',
        sex: '男',
      }
      Object.defineProperty(person, 'age', {
        //当有人读取person的age属性时, get函数(getter)就会被调用, 且返回值就是age的值
        get() {
          console.log('有人读取了age属性')
          return number
        },
        // 当有人修改person的age属性时, set(setter)就会被调用, 且会收到修改的具体值
        set(val) {
          console.log('有人修改了age属性, 且值是', val)
          number = val
        },
      })
      console.log(person)
    </script>
  </body>
</html>
```
###   10.2 数据代理
::: tip 概念
数据代理: 通过一个对象代理对另一个对象中属性的操作(读和写)
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>数据代理</title>
  </head>
  <body>
    <script type="text/javascript">
      let obj = {
        x: 100,
      }
      let obj2 = {
        y: 200,
      }
      // 通过obj2读取和修改到obj身上的x
      Object.defineProperty(obj2, 'x', {
        get() {
          return obj.x
        },
        set(val) {
          obj.x = val
        },
      })
    </script>
  </body>
</html>
```
### 10.3 Vue中的数据代理
::: tip Vue中的数据代理
1. invoke propery getter: 调用属性getter
2. vm上的name和address, 都是靠Object.defineProperty()加上去的; 当有人访问vm身上name的时候,getter开始工作, 把一个别的地方的name拿过来用; 当有人修改vm身上name的时候, setter开始工作, 把一个别的地方的name修改掉; 这里这个别的地方就是实例里面data的部分(Model模型部分); vm中必然存在name的getter和setter;
3. 通过vm读name, 读的是实例中data部分的name; 通过vm改name,改的也是实例中data部分的name; 这就是数据代理;
4. vue实例中, data数据全等于vue实例中_data的数据, vm._data.name === vm.name
5. Vue会把data中的数据复制一份到vm身上, 命名为_data;然后在往vm身上加一个属性name,通过vm去读, 读取_data
里面的的name; 有人修改的话, 就通过setter映射到_data中进行修改; 这两条线就是数据代理;数据代理做的事就是把_data
的属性放一份到vm身上, 让我们编码方便。
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue中的数据代理</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <div id="root">
      <!-- 可以利用_data.name访问属性, 但比较麻烦, 一般不这么写 -->
      <p>学校名称: {{_data.name}}</p>
      <p>学校地址: {{address}}</p>
    </div>
    <script type="text/javascript">
      // 阻止 vue 在启动时生成生产提示
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          name: '电子科大',
          address: '成都市',
        },
      })
      console.log(vm)
    </script>
  </body>
</html>
```
<br>
<br>

<img :src="$withBase('/image/setter.png')" alt="foo">

## 11. [事件处理](https://cn.vuejs.org/v2/guide/events.html)
### 11.1 监听事件
::: tip 各种事件
1. 使用`v-on:xxx` 或简写`@xxx` 绑定事件或者绑定一段js代码, 其中`xxx`是事件名;
2. 事件的回调需要配置在`methods`对象中, 最后会在vm上;
3. `methods`中配置的函数, 不要用箭头函数, 否则this就不是vm了;
4. `methods`中配置的函数, 都是vue所管理的函数, this的指向是vm或组件实例对象;
5. `@click="demo"` 和`@click="demo($event)"` 效果一致, 但后者可以传参;
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>事件的基本使用</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <h2>学校名称: {{name}}</h2>
      <br />
      <!-- 当你点击button的时候, 去调用名为show的函数-->
      <!-- <button v-on:click="show">点我提示信息</button>-->
      <button @click="show1">点我提示信息1(不传参)</button>
      <button @click="show2($event,66)">
        点我提示信息2(传参,$event是关键字, 把这个也传到函数里面, 不然会丢掉,
        不使用可以不传)
      </button>
    </div>
    <script>
      Vue.config.productionTip = false
      new Vue({
        el: '#root',
        data: {
          name: '软件学院',
        },
        methods: {
          show1(event) {
            console.log(event.target.innerText) //按钮内容
            console.log(this) //此处的this是vm
            alert('你好, 帅哥!!')
          },
          show2(event, number) {
            console.log(event)
            console.log(this) //此处的this是vm
            console.log('@按钮内容', event.target.innerText)
            console.log('@按钮标签名称', event.target.tagName)
            alert(number)
          },
        },
      })
    </script>
  </body>
</html>
```
::: danger 注意
有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 $event 把它传入方法;
$event是关键字, 把这个也传到函数里面, 不然会丢掉, 不使用可以不传!
+ console.log('@按钮内容', event.target.innerText)
+ console.log('@按钮标签名称', event.target.tagName)
:::
### 11.2 [事件修饰符](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)
::: tip 提示
1. Vue.js 为`v-on`提供了事件修饰符。之前提过，修饰符是由点开头的指令后缀来表示的。
2. 修饰符可以连续写的, 比如`@click.stop.prevent`, 表示先阻止冒泡,再默认事件;
3. 六大事件修饰符
    1. prevent 阻止默认事件(常用)
    2. stop 阻止事件冒泡(常用)
    3. once 事件只触发一次(常用)
    4. capture使用事件的捕获模式
    5. self 只有event.target 是当前操作的元素时才触发事件
    6. passive 事件的默认行为立即执行, 无需等待时间回调执行完毕
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>事件修饰符</title>
    <script type="text/javascript" src="../js/vue.js"></script>
    <style>
      * {
        margin-top: 20px;
      }
      .demo1 {
        height: 50px;
        background-color: skyblue;
      }
      .box1 {
        padding: 5px;
        background-color: skyblue;
      }
      .box2 {
        padding: 5px;
        background-color: orange;
      }
      .list {
        width: 200px;
        height: 200px;
        background-color: peru;
        overflow: auto;
      }
      li {
        height: 100px;
      }
    </style>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <h2>学校名称: {{name}}</h2>
      <br />
      <!-- prevent 阻止默认事件(常用)  -->
      <a href="https://www.baidu.com/" @click.prevent="show">点我提示信息</a>
      <!-- stop 阻止事件冒泡(常用)  -->
      <div class="demo1" @click="show">
        <button @click.stop="show">点我提示信息</button>
      </div>
      <!-- once 事件只触发一次(常用)  -->
      <button @click.once="show">点我提示信息</button>
      <!--
        capture使用事件的捕获模式, 再捕获的时候已经开始处理事件了,
         不需要跟原来一样的先从外往里捕获完了, 在从里往外处理 
         -->
      <div class="box1" @click.capture="showMsg('box1')">
        div1
        <div class="box2" @click="showMsg('box2')">div2</div>
      </div>
      <!-- self 只有event.target 是当前操作的元素时才触发事件  -->
      <div class="demo1" @click.self="show">
        <button @click="show">@点我提示信息</button>
      </div>
      <!-- passive 事件的默认行为立即执行, 无需等待时间回调执行完毕  -->
      <!-- scroll 是滚动条滚动,  wheel是鼠标滚轮滚动-->
      <!-- wheel中passive 如果不加, 会先执行完所有运算, 最后才会移动滚动条,scroll不影响-->
      <ul @wheel.passive="demo" class="list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
    <script>
      Vue.config.productionTip = false
      new Vue({
        el: '#root',
        data: {
          name: '电子科大',
        },
        methods: {
          show(event) {
            alert('你好, 帅哥!!')
          },
          showMsg(msg) {
            alert(msg)
          },
          demo() {
            for (let i = 0; i < 1000000; i++) {
              console.log('i')
            }
            console.log('累坏了')
          },
        },
      })
    </script>
  </body>
</html>
```
### 11.3 键盘事件
::: tip Vue中常用的按键别名
 Vue未提供别名的按键, 可以使用按键原始的key值去绑定, 但注意要转换为kebad-case(短横线命名), 比如切换大小写的键应该这样绑定`@keyup.caps-lock="show"`
1. 回车:  enter
2. 删除:  delete (捕获删除和退格键)
3. 退出:  esc
4. 空格:  space
5. 换行:  tab (特殊, 必须配合keydown去使用)
6. 上:    up
7. 下:    down
8. 左:    left
9. 右:    right
:::
   
::: tip 系统修饰符
用法特殊: ctrl, alt, shift, meta
1. 配合keyup使用: 按下修饰键的同时, 再按下其他键, 随后释放其他键, 事件才被触发; 有个小技巧, 可以指定按下的其他键, 比如 `@keyup.ctrl.y="show"`
2. 配合keydowm使用, 正常触发事件
3. 可以使用keyCode去指定具体的按键, 但不推荐`@keyup.13="show"` 13表示键码回车, 有的浏览器已经不支持了; 不同的键盘, 编码不一定统一;
4. Vue.config.keyCodes 自定义健名=键码, 可以去定制按键别名`Vue.config.keyCodes.huiche = 13 //定义了一个别名按键回车`
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>键盘事件</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <h2>欢迎来到{{name}}!!!</h2>
      <input type="text" placeholder="按下回车提示输入" @keyup.huiche="show" />
    </div>
    <script>
      Vue.config.productionTip = false
      //定义了一个别名按键回车
      Vue.config.keyCodes.huiche = 13
      new Vue({
        el: '#root',
        data: {
          name: '软件学院',
        },
        methods: {
          show(e) {
            console.log(e.keyCode) //键盘编码
            console.log(e.key) //键盘编名称
            // if(e.keyCode !== 13) return
            console.log(e.target.value)
          },
        },
      })
    </script>
  </body>
</html>
```
##  12. 计算属性
### 12.1 插值语法实现姓名案例
::: tip
data数据发生变化后, Vue模板都会重新解析一遍
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>姓名案例--插值语法实现</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      姓: <input type="text" v-model="firstName" /><br /><br />
      名: <input type="text" v-model="lastName" /><br /><br />
      全名: <span>{{firstName}} @ {{lastName}}</span>
    </div>
    <script>
      Vue.config.productionTip = false
      new Vue({
        el: '#root',
        data: {
          firstName: '张',
          lastName: '三',
        },
      })
    </script>
  </body>
</html>
```
### 12.2 methods实现姓名案例
::: danger 注意了!!!
data数据发生变化后, Vue模板都会重新解析一遍

插值语法里面放函数, 必须带括号, 表示这个值来自函数的调用; 函数返回值就是显示的内容
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>姓名案例--methods实现</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      姓: <input type="text" v-model="firstName" /><br /><br />
      名: <input type="text" v-model="lastName" /><br /><br />
      <!-- 
        1.插值语法里面放函数, 必须带括号, 表示这个值来自函数的调用;
        2.函数返回值就是显示的内容
      -->
      全名: <span>{{fullName()}}</span>
    </div>
    <script>
      Vue.config.productionTip = false
      new Vue({
        el: '#root',
        data: {
          firstName: '张',
          lastName: '三',
        },
        methods: {
          fullName() {
            return this.firstName + '@' + this.lastName
          },
        },
      })
    </script>
  </body>
</html>
```
### 12.3 计算属性实现姓名案例
::: danger 注意
1. 计算属性的定义: 要用的属性不存在, 要通过已有属性计算得来;
原理: 底层帮助了Objcet.defineproperty方法提供的getter和setter;
2. get函数什么时候执行?
    1. 初次读取时会执行一次;
    2. 当依赖的数据发生改变时会被再次调用;
3. 优势: 与methods实现相比, 内部有缓存机制(复用), 效率更高, 调式方便;
4. 备注:
    1. 计算属性最终会出现在vm上, 直接读取使用即可;
    2. 如果计算属性要被修改, 那必须写set函数去响应修改, 且set中要引起计算时依赖的数据发生变化;
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>姓名案例--计算属性实现</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      姓: <input type="text" v-model="firstName" /><br /><br />
      名: <input type="text" v-model="lastName" /><br /><br />
      <!-- 插值语法, 必须带括号, 返回值放到这面, 这个值来自函数的调用-->
      全名1: <span>{{fullName}}</span><br /><br />
      <!-- fullName 在第二次开始的调用, 不会调用get, 直接走缓存-->
      全名2: <span>{{fullName}}</span><br /><br />
      全名3: <span>{{fullName}}</span><br /><br />
      全名4: <span>{{fullName}}</span><br /><br />
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        /* vue认为data里面的都是属性
           计算属性就是拿你写完的属性去加工, 去计算, 然后生成一个全新的属性
        */
        data: {
          firstName: '张',
          lastName: '三',
        },
        /* 计算属性也是属性, 可以在插值语法中直接使用,
           但vm._data没有计算属性, 因为它需要计算才能得到, 
           计算之后,直接丢到vm上面, 和属性一样
        */
        computed: {
          fullName: {
            /*
             *  get有什么作用?
             *  当有人读取fullName时, get就会被调用, 且返回值就作为fullName的值
             *  get什么时候调用?
             *  1. 初次读取fullName时; 会产生缓存, 不会同样的多次调用;
             *  2. 所依赖的数据发生变化时; 会更新缓存, 保证数据最新;
             * */
            get() {
              console.log('get被调用了')
              return this.firstName + '--' + this.lastName
            },
            /*
             * set 什么时候调用?
             * 当fullName被修改时, 以后如果没有人修改, 可以不写set
             * '李-白'
             */
            set(value) {
              console.log('有人修改我了', value)
              const arr = value.split('-')
              this.firstName = arr[0]
              this.lastName = arr[1]
            },
          },
        },
      })
    </script>
  </body>
</html>
```
### 12.4 计算属性简写
::: danger 注意了!
只有读取, 没有修改的时候, 才可以简写

计算属性更多的情况是只读取出来展示, 不去修改的, 一般常用简写的
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>计算属性--简写</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      姓: <input type="text" v-model="firstName" /><br /><br />
      名: <input type="text" v-model="lastName" /><br /><br />
      全名: <span>{{fullName}}</span><br />
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          firstName: '张',
          lastName: '三',
        },
        // 计算属性
        computed: {
          //简写, 确定了只有get读取, 没有set修改, 才可以简写, 函数就当get函数用就行
          fullName: function () {
            return this.firstName + '--' + this.lastName
          },
          // fullName:{
          //     get(){
          //         return this.firstName + '--' + this.lastName
          //     }
          // }

          // 完整写法
          // fullName:{
          //     get(){
          //         return this.firstName + '--' + this.lastName
          //     },
          //     // 计算属性更多的情况是只读取出来展示, 不去修改的, 一般没有set
          //     set(value){
          //         const arr = value.split('-')
          //         this.firstName = arr[0]
          //         this.lastName = arr[1]
          //     }
          // }
        },
      })
    </script>
  </body>
</html>
```
##  13. 侦听属性
### 13.1 计算属性实现天气案例
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>天气案例</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <h2>今天的天气很{{info}}</h2>
      <button @click="changeWeather">切换天气</button>
      <!--@xxx="yyy", yyy可以写一些简单的语句        -->
      <!-- <button @click="isHot = !isHot">切换天气,不建议</button>-->
      <!-- <button @click="window.alert(1)">切换天气, 不建议这么写</button>-->
    </div>
    <script>
      Vue.config.productionTip = false
      new Vue({
        el: '#root',
        data: {
          isHot: true,
          window,
        },
        methods: {
          changeWeather() {
            this.isHot = !this.isHot
          },
        },
        // 计算属性简写
        computed: {
          info() {
              return this.isHot ? '炎热' : '凉爽'
          },
        },
      })
    </script>
  </body>
</html>
```
### 13.2 侦听属性实现天气案例
:::tip 提示
1.  当被监视的属性变化时, 回调函数(handler函数)自动调用, 进行相关操作;
2.  监视的属性必须存在, 才能进行监视, 可以监视计算属性!!!
3.  监视的两种方法:
    1.  `new Vue` 时传入watch配置
    2.  通过`vm.$watch`监视
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>天气案例--监视属性</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <h2>今天的天气很{{info}}</h2>
      <button @click="changeWeather">切换天气</button>
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          isHot: true,
          window,
        },
        // 监视属性, 对比数据变化, 可以做一些逻辑操作, 比如温差, 提醒穿衣服
        // watch:{
        //     //监视data中的isHot属性, 计算属性也能监测
        //     info:{
        //         //handler函数什么时候调用呢?  当isHot发生改变时
        //         // immediate:true, //初始化是让handler调用一下
        //         handler(newValue,oldValue){
        //             console.log('isHot属性发生改变了',newValue,oldValue)
        //         },
        //     }
        // },
        methods: {
          changeWeather() {
            this.isHot = !this.isHot
          },
        },
        // 计算属性简写
        computed: {
          info() {
            return this.isHot ? '炎热' : '凉爽'
          },
        },
      })
      // 还可以直接调用vm上的监视, 监视data中的isHot属性, 里面写法和watch一样
      vm.$watch('isHot', {
        //handler函数什么时候调用呢?  当isHot发生改变时
        // immediate:true, //初始化是让handler调用一下
        handler(newValue, oldValue) {
          console.log('isHot属性发生改变了', newValue, oldValue)
        },
      })
    </script>
  </body>
</html>
``` 
### 13.3 深度侦听-deep:true
:::warning 注意了
1.  Vue中的watch默认不检测对象内部值的改变(一层);
2.  配置`deep:true`可以检测对象内部值的改变(多层);
3.  Vue自身可以监测对象内部值的改变, 但Vue提供的watch默认不可以;
4.  使用watch时根据数据的具体结构, 决定是否采用深度监视;
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>天气案例--监视属性</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <h2>今天的天气很{{info}}</h2>
      <button @click="changeWeather">切换天气</button>
      <hr />
      <h3>a的值是:{{numbers.a}}</h3>
      <button @click="numbers.a++">点我加a+1</button>
      <h3>b的值是:{{numbers.b}}</h3>
      <button @click="numbers.b++">点我加b+1</button>
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          isHot: true,
          numbers: {
            a: 1,
            b: 2,
          },
        },
        // 监视属性, 对比数据变化, 可以做一些逻辑操作, 比如温差, 提醒穿衣服
        watch: {
          //监视data中的isHot属性, 计算属性也能监测
          info: {
            //handler函数什么时候调用呢?  当isHot发生改变时
            // immediate:true, //初始化是让handler调用一下
            handler(newValue, oldValue) {
              console.log('isHot属性发生改变了', newValue, oldValue)
            },
          },
          // 监视多级结构中某个属性的变化
          'numbers.a': {
            handler(newValue, oldValue) {
              console.log('a原来的值:' + oldValue, `;a新的值:` + newValue)
            },
          },
          // numbers中任何一个值变化, 都要监视到
          //监视多级结构中所有属性的变化
          numbers: {
            deep: true, // 深度监视
            handler(newValue, oldValue) {
              console.log('原来的值:' + oldValue, `;新的值:` + newValue)
            },
          },
        },
        methods: {
          changeWeather() {
            this.isHot = !this.isHot
          },
        },
        // 计算属性简写
        computed: {
          info() {
            return this.isHot ? '炎热' : '凉爽'
          },
        },
      })
    </script>
  </body>
</html>
```
### 13.4 侦听简写
:::tip 注意了
只有handler时, 才可以简写, 有其他配置, 则不能简写
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>天气案例--监视属性</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <h2>今天的天气很{{info}}</h2>
      <button @click="changeWeather">切换天气</button>
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          isHot: true,
        },
        // 监视属性, 对比数据变化, 可以做一些逻辑操作, 比如温差, 提醒穿衣服
        watch: {
          // 正常写法
          // info:{
          //     // immediate:true, //初始化是让handler调用一下
          //     // deep:true,//深度监视
          //     handler(newValue,oldValue){
          //         console.log('isHot属性发生改变了',newValue,oldValue)
          //     },
          // }
          // 简写, 这个函数就当handler去用, 且仅只有handler时, 才可以简写, 有其他配置, 则不能简写
          isHot(newValue, oldValue) {
            console.log('isHot属性发生改变了', newValue, oldValue)
          },
        },
        methods: {
          changeWeather() {
            this.isHot = !this.isHot
          },
        },
        // 计算属性简写
        computed: {
          info() {
            return this.isHot ? '炎热' : '凉爽'
          },
        },
      })
      // 正常写法
      // vm.$watch('isHot',{
      //     immediate:true, //初始化是让handler调用一下
      //     deep:true,//深度监视
      //     handler(newValue,oldValue){
      //         console.log('isHot属性发生改变了',newValue,oldValue)
      //     }
      // })
      // //简写
      // vm.$watch('isHot',function (newValue,oldValue){
      //     console.log('isHot属性发生改变了',newValue,oldValue)
      // })
    </script>
  </body>
</html>
```
##  14. 计算属性对比侦听属性
::: warning 注意啦
1. computed能完成的功能, watch都可以完成;
2. watch能完成的, computed不一定能完成; 例如: watch可以进行异步操作;
:::
::: danger 两个重要原则
1. 所被Vue管理的函数, 最好写成普通函数, 这样this的指向才是vm或组实例对象;
2. 所有不被Vue所管理的函数(定时器的回调函数, ajax的回调函数等), 最好写成箭头函数, 这样this的指向才是vm或者组件实例对象;
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>姓名案例--watch实现</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      姓: <input type="text" v-model="firstName" /><br /><br />
      名: <input type="text" v-model="lastName" /><br /><br />
      全名: <span>{{fullName}}</span><br />
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          firstName: '张',
          lastName: '三',
          fullName: '张-三',
        },
        watch: {
          firstName(newValue) {
            // 姓变了, 等 1秒再执行
            setTimeout(() => {
              this.fullName = newValue + '--' + this.lastName
            }, 1000)
          },
          lastName(newValue) {
            this.fullName = this.firstName + '--' + newValue
          },
        },
        // 计算属性
        computed: {
          // fullName:function (){
          //     return this.firstName + '--' + this.lastName
          // }
        },
      })
    </script>
  </body>
</html>
```
##  15. [Class与Style 绑定](https://cn.vuejs.org/v2/guide/class-and-style.html)
::: tip  绑定class样式
1.  写法: `:class='xxx'`, xxx可以是字符串, 对象, 数组;
2.  字符串写法使用于: 类名不确定, 要动态获取
3.  对象写法适用于: 要绑定多个样式, 个数不确定, 名字也不确定;
4.  数组写法适用于: 要绑定多个样式, 个数确定, 名字也确定, 但不确定用不用;
:::
::: warning style样式
1.  `:style="fontSize: xxx"` 其中xxx是动态值
2.  `:style="[a,b]"` 其中a,b是样式对象; 样式对象是存在的css属性, 下划线转化为驼峰, 比如`font-size`转化为`fontSize`;
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>绑定样式</title>
    <script type="text/javascript" src="../js/vue.js"></script>
    <style>
      .basic {
        width: 400px;
        height: 400px;
        border: 1px solid black;
      }
      .happy {
        background-color: red;
      }
      .sad {
        background-color: black;
      }
      .normal {
        background-color: gray;
      }
      .atguigu1 {
        font-size: 40px;
        background-color: yellow;
      }
      .atguigu2 {
        font-family: 'Agency FB';
        background-color: chartreuse;
      }
      .atguigu3 {
        color: red;
        background-color: blue;
      }
    </style>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <!--
      class="basic" :class="mood" 正常的正常些, 变化的绑定写,a是表达式,
      最后都会汇总成一个class; 绑定class样式, 字符串写法, 
      适用于: 样式的类名不确定, 需要动态指定
      -->
      <div class="basic" :class="mood" @click="change">{{name}}</div>
      <br /><br />
      <!--绑定class样式, 数组写法, 适用于: 要绑定的样式个数不确定, 名字也不确定-->
      <div class="basic" :class="classArr">{{name}}</div>
      <br /><br />
      <!--
      绑定class样式, 对象写法, 适用于: 要绑定的样式个数确定, 名字确定, 但要动态决定用不用
      -->
      <div class="basic" :class="classObj">{{name}}</div>
      <br /><br />

      <!--<div class="basic" :style="{fontSize:fsize+'px'}">{{name}}</div>-->
      <!--绑定style样式 对象写法-->
      <div class="basic" :style="styleObj">{{name}}</div>
      <br /><br />
      <!--绑定style样式 数组写法-->
      <!--<div class="basic" :style="[styleObj,styleObj2]">{{name}}</div>-->
      <div class="basic" :style="styleArr">{{name}}</div>
      <br /><br />
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          name: '张三丰',
          mood: 'normal',
          classArr: ['atguigu1', 'atguigu2', 'atguigu3'],
          classObj: {
            atguigu1: false,
            atguigu2: false,
          },
          styleObj: {
            fontSize: '100px',
            color: 'red',
            background: 'orange',
          },
          styleObj2: {
            color: 'red',
          },
          styleArr: [
            {
              fontSize: '100px',
              color: 'red',
              background: 'orange',
            },
            {
              color: 'bule',
            },
          ],
        },
        methods: {
          change() {
            const arr = ['happy', 'sad', 'normal']
            // 随机生成0 ,1 ,2三个数之1  Math.random() 0到1, 包括0, 不包括1
            const index = Math.floor(Math.random() * 3) //随机生成0,1,2三个数字中1个
            this.mood = arr[index]
          },
        },
      })
    </script>
  </body>
</html>
```
##  16. [条件渲染](https://cn.vuejs.org/v2/guide/conditional.html)
::: danger 注意了
1. 使用v-if时, 元素可能无法获取到, 仅使用v-show一定可以获取到;
2. template 标签不影响页面结构, 渲染的时候, 会把这个标签去掉;
3. 值得注意的是 template只能配合v-if使用, 不能配合v-show 使用
:::
### 16.1 v-if
::: tip 留意了
1. 适用与切换频率较低的场景
2. 不展示的DOM元素直接被移除
3. v-if可以和v-else-if,v-else 一起使用, 但要求结构不能被打断
:::
```html
v-if="表达式"
v-else-if="表达式"
v-else="表达式"
```
### 16.2 v-show
::: tip 留意了
1. 写法: v-show="表达式"
2. 适用于: 切换频率较高的场景
3. 特点: 不展示的DOM元素未被移除, 仅仅是使用样式的隐藏掉;
:::
### 16.3 条件渲染demo
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>条件渲染</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <h2>当前的n值是: {{n}}</h2>
      <button @click="n++">点我n+1</button>
      <div v-show="n===1">php</div>
      <div v-show="n===2">java</div>
      <div v-show="n===3">redis</div>
      <div v-if="n===4">golang</div>
      <div v-if="n===5">python</div>
      <div v-if="n===6">javascript</div>
      <!--
        1. 下面这种写法, 当if成立, 后面两个不会走了,如果直接写if,
           都需要参与判断, 相对来说, 下面的写法要好些;
        2. v-else 和 v-else-if,中间不允许被打断,必须连续写在一起;
           打断后面的就不会生效了
        -->
      <div v-if="n===7">golang1</div>
      <div v-else-if="n===8">python2</div>
      <div v-else-if="n===9">javascript3</div>
      <!-- 
        最后一个v-else不用写条件, 判断都不成立,走v-else
      -->
      <div v-else>哈哈哈</div>
      <!--    <h2 v-show="n===1">北京</h2>-->
      <!--    <h2 v-show="n===1">上海</h2>-->
      <!--    <h2 v-show="n===1">深圳</h2>-->
      <!--    <div v-if="n===1">-->
      <!--        <h2>北京</h2>-->
      <!--        <h2>上海</h2>-->
      <!--        <h2>深圳</h2>-->
      <!--        <h2>成都</h2>-->
      <!--    </div>-->
      <!-- 
        template 标签不影响页面结构, 渲染的时候, 会把这个标签去掉;
        值得注意的是 template只能配合v-if使用, 不能配合v-show 使用
      -->
      <!-- v-if 和template 的配合使用-->
      <template v-if="n===1">
        <h2>北京</h2>
        <h2>上海</h2>
        <h2>深圳</h2>
        <h2>成都</h2>
      </template>

      <!--    使用v-show做条件渲染-->
      <!--    <h2 v-show="true">欢迎来到{{name}}</h2>-->
      <!--    <h2 v-show="1===1">欢迎来到{{name}}</h2>-->
      <!--    <h2 v-show="a">欢迎来到{{name}}</h2>-->
      <!--    使用v-if做条件渲染-->
      <!--    <h2 v-if="a">欢迎来到{{name}}</h2>-->
      <!--    <h2 v-if="1===1">欢迎来到{{name}}</h2>-->
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          name: '成都',
          a: true,
          n: 0,
        },
      })
    </script>
  </body>
</html>
```
##  17. [列表渲染v-for](https://cn.vuejs.org/v2/guide/list.html)
### 17.1    列表渲染初探
::: tip 留意
1. v-for指令用于展示列表数据
2. 语法: v-for="(item,index) in xxx" :key="yyy" key要保证唯一性;item是被迭代的数组元素的别名,index是当前项的索引;
3. 可遍历: 数组, 对象, 字符串(用得很少), 指定次数(用得很少)
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>基本列表</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <!--    测试遍历指定次数-->
      <ul>
        <li v-for="(number,index) of 5" :key="index">{{index}}---{{number}}</li>
      </ul>
      <!--    测试遍历字符串-->
      <ul>
        <!--        保证key的唯一就可以-->
        <li v-for="(char,index) of str" :key="index">{{index}}---{{char}}</li>
      </ul>
      <!--    遍历对象-->
      <ul>
        <li v-for="(value,k) of car" :key="k">{{k}}---{{value}}</li>
      </ul>

      <ul>
        <!--        遍历数组, 用得最多-->
        <h2>人员列表</h2>
        <!-- key就是每一个节点的标识,必须加冒号, 加了, 后面才当表达式去处理,
           我们只要保证每一个li的key不一样就可以,  p是形参-->
        <!--        <li v-for="p in persons" :key="p.user_id">-->
        <!--            {{p.name}}&#45;&#45;{{p.age}}-->
        <!--        </li>-->
        <!--
            index 就是遍历时候的索引值, 就是0,1,2的增长,
            还有1个细节, in可以用of替代
          -->
        <li v-for="(p,index) in persons" :key="p.user_id">
          {{p.name}}--{{p.age}}---{{p.user_id}}--{{index}}
        </li>
      </ul>
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          persons: [
            { user_id: '004', name: '张三', age: 18 },
            { user_id: '002', name: '李四', age: 19 },
            { user_id: '003', name: '王五', age: 20 },
          ],
          car: {
            name: '宝马',
            price: '70万',
            color: '白色',
          },
          str: 'hello中国',
        },
      })
    </script>
  </body>
</html>
```
### 17.2    列表中key的原理和作用
::: tip 注意了
1. 虚拟DOM中key的作用,key是虚拟DOM对象的标识, 当数据发生变化时, vue会根据新数据生成新的虚拟DOM, 随后Vue进行新虚拟DOM与旧虚拟DOM的差异比较;
2. 新旧虚拟DOM比较规则,旧虚拟DOM对比的diff算法, 是为了复用节点;
    1. 旧虚拟DOM中找到了 与 新虚拟DOM相同的key; 若虚拟DOM中内容没变, 直接使用之前的真实DOM;若虚拟DOM中内容变了, 则生成新的真实DOM, 随后替换掉页面中之前的真实DOM;
    2. 旧虚拟DOM中未找到 与 新虚拟DOM相同的key; 则创建新的真实DOM, 随后渲染到页面;
3. 用index作为key可能会引发的问题
    1. 若对数据进行: 逆序添加, 逆序删除等破坏操作, 会产生没有必要的真实DOM更新, 界面效果没问题, 但效率低;
    2. 如果结果中还包含输入类的DOM; 会产生错误DOM更新, 界面有问题;
4. 开发者如何选择key?
    1. 最好使用每条数据的唯一标识作为key, 比如id, 手机号, 身份证号, 学号等唯一值;
    2. 如果不存在对数据的逆序添加, 逆序删除等破坏顺序操作, 仅用于渲染列表用于展示, 使用index作为key是没有问题的;
5. 如果页面中没有写key, Vue默认用index作为key;
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>基本列表</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <h2>人员列表</h2>
      <button @click.once="add">添加一个老刘到persons数组的第一个</button>
      <ul>
        <li v-for="(p,index) in persons" :key="p.id">
          {{p.name}}--{{p.age}}---{{index}}
          <input type="text" />
        </li>
      </ul>
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          persons: [
            { user_id: '001', name: '张三', age: 18 },
            { user_id: '002', name: '李四', age: 19 },
            { user_id: '003', name: '王五', age: 20 },
          ],
        },
        methods: {
          add() {
            const p = { id: '004', name: '老刘', age: 30 }
            this.persons.unshift(p)
          },
        },
      })
    </script>
  </body>
</html>
```
##  18.列表过滤(模糊搜索)
::: tip 注意了
当计算属性和侦听都能实现, 优先使用计算属性
:::
### 18.1 侦听属性实现列表过滤
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>列表--监视(侦听)实现过滤数据</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <h2>人员列表</h2>
      <input type="text" placeholder="请输入名字" v-model="keyword" />
      <ul>
        <li v-for="(p,index) in filPersions" :key="p.user_id">
          {{p.name}}--{{p.age}}---{{p.user_id}}
        </li>
      </ul>
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          keyword: '',
          persons: [
            { user_id: '001', name: '刘德华', age: 18 },
            { user_id: '002', name: '张雪德', age: 19 },
            { user_id: '003', name: '谢霆锋', age: 20 },
            { user_id: '004', name: '张锋天', age: 30 },
          ],
          filPersions: [],
        },
        watch: {
          keyword: {
            /*  一上来用户啥都没干, 都调用了一次handler, 
                传入的是空字符串, 搜索全部,因为搜索的字符串都包含空字符串
            */
            immediate: true,
            handler(val) {
              /*
                过滤数组 filter是返回一个新数组,
                过滤出来的  `字符串包含空字符串str.indexOf('')`
              */
              this.filPersions = this.persons.filter((p) => {
                // 不等于-1就匹配上了
                return p.name.indexOf(val) !== -1
              })
            },
          },
        },
      })
    </script>
  </body>
</html>
```
### 18.2 计算属性实现列表过滤
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>列表--计算属性实现过滤数据</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <h2>人员列表</h2>
      <input type="text" placeholder="请输入名字" v-model="keyword" />
      <ul>
        <li v-for="(p,index) in filPersons" :key="p.user_id">
          {{p.name}}--{{p.age}}---{{p.user_id}}
        </li>
      </ul>
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          keyword: '', //用户输入的
          persons: [
            { user_id: '001', name: '刘德华', age: 18 },
            { user_id: '002', name: '张雪德', age: 19 },
            { user_id: '003', name: '谢霆锋', age: 20 },
            { user_id: '004', name: '张锋天', age: 30 },
          ],
        },
        computed: {
          filPersons() {
            // 外面这个return 是计算属性规定的, 返回返回值
            return this.persons.filter((p) => {
              // 不等于-1就匹配上了
              return p.name.indexOf(this.keyword) !== -1
            })
          },
        },
      })
    </script>
  </body>
</html>
```
##  19. 列表排序
::: tip注意了
1. 一切的逻辑都在计算属性里面, 计算属性要有返回return
2. 涉及排序, 遍历列表的key, 务必用唯一数据ID
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>列表--排序</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <h2>人员列表</h2>
      <input type="text" placeholder="请输入名字" v-model="keyword" />
      <button @click="sortType = 2">年龄升序</button>
      <button @click="sortType = 1">年龄降序</button>
      <button @click="sortType = 0">原顺序</button>
      <ul>
        <li v-for="(p,index) in filPersons" :key="p.user_id">
          {{p.name}}--{{p.age}}---{{p.user_id}}
          <input type="text" />
        </li>
      </ul>
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          keyword: '', //过滤的关键词
          sortType: 0, // 0 原顺序  1降序 2升序
          persons: [
            { user_id: '001', name: '刘德华', age: 38 },
            { user_id: '002', name: '张雪德', age: 29 },
            { user_id: '003', name: '谢霆锋', age: 20 },
            { user_id: '004', name: '张锋天', age: 30 },
          ],
        },
        computed: {
          filPersons() {
            // 外面这个return 是计算属性规定的, 返回返回值
            const arr = this.persons.filter((p) => {
              // 不等于-1就匹配上了
              return p.name.indexOf(this.keyword) !== -1
            })
            // 判断一下是否需要排序
            if (this.sortType) {
              //拿过滤之后的数组排序
              arr.sort((p1, p2) => {
                return this.sortType === 1 ? p2.age - p1.age : p1.age - p2.age
              })
            }
            return arr
          },
        },
      })
    </script>
  </body>
</html>
```
##  20. 数据监测
### 20.1 数据监测问题引入
::: tip 问题描述
1. 点击更新按钮后, 页面没有改变, 这时才点开Vue开发工具, 发现里面是变了;
2. 先打开Vue开发工具, 再点击按钮, 发现Vue开发工具值变了, 但页面没有变化;
3. 在控制台输出Vue改变的元素, 发现代码是改了的, 就是Vue没有检测到, 导致页面没有变化; 就是Vue不承认你写的代码;
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>列表--更新时的一个问题</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <!--    引出问题, 写一个按钮更新刘德华信息-->
      <h2>人员列表</h2>
      <button @click="updateHua">更新刘德华信息</button>
      <ul>
        <li v-for="(p,index) in persons" :key="p.user_id">
          {{p.name}}--{{p.age}}---{{p.user_id}}
        </li>
      </ul>
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          persons: [
            { user_id: '001', name: '刘德华', age: 38 },
            { user_id: '002', name: '张雪德', age: 29 },
            { user_id: '003', name: '谢霆锋', age: 20 },
            { user_id: '004', name: '张锋天', age: 30 },
          ],
        },
        methods: {
          updateHua() {
            // this.persons[0].name = '马老师' // 奏效
            // this.persons[0].age = 50 //
            this.persons[0] = { user_id: '001', name: '马老师', age: 50 }
          },
        },
      })
    </script>
  </body>
</html>
```
### 20.2 数据监测的原理
::: danger 特别注意
1. 监测对象: Vue加工数据之后就能对数据进行监视, 做成响应式了, 响应式就是数据变化, 页面跟着变化; 只要你改数据, 就会重新解析虚拟DOM, 重新生成模板;
2. Vue.set的使用: Vue读取了一个对象中不存在的属性, 不会报错, 是undefined, 页面不显示;
3. Vue.set(target,key,val)
    1. Vue.set(vm._data.student,'sex','男') //data下面student中添加sex
    2. Vue.set(vm.student,'sex','男') //直接下面这样写, 数据代理
    +   target 目标, 你要往谁身上追加一个属性
    +   key 属性key
    +   val 属性值
4. vm.$set(target,key,val) api
    1. vm.$set(vm._data.student,'sex','女')
    2. vm.$set(vm.student,'sex','女') //下面这样写, 数据代理 ._data.student和student通过数据代理之后, 是一样的
    3. vue.set 不能在vue填写新属性, 必须在一个已经是响应式的属性里面添加属性, 比如data下不能直接添加year, 但可以在school这个已经存在的属性下添加属性
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>列表--更新时的一个问题</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <h2>学校名称: {{school.name}}</h2>
      <h2>学校地址: {{school.address}}</h2>
      <h2>描述: {{school.describe}}</h2>
      <!-- <h2>建校年代: {{year}}</h2>-->
      <button @click="add">school里面添加一个描述, 默认值:一般</button
      ><br /><br /><br />
      <!-- <button @click="addYear">school同级添加一个建校年代</button>-->
      <!-- 
        错误写法, vue.set 不能在vue填写新属性, 必须在一个已经是响应式的属性里面添加属性, 
        比如data下不能直接添加year, 但可以在school这个已经存在的属性下添加属性
      -->
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          school: {
            name: '清华大学',
            address: '北京市',
          },
        },
        methods: {
          addYear() {
            // Vue.set(this,'year','1910年成立')
          },
          add() {
            // 第一种写法
            // Vue.set(this.school, 'describe', '很牛逼的学校')
            //写法二. 利用vm 里面的方法
            vm.$set(this.school, 'describe', '您都不知道我有多么牛逼')
          },
        },
      })
    </script>
  </body>
</html>
```
### 20.3 [Vue监测数组](https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B)
:::tip 注意了
push, pop, shift, unshift, splice, sort, reverse, 会影响原数组的, 只要操作的是这七个方法, Vue才能监测到; 页面肯定有反应的; Vue只监测了这个数组, 没有检测数组元素, 只有数组调用这个七个方法, 引起数组的改变, 才能被Vue监测到;从而形成响应式;
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>列表--更新时的一个问题</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <!--    引出问题, 写一个按钮更新刘德华信息-->
      <h2>人员列表</h2>
      <button @click="updateHua">更新刘德华信息</button>
      <ul>
        <li v-for="(p,index) in persons" :key="p.user_id">
          {{p.name}}--{{p.age}}---{{p.user_id}}
        </li>
      </ul>
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          persons: [
            { user_id: '001', name: '刘德华', age: 38 },
            { user_id: '002', name: '张雪德', age: 29 },
            { user_id: '003', name: '谢霆锋', age: 20 },
            { user_id: '004', name: '张锋天', age: 30 },
          ],
        },
        methods: {
          updateHua() {
            // this.persons[0].name = '马老师' // 奏效
            // this.persons[0].age = 50 //
            // this.persons[0] =  {user_id:'001',name:'马老师',age:50} //不生效
            this.persons.splice(0, 1, {
              user_id: '001',
              name: '马老师',
              age: 50,
            })
          },
        },
      })
    </script>
  </body>
</html>
```
### 20.4 Vue监测原理总结
::: danger 注意了, 重点来了
1. Vue会监视data中所有层次的数据
2. 如何监测对象中的数据
    1. 通过setter实现监视, 且要在new Vue 时就传入要监测的数据
    2. 对象中追加的属性, Vue默认不做响应式处理;
    3. 如需要给后添加的属性做响应式, 请使用如下API:
        1. Vue.set(target,propertyName/idnex,value)
        2. vm.$set(target,propertyName/idnex,value)
3. 如何监测数组中的数据,通过包裹数组更新元素的方法实现, 本质就是做了两件事:
    1. 调用原生对应的方法对数组进行更新;
    2. 重新解析模板, 进而更新页面;
4. 在Vue修改数组中的某个元素一定要用如下方法, 当然还可以替换数组(新数组替换旧数组)
    1. 使用这些API: push(), pop(), shift(), unshift(), splice(), sort(), reverse();
    2. Vue.set() 或 vm.$set()
    3. 特别注意: Vue.set() 和 vm.$set() 不能给vm或vm的根数据对象添加属性!!!
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>数据监测总结</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <h2>学生信息</h2>
      <button @click="student.age++">年龄+1岁</button>
      <br /><br />
      <button @click="addSex">添加性别属性, 默认值: 男</button>
      <br /><br />
      <button @click="student.sex = '未知' ">修改性别为未知</button>
      <br /><br />
      <button @click="addFriend">在列表首位添加一个朋友</button>
      <br /><br />
      <button @click="updateFirstFriendName">
        修改第一个朋友的名字为:张三
      </button>
      <br /><br />
      <button @click="addHobby">添加一个爱好</button>
      <br /><br />
      <button @click="updateHobby">修改第一个爱好为开车</button>
      <br /><br />
      <button @click="removeSmoke">过滤掉爱好中的抽烟</button>
      <br /><br />
      <h4>姓名: {{student.name}}</h4>
      <h4 v-if="student.sex">性别: {{student.sex}}</h4>
      <h4>年龄: {{student.age}}</h4>
      <h4>
        爱好:
        <ul>
          <li v-for="(p,index) in student.hobby" :key="index">{{p}}</li>
        </ul>
      </h4>
      <h3>朋友们:</h3>
      <ul>
        <li v-for="(p,index) in student.friends" :key="index">
          {{p.name}}--{{p.age}}
        </li>
      </ul>
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          student: {
            name: 'tom',
            age: 18,
            hobby: ['抽烟', '喝酒', '烫头'],
            friends: [
              { name: 'jerry', age: 35 },
              { name: 'tony', age: 18 },
            ],
          },
        },
        methods: {
          removeSmoke() {
            //过滤得到新数组后, 重新赋值给原来的变量
            this.student.hobby = this.student.hobby.filter((h) => {
              //函数体, 不是由Vue的函数, 尽量协程箭头函数
              return h !== '抽烟'
            })
          },
          updateHobby() {
            // this.student.hobby.splice(0,1,'开车') // 方法1
            // Vue.set(this.student.hobby,0,'开车') //方法2
            this.$set(this.student.hobby, 0, '开车') //方法3
          },
          addHobby() {
            this.student.hobby.push('学习')
          },
          updateFirstFriendName() {
            //有set 和get 就能被监测到
            this.student.friends[0].name = '张三'
            this.student.friends[0].age = 100
          },
          addSex() {
            // Vue.set(this.student,'sex','男')
            this.$set(this.student, 'sex', '男')
          },
          addFriend() {
            this.student.friends.unshift({ name: 'marry', age: 28 })
          },
        },
      })
    </script>
  </body>
</html>
```
### 20.5 数据劫持
::: tip 理解
data的数据放到Vue中去, 添加了set和get, 就是数据劫持了, 有空的时候, 可以看下数据代理和数据劫持, 就是一个概念的意思, 就是理解set和get;
:::
##  21. 收集表单数据
::: tip 收集表单数据
1. 若`<input type="text" />`,则v-model收集的是value值, 用户输入的就是value值;
2. 若`<input type="radio"/>`, 则v-model收集的是value值, 且要给标签配置value值;
3. 若`<input type="checkbox" />`
    1. 没有配置input的value属性, 那么收集的就是checked(勾选或未勾选, 是布尔值)
    2. 配置input的value属性
        1. v-model的初始值是非数组, 那么收集的就是checked(勾选或未勾选, 是布尔值)
        2. v-model的初始值是数组, 那么收集的就是value组成的数组
:::
::: danger v-model的三个修饰符
1. lazy: 失去焦点再收集数据
2. number: 输入字符串转为有效的数字
3. trim: 输入首尾空格过滤
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>收集表单数据</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <form @submit.prevent="demo">
        <!--        trim修饰符, 去掉前后的空格-->
        账号:<input type="text" v-model.trim="userInfo.account" /> <br /><br />
        密码:<input type="password" v-model="userInfo.password" /> <br /><br />
        <!--  type = number 只能输入数字  
              v-model.number  number修饰符, 一般和前面的type=number同时使用, 
              一个限制只能输入数字, 一个是把收集到的数字转为数字类型, 不然就是数字字符串
          -->
        年龄:<input type="number" v-model.number="userInfo.age" /> <br /><br />
        性别:
        <!-- name控制, 表示男和女是一组的-->
        <!-- v-model默认收集的是value值-->
        男<input type="radio" name="sex" v-model="userInfo.sex" value="男" />
        女<input type="radio" name="sex" v-model="userInfo.sex" value="女" />
        <br /><br />
        爱好:
        <input type="checkbox" v-model="userInfo.hobby" value="study" />学习
        <input type="checkbox" v-model="userInfo.hobby" value="game" />游戏
        <input type="checkbox" v-model="userInfo.hobby" value="work" />工作
        <br /><br />
        所属校区:
        <select v-model="userInfo.city">
          <option value="">请选择校区</option>
          <option value="bj">北京</option>
          <option value="sh">上海</option>
          <option value="gz">广州</option>
          <option value="cd">成都</option>
        </select>
        <br /><br />
        其他信息:
        <br />
        <!-- lazy修饰符,失去焦点的一瞬间收集, 不是时时收集       -->
        <textarea v-model.lazy="userInfo.otherInfo"></textarea>
        <br /><br />
        <input type="checkbox" v-model="userInfo.agree" />阅读并接受<a
          href="https://www.baidu.com"
          >《用户协议》</a
        >
        <br /><br />
        <button>提交</button>
      </form>
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          userInfo: {
            account: '',
            password: '',
            age: '',
            sex: '女',
            hobby: [],
            city: 'cd',
            otherInfo: '',
            agree: '',
          },
        },
        methods: {
          demo() {
            // 方法用于将 JavaScript 值转换为 JSON 字符串。
            // console.log(JSON.stringify(this._data))
            console.log(this.userInfo)
            console.log(JSON.stringify(this.userInfo))
          },
        },
      })
    </script>
  </body>
</html>
```
##  22. [过滤器](https://cn.vuejs.org/v2/guide/filters.html#ad)
::: tip 提示
1. 定义: 对要显示的数据进行特定格式化后在显示(适用于一些简单逻辑的处理)
2. 语法
    1. 注册过滤器: Vue.filter(name,callbck) 或 new Vue(filters:{})
    2. 使用过滤器: {{ xxx | 过滤器名 }} 或 v-bind:属性= "xxx | 过滤器名"
3. 过滤器也可以接收额外参数, 多个过滤器也可以串联
4. 过滤器并么有改变原来的数据, 是产生新的对应数据
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>过滤器</title>
    <script type="text/javascript" src="../js/vue.js"></script>
    <script type="text/javascript" src="../js/dayjs.min.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root2">
      <h3>Vue实例2:{{nice | mySlice}}</h3>
    </div>
    <br /><br /><br /><br />
    <div id="root">
      <h2>显示格式化后的时间</h2>
      <h3>计算属性显示: {{fmtTime}}</h3>
      <h3>methods显示: {{getFmtTime()}}</h3>
      <!--   | 竖是管道符, 一个管道符, 后面跟管道符名字, 名字自定义 -->
      <!--   
         vue捕获到了time, 
         把time作为参数传给了timeForMater(函数),
         timeForMater的返回值直接替换掉整个插值语法, 
         实现页面更新解析, timeForMater 不写参数, 也能作为参数传过去
      -->
      <h3>过滤器显示:{{time | timeForMater}}</h3>
      <!--
        这里传了1个参数, 实际是2个参数, 第一个参数传与不传, 
        永远都是管道符签名的属性time
      -->
      <h3>过滤器传参显示:{{time | timeForMater('YYYY-MM-DD')}}</h3>
      <!-- 
          工作原理,`time | timeForMater('YYYY-MM-DD HH:mm')`的
          工作结果继续往后传给mySlice处理, 值得注意的是, 
          time不会直接交给mySlice处理, 是一层一层处理, 
          处理的结果再交给下一个过滤器处理, 处理完所有的过滤器为止
       -->
      <h3>
        多个过滤器串联显示:{{time | timeForMater('YYYY-MM-DD HH:mm') | mySlice}}
      </h3>
      <!--    v-bind也能用过滤器, 但很罕见这样使用-->
      <h3 :x="msg | mySlice">您好中国人</h3>
    </div>
    <script>
      Vue.config.productionTip = false
      //全局过滤器, 必须在new Vue之前就写好
      Vue.filter('mySlice', function (value) {
        return value.slice(0, 4)
      })

      const vm = new Vue({
        el: '#root',
        data: {
          time: Date.now(),
          msg: '您好中国人牛逼了',
        },
        methods: {
          getFmtTime() {
            return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss')
          },
        },
        /*
          过滤器,  过滤器本质是一个函数, 
          写在vm里面的过滤器,都是局部过滤器,
          只有这个vm可以用, 一个组件就是一个小型的vm
         */
        //局部过滤器
        filters: {
          timeForMater(value, str = 'YYYY-MM-DD HH:mm:ss') {
            console.log(value)
            return dayjs(value).format(str)
          },
          // 保留字符串前4位, 模拟顾虑器串联
          // mySlice(value){
          //     return value.slice(0,4)
          // }
        },
        computed: {
          fmtTime() {
            //this.time 传了就是传的时间, 不传就是当前调用时间
            return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss')
          },
        },
      })
      const vm2 = new Vue({
        el: '#root2',
        data: {
          nice: '开心就好, 一路顺风',
        },
      })
    </script>
  </body>
</html>
```
##  23. 内置指令
### 23.1 v-bind
单向绑定解析表达式, 可以简写为: `:` ,常用属性绑定
### 23.2 v-model
双向数据绑定, 常用表单数据绑定
### 23.3 v-for
遍历数组/对象/字符串
### 23.4 v-on
绑定事件监听, 可简写为 `@`
### 23.5 v-if/v-else
条件渲染(动态控制节点是否存在)
### 23.6 v-show
条件渲染(动态控制节点是否展示)
### 23.7 v-text
::: tip 注意
1. 向其所在的节点中渲染文本内容
2. v-text 会替换调节点中的内容, {{xxx}}则不会
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>内置指令</title>
    <script type="text/javascript" src="../js/vue.js"></script>
    <script type="text/javascript" src="../js/dayjs.min.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <div>{{name}}</div>
      <div>{{str}}我还在干嘛</div>
      <!-- 
           v-text 会拿到name的值, 
           替换掉整个div里面的内容,div里面写啥都没有作用了
      -->
      <div v-text="name"></div>
      <div v-text="str">我还在干嘛</div>
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          name: '成都您好!!!',
          //str会当成整个字符串来识别
          str: '<h3>您好啊!!<h3>',
        },
      })
    </script>
  </body>
</html>
```
### 23.8 v-html
::: tip 注意
1. 作用,向指定节点中渲染包含html结构的内容
2. 与插值语法的区别
    1. v-html 会替换调节点所有的内容, {{xxx}}则不会
    2. v-html 可以识别html结构
3. v-html有安全性问题
    1. 在网站上动态渲染任意HTML是非常危险的, 容易导致XSS攻击(XSS攻击就是盗取浏览器cookie)
    2. 一定要在可信的内容上使用v-html, 永远不要在用户提交的内容上使用
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>内置指令</title>
    <script type="text/javascript" src="../js/vue.js"></script>
    <script type="text/javascript" src="../js/dayjs.min.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <div v-text="name"></div>
      <div v-text="str"></div>
      <br /><br />
      <div v-html="name"></div>
      <div v-html="str"></div>
      <div v-html="str2"></div>
    </div>
    <script>
      Vue.config.productionTip = false
      const vm = new Vue({
        el: '#root',
        data: {
          name: '成都您好!!!',
          //str会当成整个字符串来识别
          str: '<h3>您好啊!!<h3>',
          // str2:'<a href="javascript:alert(1)">兄弟, 我找你想要的资源了!!<a>'
          //document.cookie  获取浏览器所有cookie,  有的浏览器有安全限制, 有https
          str2: '<a href=javascript:location.href="http://www.baidu.com?"\
           + document.cookie>兄弟, 我找你想要的资源了!!<a>',
        },
      })
    </script>
  </body>
</html>
```
### 23.9 v-cloak
::: tip 提示
1. v-cloak指令没有值, 本质是一个特殊属性, Vue实例创建完毕并接管容器后, 会删除v
2. 使用css配合v-cloak可以解决网速慢时页面展示{{xxx}}的问题
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>内置指令</title>
    <style>
      [v-cloak] {
        display: none;
      }
    </style>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <div v-cloak>{{name}}</div>
    </div>
    <script type="text/javascript" src="../js/vue.js"></script>
    <script type="text/javascript" src="../js/dayjs.min.js"></script>
  </body>
  <script>
    Vue.config.productionTip = false
    const vm = new Vue({
      el: '#root',
      data: {
        name: '成都您好!!!',
      },
    })
  </script>
</html>
```
### 23.10 v-once
::: tip 注意了
1. v-once所在节点在初次动态渲染后, 就视为静态内容了;
2. 以后数据的改变不会引起v-once所在结构的更新, 可以用于优化性能;
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>内置指令</title>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <div v-once>当前的n值是:{{n}}</div>
      <div>初始化的n值是:{{n}}</div>
      <button @click="n++">点我n+1</button>
    </div>
    <script type="text/javascript" src="../js/vue.js"></script>
    <script type="text/javascript" src="../js/dayjs.min.js"></script>
  </body>
  <script>
    Vue.config.productionTip = false
    const vm = new Vue({
      el: '#root',
      data: {
        n: 10,
      },
    })
  </script>
</html>
```
### 23.11 v-pre
::: tip 注意
1. v-pre指令, 跳过其所在节点的编译过程;
2. 可利用它跳过, 没有使用指令语法, 没有使用插值语法的节点, 会加快编译;
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>内置指令</title>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <!-- v-pre 加了这一行就不编译了   -->
      <h2 v-pre>Vue其实很简单的</h2>
      <div>初始化的n值是:{{n}}</div>
      <div v-pre>初始化的n值是:{{n}}</div>
      <button @click="n++">点我n+1</button>
    </div>
    <script type="text/javascript" src="../js/vue.js"></script>
    <script type="text/javascript" src="../js/dayjs.min.js"></script>
  </body>
  <script>
    Vue.config.productionTip = false
    const vm = new Vue({
      el: '#root',
      data: {
        n: 10,
      },
    })
  </script>
</html>
```   
##  24. 自定义指令
::: tip 提示
1. Vue让我们不用自己去操作dom元素了;Vue帮我们动了dom元素;
2. 但自定义指令, 需要我们自己去操作dom元素, 这个指令需要怎么操作dom元素, 需要我们自己去写; 相当于把原生的dom操作进行了封装;
:::
### 24.1 函数式写法
::: tip 理解
1. 实现: 自定义指令:定义一个v-big指令, 和v-text类似, 但会把绑定的数值放大10倍
2. 自定义指令, Vue会给我们两个参数, 一个是真正的dom元素 让我们可以进行dom操作, 另外一个是绑定的所有信息, 让我们可以操作具体的属性;
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>
      自定义指令:定义一个v-big指令, 和v-text类似, 但会把绑定的数值放大10倍
    </title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <!-- v-pre 加了这一行就不编译了   -->
      <h2>
        当前的n值是:<span v-text="n"></span> <br /><br /><br />
        放大10倍的n值是:<span v-big="n"></span>
      </h2>
      <button @click="n++">点我n+1</button>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false
    new Vue({
      el: '#root',
      data: {
        n: 1,
      },
      /* 自定义指令配置, 指令名称不带v-
       element 真正的dom元素
       binding 绑定的所有信息
       big 函数何时被调用?
         1. 指令和元素成功绑定时;
         2. 指令所在的模板被重新解析时
      */
      directives: {
        big(element, binding) {
          console.log(element, binding.value * 10)
          element.innerText = binding.value * 10
        },
      },
    })
  </script>
</html>
```
### 24.2 对象式写法
::: tip 注意
定义一个v-fbind功能, 和v-bind功能类似, 但可以让其所绑定的input元素默认获取焦点
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>
      定义一个v-fbind功能, 和v-bind功能类似,
      但可以让其所绑定的input元素默认获取焦点
    </title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <!-- v-pre 加了这一行就不编译了   -->
      <h2>当前的n值是:<span v-text="n"></span></h2>
      <button @click="n++">点我n+1</button>
      <hr />
      <input type="text" v-fbind:value="n" />
    </div>
  </body>
  <script>
    Vue.config.productionTip = false
    new Vue({
      el: '#root',
      data: {
        n: 1,
      },
      directives: {
        /* 
           big 函数何时被调用? 
            1. 指令和元素成功绑定时(bind);  
            2. 指令所在的模板被重新解析时(update)
           关键的时间点, vue帮我们调用一个关键的函数
        */
        fbind: {
          //  钩子函数, vue会在不同的时刻帮我们调用不同的函数
          //  指令和元素成功绑定时(一上来)
          bind(element, binding) {
            console.log('bind')
            element.value = binding.value * 20
          },
          //指令所在元素被插入页面时
          inserted(element, binding) {
            console.log('inserted')
            element.focus()
          },
          //指令所在的模板被重新解析时
          update(element, binding) {
            // update的值一般和bind的内容是一样的, 上来是什么样, 也要更新成什么样
            console.log('update')
            element.value = binding.value * 20
            // element.focus()
          },
        },

        fbind1(element, binding) {},
      },
    })
  </script>
</html>
```
### 24.3  指令名多个单词的情况
```html
放大10倍的n值是:<span v-big-number="n"></span>

下面写法:
<!--big(element,binding){-->
<!--                console.log(element,binding.value * 10)-->
<!--                element.innerText = binding.value * 10-->
<!--            }-->

'big-number'(element,binding){
                console.log(element,binding.value * 10)
                element.innerText = binding.value * 10
            }
```
### 24.4 指令(directives)里面的this是window
::: tip 注意
自定义函数里面的this都是window
:::
```html
directives:{          
    fbind:{             
        bind(element,binding){
            console.log('bind',this)
            element.value=binding.value * 20
        },            
        inserted(element,binding){
            console.log('inserted',this)
            element.focus()
        },              
        update(element,binding){                 
            console.log('update',this)
            element.value=binding.value * 20                  
        }
    },

    'big-number'(element,binding){
        console.log(element,binding.value * 10)
        element.innerText = binding.value * 10
    }
}
```
### 24.5 全局指令,类似过滤器写法
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>大总结</title>
    <script type="text/javascript" src="./js/vue.js"></script>
</head>
<body>
<!--准备好一个容器-->
<div id="root">
<!-- v-pre 加了这一行就不编译了   -->
    <h2>
        当前的n值是:<span v-text="n"></span><br><br>

        放大10倍的n值是:<span v-big-number="n"></span>

    </h2>
    <button @click="n++">点我n+1</button>
    <hr/>
    <input type="text" v-fbind:value="n">

</div>

</body>
<script>
    Vue.config.productionTip = false
    // 全局指令
    Vue.directive('fbind',{
        bind(element,binding){
            console.log('bind',this)
            element.value=binding.value * 20
        },
        inserted(element,binding){
            console.log('inserted',this)
            element.focus()
        },
        update(element,binding){
            console.log('update',this)
            element.value=binding.value * 20
        }
    })
    Vue.directive('big-number',function(element,binding){
        console.log(element,binding.value * 10)
        element.innerText = binding.value * 10
    })
    new Vue({
        el: '#root',
        data: {
            n: 1
        }
    })
</script>
</html>
```
### 24.5 总结
::: tip 定义语法
局部指令
new Vue({ directives:{指令名:配置对象} })
或
new Vue({ directives(){} })

全局指令
Vue.directive(指令名,配置对象)
或
Vue.directive(指令名,回调函数)
:::
::: warning 配置对象中常用的三个回调
1. bind 指令与元素成功绑定时调用
2. inserted 指令所在元素被插入页面时调用
3. update 指令所在模板结构被重新解析时调用
:::
::: danger 特别注意 
1.指令定义时不加v-, 但使用时要加v-<br>
2.指令名如果是多个单词, 要使用kebab-case命名方式, 不要用camelCase命名;
:::
##  25. Vue生命周期
### 25.1 人的生命周期
::: tip 提示
关键的时间点, 做关键的事
:::
```text
(重要)呱呱坠地  ===>   检查身体各项指标
      学会说话了
      学会走路了
      .........
      .........
(重要)将要永别 ===>   交代后事
      已经永别
```
### 25.2 vm的生命周期
::: tip 提示
关键的时间点, 调用关键的函数, 这一堆函数统称为Vue的生命周期
:::
```text
    将要创建      ===>    调用beforeCreate函数
    创建完毕      ===>    调用created函数
    将要挂载      ===>    调用beforeMount函数
(重要)挂载完毕    ===>    调用mounted函数  ===>  重要的钩子
    将要更新      ===>    调用beforeUpdate函数
    更新完毕      ===>    调用updated函数
(重要)将要销毁     ===>    调用beforeDestroy函数 ===> 重要的钩子
    销毁完毕      ===>    调用destroyed函数
```
### 25.3 生命周期
::: tip 提示
1. 又名: 生命周期回调函数, 生命周期函数, 生命周期钩子
2. 是什么? Vue在关键时刻帮我们调用的一些特殊名称的函数
3. 生命周期函数的名字不可更改(这里mounted不能变), 但函数的具体内容是程序员根据需求编写的
4. 生命周期函数中的this指向vm或者组件实例对象;
:::
### 25.4 demo引出生命周期
::: tip 提示
利用生命周期函数实现文字的渐变
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>生命周期</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <!--文字透明度循环变化-->
    <div id="root">
      <h2 v-if="a">您好</h2>
      <h2 :style="{opacity}">欢迎学习Vue</h2>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false
    new Vue({
      el: '#root',
      data: {
        a: false,
        opacity: 1,
      },
      // Vue完成模板解析并把**初始的**真实dom元素放入页面后(完成挂载)调用mounted
      mounted() {
        console.log('mounted')
        setInterval(() => {
          this.opacity -= 0.01
          if (this.opacity <= 0) this.opacity = 1
        }, 16)
      },
      methods: {},
    })
    //通过外部的定时器实现(不推荐,一般需要在vue内部实现)
    // setInterval(()=>{
    //     vm.opacity -= 0.01
    //     if(vm.opacity <= 0) vm.opacity = 1
    // },16)
  </script>
</html>
```
### 25.5    常用的声明周期钩子
::: tip 提示
1. mounted: 发送ajax请求, 启动定时器, 绑定自定义事件, 订阅消息等(初始化操作);
2. beforeDestroy: 清除定时器, 解绑自定义事件, 取消订阅等(收尾工作);
:::
### 25.6    关于销毁Vue实例
::: tip 注意
1. 销毁后借助Vue开发者工具看不到任何信息;
2. 销毁后自定义事件会失效, 但原生DOM事件依然有效;
3. 一般不会在beforeDestroy操作数据, 因为即便操作数据, 也不会再触发更新流程了
:::
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>生命周期</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <!--文字透明度循环变化-->
    <div id="root">
      <h2 v-if="a">您好</h2>
      <h2 :style="{opacity}">欢迎学习Vue</h2>
      <button @click="stop">点我停止变换</button>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false
    let id
    new Vue({
      el: '#root',
      data: {
        a: false,
        opacity: 1,
      },
      methods: {
        //停止定时器
        stop() {
          // clearInterval(this.timer) //清理定时器
          this.$destroy()
        },
      },
      mounted() {
        this.timer = setInterval(() => {
          console.log('定时器')
          this.opacity -= 0.01
          if (this.opacity <= 0) this.opacity = 1
        }, 16)
      },
      beforeDestroy() {
        console.log('删除定时器')
        clearInterval(this.timer) //清理定时器
      },
    })
  </script>
</html>
```