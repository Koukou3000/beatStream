<template>
  <div>
    <NavBar/>
    <div class="container">
    <br>
    Upload  上传当然也是保存到本地而已，编辑几个字符串
      Track:{
        releaseTime发布时间,
        title标题,
        audio存储地址,
        poster存储地址,
        preview__start开始时间,
        comments:[{
          at时间戳,
          content评论内容,
        }]
      }
      
    <hr>
    底部全局播放器 （需要多标签页共享播放状态： 考虑localStorage/ Broadcast Channel
      按钮  -- 图标改一下打开页面就下载----------------------
      歌曲信息跳转 detail
      播放列表Nextup 
      Playlist:[{
        Track1,Track2,Track3....
      }]

    <hr> 
    Trend 
      图片Swiper -- （排名列表 前三 - 图片放大从左到右 带静音按钮 -- 
      按上传时间顺序排序的
        track列表（歌曲信息  加入播放列表  播放时仅替换当前曲目）
        playlist（播放时替换整个player 播放列表）（推荐的
      
    <hr>
    Search 
      返回全部列表中的一部分（页面跳转传值
    
    <hr>
    TrackDetail
      歌词滚动条
      webAudio  加个频谱?

    <hr>
    profile likes 不做了
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
  components:{NavBar, PlayBar}

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
