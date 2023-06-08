<template>
  <div id="app">
    vue+nodejs+mysql
    <div>
      trend 近期试听热门，广告会有特殊标注 --discover
    </div>
    <div>
      详情页
        上传者设置leading，用于在trend的swiper中展示 视频+图片Swiper
        上传者决定背景 = 颜色/专辑封面虚化
      个人资料
        as uploader
        as listener
      
    </div>



  </div>
</template>

<script>
import TopNav from './components/TopNav.vue'

export default {
  name: 'App',
  components: {
    TopNav
  },
  methods:{
    dosth(){
      console.log('123')
    }
  }
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}



</style>
