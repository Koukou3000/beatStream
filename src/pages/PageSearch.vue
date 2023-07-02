<template>
  <div>
      {{this.$route.query.q}}的搜索结果是
  </div>
</template>

<script>
export default {
  mounted(){
    document.title = this.$route.query.q+' 的搜索结果'
  },
  beforeRouteUpdate(to, from, next){
    document.title = to.query.q+' 的搜索结果'
    next()
  },

 
}
</script>

<style>

</style>