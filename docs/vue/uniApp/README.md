# uni-app

## node

[安装参考]( https://www.cnblogs.com/lgx5/p/10732016.html ) ; 安装到指定目录或者默认目录都可以, 一般都会指定一个安装目录

### 安装

+ [下载地址](https://nodejs.org/zh-cn/)

+ 下载安装包 => 双击 => 选择指定目录 `E:\nodejs` => 下一步下一步安装 

+ 默认会自动加到path环境变量中

+ 查看当前环境变量

  ```javascript
  echo %PATH%
  ```

### 查看node版本

```javascript
node -v
```

### 缓存目录移动安装目录, 统一管理

默认缓存目录在c盘

+ 新建目录 `node_cache`和 `node_globa`

+ 执行命令

  ```javascript
  // 修改本地仓库, 修改之后查看npm仓库:  npm list -global
  npm config set prefix "E:\nodejs\node_global"
  // 修改缓存位置
  npm config set cache "E:\nodejs\node_cache"  
  ```

## npm包管理器

node安装之后, npn顺带也安装好了, 但可能不是最新版本

### 查看npm当前版本

```javascript
npm -v
```

### 更新npm到最新版本

```javascript
npm install -g npm
```

### 更新npm到指定版本

```javascript
npm -g install npm@6.8.0
```
### 查看当前npm源

```javascript
npm config get registry
```

### 设置npm源为淘宝源

```javascript
npm config set registry https://registry.npm.taobao.org
```

### 依赖包安装

<font style="color:blue">安装单独的依赖包:</font>

+ `npm install <packageName>`  

  ```js
  npm install --save js-base64
  
  注解:
  +	`--save` 等同于`-S` , 经常使用, 安装依赖的同时, 可以把依赖保存在`package.json`文件中;
  +	`-S`, `--save` 安装包信息将加入到dependencies（生产阶段的依赖,也就是项目运行时的依赖，就是程序上线后仍然需要依赖）
  +	`--save-dev` 等同于`-D`安装包信息将加入到devDependencies, 开发阶段的依赖，就是我们在开发过程中需要的依赖，只在开发阶段起作用
  ```

+ `npm install <packageName> -g`

  ```
  npm install    安装
  <packageName>  模块名字
  -g  这个参数意思是安装到gloabl目录下, 也就是上面说设置的E:\nodejs\node_global里
  ```

<font style="color:blue">批量安装package.json文件中依赖</font>

```js
npm install
```

<font style="color:blue">常用的依赖包</font>

```js
npm install --save base-64
```

## npm安装报错处理

###  cb.apply is not a function

操作: 先把npm更新到指定版本6.8.0; 然后再更新到最新

```javascript
npm WARN npm You can find the latest version at https://nodejs.org/
npm ERR! cb.apply is not a function

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\Admin\AppData\Roaming\npm-cache\_logs\2021-09-01T03_01_26_898Z-debug.log
```

处理:

```javascript
win + r 打开运行，输入%appdata%
删除 npm 和 npm-cache 文件夹
执行npm cache clean --force命令
再次执行npm更新到最新版本的命令npm install -g npm
此时应该就可以了。如果还不行，就执行卸载Node.js重新安装
```

### 安装Vue CLI 4.x 报错-4048

```javascript
C:\Users\Admin>npm install -g @vue/cli
npm ERR! code EPERM
npm ERR! syscall mkdir
npm ERR! path E:\nodejs\node_cache\_cacache
npm ERR! errno -4048
npm ERR! Error: EPERM: operation not permitted, mkdir 'E:\nodejs\node_cache\_cacache'
npm ERR!  [OperationalError: EPERM: operation not permitted, mkdir 'E:\nodejs\node_cache\_cacache'] {
npm ERR!   cause: [Error: EPERM: operation not permitted, mkdir 'E:\nodejs\node_cache\_cacache'] {
npm ERR!     errno: -4048,
npm ERR!     code: 'EPERM',
npm ERR!     syscall: 'mkdir',
npm ERR!     path: 'E:\\nodejs\\node_cache\\_cacache'
npm ERR!   },
npm ERR!   isOperational: true,
npm ERR!   errno: -4048,
npm ERR!   code: 'EPERM',
npm ERR!   syscall: 'mkdir',
npm ERR!   path: 'E:\\nodejs\\node_cache\\_cacache'
npm ERR! }
npm ERR!
npm ERR! The operation was rejected by your operating system.
npm ERR! It's possible that the file was already in use (by a text editor or antivirus),
npm ERR! or that you lack permissions to access it.
```

处理:

```javascript
C:\Users\Admin 目录下, 删除文件.npmrc和文件.nrmrc
重新执行npm install -g @vue/cli安装成功
执行 vue -V
```

注意: 如果提示不是内部或外部的命令, 查看是否添加到环境变量了

```javascript
E:\>vue -V
@vue/cli 4.5.13
```

### webstorm无法加载vue命令

```javascript
PS F:\web\test> vue -V
vue : 无法加载文件 C:\Users\Admin\AppData\Roaming\npm\vue.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=13517
0 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
+ vue -V
+ ~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess

```

处理:

+ 管理员身份运行PowerShell（命令提示符，来源于Linux的命令提示符也叫Shell）

+ 执行：set-ExecutionPolicy RemoteSigned （签名或运行这些)

  ```javascript
  Windows PowerShell
  版权所有 (C) Microsoft Corporation。保留所有权利。
  
  尝试新的跨平台 PowerShell https://aka.ms/pscore6
  
  PS C:\Windows\system32> set-ExecutionPolicy RemoteSigned
  
  执行策略更改
  执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170
  中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?
  [Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为“N”): y
  PS C:\Windows\system32>
  ```

+ 如果不是这个问题, 查看vue是否加入环境变量

  ```javascript
  查看vue的npm仓库 `npm list -global` , 找到vue命令
  把这个命令所在目录, 加入到环境变量 `E:\nodejs\node_global`
  ```

  

## HBuilderX快捷键

+ 快速输出`console.log()`

  ```js
  colg + 回车
  ```

+ 删除整行内容

  ```js
  Ctril + d
  ```

+ 复制当前行到下一行

  ```js
  Ctrl + Shift +R
  ```

+ 当前行整行内容上移或下移

  ```js
  Ctrl + 方向键
  ```

  

## 项目创建

[项目创建参考](https://uniapp.dcloud.io/quickstart-hx)

<font style="color:blue">HBuilderX 直接创建</font>

推荐使用这种方式创建;  选择`uni-app`, 模板选择默认即可

<font style="color:blue">vue脚手架创建</font>

+ 检查vue-cli脚手架是否安装

  ```js
  vue -V
  ```

<font style="color:blue">demo:</font>

当前目录下创建一个test文件夹, 安装到test文件夹下面

```js
vue create -p dcloud/uni-preset-vue test
```

注意: vue脚手架创建的项目, 里面的`src`目录下的内容和HBuilderX创建的一样的, 直接把`src`目录下的内容拿过去是可以运行的

##	目录结构

+ `.hbuilderx`文件夹: 创建项目的时候没有这个文件夹, 是运行的时候产生的
+  `pages`目录: 存放页面的目录
+ `static`目录: 存放静态文件的目录,这个目录里面的内容不会被编译
+ `App.vue`: 应用入口文件, 和小程序app.js类似
+ `main.js`: 应用入口文件, 注册vue等
+ `manifest.json`: 项目的配置
+ `pages.json`: 页面相关的配置文件
+ `uni.scs`: 全局的一些配置, 可以定义一些变量, 全局都可以使
+ `common`文件夹: 自己新建的, 存放一些css, js, 以及一些公共的插件等
+ `components`文件夹: 自己新建的, 存放一些自定义的组
+ `store`文件夹: 自己新建的, vuex目录
+ `unpackage`目录: 编译后的文件存放目录, 没有编译则没有

## .gitignore文件

```
# Windows
[Dd]esktop.ini
Thumbs.db
$RECYCLE.BIN/

# macOS
.DS_Store
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes

# Node.js
node_modules/
.hbuilderx/
unpackage/
```
## 常用指令或语法

###	v-bind属性绑定指令

可以简写为`:` , 属性绑定, 可以动态绑定data中的数据或者js表达式

```vue
<template>
	<view v-bind:class="msg" :data="1+1">
	    开心就好
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg:'hello'
			}
		}
	}
</script>
```

### 模板中访问data中定义的变量

<font style="color:blue">使用双花括号</font>

```vue
<template>
	<view>
	    {{msg}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg:'hello'
			}
		}
	}
</script>
```

### v-on事件绑定指令

简写`@` 绑定事件

```vue
<template>
	<view>
		<button v-on:click="show">点我一下</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {				
			}
		},
		onLoad() {
		},
		methods: {
			// 里面写一些自定义函数
			show(){
				console.log('点击了按钮');
			}
		}
	}
</script>
```

+ 其中`v-on:click="show"`可以简写为`@click="show"`
+ `methods` 里面写自定义函数

<font style="color:blue">事件渗透</font>

利用事件修饰符`.stop`阻止冒泡

```vue
<template>
	<view>		
		<!-- 此时点击我是子集, 我是父级也会出来, 这个是常说的 `事件穿透`
		     只要子集加一个修饰符 `.stop`,就可以阻止事件穿透
		 -->
		<view @click="c1">
			我是父级
			<view @click.stop="c2">
				我是子集
			</view>
		</view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {						
			}
		},
		methods: {		
		    c1(){
				console.log('我是父级');
			},
			c2(){
				console.log('我是子集');
			}	
		}
	}
</script>
```



### v-model数据绑定指令

数据的双向绑定

```vue
<template>
	<view>
		<input v-model="msg"  type="text" value="" />
	</view>
</template>
<script>
	export default {
		// 初始化数据, data是一个函数, return了一个对象
		data() {
			return {
				msg:'hello'
			}
		},
		onLoad() {
			setTimeout(()=>{
				this.msg = this.msg + '中国'
			},2000)
		},
		methods: {
		}
	}
</script>
```

+ 案例中: `onLoad`中表示,加载这个页面, 过2秒修改msg的值为后面拼接中国
+ `<input v-model="msg" type="text" value="" />`表示输入框的值和下面的data里面msg绑定在一起,进行双向绑定

### 条件判断

<font style="color:blue">v-if</font>

条件判断, 决定某个内容或者区块是否 挂载, `没有挂载, 标签都不会存在`

```vue
<view  v-if="flag=='vue'">开心就好</view>
<view v-else-if="flag=='html'">我不开心了</view>
<view v-else>开心了</view>
```

<font style="color:blue">v-show</font>

条件判断, 是否显示, 用法同`v-if`, 但不显示的标签是存在的, 只是隐藏了

<font style="color:blue">三元运算符</font>

适合比较简单的条件

```vue
<view>{{flag ? "显示" : "隐藏"}}</view>
```

### block空标签

不产生额外标签, 适合用来做条件判断和循环最外层

```vue
<block v-if="flag">
    <view>开心就好</view>
</block>
```

### v-for遍历指令

<font style="color:blue"> 语法: `v-for="(item,index) in xxx" :key="yyy"` key要保证唯一性</font>; 

其中`item`是数组或者对象的一个元素, `index`是这个元素的索引;都是形参, 可以自己定义这两个名称

```vue
<!-- 
	空标签遍历, 列表会少一层结构
 -->
<template>
	<view>
        <view v-for="(item,index) in arr" :key="index">{{item}} : {{index}}</view>
        <view v-for="value,key in person" :key="index">{{value}} : {{key}}</view>
        <block v-for="(p,index) in persons" :key="index">
            <view>姓名: {{p.name}}</view>
            <view>年龄: {{p.age}}</view>		
        </block>
	</view>
</template>
<script>
	export default {
		// 初始化数据, data是一个函数, return了一个对象
		data() {
			return {
			arr:[1,2,3],
			person: {
				name:'小明',
				age:18,
			},
			msg:'hello',
			code:''	,
			persons:[
				{
					name:'小明',
					age:18,
				},
				{
					name:'小红',
					age:20,
				},
				
			]		
		},
		onLoad() {
			setTimeout(()=>{
				this.msg = this.msg + '中国'
			},2000)
		},
		methods: {
		}
	}
</script>
```

### 基础组件

+ <font style="color:blue">view</font>是uni提供的基础组件, view有点类似html中提供的div
+ <font style="color:blue">text</font>也是uni提供的组件, 类似html中提供的span
+ 使用一个组件, 一般关注组件的作用, 属性 和事件三个方面, 文档里面组件部分说得都很详细
+ <font style="color:blue">scroll组件demo:</font>

```vue
<template>
	<view>		
		<!--  @scroll 是组件自带的事件 -->
		<scroll-view class="scroll" :scroll-y="true" @scroll="scroll">
			<view v-for="i in 100">11</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				age:1				
			}
		},
		methods: {			
			scroll(event){
				console.log(event);
			}
		}
	}
</script>

<style>
	/* rpx 小程序 */
	.scroll{
		height: 400rpx;
	}
</style>
```

### 自定义组件

使用[easycom规范](https://uniapp.dcloud.io/collocation/pages?id=easycom), 可以直接使用组件

+ 父组件向子组件传递数据可以通过`props`
+ 子组件向父组件传递数据可以通过自定义事件, 父组件自定义事件, 子组件触发父组件定义的事件, 并传递数据
+ 子组件可以定义插槽`slot`, 让父组件自定义要显示的内容

```vue
<!-- 子组件-->
<template>
	<!-- 第三步: 绑定组件属性 -->
	<view
	 :style="{background: color,fontSize: size}"
	 @click="handClick"	 
	 >
	 <!--  引入插槽, 填充占位 -->
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:"card",
		// 第二步: 接收组件传过来的参数
		props:{
			color:{
				type:String, //类型字符串
				default:'white' // 不传默认白色
			},
			size:{
				type:String, //类型字符串
				default:'14rpx' // 不传默认白色
			}			

		},
		data() {
			return {
				
			};
		},
		methods:{
			handClick(){
				console.log('点击了自定义组件');
				// 子组件去触发父组件的自定义函数myClick, 从而向父组件传输数据
				// this.$emit 第二个参数就是子组件传给父组件的方法数据
				this.$emit('myClick','这个数据来自子组件')
			}
		}
	}
</script>

```

```vue
<!-- 父组件 -->
<template>
	<view>
		<view>新問列表</view>
		<!-- 向自定义组件传数据, 第一步, 使用组件的地方定义一个属性, 第二步, 去组件中用props接收,第三步, 在组件页面中绑定;可以传多个属性 -->
		<card color="red" size="20">红色的</card>
		<card color="blue">蓝色的</card>
		<!-- 组件不仅可以传属性, 还可以传事件方法,用于子组件向父组件传值 -->
		<card @myClick="myNewClick">默认的</card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			myNewClick(msg){
				console.log('我是父组件的自定义事件:' + msg);
			}			
		}
	}
</script>

<style>

</style>
```

### 常用API

+ [界面交互](https://uniapp.dcloud.io/api/ui/prompt?id=showtoast)
+ [路由和页面跳转](https://uniapp.dcloud.io/api/router?id=navigateto)

```vue
onLoad() {
    // 界面交互反馈
    uni.showToast({
   	 	icon:"loading",
    	title:"加载中",
    	// 持续时间, 2秒
    	duration:2000 
    })
    // 3秒之后跳转首页
    // 路由和页面跳珠
    setTimeout(()=>{
   	 		uni.navigateTo({
    		url:"../about/about"
    	})
    },3000)
}
```

### 条件编译

[跨平台条件编译](https://uniapp.dcloud.io/platform?id=%e8%b7%a8%e7%ab%af%e5%85%bc%e5%ae%b9)

### 页面布局

和传统的h5开发一样, 就是用`view`替换了`div`; 用`text`替换了`span`, 要熟悉常用分组件, 以免自己去自定义

[常用内置组件](https://uniapp.dcloud.io/component/README)

<font style="color:blue">最外层之后一个根元素, 但不限于是`view`</font>

```view
<template>
	<view>
		//只有一个根元素, 两个就会报错
	</view>
</template>
```

<font style="color:blue">页面布局尽量使用 flex 布局, 少用定位</font>



