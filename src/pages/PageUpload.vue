<template>
  <div>
    <hr>
     Upload   -- 维护一个track列表
      
      本地添加一个track对象
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
      上传成功后，加入到本地存储中
      <div style="color:red">{{track.trackname}}</div>
  </div>
</template>

<script>
export default {
  computed:{
    track(){
      return this.$store.state.track
    }
  },
  mounted(){
    console.log(this.track.trackList)
  }
}
</script>

<style>

</style>