<template>
  <div class="player">
    <div class="element__container">

      <!-- 播放操作按钮 -->
      <button class="icon prev__btn" @click="stepPrev"></button>
      <button class="icon play__btn" @click="playTrack" v-if="paused"></button>
      <button class="icon pause__btn" @click="pauseTrack" v-else></button>
      <button class="icon next__btn" @click="stepNext"></button>
      <button class="icon loop__btn" @click="loopCurrentTrack"></button>
      
   
      <!-- 进度条 -->
      <div class="progressBar__container">
        <div class="progress__current">{{currentTimeSeconds | seconds2Format}}</div>
        <div class="progress__judge" @mouseover="onProgressBar=true" @mouseout="onProgressBar=false">
          <div class="timeline__bar" v-if="audio" :style="{width: progressPercent+'%'}">
            <transition name="dotFade">
              <div class="timeline__dot" v-show="onProgressBar"></div>
            </transition>
          </div>
          <div class="timeline__background"></div>
        </div>
        <div class="progress__end">
          <div v-if="timeType" @click="timeType=!timeType">{{durationSeconds | seconds2Format}}</div>
          <div v-else          @click="timeType=!timeType">-{{durationSeconds-currentTimeSeconds | seconds2Format}}</div>
        </div>
      </div>

      <!-- 喇叭光标 -->
      <div class="volume__judge" @mouseover="chVolume" @mouseout="finVolume" @click="toggleMuted">
        <button class="icon volume__state" v-show="!muted"></button>
        <button class="icon muted__state" v-show="muted"></button>
      </div>
      <!-- 立刻定位=> 随后出现进度条和动画 -->
      <div class="volume__pos" v-show="openvolumeBar" @mouseover="chVolume" @mouseout="finVolume" >
        <!-- 
          1. 点击 触发移动事件监听，监听光标的y轴移动、
          2. 将y轴移动直接反馈给volumePercent
          
         -->
        <transition name="transVolume">
          <div class="volume__content" v-show="showVolumeBar">
            <div class="volume__groove">
              <div class="volume__level" :style="{height: volumePercent+'%'}">
                <div class="volume__dot"></div>
              </div>
            </div>    
          </div>
        </transition>
      </div>

      <!-- 歌曲信息   -->
      <div class="track__container">
        <div class="poster__image"></div>
        <div>
          <div class="artist">yomoha</div>
          <div class="track__title">collapse-as-snowslide</div>
        </div>
        <div class="icon playlist" v-show="!showPlaylist" @click="showPlaylist=true"></div>
        <div class="icon playlist-active" v-show="showPlaylist" @click="showPlaylist=false"></div>
      </div>
      <!-- 列表 -->
      <div class="track__panel" v-show="showPlaylist" @click="showPlaylist=false">
        <div class="panel__top" >
          Next up | clear | close
        </div>
        <div> track 1</div>
        <div> track 1</div>
        <div> track 1</div>
        <div> track 1</div>
      </div>
    
    </div>
    
  </div>
</template>

<script>
export default {
  data(){
    return{
      audio: null,
      paused: true, 
      muted: false, 
      // --- 进度条
      onProgressBar: false, // 光标在时间轴上
      currentTimeSeconds: '0', // 当前时间
      durationSeconds: '114', // 结束时间
      timeType: false, // 结束时间样式  （总时长 | 剩余时长）

      // --- 音量
      volumeBarTimer: null, // 控制判定区与音量条动画的定时器
      openvolumeBar: false, // 计算音量控制条判定区
      showVolumeBar: false, // 显示音量进度条
      volume: 0.3,          // 记录静音前的音量
      volumePercent: 30,    // 在playtrack和updateProgressBar中都更新到audio.volume上，同步视觉和听觉
      volumeDragTimer: null, 
      // --- 列表
      openPlaylist: false, // 计算播放列表定位
      showPlaylist: false, // 显示播放列表
      playlist: []
    }
  },
  computed:{
    progressPercent(){
      return this.currentTimeSeconds*100 / this.durationSeconds
    }
  },
  methods:{
    updateProgressBar(){
      if(this.audio){
        this.currentTimeSeconds =  this.audio.currentTime
        this.durationSeconds = this.audio.duration
        // this.audio.volume = this.volumePercent/100
      }
    },
    playTrack(){
      this.paused=false
      // this.audio.volume = this.volume
      if(!this.audio){
        this.audio = new Audio('http://47.115.222.108/music/collapse-as-snowslide.mp3')
        this.audio.addEventListener('timeupdate',this.updateProgressBar)
      }
      this.audio.volume = this.volumePercent/100
      this.audio.play() 
    },
    pauseTrack(){
      this.paused=true
      this.audio.pause()    
    },
    toggleMuted(){
      this.muted = !this.muted
      if(this.audio){

        if(this.muted){
          this.audio.volume = 0
          this.volumePercent = 0
        }
        else{
          this.audio.volume = this.volume
          this.volumePercent = this.volume*100
        }
      }


      
    },
    dragVolume(){
      this.volumeDragTimer = setInterval(() => {
        console.log('鼠标按下')
      }, 100);
    },
    stepPrev(){
      console.log('开始播放上一首')
    },
    stepNext(){
      console.log('开始播放下一首')
    },
    loopCurrentTrack(){
      console.log('循环当前曲目')
    },
    
    // 显示音量条
    chVolume(){
      clearInterval(this.volumeBarTimer)
      this.openvolumeBar = true
      this.showVolumeBar = true
    },
    // 隐藏音量条
    finVolume(){
      if(this.showVolumeBar){
        this.volumeBarTimer = setTimeout(() => {
          this.showVolumeBar = false
          setTimeout(() => {
            this.openvolumeBar = false
          }, 100); // 延迟时间与动画时间相同
        }, 0);
      }
    }, 
  },
  filters:{
    seconds2Format(sec){
      if (sec>0){
        let minutes = Math.floor(sec/60)
        let seconds = Math.floor(sec%60)
        if(seconds<10)
          seconds='0'+seconds
        return minutes + ":" + seconds
      }
      return '0:00'
    }
  }
}
</script>

<style scoped>
body{
  font: 12px/1.4 Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
  color: #333;
}
.player{
  user-select: none;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 49px;
  border-top: 1px solid #e3e3e3;
  background: #f2f2f2;
  display: flex;
  justify-content: center;
}
.element__container{
  width: 1240px;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
}

/* 操作图标 换成src*/
.icon{
  display: block;
  width: 24px;
  height: 24px;
  border: 0;
  cursor: pointer;
  margin:  0 7px;
}
button:focus{
  outline: none;
}
.pause__btn{
  background: url(../assets/playbar/pause.svg) 0 0 no-repeat;
  background-size: cover;
}
.play__btn{
  background: url(../assets/playbar/play.svg) 0 0 no-repeat;
  background-size: cover;
}
.prev__btn{
  background: url(../assets/playbar/pre.svg) 0 0 no-repeat;
  background-size: cover;
}
.next__btn{
  background: url(../assets/playbar/next.svg) 0 0 no-repeat;
  background-size: cover;
}
.loop__btn{
  background: url(../assets/playbar/repeat.svg) 0 0 no-repeat;
  background-size: cover;
  margin-left: 20px;
  margin-right: 40px;
}

/* 进度条相关 */
.progressBar__container{
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 20px;
}
/* 进度条操作判定区 */
.progress__judge{
  position: relative;
  width: 512px;
  height: 1px;
  margin: 0 10px;
  padding: 10px 0 30px 0;
  cursor: pointer;
}
/* 进度条背景 */
.timeline__background{
  position: absolute;
  width: 100%;
  height: 1px;
  background: rgb(204, 204, 204);
  transform: translateY(10px);
}
/* 进度条 */
.timeline__bar{
  position: absolute;

  height: 1px;
  background: #ff5500;
  transform: translateY(10px);
  z-index: 3;
}
.timeline__dot{
  position: absolute;
  right: 0;
  width: 8px;
  height: 8px;
  background: #ff5500;
  z-index: 99;
  transform: translate(4px, -50%);
  border-radius: 50%;
}
@keyframes fade{
  from{opacity: 0;}
  to{opacity: 1;}
}
.dotFade-enter-active{
  animation: fade .2s ;
}
.dotFade-leave-active{
  animation: fade reverse .2s;
}
.progress__current{
  color: #ff5500;
}
.progress__end{
  width: 35px;
  cursor: pointer;
}
/* 音量控制判定 */
.volume__judge{
  margin: 0 15px;
  padding: 0 5px;
  width: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.volume__state{
  position: absolute;
  background: url(../assets/playbar/volume.svg) 0 0 no-repeat;
  background-size: cover;
}
.muted__state{
  position: absolute;
  background: url(../assets/playbar/volume-muted.svg) 0 0 no-repeat;
  background-size: cover;
}

/* 音量条显示定位 */
.volume__pos{
  position: absolute;
  width: 32px;
  height: 120px;
  bottom: 42px;
  z-index: 199;
  left: 830px; 
  cursor: pointer;
}
/* 音量条阴影 */
.volume__content{
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  bottom: 0;
  background: #f2f2f2;
  box-shadow: 0 0 3px 1px #ccc;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
} 
.volume__content::after{
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  bottom: 0;
  left: 50%;
  background: #f2f2f2;
  transform: translate(-50%,5px) rotate(45deg);
  box-shadow: 0 2px 3px 1px #ccc;
  z-index: 1;
}
.volume__content::before{
  content: '';
  position: absolute;
  background: rgb(242, 242,242);
  width: 100%;
  height: 100%;
  z-index: 2;
}
@keyframes fill__up{
  from{height: 0%;}
  to{height: 100%;}
}
.transVolume-enter-active{
  animation: fill__up .1s ease-out;
}
.transVolume-leave-active{
  animation: fill__up reverse .1s ease-out;
}
/* 音量条滑槽 */
.volume__groove{
  position: relative;
  width: 2px;
  height: 80%;
  background: #ccc;
  z-index: 2;
}
.volume__level{
  position: absolute;
  width: 2px;
  background: #ff5500;;
  bottom: 0;
  z-index: 3;
  height: 30%;
}
.volume__dot{
  position: absolute;
  width: 8px;
  height: 8px;
  background: #ff5500;
  border-radius: 50%;
  left: 50%;
  transform: translateX(-50%);
}



/* 播放列表 */
.track__container{
  display: flex;
  align-items: center;
}
.poster__image{
  display: block;
  width: 30px;
  height: 30px;
  background: rebeccapurple;
}
.artist{
  margin-left: 10px;
  color: #999;
  cursor: pointer;
}
.artist:hover{
  color: #111;
}
.track__title{
  margin-left: 10px;
  color: #666;
  cursor: pointer;
}
.track__title:hover{
  color: #111;
}
.playlist{
  position: absolute;
  right: 0;
  width: 24px;
  height: 24px;
  background: url(../assets/playbar/playlist.svg) 0 0 no-repeat;
  background-size: cover;
}
.playlist-active{
  position: absolute;
  right: 0;
  width: 24px;
  height: 24px;
  background: url(../assets/playbar/playlist-active.svg) 0 0 no-repeat;
  background-size: cover;
}
/* 列表操作面板 */
.track__panel{
  width: 480px;
  height: 650px;
  background: #fff;
  box-shadow: 0 0 4px 1px #ccc;
  position: absolute;
  bottom: 55px;
  right: 0;
}


</style>