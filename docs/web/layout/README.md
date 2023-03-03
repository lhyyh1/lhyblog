# 网页布局

## 网页布局概要

### 页面布局常用标签

1. ```<div></div>```无意义块状元素标签
2. ```<span></span>```无意义行内元素标签
3. ```<p></p>```段落标签
4. ```<ul></ul>```无序列表
5. ```<li></li>```列表项
6. ```<a></a>```超链接标签
7. ```<img />```图片标签
8. ```<i></i>```斜体标签
9. ```<b></b>```粗体标签

### 页面布局常用选择器

1. id选择器 `#id`
2. 类选择器 `.class`
3. 关系选择器
    + `div p`  将所有`<div>`标签里面的`<p>`标签选中（子标签和孙子辈标签）
    + `div>p`  将所有`<div>`标签的子标签`<p>`选中，不包括孙子辈标签
    + `div,p`  将`<div>`标签和`<p>`标签选中选中
    + `div.a`  将`<div>`标签下`class=a`的标签选中
    + `div~p`  将`<div>`后面所有的`<p>`标签选中
    + `div+p`  将`所有`离`<div>`后面`相邻`的`<p>`标签选中
4. 伪类选择器 `:hover`, 选择器用于选择鼠标指针浮动在上面的元素
   <br>eg: 鼠标悬浮在a标签上, 字体变紫色, 变成20号字体, 加1px红色实体边框

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<a href="">学习web的乐趣你不懂!</a>
</body>
</html>
<style>
    a {
        text-decoration: none;
    }

    a:hover {
        color: purple;
        font-size: 20px;
        border: 1px solid red;
    }
</style>
```

5. 结构性伪类选择器: `E:after, E:before, E:nth-child(), E:first-child, E:last-child`

+ `E:first-child`  选择器用于选取属于其父元素的首个子元素的指定选择器
+ `E:last-child`   选择器用来匹配父元素中最后一个子元素
+ `E:nth-child(n)` 选择器匹配父元素中的第 n 个子元素，元素类型没有限制
+ `E:nth-last-child(n)` 选择器匹配父元素中的倒数第 n 个子元素，元素类型没有限制
+ `E:after` 向选定的元素之后插入内容,使用content 属性来指定要插入的内容
+ `E:before` 向选定的元素前插入内容。需要和content 属性一起使用，使用content 属性来指定要插入的内容

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        div > p:first-child {
            color: #8A2BE2;
            background-color: #AFD9EE;
        }

        div > p:last-child {
            color: #8A2BE2;
            background-color: #e9eaeb;
        }

        div > p:nth-child(2) {
            color: #e22b2b;
            background-color: #11d65d;
        }

        div > p:nth-last-child(2) {
            color: #2be253;
            background-color: #eceeed;
        }

        div > p::before {
            content: '测试';
            background-color: rgb(148, 148, 146);
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>
<div>
    <p>这个段落是其父元素（div）的首个子元素。</p>
    <p>这个段落是其父元素（div）的第二个个子元素。</p>
    <p>这个段落是其父元素（div）的倒数第二个子元素。</p>
    <p>这个段落是父元素(div)最后一个子元素。</p>
</div>
</body>
</html>
```

### 页面布局常用属性

1. 字体属性: font-size 字体大小,单位 px; em; rem;
2. 文本属性: text-decoration, text-align
    1. text-decoration, 常用的 text-decoration:none 去掉a的下划线
    2. text-align, 值有left,right,center 文本排列到左边,右边,中间
3. 首行缩进: text-indent  `text-indent:2em`缩进2个字符,单位也可以是px
4. 行高: line-height 设置行间的距离（行高）,行高等于行距加上字体大小
5. 宽高属性: width, height, min-height, max-height
    1. width 宽度
    2. height 高度
    3. min-height 设置段落的最小高度
    4. max-height 设置段落的最大高度
6. 背景属性: background
7. 列表属性: [list-style](https://www.w3school.com.cn/tiy/t.asp?f=eg_csse_list-style)
8. 字体颜色: color

### 页面布局应用属性

1. 定位属性: position
2. 布局属性: display
3. 浮动属性:float, clear
4. 盒子模型: border, margin, padding
5. 圆角边框:border-radius
6. 阴影: text-shadow, box-shadow

##  [定位属性position](https://www.w3school.com.cn/css/css_positioning.asp)
### absolute 绝对定位
1. 生成绝对定位的元素,脱离了文档流;
2. 参照位置是离当前元素最近父元素(定位方式为`fixed`,`absolute`,`relative`)的左上角位置;找不到就是参考浏览器窗口左上角,即坐标点为`(0px, 0px)`;
3. 但在有滚动条的情况下, 会随滚动条移动;
4. 元素的位置通过 `left`, `top`, `right` 以及 `bottom` 属性进行规定。
5. 常用于页面多个`div`层之间的绝对定位
6. eg: 实现图片相对于父元素的绝对定位,距离父元素左侧50px,顶部0px,且图片处于底层
```html
<html>
<head>
<style type="text/css">
  div{
    border: 1px solid red;    
    position:absolute;
    left:100px;
    top:100px
  }
  img.x
  {
    position:absolute;
    left:50px;
    top:0px;
    z-index:-1
}
</style>
</head>

<body>
  <div>
    <h1>这是一个标题</h1>
    <img class="x" src="./img1.png" /> 
    <p>默认的 z-index 是 0。Z-index -1 拥有更低的优先级。</p>
  </div>
</body>
</html>
```
###   fixed 固定定位
1. 生成固定定位的元素,脱离了文档流;
2. 在有滚动条的情况下, 不会随滚动条移动;
3. 常用于网站边缘的公司联系方式和快速回到顶部,固定网页的头部尾部和广告区域随屏幕滚动;
4. 参照位置是浏览器窗口的左上角，即坐标点为(0px, 0px);
5. 元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
###   relative 相对定位
1. 生成相对定位的元素，相对于其正常位置进行定位;
2. "left:20" 会向元素的 LEFT 位置添加 20 像素;
3. 相对定位会按照元素的原始位置对该元素进行移动;
4. eg: 相对定位演示
```html
<html>
<head>
<style type="text/css">
h2.pos_left
{
  position:relative;
  left:-20px
}
h2.pos_right
{
  position:relative;
  left:20px
}
</style>
</head>
  <body>
    <h2>这是位于正常位置的标题</h2>
    <h2 class="pos_left">这个标题相对于其正常位置向左移动</h2>
    <h2 class="pos_right">这个标题相对于其正常位置向右移动</h2>
    <p>相对定位会按照元素的原始位置对该元素进行移动。</p>
    <p>样式 "left:-20px" 从元素的原始左侧位置减去 20 像素。</p>
    <p>样式 "left:20px" 向元素的原始左侧位置增加 20 像素。</p>
  </body>
</html>
```
###   static 默认值,没有定位
1. 元素出现在正常的流中
2. 忽略 top, bottom, left, right 或者 z-index 声明
3. eg: 将一个元素房子与另一个元素之前或者之后, 就是图片放在元素之后, 或者元素之前
```html
<html>
<head>
<style type="text/css">
img.x
{
position:absolute;
left:0px;
top:0px;
z-index:-1
}
</style>
</head>

<body>
<h1>这是一个标题</h1>
<img class="x" src="/i/eg_mouse.jpg" /> 
<p>默认的 z-index 是 0。Z-index -1 拥有更低的优先级。Z-index 1 拥有更高的优先级。</p>
</body>
</html>
```
## 布局属性display
###   常用值
1.  none 此元素不会被显示
2.  block 此元素将显示为块级元素，此元素前后会带有换行符。
3.  inline 默认。此元素会被显示为内联元素，元素前后没有换行符。
###   案例
1. 把普通元素设置为块级元素
```html
<html>
<head>
<style type="text/css">
span
{
display: block
}
</style>
</head>
<body>

<span>本例中的样式表把 span 元素设置为块级元素。</span>
<span>两个 span 元素之间产生了一个换行行为。</span>

</body>
</html>
```
2. 把元素显示为内联元素
```html
<html>
<head>
<style type="text/css">
p {display: inline}
div {display: none}
</style>
</head>

<body>
<p>本例中的样式表把段落元素设置为内联元素。</p>

<p>而 div 元素不会显示出来！</p>

<div>div 元素的内容不会显示出来！</div>
</body>
</html>
```
## 浮动属性float
###   浮动定位概念
1. 将元素排除在普通流之外
2. 元素将不在页面中占据空间
3. 将浮动元素放置在包含框的左边或者右边
4. 浮动元素依旧位于包含框之类
###   特点
1. 浮动的框可以向左或者向右移动, 知道它的外边缘碰到包含框或者另一个浮动框的边框为止
2. 浮动元素的外边缘不会超过其父元素的内边缘
3. 浮动元素不会互相重叠
4. 浮动元素不会上下浮动
5. 任何元素一旦浮动, display属性将完全失效均可以设置宽高, 并且不会独占一行;行内元素的特点是没有宽高属性, 并且不会独占一行
###   语法
```js
float: none/left/right
```
###    清除浮动
1. 描述: 清除浮动是在使用了浮动之后比不可少的, 为了网站布局的效果, 清除浮动也变得非常麻烦
2. 语法
```js
clear: left/right/both
```
###   清除浮动常用方式
1. 结尾处加空div标签 clear:both (或在下一个元素上加clear:both;)
2. 浮动元素的父级div定义 overflow:hidden
3. 浮动元素的父元素定宽高
##   盒模型
###   外边距 margin
###   内边距 padding
###   边框 border