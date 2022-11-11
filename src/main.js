import Vue from 'vue'

import VueI18n from 'vue-i18n'
import messages from './messages.json'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import './App.scss'

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(ElementUI)

const i18n = new VueI18n({
  locale: 'en',
  messages,
})

new Vue({
  i18n,
  render: (h) => h(App),
}).$mount('#app')

/**
 * todo
 * 添加语言切换功能
 * 删除语言功能
 *
 * 界面改成左侧一个树，右边一个表格的形式，
 * 树用来管理节点
 * 表格用来管理语言和值
 *
 * 底部文本域是否可以隐藏，提供预览按钮，节约界面空间。
 *
 */
