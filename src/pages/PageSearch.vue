<template>
  <div>
      搜索结果
  </div>
</template>

<script>
export default {
  mounted(){
    document.title = this.$route.query.value+' results on BeatStream'
  },
 
}
</script>

<style>

</style>