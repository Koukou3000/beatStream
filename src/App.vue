<template>
  <div>
    <NavBar/>
    
    <div class="container">
      <router-view></router-view>
    
      
      <div style="color:red">
        playlist加入localStorage;
        detail页面歌词滚动;
        pageupload中的内容形成组件; </div>
      <br>
      PlayBar 
        播放状态需要存到LocalStorage
        //UPDATE//多个标签页不允许同时播放 

      <br>
      TrackDetail
        歌词滚动
        webAudio  频谱进度条?

      音乐格式 qq netease dizzylab soundcloud
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
  updated(){
    console.log('app渲染了')
  }
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
