import Vue from 'vue'
import App from './App.vue'


import {Button,Carousel,CarouselItem} from 'element-ui'
Vue.use(Button)
Vue.use(Carousel,CarouselItem)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')//el:'#app'
