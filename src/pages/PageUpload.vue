<template>
  <div>
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
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>