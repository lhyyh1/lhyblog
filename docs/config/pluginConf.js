module.exports = {
  // 代码片段一键复制插件
  'vuepress-plugin-good-copycode': {
    copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
    copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
    duration: 300, // prompt message display time.
    showInMobile: false, // whether to display on the mobile side, default: false.
    copyTitle: "复制代码",
    copyName: "复制"
  },
  //菜单高亮 页面滚动时自动激活侧边栏链接的插件，效果就是右边内容滚动的时候，看到哪里了，左侧菜单会自动高亮显示当前看的目录
  '@vuepress/active-header-links': {
    sidebarLinkSelector: '.sidebar-link',
    headerAnchorSelector: '.header-anchor'
  },
  //点击一个图标会回到顶部
  '@vuepress/back-to-top': true,
  //打开新页面的时候有进度条显示
  '@vuepress/nprogress': true, //默认为true，设置为false可以关闭进度条
  //图片放大
  '@vuepress/medium-zoom': {
    selector: 'img',
    options: {
      margin: 16
    }
  },
  'reading-progress': {
    //阅读进度条
  },
  '@vuepress/pwa': {
    serviceWorker: true,
    updatePopup: {
        message: "发现新内容可用",
        buttonText: "刷新"
    }
  }
}