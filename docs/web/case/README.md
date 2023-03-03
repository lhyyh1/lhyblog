#  CSS实例
## 基础篇
###   标签留白和元素不能全屏问题
HTML中的元素都是有默认margin或padding的
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>html留白和不能撑满全屏问题处理</title>
    <style>
        html,
        body {
            /* 基本重置 */
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }
        div {
            width: 100%;
            height: 100%;
            background-color: rgb(185, 181, 181);
        }
        p{
            /* 解决文字留白问题, 上面的外边距 */
            margin-top: 0;
        }
    </style>
</head>
<body>
<div>
    <p>
        描述: 单纯给div添加背景色,宽和高,发现背景色存在2个问题,
        第一个是不能撑满全屏,第二个是头部和左右有留空白;
    </p>
    <p>
        处理:
    <ul>
        <li>给html和body一个宽高,这样背景色就能撑满全屏了,不然只给div宽高,
            它的父元素body和html没有宽高,是撑不满的</li>
        <li>重置html和body的外边距和内边距, 就可以处理掉留白问题</li>
    </ul>
    </p>
</div>
</body>
</html>

```
### margin和padding
子元素的外边距margin等于父元素的内边距;示例,子div位于父div中间
```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>盒模型</title>
    <style>
      html,
      body {
        /* 基本重置 */
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }
      .demo {
        margin-left: 300px;
        margin-top: 300px;
        padding-top: 50px;
        box-sizing: border-box;
        width: 300px;
        height: 300px;
        background-color: rgb(185, 181, 181);
      }
      .test {
        width: 200px;
        height: 200px;
        /* margin-top: 50px; */
        margin-left: 50px;
        background-color: red;
        /* text-align: center; */
        /* box-sizing: border-box; */
        /* line-height: 200px; */
        /* vertical-align: middle; */
      }
    </style>
  </head>
  <body>
    <div class="demo">
      <div class="test">
        <span
          >子元素的margin-top会造成父元素的塌陷,实现不了居中,
          需要在父元素中使用padding-top来实现</span
        >
      </div>
    </div>
  </body>
</html>

```