import Vue from 'vue'
import App from './App.vue'

// import {Button,Carousel,CarouselItem} from 'element-ui'
// Vue.use(Button,Carousel,CarouselItem)


import router from './router'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')//el:'#app'
