<template>
  <div class="page__bg">
    
    <div class="rank__container" >    
        <!-- 预告幕布 -->
        <transition name="curtain">            
            <div class="rank__curtain" v-show="showCurtain">
                <span>最热门</span>
                <span>TOP 3</span>
                <!-- 选择 - 结果 -->
                <div class="rank__result" @click.once="go('podium')" title="直接查看结果">
                   <svg t="1687113755128" class="icon" viewBox="0 0 1239 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5322" xmlns:xlink="http://www.w3.org/1999/xlink" width="241.9921875" height="200">
                        <path d="M592.276211 217.411368V52.978526l-19.429053 4.769685c-2.883368 0.673684-6.817684 1.347368-9.701053 1.347368-12.961684 0-24.117895-10.186105-24.117894-22.420211 0-10.536421 7.194947-19.348211 18.351157-22.42021l35.624421-9.862737c10.428632-2.721684 18.351158-4.392421 25.896422-4.392421h0.727578c15.090526 0 27.324632 11.533474 27.324632 25.815579v191.595789c0 14.255158-12.234105 25.815579-27.324632 25.815579-15.117474 0-27.351579-11.560421-27.351578-25.815579zM1239.578947 754.903579v215.578947a26.947368 26.947368 0 0 1-26.947368 26.947369H26.947368a26.947368 26.947368 0 0 1-26.947368-26.947369v-377.263158c0-44.570947 36.271158-80.842105 80.842105-80.842105h296.421053v-80.842105c0-44.570947 36.271158-80.842105 80.842105-80.842105h323.368421c44.597895 0 80.842105 36.271158 80.842105 80.842105v242.526316h296.421053c44.597895 0 80.842105 36.271158 80.842105 80.842105z m-53.894736 0a26.947368 26.947368 0 0 0-26.947369-26.947368H835.368421a26.947368 26.947368 0 0 1-26.947368-26.947369v-269.473684a26.947368 26.947368 0 0 0-26.947369-26.947369H458.105263c-14.848 0-26.947368 12.072421-26.947368 26.947369v107.789474a26.947368 26.947368 0 0 1-26.947369 26.947368H80.842105c-14.848 0-26.947368 12.072421-26.947368 26.947368v350.31579h1131.789474v-188.631579z" 
                        fill="none" p-id="5323" stroke="#fff" stroke-width="20"></path>
                    </svg>                  
                </div>

                <!-- 选择 - 试听 -->
                <div class="rank__play" @click.once="go('crossfade')" title="试听内容">
                    <svg t="1687156409230" class="icon" viewBox="0 0 1264 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path d="M1152.965258 105.493792C1085.10481 36.700038 992.556889 0.301067 885.31691 0.301067c-84.118052 0-172.661786 22.850967-256.990585 66.174473C544.509339 23.724061 456.537632 1.17416 372.9615 1.17416c-107.270086 0-199.818007 36.368864-267.678455 105.072299C-63.525086 277.342698-20.894033 598.821782 200.390034 822.965984c122.353531 123.979291 278.366325 197.198727 427.966397 200.992168a6.563255 6.563255 0 0 0 0.752667 0h0.782774c149.600072-3.763334 305.612866-77.103197 427.966397-201.172808 221.253961-224.324842 263.91512-546.074886 95.106989-717.261445z m-137.497189 674.811032c-111.424807 112.990354-252.173517 179.797068-386.358971 183.409869-134.155348-3.612801-274.904057-70.359301-386.328864-183.229229C44.6482 579.764256 1.987041 296.34001 147.673245 148.726979c56.389804-57.112364 134.275774-87.30936 225.288255-87.30936 78.698851 0 162.365303 22.82086 241.997461 65.993833a29.775502 29.775502 0 0 0 32.063609-2.799921c78.488104-41.908493 160.799756-64.036899 238.29434-64.036899 90.982374 0 168.838238 30.196996 225.258148 87.369573 145.716311 147.763565 103.055151 431.428665-95.106989 632.360619z m32.24425-298.507691h-239.19754a29.865822 29.865822 0 0 0-26.734728 16.648992l-86.436266 174.106906-127.381345-410.564738a29.835716 29.835716 0 0 0-27.698142-21.10478c-14.240458-0.602134-24.356301 7.496562-28.842196 19.509126l-82.432078 221.404494H210.535984a29.986249 29.986249 0 0 0-29.895929 30.106676c0 16.618885 13.367364 30.106676 29.895929 30.106676h239.19754a29.956142 29.956142 0 0 0 27.999208-19.569339l59.129511-158.812715 123.527691 398.190894a29.865822 29.865822 0 0 0 55.275857 4.485895l111.334487-224.294735H1047.712319a29.986249 29.986249 0 0 0 29.895929-30.106676c0-16.618885-13.367364-30.106676-29.895929-30.106676" 
                        fill="none" p-id="1692" stroke="#fff" stroke-width="20"></path>
                    </svg>
                   
                </div>
                <!-- 加载动画 -->
                <transition name="startload">
                    <div class="loading__progress" v-show="loading" :style="{width: loadPercent+'%'}">
                        <div class="loading__progress__hint">{{loadingHint}}</div>
                    </div>
                </transition>
            </div>
        </transition>
        

        <!-- 试听内容 -->
        <div class="slide__list" v-if="carousel=='crossfade'">
            <div class="slide" style="background-image: url(https://shop32-makeshop.akamaized.net/shopimages/redwave/slide1.jpg?MjAyMy0wNS0xNiAxOToyODo0MQ==)"></div>
        </div>
        <div class="carousel__progress" :style="{width: count+'%'}"></div>

        <div class="speaker__icon">
            <svg t="1687059934913" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3697" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M266.417804 400.877059l189.369133-150.280807v522.816527L266.417804 623.122941H92.161282V400.877059H266.417804zM51.208941 324.080355c-19.801549 0-35.842556 16.041007-35.842556 35.842556v304.159596c0 19.790712 16.041007 35.844362 35.842556 35.844362h188.44435c78.275995 62.115778 156.550183 124.231556 234.822566 186.359977 23.48623 18.632927 58.118621 1.907364 58.118621-28.075826V165.796204c0-29.992221-34.632391-46.71959-58.118621-28.074019-78.272382 62.115778-156.546571 124.242393-234.822566 186.35817H51.208941zM596.926483 330.382244c-13.59539-16.264978-11.433349-40.491756 4.831629-54.090759 16.279427-13.597196 40.493563-11.433349 54.090758 4.844272 47.637148 56.993348 95.279715 113.988503 142.916863 170.992689 47.638954-57.004186 95.279715-113.99934 142.929507-170.992689 13.59539-16.277621 37.813138-18.441468 54.079921-4.844272 16.274009 13.597196 18.437856 37.823975 4.842466 54.090759-50.597537 60.542563-101.20591 121.083321-151.801641 181.624078 50.59573 60.540757 101.204104 121.079708 151.801641 181.611434 13.59539 16.277621 11.431543 40.493563-4.842466 54.090759-16.26859 13.608033-40.484532 11.44238-54.079921-4.835241-47.649792-56.993348-95.290552-113.997534-142.929507-170.990883l-142.916863 170.990883c-13.597196 16.277621-37.813138 18.443274-54.090758 4.835241-16.264978-13.597196-18.427018-37.814944-4.831629-54.090759 50.599343-60.531726 101.191461-121.070677 151.799835-181.611434-50.606568-60.542563-101.200492-121.083321-151.799835-181.624078z" fill="#cccccc" p-id="3698"></path></svg>
        </div>
        <div class="speaker__icon" v-show="true">
            <svg t="1687059909535" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2967" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M701.78095 343.629034c-10.378519-21.239297-37.17735-28.335921-56.709772-15.025913-19.534229 13.31362-22.731232 40.847581-6.766086 58.279374 49.241068 76.142853 49.241068 174.092156 0 250.236816-15.965146 17.431793-12.768143 44.96756 6.766086 58.279374 19.532423 13.311814 46.331254 6.211578 56.709772-15.022301M888.624993 858.76011c161.822529-202.863375 161.822529-490.660458 0-693.518414-12.538753-18.529973-38.181606-22.503649-55.743447-8.637326-17.560035 13.86271-19.648021 39.725921-4.535409 56.225706 137.182126 175.856829 137.182126 422.483018 0 598.34346-15.112612 16.499786-13.024626 42.362997 4.535409 56.2239 17.563647 13.86271 43.204693 9.889034 55.743447-8.637326zM239.651485 324.076743c78.274189-62.115778 156.544765-124.23878 234.818953-186.356364 23.488036-18.643764 58.118621-1.912783 58.118621 28.074019v692.41301c0 29.988609-34.630585 46.712365-58.118621 28.072213L239.651485 699.921451H51.201716c-19.794324 0-35.838943-16.046425-35.838943-35.84075V359.919299c0-19.792518 16.044619-35.84075 35.838943-35.84075l188.449769-0.001806z m-147.488396 76.800316v222.245882h174.26194l189.367327 150.284419V250.590834l-189.367327 150.288031H92.163089zM695.538667 689.537513c75.32825-106.375301 75.32825-248.701532 0-355.075026" fill="#cccccc" p-id="2968"></path></svg>
        </div>

        <!-- 结果内容 -->
        <div class="podium__" v-if="carousel=='podium'">
            
        </div>


        
    </div>  
        <button @click="startTimer">start</button>
        <button @click="stopTimer">stop</button>
        
        {{count}} 
        
  </div>
    
</template>

<script>
export default {
    data(){
        return{
            carousel: '', // 记录走马灯类型：排行/试听
            showCurtain: true, //控制幕布动画
            count: 0, // 计时器
            timer: null, 

            loading: false, // 是否已经开始加载资源
            loadPercent : 1,
            loadingHint: '正在读取资源...',
            volume: 0,
        }
    },
    computed:{
        track(){
            return this.$store.state.track
        }
    },
    watch:{
        volume(newVal){
            if(newVal >= 0.9){
                console.log(this.timer)
                clearInterval(this.timer)
                this.timer = null
            }
        }
    },
    methods:{
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
                console.log('interval仍然在调用')
            }, 16);
           
        },
        stopTimer(){
            clearInterval(this.timer)
            this.loading = !this.loading 
        },
        go(e){      
            // curtain ==go()>> crossfade(slide) => result(podium)
            
            let tracks = this.$store.getters['track/getTop3Tracks']
            
            
            tracks.forEach(track => {

                // 如果audioOk == false 放图片、名字
                let audio = new Audio()
                track['audioObj'] = {}
                audio.oncanplaythrough = ()=>{
                    console.log('加载音频成功 - ',track.title)
                    track['audioObj'] = audio
                    track['audioOk'] = true
                }
                audio.onerror = ()=>{
                    console.log('加载音频失败 - ',track.title)
                    track['imgOk'] = false
                    track['audioOk'] = false
                }
                audio.src = track.audio_url

                // 如果imgOk == false 放音乐、名字    
                let image = new Image()
                track['imgObj'] = {}
                image.onload = ()=>{
                    console.log('加载图片成功 - ',track.title)
                    track['imgObj'] = image
                    track['imgOk'] = true
                }
                image.onError = ()=>{
                    console.log('加载图片失败 - ',track.title)
                    track['imgOk'] = false
                }
                image.src = track.img_url
                console.log(track)

        
                audio.volume = 0
                this.timer = setInterval(()=>{
                    if(audio.volume < 0.9){
                        audio.volume += 0.01
                        this.volume = audio.volume   
                    }
                    else{
                        console.log(audio.volume,'uplifting audio volume')             
                    }
                },16)
                console.log(this.timer)
            });


            // start from here --------------------------------------------

            this.loading = true
            if(e == 'podium'){
                // 加载图片
                this.carousel = 'podium' 
            }
            else if(e == 'crossfade'){
                // 加载音频 图片
                let total = 99 //图片音频资源
                let loaded = 0
     
                this.timer = setInterval(() => {
                    loaded++
                    this.loadPercent = 100*loaded / total
                    this.loadingHint = '正在载入图片资源... '+loaded+'/'+total
                    if(loaded == 99) {
                        this.loadingHint = '开始播放..'
                        clearInterval(this.timer)
                        this.timer = null
                        console.log('进度为100')
                        this.showCurtain = false
                        this.loading = false
                    }     
                    console.log('仍然在调用Interval')
                }, 50);
                
                this.carousel = 'crossfade' 
                // 当阶段走完后carousel = 'podium'
            }
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
/* 幕布，内容预告 */
.rank__curtain{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    user-select: none;
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
    bottom: 1%;
    width: 100px;
    height: 100px;
    margin-right: 120px; 
    cursor: pointer;
}
.rank__play{
    position: absolute;
    bottom: 1%;
    right: 1%;
    width: 100px;
    height: 100px;
    cursor: pointer;
}
svg{
    width: 100%;
    height: 100%;
}
@keyframes line-anm{
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
        stroke-dashoffset: 0;
        stroke-dasharray: 50;
    }
}
@keyframes fill-anm {
    from{fill:transparent;}
    to{
        fill: #fff;
        stroke-width: 0;
    }

}
.rank__result path:nth-child(1){    
    transition: .3s;
    fill: transparent;
}
.rank__play path:nth-child(1){    
    transition: .3s;
    fill: transparent;
}
.rank__result:hover path:nth-child(1){
   /* stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: 
        line-anm 2s ease forwards, 
        fill-anm 1s ease forwards ; */
    fill: #fff;

}
.rank__play:hover path:nth-child(1){
   /* stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: 
        line-anm 2s ease forwards, 
        fill-anm 1s ease forwards ; */
        fill: #fff;
}


/* 加载进度条 */
.loading__progress{
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 1%;
    height: 1%;
    background-color: #fff;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    border-radius: 4px;
    transition: .3s;
}
.loading__progress__hint{
    position: absolute;
    font-size: 12px!important;
    color: #fff;
    bottom: 100%;   
    white-space: nowrap
}
@keyframes pump{
    from{
        height: 0;
        opacity: 0;
    }
    to{
        height: 1%;
        opacity: 1;
    }
}
.startload-enter-active{
    animation: pump 1s;
}
.startload-leave-active{
    animation: pump 1s reverse;
}


/* 试听 */
.slide__list{
    height: inherit;
    overflow: auto;
}
.slide{
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
}


/* 静音按钮 */
.speaker__icon{
    width: 80px;
    height: 80px;
    position: absolute;
    right: 1%;
    bottom: 1%;    
    cursor: pointer;
    transition: 0.3s;
}
/* 试听时间条 */
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