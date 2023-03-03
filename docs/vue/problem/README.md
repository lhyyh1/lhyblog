#  常见问题
## 1. 浏览器提示安装开发者工具
::: tip 提示
Download the Vue Devtools extension for a better development experience:
https://github.com/vuejs/vue-devtools
:::
[解决方案:安装开发者工具](https://devtools.vuejs.org/guide/installation.html)
## 2. 浏览器提示未检测到Vue.js
::: tip 提示
vue.js not detected
:::
[解决方案](https://www.cnblogs.com/yummylucky/p/10506001.html)
::: warning 注意
如果你打开的是本地文件，那么检查你是否已经开启了详细信息中`允许访问文件网址`的权限
:::
##  3. 阻止vue在启动时生成生产提示
::: tip 提示
You are running Vue in development mode.
Make sure to turn on production mode when deploying for production.
See more tips at https://vuejs.org/guide/deployment.html
:::
[解决方案](https://cn.vuejs.org/v2/api/#productionTip)
```javascript
<script type="text/javascript">
    // 阻止 vue 在启动时生成生产提示
    Vue.config.productionTip = false   
</script>
```
## 4. 浏览器页签图标404
::: tip 提示
favicon.ico 404 Not Found<br>
出现原因: 浏览器打开任何一个网站的时候, 都会默认的去请求页签图标, 页签图标没有, 就会报404;  它的请求为`http://域名/favicon.ico`
:::
<font color="blue"><b>解决方案:</b></font> 创建一个favicon.ico文件，并放置在Web项目的根目录下