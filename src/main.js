import Vue from 'vue'
import App from './App.vue'


import router from './router'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import store from './store'
Vue.use(store)


import { Notification } from 'element-ui';

Vue.prototype.$notify = Notification //挂载到原型对象上 类似bus
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')//el:'#app'
