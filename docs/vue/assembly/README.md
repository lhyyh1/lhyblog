# Vue组件化编程
##  1. 理解组件
### 1.1 传统的代码编写方式存在的问题
1. 依赖关系混乱, 不好维护
2. 代码复用率不高
### 1.2 组件
1. 组件的定义:  实现应用中<font color="red">局部</font>功能<font color="red">代码(css,js,html)</font>和<font color="red">资源</font>的<font color="red">集合</font>;
2. 为什么: 一个界面的功能很复杂
3. 作用:   复用编码, 简化项目编码, 提高运行效率
### 1.3 模块
1. 理解: 向外提供特定功能的js程序, 一般就是一个js文件
2. 为什么: js文件很多很复杂
3. 作用:   复用js, 简化js的编写, 提高js运行效率
### 1.4 模块化
当应用中的js都以模块来编写, 那这个应用就是一个模块化的应用
### 1.5 组件化
当应用中的功能都是多组件的方式来编写的, 那这个应用就是一个组件化的应用
##  2. 组件的基本使用
### 2.1 组件的两种编写形式
::: tip 定义组件,又叫创建组件
Vue中, 组件是有两种编写形式的:
1. 第一种叫非单文件组件,一个文件中包含有n个组件, 比如,a.html中包含多个组件
2. 第二种叫单文件组件,一个文件中只包含1个组件, 比如,a.vue中只能是一个组件, 1个.vue文件就是一个组件;
3. 项目中都是用单文件组件: 条理清楚, 代码好维护
:::
### 2.2 创建组件的步骤
::: warning Vue中使用组件的三大步骤
1. 定义组件(创建组件)
2. 注册组件
3. 使用组件(写组件标签)
:::
### 2.3 如何定义组件
::: danger 如何定义组件
使用Vue.extend(options)创建, 其中options和new Vue(options)时传入的那个options几乎一样, 但区别如下:
1. el不要写, 为什么? 最终所有的组件都要经过一个vm的管理, 由vm中的el决定服务哪个容器;
2. data必须写成函数, 为什么? 避免组件被复用时, 数据存在引用关系;
3. 使用template可以配置组件结构
:::
### 2.4 如何注册组件
::: tip 注册组件
1. 局部注册: 用new Vue的时候传入components选项
2. 全局注册: 用Vue.component('组件名',组件)
:::
### 2.5 如何使用组件(写组件标签)
```html
<school></school>
```
### 2.6 demo
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>基本使用</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <!--    第三步: 编写组件标签-->
      <hello></hello>
      <xue-sh-eng></xue-sh-eng>
      <hr />
      <school></school>
      <hr />
      <xue-sh-eng></xue-sh-eng>
      <hr />
      <hello></hello>
      <hr />
    </div>
    <div id="root1">
      <hello></hello>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false
    //  第一步: 创建school组件(调用extend这个api)
    const hello = Vue.extend({
      // el: '#root',
      template: `
          <div>
            <h2>{{hello}}</h2>
          </div>
        `,
      data() {
        return {
          hello: '您好, 我亲爱的中国',
        }
      },
    })

    const school = Vue.extend({
      // el: '#root',
      template: `
          <div>
            <h2>学校名称: {{schoolName}}</h2>
            <h2>学校地址: {{address}}</h2>
            <button @click="showName">点我提示学校名称</button>
          </div>
        `,
      data() {
        return {
          schoolName: '北京大学',
          address: '北京市',
        }
      },
      methods: {
        showName() {
          alert(this.schoolName)
        },
      },
    })

    //  第一步: 创建student组件
    const student12 = Vue.extend({
      template: `
          <div>
            <h2>学生姓名: {{studentName}}</h2>
            <h2>学生年龄: {{age}}</h2>
          </div>
        `,
      data() {
        return {
          studentName: '翠花',
          age: 18,
        }
      },
    })
    //第二步: 全局注册组件, 其实局部注册用得比较多
    Vue.component('hello', hello)

    //创建vm
    new Vue({
      el: '#root',
      // 第二步: 局部注册组件components
      components: {
        // 组件名:上面创建的组件变量名称,尽量一样, 可以简写为school
        school, //组件名称和后面一样, 可以简写
        xueShEng: student12,
      },
      data: {
        hobby: '唱歌',
      },
    })

    new Vue({
      el: '#root1',
      // 第二步: 局部注册组件components
      components: {
        xueShEng: student12,
      },
    })
  </script>
</html>
```
##  3. 组件命名规则
### 3.1 一个单词组成的组件名
1. 第一种写法：（首字母小写）school 用的时候首字母小写
2. 第二种写法：（首字母大写）School 用的时候首字母大写
### 3.2 多单词组成的组件名
1. 第一种：（kebab-case）： my-school 使用时候一样
2. 第二种： 驼峰 MySchool 必须在脚手架才能用
### 3.3 关于组件标签
1. 第一种写法: `<school></school>`
2. 第二种写法: `<school/>`
3. 备注: 不用使用脚手架时, <school/>会导致后续组件不能渲染
### 3.4 组件的简写方式
`const school = Vue.extend(options) 可以简写为 const school = options`

::: warning 注意了
1. 组件名尽可能回避HTML中已有的元素名称, 例如: h2, H2都不行
2. 可以使用name配置项指定组件在开发者工具中呈现的名字
:::
##   4. 组件的嵌套
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>组件的嵌套</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!--准备好一个容器-->
    <div id="root">
      <!--        <app></app>-->
    </div>
    <script>
      Vue.config.productionTip = false

      //  定义student组件
      const student = Vue.extend({
        // el: '#root',
        // 可以使用name配置项指定组件在开发者工具中呈现的名字
        name: 'student',
        template: `
          <div>
            <h2>姓名: {{name}}</h2>
            <h2>年龄: {{age}}</h2>
          </div>
        `,
        data() {
          return {
            name: '张三',
            age: 18,
          }
        },
      })
      //  第一步: 创建school组件(调用extend这个api)
      const school = Vue.extend({
        // el: '#root',
        // 可以使用name配置项指定组件在开发者工具中呈现的名字
        template: `
          <div>
            <h2>学校名称: {{name}}</h2>
            <h2>学校地址: {{address}}</h2>
            <student></student>
          </div>
        `,
        data() {
          return {
            name: '四川大学',
            address: '四川省成都市',
          }
        },
        // 组件中局部注册组件 子组件注册给谁, 就在谁里面写子组件
        components: {
          student,
        },
      })
      const hello = Vue.extend({
        template: `
            <h1>{{msg}}</h1>
        `,
        data() {
          return {
            msg: '欢迎学习vue',
          }
        },
      })
      // 定义一个总的app组件, 管理所有组件
      const app = Vue.extend({
        template: `
              <div>
                  <hello></hello>
                 <school></school>
              </div>

            `,
        components: {
          hello,
          school,
        },
      })

      //创建vm
      new Vue({
        template: '<app></app>',
        el: '#root',
        // 第二步: 局部注册组件components
        components: {
          app,
        },
      })
    </script>
  </body>
</html>
```
##  5.  两个地方的理解
### 5.1 VueComponent的理解
::: tip 提示
1. school 组件本质是一个名为VueComponent的构造函数, 且不是程序员定义的, 是Vue.extend生成的
2. 我们只需要写<school/>或<school></school>, Vue解析时会帮我们创建school组件的实例对象, 即Vue帮我们执行的: new VueComponent(options);
3. 特别注意: 每次调用Vue.extend, 返回的都是一个全新的VueCompient !!!
4. 关于this指向
    1. 组件配置中: data函数, methods中的函数, watch中的函数, computed中的函数, 他们的this均是VueComponen
    2. new Vue()配置中, data函数, methods中的函数, watch中的函数, computed中的函数, 他们的this是Vue实例
5. VueComponent的实例对象, 以后简称为vc(也可称为组件实例对象); Vue的实例对象, 以后简称为vm
6. vc有的功能vm都有; vm有的el绑定后决定为哪一个实例服务,这块vc没有
:::
### 5.2 一个重要内置关系的理解
::: tip 提示
1. 内置关系:  VueComponent.prototype.proto === Vue.prototype
2. 为什么要有这个关系? <br>
让组件实例对象 (vc) 可以访问到Vue原型上的属性和方法;
:::
## 6. 单文件组件
::: danger 重点来了
Vue工程化开发, 基本都采用单文件组件
:::
###   6.1 单文件组件命名
:::   tip 提示
1. 一个vue文件就是一个组件 和vue组件命名一样
2. 单个单词, 常用 School.vue 命名
3. 多个单词, 常用 MySchool.vue 命名
:::
###   6.2 App.vue
::: tip 提示
App组件是汇总所有组件的
:::
```html
<template>
  <div>
    <img src="./assets/logo.png">
    <School></School>
    <Student/>
  </div>
</template>

<script>
// 引入组件
import School from "./components/School"
import Student from "./components/Student"
export default {
  name: "App",
  components:{
    School,
    Student
  }
}
</script>
<style>
</style>
```
###   6.3 School.vue
```html
<template>
  <!--组件的结构,template标签不参与结构编译-->
  <div class="demo">
    <h2>姓名: {{studentName}}</h2>
    <h2>年龄: {{studentAge}}</h2>
    <button @click="showName">点我提示名称</button>
  </div>
</template>

<script>
  // 交互相关的代码(数据, 方法等)
  // 暴露方法一:  export const school 分别暴露
  export default {
    name:'School', //给组件取一个名字, 呈现在开发者工具上, 一般和文件名保持一致
    data(){
      return {
        studentName:'张三',
        studentAge:20
      }
    },
    methods:{
      showName(){
        alert(this.studentName)
      }
    }
  }
//  暴露给别人引用 三种暴露, 选择一种暴露方式, 但一般选择默认暴露
  //  暴露方法二:  统一暴露
  // export {school}
  //  暴露方法三:  默认暴露
  // export default school

</script>

<style>
  /*组件的样式*/
  .demo{
    background-color: blueviolet;
  }
</style>
```
###   6.4 Student.vue
```html
<template>
  <!--组件的结构,template标签不参与结构编译-->
  <div class="demo">
    <h2>学生姓名: {{studentName}}</h2>
    <h2>学生年龄: {{studentAge}}</h2>
  </div>
</template>

<script>
  // 交互相关的代码(数据, 方法等)
  // 暴露方法一:  export const school 分别暴露
  export default {
    name:'Student', //给组件取一个名字, 呈现在开发者工具上, 一般和文件名保持一致
    data(){
      return {
        studentName:'王五',
        studentAge:30
      }
    }
  }
</script>

<style>
  /*组件的样式,样式没有可以不写*/
</style>
```
###   6.5 main.js
```html
/*
* 该文件是整个项目的入口文件
* */
// 引入vue
import Vue from 'vue'
//  引入App组件, 它是所有组件的父组件
import App from './App.vue'
//  关闭vue的生产提示
Vue.config.productionTip = false

//  创建vue实例对象---vm
new Vue({
    //  下面这行代码下节解释, 完成了这个功能: 将App组件放入容器(#app)中
    render: h => h(App),
}).$mount('#app')
```
###   6.6 index.html
```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
<!--      
针对IE浏览器的一个特殊配置, 含义是让IE浏览器以最高的渲染级别渲染页面,
 vue不支持IE8及以下版本,加上也不不能解决实质上的问题
 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- 开启移动端的理想视口     -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
<!--  页签图标  <%= BASE_URL %>指的是public目录所在的路径  -->
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
<!--    <link rel="icon" href="./favicon.ico">-->
<!--      配置网页的标题-->
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
<!--  <noscript> 表示如果浏览器不支持js, 标签里面的话就会出现在
页面上, 如果浏览器支持, 里面内容不会渲染
-->
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> 
         doesn't work properly without JavaScript enabled. Please en
         able it to continue.
      </strong>
    </noscript>
<!--容器-->
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
## 7. [Vue脚手架(Vue-cli)](https://cli.vuejs.org/zh/guide/)
::: tip 提示
1. Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统
2. 一般都用最新版本, 它向下兼容
3. Vue脚手架是Vue提供的标准化开发工具(开发平台);
4. Vue脚手架指的就是Vue-cli
5. 如出现下载缓慢, 请配置npm淘宝镜像 npm config set registry https://registry.npm.taobao.org
:::
###   7.1 安装vue-cli
:::   tip 提示
第一次使用需要安装,安装之后, 电脑里面就多了一个命令vue
:::
```shell
npm install -g @vue/cli
```
<font color="blue">检查当前Vue的版本</font>
```shell
vue --version
```
<font color="blue">>检查当前Vue的版本可简写为</font>
```shell
vue -V
```
###   7.2 创建项目
::: tip 提示
1. babel: ES6转换ES5使用的
2. eslint: 检查语法的
3. 下面命令中的`XXX`是项目目录名称
4. Vue脚手架隐藏了所有webpack相关的配置, 若想查看具体的webpack配置, 请执行: vue inspect > output.js
:::
<font color='red'>切换到你要创建项目的目录</font>, 然后使用命令创建项目,执行:
```shell
vue create XXX
```
###   7.3 启动项目
```shell
npn run serve
```
###   7.4  升级全局的Vue-cli
```shell
npm update -g @vue/cli
```
##   8. 项目目录文件介绍
###   8.1 `.gitignore`文件
::: tip 提示
git的忽略文件
:::
###   8.2 `babel.config.js`文件
::: tip 提示
babel的配置文件, es6转es5 babel;
:::
###   8.3 `package.json`文件
::: tip 提示
包的说明书
:::
```text
 "scripts": {
    // 配置一个服务,就是npn run serve的命令 
    "serve": "vue-cli-service serve", 
    // 构建, 所有功能写完了, 编译构建 
    "build": "vue-cli-service build", 
    // 写的代码全部进行语法检查, 一般不用       
    "lint": "vue-cli-service lint" 
  },
```
###   8.4 `package-lock.json`文件
::: tip 提示
包版本控制文件, 能然我们最快速度安装指定版本, 没有的话, 可能就会版本发生变化, 下载到最新的, 一般不能删除
:::
###   8.5 `README.md`文件
:::tip 提示
对整个项目进行说明, 怎么使用等等
:::
###   8.6 `src/main.js`文件
:::tip 提示
一切的开端, 运行npn run serve后, 立马就会执行这个文件
:::
```javascript
/*
* 该文件是整个项目的入口文件
* */
// 引入vue
import Vue from 'vue'
//  引入App组件, 它是所有组件的父组件
import App from './App.vue'
//  关闭vue的生产提示
Vue.config.productionTip = false

//  创建vue实例对象---vm
new Vue({
  //  下面这行代码下节解释, 完成了这个功能: 将App组件放入容器(#app)中
  render: h => h(App),
}).$mount('#app')

// 也可以下面这样写
/*
  new Vue({
    el:"#app",
    //  下面这行代码下节解释, 完成了这个功能: 将App组件放入容器(#app)中
    render: h => h(App),
  })
 */
```
###   8.7 `src/App.vue`文件
:::tip 提示
父组件
:::
```vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```
###   8.8 `assets`文件夹
:::tip 提示
一般存放静态资源, logo图, 小视频, 图片等
:::
###   8.9 `components`文件夹
:::tip 提示
开发中的组件都往这里面放, 除了App.vue这个父组件
:::
###   8.10 `public/index.html`文件
:::tip 提示
整个项目的页面, vue是单页面应用
:::
```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
<!--   针对IE浏览器的一个特殊配置, 含义是让IE浏览器以最高的渲染级别渲染页面,
       vue不支持IE8及以下版本,加上也不不能解决实质上的问题-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- 开启移动端的理想视口     -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
<!--  页签图标  <%= BASE_URL %>指的是public目录所在的路径  -->
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
<!--    <link rel="icon" href="./favicon.ico">-->
<!--      配置网页的标题-->
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
<!--  <noscript> 表示如果浏览器不支持js, 标签里面的话就会出现在页面上,
      如果浏览器支持, 里面内容不会渲染
  -->
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't
       work properly without JavaScript enabled. Please enable it to continue.
      </strong>
    </noscript>
<!--容器-->
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
## 9. render函数
###   9.1 关于不同版本的Vue
::: tip 提示
1. Vue.js和Vue.runtime.xxx.js的区别:
   1. vue.js是完整版的Vue, 包含: 核心功能 + 模板解析器
   2. vue.runtime.xxx.js是运行版的Vue, 只包含: 核心功能, 没有模板解析器
2. 因为vue.runtime.xxx.js没有模板解析器, 所以不能使用template配置项, 需要使用render函数接收到的createElement函数去指定具体内容
:::
###   9.2 示例说明`main.js`中render函数
```html
/*
* 该文件是整个项目的入口文件
* */
// 引入vue
import Vue from 'vue'
//  引入App组件, 它是所有组件的父组件
import App from './App.vue'
//  关闭vue的生产提示
Vue.config.productionTip = false

//  创建vue实例对象---vm
new Vue({
    //  下面这行代码下节解释, 完成了这个功能: 将App组件放入容器(#app)中
    render: h => h(App),
    /* render是一个函数, vue帮我们调用, 调用的时候传递了
      一个createElement函数, 这个函数可以创建具体的元素和内容
    */
    // render(createElement){
    //     return createElement('h1','您好啊')
    // }
    // render:createElement => createElement('h1','您好啊')
    // render:h => h('h1','您好啊')
}).$mount('#app')
```
## 10. [全局CLI配置](https://cli.vuejs.org/zh/config/#vue-config-js)
:::  tip 记要
1. 网站的页签图标 `favicon.ico`, 固定名字, 不能随便更改
2. 配置参考, 这些配置可改
   1. `vue.config.js`是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 `@vue/cli-service` 自动加载。你也可以使用 `package.json` 中的 `vue` 字段，但是注意这种写法需要你严格遵照 `JSON` 的格式来写。
   2. 使用`vue inspect > output.js` 可以查看到Vue脚手架的默认配置, 但修改不会生效
   3. 使用`vue.config.js`可以对脚手架进行个性化定制
:::
```html
/* 
   1. `vue.config.js`  可选配置文件, 不存在就是使用默认配置文件;
   2. 这里面写的配置, 会被脚手架自动加载, 然后编译的时候自动替换
       调默认配置文件, 不会给我们核心配置;
   3. 删除这个文件就是使用默认配置,这个文件只要修改了, 就要重启才会生效
*/
/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    // 选项...
    pages:{
        /* 
          不能写了配置再注视掉, 如果注释掉了, 只要存在这个配置, 就会替换默认的, 
          然后注释了, 就会报错, 本例子注释就是错误的, 要么就不写
        */
        // index:{
        //     //入口
        //     entry:'src/main.js',
        // }
    },
   //关闭语法检查, 如果不关闭, 代码有问题, 会报错, 启动不了
    lintOnSave:false 
}
```
:::   danger 注意了
vue.config.js中, 不能写了配置再注视掉, 如果注释掉了, 只要存在这个配置, 就会替换默认的,  然后注释了, 就会报错, 上面子注释就是错误的, 要么就不写这个配置, 直接读取默认的!
:::