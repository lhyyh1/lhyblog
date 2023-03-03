/*
 * @Date: 2022-06-09 20:45:48
 * @LastEditors: 廖洪玉
 * @LastEditTime: 2022-06-16 00:25:20
 * @FilePath: \blog-master\docs\.vuepress\config.js
 */
// 插件配置
const pluginConf = require('../config/pluginConf')
// 头部导航配置
const navConf = require('../config/nav')
// 侧边栏配置
const sidebraConf = require('../config/sidebar')

module.exports = {
  title: '失效的氟西丁',
  description: '日拱一卒无有尽，功不唐捐终入海',
  dest: './lhyblog', // 默认在.vuepress目录下
  port: '7777',
  base: '/lhyblog/',  // 设置站点根路径
  head: [
    ['link', { rel: 'icon', href: '/image/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: '/css/style.css' }]
  ],
  markdown: {
    lineNumbers: true
  }, 
  themeConfig: {
    nav: navConf,
    sidebar: sidebraConf,
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    searchMaxSuggestoins: 10,
    serviceWorker: {
      updatePopup: {
        message: "有新的内容.",
        buttonText: '更新'
      }
    },
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页 ！'
  },
  plugins: pluginConf
}
