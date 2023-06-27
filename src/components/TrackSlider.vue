<template>
  <div>
        <div></div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            showSlider: true,
        }
    },
    props:{
        length: Number,             // 列表的长度
        isPlaylist : Boolean,       // 列表的每一项是否是单曲
        p: Array
    },
    mounted(){
        //  trackList:[
        //     {
        //         tid: 1,
        //         title: 'Alone Intelligence',
        //         artist: 'Camellia',
        //         audio_url: 'http://47.115.222.108/music/Alone-Intelligence.mp3',
        //         img_url: 'https://cametek.jp/heartofandroid/assets/jacket_full.jpg',
        //         duration: '3:42',
        //         release_time: '2018/1/26',
        //         preview_start: 90, 
        //     },
        //     {       
        //         tid: 1,
        //         title: 'Alone Intelligence',
        //         artist: 'Camellia',
        //         audio_url: 'http://47.115.222.108/music/Alone-Intelligence.mp3',
        //         img_url: 'https://cametek.jp/heartofandroid/assets/jacket_full.jpg',
        //         duration: '3:42',
        //         release_time: '2018/1/26',
        //         preview_start: 90, 
        //     },
        //  ]

    }
}
</script>

<style>

</style>