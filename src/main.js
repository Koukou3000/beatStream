import Vue from 'vue'
import App from './App.vue'


import router from './router'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import store from './store'
Vue.use(store)

// import {Button,Carousel,CarouselItem} from 'element-ui'
// Vue.use(Button,Carousel,CarouselItem)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')//el:'#app'
