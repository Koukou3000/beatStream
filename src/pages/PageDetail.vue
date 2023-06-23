<template>
    <div style="color:blue;">
        this.$route.params == {
          
        }

        <div style="color:red;">与playbar通信播放时间 </div>
    </div>
</template>

<script>
export default {
    mounted(){
        console.log('要根据歌曲id读state',this.$route.params.id)
    }
}
</script>

<style>

</style>