# 常用工具

::: tip 提示 整理一些常用的工具, 以便后面查阅, 好记性不如烂笔头!
:::

## [百度ocr文本模型训练](https://gitee.com/paddlepaddle/PaddleOCR/blob/release/2.4/doc/doc_ch/detection.md)

## [百度飞浆EasyDL在线模型训练且生成在线api](https://ai.baidu.com/easydlocr/mlist)

## [百度OCR识别](https://gitee.com/paddlepaddle/PaddleOCR/blob/release/2.4/doc/doc_ch/whl.md)

## [golang学习参考资料](https://www.liwenzhou.com/posts/Go/golang-menu/)

## [xmind思维导图](https://www.xmind.net/zen/)

## [百度paddle安装,cpu是否支持avx](https://www.paddlepaddle.org.cn/documentation/docs/zh/install/pip/linux-pip.html)

## [Docker buildx构建多架构镜像](https://blog.csdn.net/Canger_/article/details/122239139)

## [果核剥壳-软件激活](https://www.ghxi.com/)

## Visual Studio Code

### [下载地址](https://pc.qq.com/detail/16/detail_22856.html)

### Live Server

安装之后, 就可以鼠标右键`Open with Live Server` 打开的一瞬间创建一个内置小服务器,并且把你工程中所有的文件,文件夹作为这台服务器的根资源去使用!

### Live Server Preview

在启用 localhost 服务器实时重新加载的情况下预览您的 HTML 文件

### Auto Rename Tag

修改标签对的插件,重命名一个HTML/XML标签时，自动重命名配对的HTML

### Manta's Stylus Supremacy

把css格式化stylus风格

### ESlint

格式化js代码

### Vetur

可以将“.vue”文件中的语法进行高亮显示

### VSCode配置settings.json

```json
{
  // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.detectIndentation": false,
  // Ctrl + 鼠标滚动修改字体大小
  "editor.mouseWheelZoom": true,
  // 重新设定tabsize
  "editor.tabSize": 2,
  // #每次保存的时候自动格式化 
  "editor.formatOnSave": true,
  // 添加 vue 支持
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue"
  ],
  //  #去掉代码结尾的分号 
  "prettier.semi": false,
  //  #使用带引号替代双引号 
  "prettier.singleQuote": true,
  //  #让函数(名)和后面的括号之间加个空格
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  // #这个按用户自身习惯选择 
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  // #让vue中的js按编辑器自带的ts格式进行格式化 
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "force-aligned"
      // #vue组件中html代码格式化样式
    }
  },
  // 把css格式化stylus风格, 需安装Manta's Stylus Supremacy插件
  "stylusSupremacy.insertColons": false,
  // 是否插入冒号
  "stylusSupremacy.insertSemicolons": false,
  // 是否插入分好
  "stylusSupremacy.insertBraces": false,
  // 是否插入大括号
  "stylusSupremacy.insertNewLineAroundImports": false,
  // import之后是否换行
  "stylusSupremacy.insertNewLineAroundBlocks": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.fontSize": 24,
  "workbench.colorTheme": "Monokai",
  "workbench.iconTheme": "office-material-icon-theme",
  "go.toolsManagement.autoUpdate": true,
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Packagist

| 账号,制作方法参考有道云
[个人composer包合集](https://packagist.org/packages/develop/)

## PyAutoGUI

+ [PyAutoGUI](https://www.jianshu.com/p/feadbebfbd4e)
+ [使用参考](https://www.jb51.net/article/183926.htm)

## 腾讯位置服务

[WebService API](https://lbs.qq.com/service/webService/webServiceGuide/webServiceDistrict)

## 四川政务服务网

[政务服务网](http://182.131.3.112:8001/bsdt/?areaCode=510000000000)

## 云效地址

[阿里云效](https://devops.aliyun.com/)

## 蓝湖地址

[蓝湖](https://lanhuapp.com/)

## 微信支付开发

[开发文档](https://pay.weixin.qq.com/wiki/doc/apiv3/index.shtml)

## docker仓库

[仓库](https://hub.docker.com/)

## `Jetbrains-IDE`无限重置30天

[参考教程:2021.3版本开始获取体验30天有所不同](https://shimo.im/docs/dKYCkd8PrX3ckX99/read)

::: warning 注意

1. Jetbrains 系列的IDE都可以这样操作
2. 2021.2之后的版本, 软件里面已经没有试用按钮, 需要输入试用码才可以
3. 以后多用2021.1版本吧, 方便无限重置30天
   :::

[PyCharm其他版本点我下载,2021.1](https://www.jetbrains.com/zh-cn/pycharm/download/other.html)

[WebStorm其他版本点我下载,2021.1](https://www.jetbrains.com/zh-cn/webstorm/download/other.html)

[PhpStorm其他版本点我下载,2021.1](https://www.jetbrains.com/zh-cn/phpstorm/download/other.html)

[GoLand其他版本点我下载,2021.1](https://www.jetbrains.com/zh-cn/go/download/other.html)

+ [2021.2之后的版本试用码复制地址](https://jetbra.in/s)

+ 添加插件仓库地址 在 `Settings/Preferences… -> Plugins` 内手动添加第三方插件仓库地址

```sh
https://plugins.zhile.io
```

<br>

<img :src="$withBase('/image/57f156c98cf342f3bb048fa5783bf189.png')" alt="foo">

+ 搜索 `IDE Eval Reset`插件进行安装
  `<br>`

<img :src="$withBase('/image/03b0aac181c745ca942dc253d43e3b98.png')" alt="foo">

+ 重置使用

    + 点击菜单：`Help -> Eval Reset`
    + 唤出的插件主界面中包含了一些显示信息，2个按钮，1个勾选项
    + 按钮：`Reload` 用来刷新界面上的显示信息
    + 按钮：`Reset` 点击会询问是否重置试用信息并重启 `IDE`。选择Yes则执行重置操作并重启 `IDE`生效，选择No则什么也不做。（此为手动重置方式）
    + 勾选项：`Auto reset before per restart` 如果勾选了，则自勾选后每次重启/退出 `IDE`时会自动重置试用信息，你无需做额外的事情。（此为自动重置方式）
      `<br>`

  <img :src="$withBase('/image/76e5770ff3434511b530618d46699d3c.png')" alt="foo">

## `python`资料

[点我学习](http://www.byhy.net/)

## `CURL`爬虫

[点我使用curl转python请求](https://curl.trillworks.com/)
<br>
[在线工具](https://tool.lu/curl/)

打开 `NEtwork`  ==>  找到需要的api `url`  ==> 右键 `copy`   ==>  `copy as cURL(bash)`

## markdown工具

[点我去下载](https://www.typora.io/) 收费了, 以后使用

打开 vscode，插件市场搜索并安装 Office Viewer

## Navicat激活

+ [安装说明](https://www.jianshu.com/p/aca31d8f4c5b/)
+ 下载注册机注册
  ::: warning 注意 注册前推出所有杀毒软件, 点击注册前必须断网
  [点我去下载](https://pan.baidu.com/s/1JaEiql6mgusyLX70TXz26A)
  提取码：1aj3
  :::

## 前端神器Sublime

+ [点我官网下载](https://www.sublimetext.com/)
+ 百度网盘下载

  链接：https://pan.baidu.com/s/1wdN9B9si77gZBsvK0gelgw

  提取码：vpmw
+ 安装插件控制台

    + [参考](https://packagecontrol.io/installation)
    + 安装命令:

        + `ctrl + shift + p`
        + `Install Package Control`
        + `enter`
+ 插件安装

    + `ctrl + shift + p`
    + 点一下插件控制台: `Package Control: Install Package`
    + 回车后搜索安装
        + [参考](https://packagecontrol.io/browse)
        + Package Control
        + Emmet
        + SideBarEnhancements
        + BracketHighlighter
        + SublimeLinter
        + SublimeCodeIntel
        + HTML5
        + AutoFileName
        + Alignment
        + ColorPicker
+ 主题安装

  [参考](https://packagecontrol.io/browse/labels/theme)

## 生活类

### 居住证

[成都租房租赁交易服务平台](https://zw.cdzjryb.com/rent/#/main/online-registration)
<br />办理居住证需要在这上面网签备案, 获取房屋租赁登记备案信息摘要
