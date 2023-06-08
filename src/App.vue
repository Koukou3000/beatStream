<template>
  <div id="app">
    <div>
      trend 近期试听热门，广告会有特殊标注 --discover
      rank 销量 排行榜
    </div>
    <div>
      详情页，专辑设置leading片段，在trend的swiper中展示


      
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
