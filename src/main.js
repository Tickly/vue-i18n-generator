import Vue from 'vue'

import VueI18n from 'vue-i18n'
import messages from './messages.json'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import './styles/App.scss'

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(ElementUI, {
  size: 'small'
})

const i18n = new VueI18n({
  locale: 'en',
  messages,
})

new Vue({
  i18n,
  render: (h) => h(App),
}).$mount('#app')