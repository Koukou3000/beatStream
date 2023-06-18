<template>
  <div class="page__bg">
    
    <div class="rank__container" >        
        <transition name="curtain">            
            <div class="rank__curtain" v-show="carousel.length==0">
                <span>最热门</span>
                <span>TOP 3</span>
              
                <div class="rank__result" @click="carousel='off'" ></div>
                <div class="rank__play" @click="carousel='on'">试听(60s)</div>
                
            </div>
        </transition>
        

        <!-- 选择试听 -->
        <div class="slide__list" v-show="carousel=='on'">
            <div class="slide" style="background-image: url(https://shop32-makeshop.akamaized.net/shopimages/redwave/slide1.jpg?MjAyMy0wNS0xNiAxOToyODo0MQ==)"></div>
            <div class="slide" style="background-image: url(https://shop32-makeshop.akamaized.net/shopimages/redwave/slide1.jpg?MjAyMy0wNS0xNiAxOToyODo0MQ==)"></div>
            <div class="slide" style="background-image: url(https://shop32-makeshop.akamaized.net/shopimages/redwave/slide1.jpg?MjAyMy0wNS0xNiAxOToyODo0MQ==)"></div>
        </div>
        <div class="carousel__progress" :style="{width: count+'%'}"></div>
        <div class="carousel__icon" v-show="carousel=='on'"></div>
        <!-- <div class="carousel__icon">音量显示</div> -->

        <!-- 选择直接查看结果 -->
        <div v-show="carousel=='off'">
            奖杯CSS
        </div>


        
    </div>  
        光标hover有描边填充动画，点击后开始加载，加载时播放转圈效果，加载完 carousel = on/off （触发curtain fade动画）

        播放试听：（对每个片段）
        设置页面audio，background-image，大小令宽度铺满，设置好后开始
        1.图片背景brightness 0 =>1
        2.淡入音量
        3.播放从上到下的动画

        全局的播放状态由vuex管理，pageTrend的优先级要比playbar高。
        当pageTrend中播放时，写入全局播放状态 playing = true，结束时或者点击暂停时 设置playing=false
        playbar每次updateTime时，读取全局播放状态，如果playing=true则暂停
    
      按上传时间顺序排序的:
        track列表 -- 歌曲信息  加入播放列表  播放时仅替换当前曲目）
        playlist列表 -- 播放时替换整个player 播放列表）【带列表第一位的图片】<br>
        <button @click="startTimer">start</button>
        <button @click="stopTimer">stop</button>
        {{count}} 
        
  </div>
    
</template>

<script>
export default {
    data(){
        return{
            carousel: '',
            count: 0,
            timer: null,

        }
    },
    methods:{
        loadResourceAndPlay(){
            // 载入图片、音频资源并且隐藏幕布
        },
        startTimer(){    
            this.timer = setInterval(() => {
                this.count+=0.08  // 20s => 进度100% =>延迟两秒
                if(this.count>=100) {
                    this.count=0
                    clearInterval(this.timer)
                    setTimeout(() => {
                        this.startTimer()
                    }, 2000);
                }
                    
            }, 16);
           
        },
        stopTimer(){
            clearInterval(this.timer)
        },
        
        
    },
}
</script>
<style scoped>
.page__bg{
    background: #fff;
}
/* 走马灯 */
.rank__container{
    position: relative;
    width: 1240px;
    height: 420px;
    overflow: hidden;
}
.rank__curtain{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
}
.rank__curtain span:nth-of-type(1){
    position: absolute;
    color: #fff;
    z-index: 1;
    font-size: 40px;
    font-weight: bold;
}
.rank__curtain span:nth-of-type(2){
    position: absolute; 
    color: #fff;
    font-size: 120px;
    font-weight: bold;
    font-family: "Meiryo",Hiragino Sans,Hiragino Kaku Gothic ProN, sans-serif;
    opacity: .2;
    user-select: none;
}
@keyframes fade {
    from{
        opacity: 1;
    }
    to{
        opacity: 0;
        
    }
}
.curtain-leave-active{
    animation: fade 1s;
}

.rank__result{
    position: absolute;
    right: 1%;
    width: 5%;
    height: 0;
    padding-top: 5%;
    background-image: url(../assets/trend/podium.svg);
    background-size: contain;
    background-repeat: no-repeat;
}
.rank__play{
    position: absolute;
    bottom: 1%;
    right: 1%;
    width: 5%;
    height: 0;
    padding-top: 5%;
    background-image: url(../assets/trend/play.svg);
    background-size: contain;
    background-repeat: no-repeat;
}
@keyframes line-anm {
    to{
         stroke-dashoffset: 0;
    }
}
.rank__result path:nth-child(1){
    stroke-dasharray: 650;
    stroke-dashoffset: 650;
    animation: line-anm 2s forwards;
}
.rank__result path:nth-child(2){
    stroke-dasharray: 3000;
    stroke-dashoffset: 3000;
    animation: line-anm 2s forwards 3000ms;
}

/*  */
.slide__list{
    height: inherit;
    overflow: auto;
}
.slide{
    width: 100%;
    height: 0;
    background-size: cover;
    background-repeat: no-repeat;
}




/* 音频切换的 */
.carousel__icon{
    width: 5%;
    height: 0;
    padding-top: 5%;
    background-size: cover;
    position: absolute;
    right: 1%;
    bottom: 1%;    
    background-image: url(../assets/trend/muted.svg);
    cursor: pointer;
    transition: 0.3s;
}
.carousel__progress{
    position: absolute;
    width: 0;
    height: 2%;
    background: #ff5500;
    bottom: 0;
}











.sc-artwork.sc-artwork-placeholder-0 {
  background-image: linear-gradient(135deg,#846170,#70929c)
}

.sc-artwork.sc-artwork-placeholder-1 {
    background-image: linear-gradient(135deg,#846170,#e6846e)
}

.sc-artwork.sc-artwork-placeholder-2 {
    background-image: linear-gradient(135deg,#846170,#8e8485)
}

.sc-artwork.sc-artwork-placeholder-3 {
    background-image: linear-gradient(135deg,#70929c,#846170)
}

.sc-artwork.sc-artwork-placeholder-4 {
    background-image: linear-gradient(135deg,#70929c,#e6846e)
}

.sc-artwork.sc-artwork-placeholder-5 {
    background-image: linear-gradient(135deg,#70929c,#8e8485)
}

.sc-artwork.sc-artwork-placeholder-6 {
    background-image: linear-gradient(135deg,#e6846e,#846170)
}

.sc-artwork.sc-artwork-placeholder-7 {
    background-image: linear-gradient(135deg,#e6846e,#70929c)
}

.sc-artwork.sc-artwork-placeholder-8 {
    background-image: linear-gradient(135deg,#e6846e,#8e8485)
}

.sc-artwork.sc-artwork-placeholder-9 {
    background-image: linear-gradient(135deg,#8e8485,#846170)
}

.sc-artwork.sc-artwork-placeholder-10 {
    background-image: linear-gradient(135deg,#8e8485,#70929c)
}

.sc-artwork.sc-artwork-placeholder-11 {
    background-image: linear-gradient(135deg,#8e8485,#e6846e)
}

.sc-background-orange {
    background-color: #f50;
    background-image: linear-gradient(180deg,#f70 0,#f30)
}
</style>