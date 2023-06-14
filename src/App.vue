<template>
  <div>
    <NavBar/>
    <div class="container">
    
    <hr> 
    Trend 
      图片Swiper -- （排名列表 前三 - 图片放大从左到右 带静音按钮 -- 
      按上传时间顺序排序的:
        track列表（歌曲信息  加入播放列表  播放时仅替换当前曲目）
        playlist（播放时替换整个player 播放列表）（推荐的
    <br>
    Search 
      返回全部列表中的一部分（页面跳转传值

    <br> 
    底部全局播放器 （需要多标签页共享播放状态： 考虑localStorage/ Broadcast Channel
      按钮  -- 图标改一下打开页面就下载----------------------
      歌曲信息跳转 detail
      播放列表Nextup 

    <hr>
    TrackDetail
      歌词滚动条
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
  data(){
    return{
      playlist:[] // vuex
    }
  },
  mounted(){
    var a = {
      title: 'cortado',
      img: 'sss.com/213sadadwqe',
      audio: 'http://47.115.222.108/music/Cortado.mp3'
    }
      localStorage.setItem('track1',JSON.stringify(a))
  }

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
