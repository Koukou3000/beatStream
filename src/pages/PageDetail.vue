<template>
    <div style="color:blue;">
        <div style="color:red;">与playbar通信 播放时间 </div>
        <div @trackProgress="receiveProgress">{{current}}</div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            track: null,
            playing: false,
            current: 0
        }
    },
    methods:{
        receiveProgress(){
            console.log('收到了信息！')
        }
    },
    mounted(){
        this.track = this.$store.getters['track/getTrackDetail'](this.$route.params.tid)
        console.log(this.track)
    },
   
    
}
</script>

<style>

</style>