<template>
  <div>
    <NavBar/>
    
    <div class="container">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive> 
      
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>


    <PlayBar/>
</div>
</template>




<script>
import NavBar from './components/NavBar.vue'
import PlayBar from './components/PlayBar.vue'

export default {
  name: 'App',
  components:{NavBar, PlayBar},
}


</script>

<style>
body{
  margin: 0 auto;
  font: 12px Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
  background: #f2f2f2;
}
.container{
  width: 1240px;
  margin: 0 auto;
  font-size: 14px;
}

</style>
