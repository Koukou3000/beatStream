<template>
  <div class="page__bg">
    
    <div class="rank__container">
        <!-- 预告幕布 -->
        <transition name="curtain">            
            <div class="rank__curtain" v-show="showCurtain" >
                <span>最热门</span>
                <span>TOP 3</span>
            
                <!-- 选择 - 结果 -->
                <div class="rank__result" @click.once="go('podium')" title="直接查看结果" v-if="!isSelected">
                   <svg t="1687113755128" class="icon" viewBox="0 0 1239 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5322" xmlns:xlink="http://www.w3.org/1999/xlink" width="241.9921875" height="200">
                        <path d="M592.276211 217.411368V52.978526l-19.429053 4.769685c-2.883368 0.673684-6.817684 1.347368-9.701053 1.347368-12.961684 0-24.117895-10.186105-24.117894-22.420211 0-10.536421 7.194947-19.348211 18.351157-22.42021l35.624421-9.862737c10.428632-2.721684 18.351158-4.392421 25.896422-4.392421h0.727578c15.090526 0 27.324632 11.533474 27.324632 25.815579v191.595789c0 14.255158-12.234105 25.815579-27.324632 25.815579-15.117474 0-27.351579-11.560421-27.351578-25.815579zM1239.578947 754.903579v215.578947a26.947368 26.947368 0 0 1-26.947368 26.947369H26.947368a26.947368 26.947368 0 0 1-26.947368-26.947369v-377.263158c0-44.570947 36.271158-80.842105 80.842105-80.842105h296.421053v-80.842105c0-44.570947 36.271158-80.842105 80.842105-80.842105h323.368421c44.597895 0 80.842105 36.271158 80.842105 80.842105v242.526316h296.421053c44.597895 0 80.842105 36.271158 80.842105 80.842105z m-53.894736 0a26.947368 26.947368 0 0 0-26.947369-26.947368H835.368421a26.947368 26.947368 0 0 1-26.947368-26.947369v-269.473684a26.947368 26.947368 0 0 0-26.947369-26.947369H458.105263c-14.848 0-26.947368 12.072421-26.947368 26.947369v107.789474a26.947368 26.947368 0 0 1-26.947369 26.947368H80.842105c-14.848 0-26.947368 12.072421-26.947368 26.947368v350.31579h1131.789474v-188.631579z" 
                        fill="none" p-id="5323" stroke="#fff" stroke-width="10"></path>
                    </svg>                  
                </div>
                <!-- 选择 - 试听 -->
                <div class="rank__play" @click.once="go('crossfade')" title="试听内容" v-if="!isSelected">
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
        <!-- 试听 -->
        <div class="slide__container" v-if="stage=='crossfade'">
            <div class="speaker__icon" @click="muted=!muted" v-show="muted" >
                <svg t="1687059934913" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3697" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
                    <path d="M266.417804 400.877059l189.369133-150.280807v522.816527L266.417804 623.122941H92.161282V400.877059H266.417804zM51.208941 324.080355c-19.801549 0-35.842556 16.041007-35.842556 35.842556v304.159596c0 19.790712 16.041007 35.844362 35.842556 35.844362h188.44435c78.275995 62.115778 156.550183 124.231556 234.822566 186.359977 23.48623 18.632927 58.118621 1.907364 58.118621-28.075826V165.796204c0-29.992221-34.632391-46.71959-58.118621-28.074019-78.272382 62.115778-156.546571 124.242393-234.822566 186.35817H51.208941zM596.926483 330.382244c-13.59539-16.264978-11.433349-40.491756 4.831629-54.090759 16.279427-13.597196 40.493563-11.433349 54.090758 4.844272 47.637148 56.993348 95.279715 113.988503 142.916863 170.992689 47.638954-57.004186 95.279715-113.99934 142.929507-170.992689 13.59539-16.277621 37.813138-18.441468 54.079921-4.844272 16.274009 13.597196 18.437856 37.823975 4.842466 54.090759-50.597537 60.542563-101.20591 121.083321-151.801641 181.624078 50.59573 60.540757 101.204104 121.079708 151.801641 181.611434 13.59539 16.277621 11.431543 40.493563-4.842466 54.090759-16.26859 13.608033-40.484532 11.44238-54.079921-4.835241-47.649792-56.993348-95.290552-113.997534-142.929507-170.990883l-142.916863 170.990883c-13.597196 16.277621-37.813138 18.443274-54.090758 4.835241-16.264978-13.597196-18.427018-37.814944-4.831629-54.090759 50.599343-60.531726 101.191461-121.070677 151.799835-181.611434-50.606568-60.542563-101.200492-121.083321-151.799835-181.624078z" 
                    fill="#fff" p-id="3698" ></path>
                </svg>
            </div>
            <div class="speaker__icon" @click="muted=!muted" v-show="!muted"> 
                <svg t="1687059909535" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2967" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">                
                    <path d="M701.78095 343.629034c-10.378519-21.239297-37.17735-28.335921-56.709772-15.025913-19.534229 13.31362-22.731232 40.847581-6.766086 58.279374 49.241068 76.142853 49.241068 174.092156 0 250.236816-15.965146 17.431793-12.768143 44.96756 6.766086 58.279374 19.532423 13.311814 46.331254 6.211578 56.709772-15.022301M888.624993 858.76011c161.822529-202.863375 161.822529-490.660458 0-693.518414-12.538753-18.529973-38.181606-22.503649-55.743447-8.637326-17.560035 13.86271-19.648021 39.725921-4.535409 56.225706 137.182126 175.856829 137.182126 422.483018 0 598.34346-15.112612 16.499786-13.024626 42.362997 4.535409 56.2239 17.563647 13.86271 43.204693 9.889034 55.743447-8.637326zM239.651485 324.076743c78.274189-62.115778 156.544765-124.23878 234.818953-186.356364 23.488036-18.643764 58.118621-1.912783 58.118621 28.074019v692.41301c0 29.988609-34.630585 46.712365-58.118621 28.072213L239.651485 699.921451H51.201716c-19.794324 0-35.838943-16.046425-35.838943-35.84075V359.919299c0-19.792518 16.044619-35.84075 35.838943-35.84075l188.449769-0.001806z m-147.488396 76.800316v222.245882h174.26194l189.367327 150.284419V250.590834l-189.367327 150.288031H92.163089zM695.538667 689.537513c75.32825-106.375301 75.32825-248.701532 0-355.075026" 
                    fill="#fff" p-id="3698" ></path>                  
                </svg>
            </div>   
            <div class="rank__number__pos">
                <div class="rank__number__container">
                    <transition name="ranking">
                        <div class="rank__number" v-show="showNumber">{{tracks.length+1 | twoDigits}}</div>
                    </transition>
                </div>
            </div>
         
            <div class="slide__cloak" ref="slideCloak" :style="{opacity: opacity}" @click="pushRoute"></div>
            <div class="carousel__progress" :style="{width: count*5+'%'}" v-show="timer"></div>
            <div class="slide" :style="{'background-image': 'url('+slideBackground+')'}"></div>
            
           
            <div class="error__fill">
                <div class="track__info">
                    <div style="font-size:90px">{{trackTitle}}</div>
                    <div style="font-size:30px">{{trackArtist}}</div>
                </div>
            </div> 
            
        </div>
        <!-- 结果 -->
        <transition name="rankStep">
            <div class="podium__" v-show="stage=='podium'">                
                <div class="stepping__stone">
                    <div class="poster" style="background-image: linear-gradient(135deg,#846170,#e6846e)" ref="rank2" @click="pushRoute(2)"></div>
                    <div class="rank2">
                        <div class="placeholder__crown">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 396.45 289.09"><defs></defs>
                                <path d="M86.63,289.09a33.89,33.89,0,0,1-32.44-23.75L1.58,99A34,34,0,0,1,52.31,60.11L114.81,100l55.83-84.7a34,34,0,0,1,57.09.43l53.78,84.35,62.63-40a34,34,0,0,1,50.73,38.94L342.25,265.34a33.88,33.88,0,0,1-32.43,23.75Z"/>
                                <path fill="#c8c8c8" d="M359.39,84l-81.76,52.18a5.67,5.67,0,0,1-7.83-1.73L203.83,31a5.67,5.67,0,0,0-9.52-.07L126.18,134.26a5.67,5.67,0,0,1-7.78,1.66L37.06,84a5.67,5.67,0,0,0-8.45,6.49l52.61,166.3a5.67,5.67,0,0,0,5.41,4H309.82a5.68,5.68,0,0,0,5.41-4l52.61-166.3A5.67,5.67,0,0,0,359.39,84Z"/>
                                <path d="M235.07,236.84H161.38l-1.57-1.57V218l1.57-3.14,28.22-23.51c18.82-15.68,22-22,22-31.36s-4.7-15.68-14.11-15.68c-12.54,0-15.68,6.27-15.68,15.68l-1.57,1.56H161.38L159.81,160c0-17.25,9.41-34.5,37.63-34.5,23.52,0,36.07,15.68,36.07,32.93s-7.84,26.65-26.66,42.33L188,216.45V218h47l1.57,1.57v15.68Z"/> 
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="stepping__stone">
                    <div class="poster" style="background-image: linear-gradient(135deg,#e6846e,#70929c)" ref="rank1" @click="pushRoute(1)"></div>
                    <div class="rank1">
                        <div class="placeholder__crown">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 396.45 289.09"><defs></defs> 
                                <path d="M86.63,289.09a33.89,33.89,0,0,1-32.44-23.75L1.58,99A34,34,0,0,1,52.31,60.11L114.81,100l55.83-84.7a34,34,0,0,1,57.09.43l53.78,84.35,62.63-40A34,34,0,0,1,394.87,99l-52.62,166.3a33.87,33.87,0,0,1-32.43,23.75Z"/>
                                <path fill="#c3960a" d="M359.39,84l-81.76,52.18a5.67,5.67,0,0,1-7.83-1.73L203.83,31a5.67,5.67,0,0,0-9.52-.07L126.18,134.26a5.67,5.67,0,0,1-7.78,1.66L37.06,84a5.67,5.67,0,0,0-8.45,6.49l52.61,166.3a5.67,5.67,0,0,0,5.41,4H309.82a5.68,5.68,0,0,0,5.41-4l52.61-166.3A5.67,5.67,0,0,0,359.39,84Z"/>
                                <path d="M189.41,236.84l-1.57-1.57v-80h-1.57l-12.54,12.55h-7.84l-1.57-1.57V150.6l22-21.95,3.14-1.57h18.82l1.56,1.57V235.27l-1.56,1.57Z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="stepping__stone">
                    <div class="poster" style="background-image: linear-gradient(135deg,#8e8485,#70929c)" ref="rank3" @click="pushRoute(3)"></div>
                    <div class="rank3">
                        <div class="placeholder__crown">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 396.45 289.09"><defs></defs>
                                <path d="M86.63,289.09A33.87,33.87,0,0,1,54.2,265.34L1.58,99A34,34,0,0,1,52.31,60.11L114.81,100l55.83-84.7a34,34,0,0,1,57.09.43l53.78,84.35,62.63-40a34,34,0,0,1,50.73,38.94L342.25,265.34a33.88,33.88,0,0,1-32.43,23.75Z"/>
                                <path fill="#a53c00" d="M359.39,84l-81.76,52.18a5.67,5.67,0,0,1-7.83-1.73L203.82,31a5.66,5.66,0,0,0-9.51-.07L126.18,134.26a5.67,5.67,0,0,1-7.78,1.66L37.06,84a5.67,5.67,0,0,0-8.45,6.49l52.61,166.3a5.67,5.67,0,0,0,5.41,4H309.82a5.68,5.68,0,0,0,5.41-4l52.61-166.3A5.67,5.67,0,0,0,359.39,84Z"/>
                                <path d="M195.87,238.4c-25.08,0-37.63-15.67-37.63-31.36l1.57-1.56h18.82l1.56,1.56c0,6.28,4.71,12.55,15.68,12.55,12.55,0,18.82-7.84,18.82-18.82,0-12.54-6.27-18.81-15.68-18.81-6.27,0-9.41,3.13-9.41,3.13h-7.84l-1.57-1.56V169.41l22-21.95v-1.57H164.51L163,144.33V128.65l1.56-1.57H228.8l1.57,1.57v15.68l-1.57,3.13-20.38,18.82v1.57c14.11,0,28.22,12.54,28.22,32.92S222.53,238.4,195.87,238.4Z"/>
                            </svg>
                        </div>
                    </div>
                    
                </div>
            </div>
        </transition>
    </div>  

    <!-- 懒加载列表 -->
    <div class="l__container">
        <div class="main">
            <div class="left__pos">
                <div class="left__content">
                    <!-- 组件 - slider -->
                    <div class="section">
                        <TrackSlider :length="4" :p="getsth()"/>
                    </div>
                </div>  
            </div>
            <div class="right__pos"></div>
        </div>
    </div>
    <!-- <div>
         <button @click="nextupAffix(1)">添 加 1</button>
        <button @click="nextupAffix(2)">添 加 2</button>
        <button @click="nextupAffix(3)">添 加 3</button>
    </div> -->
  </div>
</template>

<script>
import TrackSlider from '@/components/TrackSlider.vue'
export default {
    components:{TrackSlider},
    data(){
        return{
            stage: '', 
            tracks: [],

            // 幕布
            showCurtain: true,
            isSelected: false,
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
            fadeTimer: null,  //淡入淡出定时器
            showNumber: false, 
            tid: 0,                 // 当前播放曲目


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
            this.tid = t.tid
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
                   
                    this.tracks.length
                    this.showNumber = true
                    
                }
                //淡出
                else if(this.count==18){
                    this.fadeTimer = setInterval(() => {
                        this.opacity += 0.1
                        this.volume -= 0.1
                    }, 100);
                    this.showNumber = false
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
                        this.go('podium')
                        // *****解除音频锁
                    }
                }
                else this.count += 1
                
            }, 1000);
        },  
        go(e){       
            this.isSelected = true
            // curtain ==go()>> crossfade(slide) => result(podium)
            this.tracks = this.$store.getters['track/getTop3Tracks']()
           
            if(e == 'podium'){
                this.showCurtain = false
                this.stage = 'podium' //阶段2
                // 编辑排行榜的内容
                this.$refs.rank1.style.backgroundImage = `url(${this.tracks[0].img_url})`
                this.$refs.rank1.innerHTML = this.tracks[0].title + ' - ' + this.tracks[0].artist
                this.$refs.rank2.style.backgroundImage = `url(${this.tracks[1].img_url})`
                this.$refs.rank2.innerHTML = this.tracks[1].title + ' - ' + this.tracks[1].artist
                this.$refs.rank3.style.backgroundImage = `url(${this.tracks[2].img_url})`
                this.$refs.rank3.innerHTML = this.tracks[2].title + ' - ' + this.tracks[2].artist  
            }
            else if(e == 'crossfade'){
                this.loading = true
                this.total = 6 // 音频、图片资源总数
                this.loaded = 0

                let timeoutDuration = 10000 //ms
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
                        clearTimeout(audioTimeout)
                    }
                    audio.onerror = ()=>{
                        track['audioOk'] = false
                        track['audioObj'] = {}
                        this.loaded++        
                        clearTimeout(audioTimeout)
                    }
                    audio.src = track.audio_url

                    imgTimeout = setTimeout(()=>{
                        image.onerror()
                    },timeoutDuration)
                    image.onload = ()=>{
                        track['imgOk'] = true
                        this.loaded++            
                        clearTimeout(imgTimeout)
                    }               
                    image.onerror = ()=>{
                        track['imgOk'] = false
                        this.loaded++
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
        },  
        pushRoute(e){      
            switch(e){
                case 1: this.tid = this.tracks[0].tid; break;
                case 2: this.tid = this.tracks[1].tid; break;
                case 3: this.tid = this.tracks[2].tid; break;
                default:break;
            }
            this.$router.push({name:'trackDetail', params:{tid: this.tid}})
        },
        nextupAffix(tid){
            let t = this.$store.getters['track/getTrackDetail'](tid)
            this.$bus.$emit('nextupAffix', t)
        },

        getsth(){
            console.log('getsth()')
            return this.$store.getters['track/getAllTracks']()
        }
    },
    filters:{
        twoDigits(number){
            if(number<10)
                return '0'+number 
            return number
        }
    },
    beforeCreate(){
        document.title = this.$route.meta.title
    },
    beforeDestroy(){
        // 关闭这个页面时停掉页面的音乐，后续可考虑和detail playbar传参
        if(this.audio){
            this.audio.pause()
            this.audio = null
        }
    },
    mounted(){      

    }
}
</script>
<style scoped>
.page__bg{
    background: #fff;
    overflow: hidden;

}
/* 走马灯 */
.rank__container{
    position: relative;
    width: 1240px;
    height: 420px;
    overflow: hidden;
    border-bottom: 1px solid #f2f2f2;
}
/* 幕布，内容预告 */
.rank__curtain{
    position: relative;
    width: 100%;
    height: 100%;
    background: #111;
    display: flex;
    justify-content: center;
    align-items: center;
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
/* 做淡入效果 */
.slide__cloak{
    position: absolute;
    height: inherit;
    width: inherit;
    background: #fff;
    transition: 2s;
    z-index: 3;
    cursor: pointer;
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
    z-index: 4;
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
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
    justify-content: center;
    background-image: linear-gradient(to bottom, transparent, #000);
    cursor: pointer;
    overflow: hidden;
}
.track__info{
    color: #fff;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.track__info div{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 当前乐曲排行 */
.rank__number__pos{
    position: absolute;
    width: 100px;
    height: 120px;
    left: 1%;
    bottom: 1%;
    filter: drop-shadow(0 0 4px #000);
    z-index: 4;
    user-select: none;
}
.rank__number__pos::after{
    content: 'Ranking No.';
    position: absolute;
    bottom: 10%;
    color: #fff;
    left: 50%;
    white-space: nowrap;
    transform: translateX(-50%);
    font-weight: bold;
    font-family: Georgia,Times New Roman;
}
.rank__number__container{
    position: absolute;
    width: 100px;
    height: 90px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
.rank__number{
    color: #fff;
    font-size: 60px;
    font-weight: bold;
    font-family: Times;
}
@keyframes rankUp {
    from{transform: translateY(100%);}
    to{transform: translateY(0);}
}
.ranking-enter-active{
    animation: rankUp 1s forwards;
}
.ranking-leave-active{
    animation: rankUp reverse 1s forwards;
}

/* 排行结果 */
.rankStep-enter-active{
    animation: fade reverse 2s;
}
.podium__{
    width: inherit;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.stepping__stone{
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    position: relative;
}
.rank2{
    height: 20%;
    width: 100%;
    background: #b3b2b8;
    position: relative;
}
.rank1{
    height: 30%;
    width: 100%;
    background: #e59d25;
    position: relative;
}
.rank3{
    height: 10%;
    width: 100%;
    background: #c7561a;
    position: relative;
}
.poster{
    width: 80%;
    height: 0;
    padding-top: 80%;
    margin-bottom: 10%;
    background-size: cover;
    background-position: 0 0;
    display: flex;
    justify-content: center;
    cursor: pointer;
}
.placeholder__crown{
    position: absolute;
    width: 50px;
    height: 50px;
    top: -285px;
    right: 31px;
}


/* 列表相关 */
.l__container{
    width: 1180px;
    padding: 0 30px;
}
.main{
    width: inherit;
    height: auto;
    position: relative;
}
.left__pos{
    padding: 30px 30px 0 0;
    margin: 0 330px 0 0 ;
    height: 500px;
    border-right: 1px solid #f2f2f2;
}
.right__pos{
    width: 300px;
    background: #eee;
    right: 0;
    bottom: 0;
    top: 30px;
    position: absolute;
}
.left__content{
    overflow: hidden;
    width: 100%;
    background: #eee;
    height: 100%;
}


</style>