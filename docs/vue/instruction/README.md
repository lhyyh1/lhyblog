**目录**

[一、vue 的指令](#t0)

[1、v-text](#t1)

[2、v-html](#t2)

[3、v-show](#t3)

[4、v-if/v-esle-if/v-else](#t4)

[（1）、v-if](#t5)

[（2）、v-if 与 v-show](#t6)

[5、v-for](#t7)

[（1）、v-for 渲染一个数组](#t8)

[（2）、 v-for 渲染一个对象](#t9)

[（3）、v-if 与 v-for](#t10)

[（4）、v-for 之 key](#t11)

[（5）、显示过滤/排序后的结果](#t12)

[6、v-on](#t13)

[7、v-bind](#t14)

[8、v-model](#t15)

[（1）、双向绑定的语法糖](#t16)

[（2）、v-model 的修饰符——表单](#t17)

[9、v-slot](#t18)

[10、v-pre（使用频率很低）](#t19)

[11、v-once（使用频率很低）](#t20)

[二、自定义指令 与 指令的生命周期](#t21)

[1、注册自定义指令](#t22)

[（1）、注册全局指令——Vue.directive() 方法](#t23)

[（2）、注册局部指令——directives 属性](#t24)

[2、案例](#t25)

---

# 一、vue 的指令

指令的本质：[语法糖](https://so.csdn.net/so/search?q=语法糖&spm=1001.2101.3001.7020)，标志位。在编译阶段 render 函数里，会把指令编译成 JavaScript 代码。

vue 的指令：

- v-text
- v-html（不建议使用）
- v-show
- v-if / v-else-if / v-else
- v-for
- v-bind
- v-on
- v-model
- v-slot
- v-pre（使用频率很低）
- v-once（使用频率很低）
- v-cloak（使用频率极低，不细介绍）

## 1、v-text

v-text 指令，会把该元素下面的所有内容替换掉。

```html
<div v-text="hello vue">hello world</div>
```

现实结果是：hello vue

## 2、v-html

v-html 指令，会用一个 HTML 标签字符串，替换该元素下面的所有内容。

但是，不建议使用 v-html 指令，因为它会导致被恶意者进行 XSS 攻击的潜在风险。

```html
<div v-html="'<span style=&quot;color:red&quot;>hello vue</span>'">
  hello world
</div>
```

现实结果是：字体颜色为红色的 hello vue

## 3、v-show

v-show 指令，控制元素的显示隐藏，元素存在并占据空间。

元素隐藏时，**相当于给该元素添加了 CSS 样式：display:none;**

```html
<div v-show="show">hello vue</div>

<button @click="show = !show">changeShow</button>
```

## 4、v-if/v-esle-if/v-else

### （1）、v-if

v-if 指令，控制元素是否加载。

v-esle-if/v-else 指令不能单独使用，必须配合 v-if 一起使用。

```html
<div v-if="number===1">hello vue {{number}}</div>

<div v-else-if="number===2">hello world {{number}}</div>

<div v-else>hello someone {{number}}</div>
```

### （2）、v-if 与 v-show

- v-if：有更高的切换开销；
- v-show：有更高的初始化开销。

若需要频繁的切换则使用 v-show 比较好，否则使用 v-if 比较好。

## 5、v-for

v-for 指令，for 循环，基于源数据多次渲染元素或模板块。

v-for 既可以渲染一个数组，也可以渲染一个对象。

### （1）、v-for 渲染一个数组

```vue
<div v-for="(item, idx) in [1, 2, 3]" :key="idx">



 



    {{item}}



 



</div>

// 渲染的结果： // 1 // 2 // 3
```

### （2）、 v-for 渲染一个对象

```vue
<div v-for="(val, key) in { one: 1, two: 2 }" :key="key">



 



    {{key}}: {{val}}



 



</div>

// 渲染的结果： // one: 1 // two: 2
```

### （3）、v-if 与 v-for

> 同时使用 v-if 和 v-for 是不推荐的，因为这样二者的优先级不明显。请查看[风格指南](https://cn.vuejs.org/style-guide/#avoid-v-if-with-v-for-essential)获得更多信息。

当 v-if 与 v-for 一起使用时：

- 在 vue2 中 v-for 比 v-if 有更高的优先级。这意味着 v-if 将分别重复运行于每个 v-for 循环中。
- 在 vue3 中 v-if 比 v-for 有更高的优先级。这意味着 v-if 的条件将无法访问到 v-for 作用域内定义的变量别名。

[vue3 官网之 v-for 与 v-if](https://cn.vuejs.org/guide/essentials/list.html#v-for-with-v-if)

### （4）、v-for 之 key

**①、为什么需要给 v-for 设置 key？**

这牵扯到 vue 的 vnode 的 Diff 算法的特点，[请参见此文](https://blog.csdn.net/mChales_Liu/article/details/109296404)。

**②、在 v-for 中直接用 index 作为 key 的值有什么不好？**

例如：

```vue
<template>
  <div v-for="(item, index) in list" :key="index">{{ item.name }}</div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,

          name: "Person1",
        },

        {
          id: 2,

          name: "Person2",
        },

        {
          id: 3,

          name: "Person3",
        },

        {
          id: 4,

          name: "Person4",
        },
      ],
    };
  },
};
</script>
```

此时，删除 “Person4” 是正常的，但是如果我删除 “Person2” 就会出现问题。

**删除前**

| id  | index | name    |
| :-- | :---- | :------ |
| 1   | 0     | Person1 |
| 2   | 1     | Person2 |
| 3   | 2     | Person3 |
| 4   | 3     | Person4 |

**删除后**

| id  | index | name    |
| :-- | :---- | :------ |
| 1   | 0     | Person1 |
| 3   | 1     | Person3 |
| 4   | 2     | Person4 |

可见，**数组的 index 下标始终是从 0 开始依次递增不间断的，当其中某一项被删除后，被删节点之后的 index 下标会自动全部做减 1 更新**。所以，删除了 id 是 2 的节点时，被删节点之后的 index 下标全部做减 1 更新了。所以，当 DOM 内容比较复杂时，建议设置并使用唯一的 id 属性，来作为 key 的值。

### （5）、显示过滤/排序后的结果

[显示过滤/排序后的结果](https://cn.vuejs.org/v2/guide/list.html#显示过滤-排序后的结果)

## 6、v-on

v-on 指令，可简写为“@”，绑定事件监听器。

```html
<button v-on:click="number = number + 1">number++</button>
```

v-on 指令有一系列的修饰符：

- .stop - 调用 event.stopPropagation()，禁止事件冒泡：

```html
<a @click.stop="doThis"></a>
```

- .prevent - 调用 event.preventDefault()，禁止事件的默认行为：

```html
<form @submit.prevent="onSubmit"></form>
```

- .passive - (2.3.0) 以 { passive: true } 模式添加侦听器，立即执行事件的默认行为，会导致 `event.preventDefault()` 无效：

```html
<div @scroll.passive="onScroll">...</div>

// 滚动事件的默认行为 (即滚动行为) 将会立即触发，而不会等待 `onScroll` 完成。
```

- .capture - 添加事件侦听器时使用 capture 模式，内部元素触发的事件先在此处理，然后才交由内部元素进行处理：

```html
<div @click.capture="doThis">...</div>
```

- .self - 只当事件是从侦听器绑定的元素本身（event.target）触发时才触发回调：

```html
<div @click.self="doThat">...</div>
```

- .native - 监听组件根元素的原生事件：

```html
<base-input v-on:focus.native="onFocus"></base-input>
```

- .once - 只触发一次回调：

```html
<a @click.once="doThis"></a>
```

- .left - (2.2.0) 只当点击鼠标左键时触发。
- .right - (2.2.0) 只当点击鼠标右键时触发。
- .middle - (2.2.0) 只当点击鼠标中键时触发。
- .{keyCode | keyAlias} ——键盘事件——只当事件是从特定键触发时才触发回调。比如：
  - .enter - 只有在 `key` 是 `Enter` 时才触发回调。

```html
<input v-on:keyup.enter="submit" />
```

【拓展】vue 监听页面滚动事件

```vue
export default { mounted () { window.addEventListener('scroll',
this.handleScroll) }, beforeDestroy () { window.removeEventListener('scroll',
this.handleScroll) }, methods: { // 监听页面滚动 handleScroll (e) { // ... } } }
```

## 7、v-bind

v-bind 指令，可简写为“:”，**动态**地绑定一个或多个属性，或一个来自父组件的 prop 里的表达式。

在自定义组件时，若要对 prop 进行“双向绑定”，可以用“v-bind 指令与 .sync 修饰符”相结合来实现。

例如：在一个包含 title prop 的自定义组件中，若想让其父组件可以监听那个事件并根据需要更新一个本地的数据 property，可以这样来实现：

```html
<text-document v-bind:title.sync="doc.title"></text-document>
```

_注意： 注意带有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:title.sync=”doc.title + ‘!’” 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名，类似 v-model。_

当我们用一个对象同时设置多个 prop 的时候，也可以将这个 .sync 修饰符和 v-bind 配合使用：

```html
<text-document v-bind.sync="doc"></text-document>
```

这样会把 doc 对象中的每一个 property (如 title) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 v-on 监听器。

_注意：将 v-bind.sync 用在一个字面量的对象上，例如 v-bind.sync=”{ title: doc.title }”，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。_

## 8、v-[model](https://so.csdn.net/so/search?q=model&spm=1001.2101.3001.7020)

### （1）、双向绑定的语法糖

v-model 指令，是双向绑定的语法糖。

**双向绑定**：当数据变化视图同步更新，当视图更新数据也会同步更新。

双向绑定的原理请戳此链接：[vue 的双向绑定原理\_青蛙 king 的博客-CSDN 博客\_vue 数据双向绑定原理一句话概括](https://blog.csdn.net/mChales_Liu/article/details/107960118)

```html
<input v-model="msg" />
```

v-model 实际上是 value 属性和 input 事件结合的简写形式。它等同于：

```vue
<input :value="msg" @input="handleChange">



<script>



export default {



    data() {



        return {



            msg: ""



        }



    },



    methods: {



        handleChange(e){



            this.msg = e.target.value;



        }



    },



}



</script>
```

### （2）、v-model 的修饰符——表单

- .lazy：在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 。如果你想实现在 change 事件之后进行同步，那么建议给 v-model 添加 lazy 修饰符。

```html
<!-- 在“change”时而非“input”时更新 -->

<input v-model.lazy="msg" />
```

- .number：将用户输入的字符串转换成 number。

```html
<input v-model.number="age" type="text" />
```

- .trim：将用户输入的前后的空格去掉。

```html
<input v-model.trim="msg" />
```

【拓展】

_v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：_

- _text 和 textarea 元素使用 value 属性和 input 事件；_
- _checkbox 和 radio 使用 checked property 和 change 事件；_
- _select 字段将 value 作为 prop 并将 change 作为事件。_

## 9、v-slot

v-slot 指令，用来定义一个 具名插槽 或 作用域插槽。可以缩写为 #。

插槽：用来分发内容，传递复杂的内容。

具体请戳这里：[vue 插槽 slot\_青蛙 king 的博客-CSDN 博客](https://blog.csdn.net/mChales_Liu/article/details/109312790)

## 10、v-pre（使用频率很低）

v-pre 指令，跳过这个元素和它的子元素的编译过程。

```html
<span v-pre>{{ this will not be compiled }}</span>
```

## 11、v-once（使用频率很低）

v-once 指令，只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

```html
<span v-once>This will never change: {{msg}}</span>
```

# 二、自定义指令 与 指令的生命周期

指令的周期： 5 个 (bind、inserted、update、componentUpdated、unbind)。

- bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
- componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
- unbind：只调用一次，指令与元素解绑时调用。

## 1、注册自定义指令

### （1）、注册全局指令——Vue.directive() 方法

```vue
<script>
// 注册一个全局自定义指令 `v-focus`

Vue.directive("focus", {
  // 当被绑定的元素插入到 DOM 中时……

  inserted: function (el) {
    // 聚焦元素

    el.focus();
  },
});
</script>
```

### （2）、注册局部指令——directives 属性

```js
<script>



    directives: {



        focus: {



            // 指令的定义



            inserted: function (el) {



                el.focus()



            },



            // ...



        }



    }



</script>
```

## 2、案例

【案例一】

```vue
// 注册一个局部的自定义指令v-append-text：不替换原来的内容，直接插入其后。

<template>
  <div>
    <button @click="show = !show">{{ show ? "销毁" : "插入" }}</button>

    <button v-if="show" v-append-text="`hello ${number}`" @click="number++">
      按钮
    </button>
  </div>
</template>

<script>
export default {
  directives: {
    // 这里定义一个名为appendText的指令，使用时要像这样去用：v-append-text

    appendText: {
      /**



             * 指令的生命周期 (bind、inserted、update、componentUpdated和unbind)



             **/

      bind() {
        console.log("bind");
      },

      inserted(el, binding) {
        el.appendChild(document.createTextNode(binding.value));

        console.log("inserted", el, binding);
      },

      update() {
        console.log("update");
      },

      componentUpdated(el, binding) {
        el.removeChild(el.childNodes[el.childNodes.length - 1]);

        el.appendChild(document.createTextNode(binding.value));

        console.log("componentUpdated");
      },

      unbind() {
        console.log("unbind");
      },
    },
  },

  data() {
    return {
      number: 1,

      show: true,
    };
  },
};
</script>
```

【案例二】

也可以这样定义一个指令：

```js
import Vue from "vue";

const ctx = "clickOutsideContext";

const nodeList = [];

const isServer = Vue.prototype.$isServer; // 当前 Vue 实例是否运行于服务器

let seed = 0;

let startClick;

const on = (function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();

function createDocumentHandler(el, binding, vnode) {
  return function (mouseup = {}, mousedown = {}) {
    // node.contains( otherNode ) 如果 otherNode 是 node 的后代节点或是 node 节点本身.则返回true , 否则返回 false.

    if (
      !vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      el === mouseup.target ||
      (vnode.context.focusElment &&
        (vnode.context.focusElment.contains(mouseup.target) ||
          vnode.context.focusElment.contains(mousedown.target)))
    ) {
      return;
    }

    if (
      binding.expression &&
      el[ctx].methodName &&
      vnode.context[el[ctx].methodName]
    ) {
      vnode.context[el[ctx].methodName]();
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn();
    }
  };
}

if (!isServer) {
  on(document, "mousedown", (e) => (startClick = e));

  on(document, "mouseup", (e) => {
    nodeList.forEach((node) => node[ctx].documentHandler(e, startClick));
  });
}

export default {
  // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置

  bind(el, binding, vnode) {
    nodeList.push(el);

    const id = seed++;

    el[ctx] = {
      id,

      documentHandler: createDocumentHandler(el, binding, vnode),

      methodName: binding.expression,

      bindingFn: binding.value,
    };
  },

  // 所在组件的 VNode 更新时调用

  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);

    el[ctx].methodName = binding.expression;

    el[ctx].bindingFn = binding.value;
  },

  // 只调用一次，指令与元素解绑时调用

  unbind(el, binding, vnode) {
    const len = nodeList.length;

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);

        break;
      }
    }

    delete el[ctx];
  },
};
```

将指令统一导出：

```js
import clickoutside from "./modules/clickoutside";

export { clickoutside };
```

然后在 main.js 里注册指令：

```js
Object.keys(directives).forEach((k) => Vue.directive(k, directives[k]));
```

在 vue 组件中使用自定义指令：

```vue
<template>
  <div class="popup" v-clickoutside="closeGlobal"></div>
</template>

<script>
export default {
  methods: {
    closeGlobal() {
      // ...
    },
  },
};
</script>
```
