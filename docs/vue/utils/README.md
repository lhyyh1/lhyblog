---
title: vue的一些常用配置

date: 2021-12-25

sidebar: "auto"

categories:
  - 工具

tags:
  - vue

publish: true
---

::: tip

只收纳在工作项目中学到的东西

:::

# vue 的一些常用配置

此配置在 vue-cli3 生成的脚手架项目的根文件中

需要自己新建 vue.config.js 文件

```js
module.exports = {
  //配置打包后文件渲染的路径
  publicPath: "./",
  // runtimeCompiler:true
  //配置打包文件的大小限制
  configureWebpack: (config) => {
    // 为生产环境修改配置...
    if (process.env.NODE_ENV === "production") {
      config.mode = "production";
      // 打包文件大小配置
      config.performance = {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000,
      };
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
  },
  //配置网页的标题栏
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "xxxx";/**这里写网页的标题 */
      return args;
    });
  },
  //配置代理，在后端不解决跨域的情况下使用
  devServer: {
    hot: true,
    proxy: {
      "/api": {
        target: "http://192.168.0.144:10109",/**这里写自己的地址 */
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      },
    },
  },
};
```

# 一个通用的文件下载模板

```js
download() {
      var data = { };//参数
      axios
        .request({
          url:"",//请求路径
          responseType: "blob",
          method: "post",
          data,
        })
        .then((res) => {
          //此处有个坑。这里用content保存文件流，最初是content=res
          //检查了下才发现，后端对文件流做了一层封装，所以将content指向res.data即可
          //另外，流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
          const content = res.data;
          const blob = new Blob([content]); //构造一个blob对象来处理数据
          const fileName = "文件名.后缀名";

          //对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
          //IE10以上支持blob但是依然不支持download
          if ("download" in document.createElement("a")) {
            //支持a标签download的浏览器
            const link = document.createElement("a"); //创建a标签
            link.download = fileName; //a标签添加属性
            link.style.display = "none";
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click(); //执行下载
            URL.revokeObjectURL(link.href); //释放url
            document.body.removeChild(link); //释放标签
          } else {
            //其他浏览器
            navigator.msSaveBlob(blob, fileName);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
```

# uniapp-小程序中下载文件流的 pdf

```js
/**
 * res.data 是文件流
 * 先 npm install Base64,引入了Base64模块
 */
var result2 = Base64.decode(res.data);
const fs = uni.getFileSystemManager(); //获取全局唯一的文件管理器
fs.writeFile({
  // 写文件
  filePath: wx.env.USER_DATA_PATH + "/文件名.pdf", // wx.env.USER_DATA_PATH 指定临时文件存入的路径，后面字符串自定义
  data: result2,
  encoding: "binary", //二进制流文件必须是 binary
  success(res) {
    uni.openDocument({
      filePath: wx.env.USER_DATA_PATH + "/文件名.pdf",
      showMenu: true,
      success: function (res) {
        console.log("打开文档成功");
      },
    });
  },
});
```




# 使用canvas可视化音频
做一个简单的页面
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>玉树临风美少年，揽镜自顾夜不眠</title>
    <link rel="stylesheet" href="./style.css">
</head>

<body>
    <canvas></canvas>
    <audio src="./1.mp3" controls></audio>
    
</body>
<script src="./index.js"></script>
</html>
```
~~~css
*{
    padding: 0;
    margin: 0;
}
body{
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #000;
}
canvas{
    box-sizing: border-box;
    border-bottom: 1px solid #FFF;
}
audio{
    width: 300px;
    height: 50px;
    margin: 10px auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
~~~
接下来的js才是重头戏
~~~js
const audioEle = document.querySelector('audio')
const cvs = document.querySelector('canvas')
const ctx = cvs.getContext('2d')


// 初始化canvas的尺寸
function initCvs() {
    cvs.width = window.innerWidth * devicePixelRatio;
    cvs.height = (window.innerHeight / 2.3) * devicePixelRatio
};
initCvs()

let isInit = false;
let dataArray, analyser
audioEle.onplay = function () {
    if (isInit) {
        return;
    }
    const audCtx = new AudioContext() // 创建一个音频上下文
    const source = audCtx.createMediaElementSource(audioEle) // 创建音频源节点
    analyser = audCtx.createAnalyser() //创建一个分析器
    analyser.fftSize = 1024 //分析器视口大小
    // 创建数组，用于接收分析器节点的分析数据
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser) //连接源节点与分析器
    analyser.connect(audCtx.destination) //连接分析器与输出器
    // 初始化
    isInit = true
}

// 把分析出的波形绘制到canvas上
function draw() {
    requestAnimationFrame(draw)
    // 清空画布
    const { width, height } = cvs
    ctx.clearRect(0, 0, width, height)
    if (!isInit) {
        return
    }
    // 让分析器节点分析出数据到数组中
    analyser.getByteFrequencyData(dataArray)
    const len = dataArray.length / 2.5
    const barWidth = width / len
    ctx.fillStyle = "#78C5F7"
    for (let i = 0; i < len; i++) {
        const data = dataArray[i]; // <256
        const barHeight = data / 255 * height
        const x = i * barWidth
        const y = height - barHeight
        ctx.fillRect(x, y, barWidth, barHeight)
    }
}

draw()

~~~

这个可以用来理解音频可视化的原理，在实际开发中可以使用[vue-audio-visual](https://npmmirror.com/package/vue-audio-visual)