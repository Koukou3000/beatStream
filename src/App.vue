<template>
  <div>
    <NavBar/>
    <div class="container">
    
    
    

    <br>
    PlayBar 
      按钮 -- 图标打开页面提前下载完 ----------------------
      歌曲信息跳转 detail
      自己维护播放列表Nextup

    <hr>
    TrackDetail
      歌词滚动
      webAudio  加个频谱?

      <router-view></router-view>
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
}
.container{
  
  width: 1240px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
}

</style>
