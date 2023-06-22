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
                        fill="none" p-id="5323" stroke="#fff" stroke-width="10"></path>
                    </svg>                  
                </div>

                <!-- 选择 - 试听 -->
                <div class="rank__play" @click.once="go('crossfade')" title="试听内容">
                    <svg t="1687422595687" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12681" width="200" height="200">
                        <path d="M512 960C265.6 960 64 758.4 64 512S265.6 64 512 64s448 201.6 448 448-201.6 448-448 448z m0-832C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128z"
                         fill="none" p-id="12682" stroke="#fff" stroke-width="10"></path>
                        <path d="M433.6 672c-4.8 0-11.2-1.6-16-4.8-9.6-6.4-16-16-16-27.2V384c0-11.2 6.4-22.4 16-27.2 9.6-6.4 22.4-6.4 32 0l222.4 128c9.6 6.4 16 16 16 27.2s-6.4 22.4-16 27.2l-222.4 128c-4.8 3.2-11.2 4.8-16 4.8z m32-232v145.6l126.4-72-126.4-73.6z"
                         fill="none" p-id="12683" stroke="#fff" stroke-width="10"></path>
                    </svg>
                   
                </div>
                <!-- 加载动画 -->
                <transition name="startload">
                    <div class="loading__progress" v-show="loading" :style="{width: loadPercent+'%'}">
                        <div class="loading__progress__hint">{{loadingText}}</div>
                    </div>
                </transition>
            </div>
        </transition>
        
        <!-- 试听内容 -->
        <div class="slide__container" v-if="stage=='crossfade'">
            <div class="slide__cloak" ref="slideCloak" :style="{opacity: opacity}"></div>

            <div class="slide" :style="{'background-image': 'url('+slideBackground+')'}"></div>
            
            <div class="speaker__icon" @click="muted=!muted" v-show="muted" >
                <svg t="1687059934913" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3697" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
                    <path d="M266.417804 400.877059l189.369133-150.280807v522.816527L266.417804 623.122941H92.161282V400.877059H266.417804zM51.208941 324.080355c-19.801549 0-35.842556 16.041007-35.842556 35.842556v304.159596c0 19.790712 16.041007 35.844362 35.842556 35.844362h188.44435c78.275995 62.115778 156.550183 124.231556 234.822566 186.359977 23.48623 18.632927 58.118621 1.907364 58.118621-28.075826V165.796204c0-29.992221-34.632391-46.71959-58.118621-28.074019-78.272382 62.115778-156.546571 124.242393-234.822566 186.35817H51.208941zM596.926483 330.382244c-13.59539-16.264978-11.433349-40.491756 4.831629-54.090759 16.279427-13.597196 40.493563-11.433349 54.090758 4.844272 47.637148 56.993348 95.279715 113.988503 142.916863 170.992689 47.638954-57.004186 95.279715-113.99934 142.929507-170.992689 13.59539-16.277621 37.813138-18.441468 54.079921-4.844272 16.274009 13.597196 18.437856 37.823975 4.842466 54.090759-50.597537 60.542563-101.20591 121.083321-151.801641 181.624078 50.59573 60.540757 101.204104 121.079708 151.801641 181.611434 13.59539 16.277621 11.431543 40.493563-4.842466 54.090759-16.26859 13.608033-40.484532 11.44238-54.079921-4.835241-47.649792-56.993348-95.290552-113.997534-142.929507-170.990883l-142.916863 170.990883c-13.597196 16.277621-37.813138 18.443274-54.090758 4.835241-16.264978-13.597196-18.427018-37.814944-4.831629-54.090759 50.599343-60.531726 101.191461-121.070677 151.799835-181.611434-50.606568-60.542563-101.200492-121.083321-151.799835-181.624078z" 
                    fill="#111" p-id="3698" stroke="#fff" stroke-width="30"></path>
                </svg>
            </div>
            <div class="speaker__icon" @click="muted=!muted" v-show="!muted"> 
                <svg t="1687059909535" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2967" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">                
                    <path d="M701.78095 343.629034c-10.378519-21.239297-37.17735-28.335921-56.709772-15.025913-19.534229 13.31362-22.731232 40.847581-6.766086 58.279374 49.241068 76.142853 49.241068 174.092156 0 250.236816-15.965146 17.431793-12.768143 44.96756 6.766086 58.279374 19.532423 13.311814 46.331254 6.211578 56.709772-15.022301M888.624993 858.76011c161.822529-202.863375 161.822529-490.660458 0-693.518414-12.538753-18.529973-38.181606-22.503649-55.743447-8.637326-17.560035 13.86271-19.648021 39.725921-4.535409 56.225706 137.182126 175.856829 137.182126 422.483018 0 598.34346-15.112612 16.499786-13.024626 42.362997 4.535409 56.2239 17.563647 13.86271 43.204693 9.889034 55.743447-8.637326zM239.651485 324.076743c78.274189-62.115778 156.544765-124.23878 234.818953-186.356364 23.488036-18.643764 58.118621-1.912783 58.118621 28.074019v692.41301c0 29.988609-34.630585 46.712365-58.118621 28.072213L239.651485 699.921451H51.201716c-19.794324 0-35.838943-16.046425-35.838943-35.84075V359.919299c0-19.792518 16.044619-35.84075 35.838943-35.84075l188.449769-0.001806z m-147.488396 76.800316v222.245882h174.26194l189.367327 150.284419V250.590834l-189.367327 150.288031H92.163089zM695.538667 689.537513c75.32825-106.375301 75.32825-248.701532 0-355.075026" 
                     fill="#111" p-id="3698" stroke="#fff" stroke-width="30">
                    </path>                  
                </svg>
            </div>   
            
            
            <!-- 错误时显示 -->
            <div class="error__fill">
                <div class="track__info">
                    <div style="font-size:70px">{{trackTitle}}</div>
                    <div style="font-size:30px">{{trackArtist}}</div>
                </div>
            </div> 
            <div class="carousel__progress" :style="{width: count*5+'%'}" v-show="timer"></div>
        </div>
        
        

        <!-- 结果内容 -->
        <div class="podium__" v-show="stage=='podium'">
            <transition name="curtain">
                <div class="podium__cloak" v-show="stage=='crossfade'"></div>
            </transition>


            
        </div>
    </div>  

   

        
  </div>
</template>

<script>
export default {
    data(){
        return{
            stage: '', 
            tracks: [],

            // 幕布
            showCurtain: true,
            loading: false, // 是否已经开始加载资源
            total: 0,   //音频 图片资源总数
            loaded: 0, // 已尝试加载完的资源数
            loadingText: '正在读取资源...',

            // crossfade
            count: 0, // 全局时间
            timer: null,  // 全局时间计时器
     
            slideBackground: '',
            opacity: 1,
            volume: 0,
            muted: false,
            audio: null,
            fadeTimer: null, 
           
        }
    },
    computed:{
        track(){
            return this.$store.state.track
        },
        loadPercent(){
            return 100 * this.loaded / this.total
        },
     
    },
    watch:{
        async loaded(newVal){
            this.loadingText = '正在读取资源...'+newVal+'/'+this.total
            if(newVal>=this.total) {
                this.loadingText = '加载完成'
            }
            // 资源下载完，执行图片/音频的逻辑（与count的值相关
            if(newVal == this.total){
                this.loading = false
                this.showCurtain = false
                               
                this.stage = 'crossfade'  
                this.startTimer() 
            }
        },
       
        opacity(newVal){      
            if(newVal>=1) {
                this.opacity = 1
                clearInterval(this.fadeTimer)
                this.fadeTimer = null
            }
            if(newVal<=0) {
                this.opacity = 0
                clearInterval(this.fadeTimer)
                this.fadeTimer = null     
            }
        },   
        volume(newVal){
            // 实时更新到audio身上
            if(newVal>=1) this.volume = 1
            if(newVal<=0) this.volume = 0
            if(this.audio && !this.muted){
                // 设置muted时
                 // this.volume的变化不允许反映到this.audio.volume
                this.audio.volume = this.volume
            }
        },
        muted(newVal){
            if(newVal == true){
                // 设置muted = true 时，this.audio.volume设置为0
                if(this.audio){
                    this.audio.volume = 0
                }
            }
            else{
                if(this.audio){
                    this.audio.volume = this.volume
                }
            }
            
        }
    },
    methods:{
        startTimer(){    
            let t = this.tracks.pop()
            this.trackTitle = t.title
            this.trackArtist = t.artist
            if(t.imgOk){
                this.slideBackground = t.img_url
            }
            this.audio = t.audioObj
            // *****vuex管理锁，每次play（）前需要访问锁（不能跨页面）
            if(this.audio){
                this.audio.volume = 0
                this.audio.currentTime = t.preview_start
                this.audio.play()
            }

            this.timer = setInterval(() => {
                //淡入
                if(this.count==0){            
                    this.fadeTimer = setInterval(() => {
                        this.opacity -= 0.1
                        this.volume += 0.1
                    }, 100);
                }
                //淡出
                else if(this.count==18){
                    this.fadeTimer = setInterval(() => {
                        this.opacity += 0.1
                        this.volume -= 0.1
                    }, 100);
                }
                // 下一轮   
                if(this.count > 20) {
                    clearInterval(this.timer)
                    this.timer = null
                    this.count = 0

                    if(this.tracks.length > 0){ 
                        this.startTimer()
                    }
                    else if(this.tracks.length == 0){                       
                        this.stage = 'podium' // stage2
                        // *****解除音频锁
                    }
                }
                else this.count += 1
                
            }, 1000);
        },  
        go(e){      
            // curtain ==go()>> crossfade(slide) => result(podium)
            this.loading = true
            
            this.tracks = this.$store.getters['track/getTop3Tracks'] 
            if(e == 'podium'){
                this.loading = false
                this.showCurtain = false
                this.stage = 'podium' // 直接进入阶段2
            }
            else if(e == 'crossfade'){
                
                this.total = 6 // 音频、图片资源总数
                this.loaded = 0


                let timeoutDuration = 8000 //ms
                // 预下载资源
                this.tracks.forEach(track => {
                    let audio = new Audio()      
                    let image = new Image()                
                    let audioTimeout 
                    let imgTimeout

                    audioTimeout = setTimeout(()=>{
                        audio.onerror()
                    },timeoutDuration)
                    audio.oncanplaythrough = ()=>{                     
                        track['audioOk'] = true
                        track['audioObj'] = audio
                        this.loaded++  
                        console.log(track.title, '音频ok')
                        clearTimeout(audioTimeout)
                    }
                    audio.onerror = ()=>{
                        track['audioOk'] = false
                        track['audioObj'] = {}
                        this.loaded++        
                        console.log(track.title, '音频fail')
                        clearTimeout(audioTimeout)
                    }
                    audio.src = track.audio_url

                    imgTimeout = setTimeout(()=>{
                        image.onerror()
                    },timeoutDuration)
                    image.onload = ()=>{
                        track['imgOk'] = true
                        this.loaded++   
                        console.log(track.title, '图片ok')
                        clearTimeout(imgTimeout)
                    }               
                    image.onerror = ()=>{
                        track['imgOk'] = false
                        this.loaded++
                          console.log(track.title, '图片fail')
                          clearTimeout(imgTimeout)
                    }
                    image.src = track.img_url
                });           
            }
        },
        delaySec(sec){
          return new Promise(resolve =>{
            setTimeout(resolve, sec*1000);
          })
        }
        
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
    from{opacity: 1;}
    to{opacity: 0;}
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


.rank__result path:nth-child(1){    
    transition: .3s;
    fill: transparent;
}
.rank__result:hover path:nth-child(1){
    fill: #fff;

}
.rank__play path:nth-child(2), .rank__play path:nth-child(1){    
    transition: .3s;
    fill: transparent;
}
.rank__play:hover path:nth-child(2), .rank__play:hover path:nth-child(1){
    fill: #fff;
}   


/* 加载进度条 */
.loading__progress{
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 1%;
    height: 1%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    border-radius: 4px;
    transition: .3s linear;
    background: #fff;
    animation: breathe 3s infinite ease-in-out;
}
@keyframes breathe {
    from{opacity: 0.9;}
    50%{opacity: 0.3;}
    to{opacity: 0.9;}
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
.slide__container{
    height: inherit;
    width: inherit;
    overflow: auto;
    background: #000;
}
.slide{
    position: absolute;
    height: inherit;
    width: inherit;
    background-size: 100%;
    background-repeat: no-repeat;
    animation: closeup 80s infinite;
}
@keyframes closeup {
    from{background-position: top;}
    
    to{background-position: bottom;}
}

.slide__cloak{
    position: absolute;
    height: inherit;
    width: inherit;
    background: #000;
    transition: 2s;
    z-index: 3;
    
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
    z-index: 2;
}
/* 试听时间条 */
.carousel__progress{
    position: absolute;
    width: 0;
    height: 1%;
    background: #ff5500;
    bottom: 0;
    transition: 1s linear;
    z-index: 2;
}

/* 缺文件时展示 */
.error__fill{
    width: inherit;
    height: inherit;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
    justify-content: center;
    background-image: linear-gradient(to bottom, transparent, #000);
    cursor: pointer;
}
.album__poster{
    width: 30%;
    height: 0;
    padding-top: 30%;
    background-size: cover;
    border: 20px solid white;
}
.track__info{
    color: #fff;
    font-weight: bold;
    max-width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 3%;
    user-select: none;
    
}
.track__info div{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}



/* 排行结果 */
.podium__{
    width: inherit;
    height: inherit;
}
.podium__cloak{
    width: inherit;
    height: inherit;
    background: #000;
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