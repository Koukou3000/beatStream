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
     <p>你提供的URL路径 ../asset/xxx.svg 是一个相对路径，它指向位于上一级目录（../）下的 asset 文件夹中的 xxx.svg 文件。
        相对路径是相对于当前文件的路径来解析资源的，具体的解析规则取决于使用相对路径的上下文。当浏览器遇到这样的相对路径时，它会发送一个网络请求，尝试获取该路径下的资源（比如图像文件）。

与之相反，前面提到的数据URI是一种嵌入图像数据的方式，直接将图像数据包含在URL中。数据URI使用特定的编码格式（比如 base64 编码），将图像数据转换成字符串形式，然后通过指定的数据URI方案将其嵌入到URL中。这样的URL以 data: 开头，并且不需要进行额外的网络请求，浏览器可以直接解析和显示图像。

总结起来，相对路径是通过网络请求获取资源文件，而数据URI是直接将图像数据嵌入到URL中，无需进行网络请求。相对路径适用于动态加载或需要根据不同环境动态确定资源路径的情况，而数据URI适用于将小型图像直接嵌入到页面中，减少网络请求。选择哪种方式取决于你的具体需求和使用场景。</p> 
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
