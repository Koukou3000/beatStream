<template>
    <div style="color:blue;">
        
        
        <div v-if="track">
            {{track.title}} - {{track.artist}}
        </div>
        当前播放的是：playbar.nowplaying
        当前页面是：
            （一致）
            当前播放比例{{progressPercent}}
        歌曲信息 |  歌曲评论（时间戳） | lyric
    </div>
</template>

<script>
export default {
    data(){
        return{
            track: null,
            playing: false,
            current: 0,
            duration: 114,
        }
    },
    computed:{
      progressPercent(){
        return this.current*100 / this.duration
      }  
    },
    methods:{
        receiveProgress(now, dur){
            this.current = now
            this.duration = dur
        }
    },
    mounted(){
        this.track = this.$store.getters['track/getTrackDetail'](this.$route.params.tid)
        this.$bus.$on('trackProgress',this.receiveProgress)
    },
    beforeDestroy(){
        this.$bus.$off('trackProgress')
    }
   
    
}
</script>

<style>

</style>