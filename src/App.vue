<template>
  <div>
    <!-- 
    Trend
      图片Swiper -- （取自收藏量前三  图片放大从左到右 带静音按钮 -- 排名列表
      搜索框 
      按上传时间顺序排序  
      加入nextUP

    TrackDetail
      歌曲详情
      歌词滚动条
      preview 片段
      评论 - 时间戳
      webAudio  

    底部全局播放器 （需要多标签页共享播放状态： 考虑localStorage/ Broadcast Channel
      常规按钮 + 播放列表Nextup + 图片 
   -->
    <NavBar/>
    <div class="container">
      接下来： 处理拖拽、点击进度条  以及 歌曲列表 歌曲信息上传
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
