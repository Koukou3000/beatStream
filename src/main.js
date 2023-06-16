import Vue from 'vue'
import App from './App.vue'


import router from './router'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import store from './store'
Vue.use(store)


import {Message} from 'element-ui'
Vue.prototype.$message = Message //挂载到原型对象上 类似bus

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')//el:'#app'
