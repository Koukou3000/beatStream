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
            track: null, // 歌曲详情
            current: 0, // 当前播放时间
            duration: 114, // 总时长
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
        this.$bus.$on('trackProgress',this.receiveProgress) // 接收进度条更新  
    },
    beforeDestroy(){
        this.$bus.$off('trackProgress')
    },
    beforeRouteUpdate(to, from, next){
        // mounted只调用一次，跳转其他参数时刷新页面
        this.track = this.$store.getters['track/getTrackDetail'](to.params.tid) 
        console.log(this.track)
        next()
    }
   
    
}
</script>

<style>

</style>