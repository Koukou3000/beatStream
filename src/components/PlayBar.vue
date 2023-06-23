<template>
  <div class="player">
    <div class="element__container">

      <!-- 播放操作按钮 -->
      <button class="icon" @click="stepPrev">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#333" d="M7 6h2v12H7V6zm2 6l8 6V6l-8 6z"/></svg>
      </button>
      <button class="icon" @click="playTrack" v-if="paused">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#333" d="M8 5v14l11-7z"/></svg>
      </button>
      <button class="icon" @click="pauseTrack" v-else>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#333" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
      </button>
      <button class="icon" @click="stepNext">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#333" d="M7 18l8-6-8-6v12zm8-12v12h2V6h-2z"/></svg>
      </button>
      <button class="icon" @click="loopCurrentTrack" style="  margin-left: 20px; margin-right: 40px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#333" d="M12 8H9a4 4 0 1 0 0 8h6a4 4 0 0 0 2.104-7.403l1.77-1.18.02.018A6 6 0 0 1 15 18H9A6 6 0 1 1 9 6h3V4l4 3-4 3V8z"/></svg>
      </button>
      
   
      <!-- AUDIOTIME - 进度条 -->
      <div class="progressBar__container">
        <div class="progress__current">{{currentTimeSeconds | seconds2Format}}</div>
        <div class="progress__judge" ref="progress__judge" @mousedown="chAudioTime"
          @mouseover="chAudioTime" @mouseout="finAudioTime">
           <!-- 
              播放进度条 - 松手时反馈
              1. 按下开始记录移动，每次移动反馈位置和时间，监听x轴移动 v
              2. 实时反馈移动到的时间点
              3. 松手时将audio调整到对应时间点 再play 
          -->
          <div class="timeline__bar" v-if="audio" :style="{width: progressPercent+'%'}">
            <transition name="dotFade">
              <div class="timeline__dot" v-show="onProgressBar">
                 <div class="timeline__target" v-show="changingTime">{{jumpToSeconds | seconds2Format}}</div>
              </div>
            </transition>
          </div>
          <div class="timeline__background"></div>
        </div>
        <div class="progress__end">
          <div v-if="timeType" @click="timeType=!timeType">{{durationSeconds | seconds2Format}}</div>
          <div v-else          @click="timeType=!timeType">-{{durationSeconds-currentTimeSeconds | seconds2Format}}</div>
        </div>
      </div>

      <!-- VOLUME - 喇叭光标 -->
      <div class="volume__judge" @click="toggleMuted" @mouseover="chVolume" @mouseout="finVolume" >
        <button class="icon playlist__pos" v-show="!muted">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#333" d="M4 9h4.002L12 5v14c-2.446-2.667-3.778-4-3.998-4H4V9zm10 4a1 1 0 0 0 0-2V9a3 3 0 0 1 0 6v-2zm0 4a5 5 0 0 0 0-10V5a7 7 0 0 1 0 14v-2z"/></svg>
        </button>
        <button class="icon playlist__pos" v-show="muted">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#333" d="M18 10.584l-2.293-2.291-1.414 1.414 2.293 2.291-2.291 2.291 1.414 1.415 2.292-2.292 2.294 2.292 1.414-1.415-2.293-2.291 2.291-2.29-1.414-1.415-2.292 2.291zM4 9h4.002L12 5v14c-2.446-2.667-3.778-4-3.998-4H4V9z"/></svg>
        </button>
      </div>
      <!-- VOLUME - 音量进度条 - 立即定位=> 随后出现进度条和动画 -->
      <div class="volume__pos" v-show="openVolumeJudgeArea"
        @mouseover="chVolume" @mouseout="finVolume" @mousedown="chVolume">
        <!-- 
          音量进度条 - 直接反馈 
          1. 按下触发第一次事件监听，之后每次移动都调用事件监听 v
          2. 将y轴移动直接反馈给volumePercent v
          3. 抬起左键，结束事件监听 v
         -->
        <transition name="transVolume">
          <div class="volume__content" v-show="showVolumeBar">
            <div class="volume__groove" ref="volume__groove">
              <div class="volume__level" :style="{height: volumePercent+'%'}">
                <div class="volume__dot"></div>
              </div>
            </div>    
          </div>
        </transition>
      </div>

      <!-- 歌曲信息   -->
      <div class="track__container">

        <div class="ctrl__left">
          <div class="poster__image"></div>
          <div>
            <div class="artist">yomoha</div>
            <div class="track__title">collapse-as-snowslide</div>
          </div>
        </div>
        <div class="ctrl__right">
          <div class="icon" v-show="!showPlaylist" @click="showPlaylist=true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#333" class="playbackSoundBadge__queueIcon" d="M6 11h12v2H6zM6 7h8v2H6zM6 15h12v2H6zM16 3v6l4-3z"></path></svg>
          </div>
          <div class="icon" v-show="showPlaylist" @click="showPlaylist=false">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#ff5500" class="playbackSoundBadge__queueIcon" d="M6 11h12v2H6zM6 7h8v2H6zM6 15h12v2H6zM16 3v6l4-3z"></path></svg>
          </div>
        </div>
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
        <div>高度实时计算 整个screenY - bar - 50px </div>
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
      timeType: false,          // 结束时间样式  （总时长 | 剩余时长）
      onProgressBar: false,     // 光标在时间轴上
      progressBarTimer: null,
      currentTimeSeconds: '0',  // 当前时间
      durationSeconds: '74',    // 结束时间
      changingTime: false,      // 调节进度条，控制动画效果正常进行
      jumpToSeconds: '514',     // 跳转到...

      // --- 音量
      volumeBarTimer: null,       // 控制判定区与音量条动画的定时器
      openVolumeJudgeArea: false, // 计算音量控制条判定区
      showVolumeBar: false,       // 显示音量进度条
      volume: 0.3,                // 记录静音前的音量
      volumePercent: 30,          // 在playtrack()和updateProgressBar()中都更新到audio.volume上，同步视觉和听觉
      changingVolume: false,      // 调节进度条，控制动画效果正常进行

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
  watch:{
    currentTimeSeconds(now){
      this.$bus.$emit('trackProgress', now, this.durationSeconds) // 更新就传输时间 
    }
  },
  methods:{
    updateProgressBar(){
      //更新播放状态（进度条、音量等
      if(this.audio){ 

        if(!this.changingTime) // 拖动进度条时不实时刷新进度条
          this.currentTimeSeconds =  this.audio.currentTime
        this.durationSeconds = this.audio.duration
        this.audio.volume = this.volumePercent/100 // 播放过程中实时调整音量
        if(this.audio.currentTime == this.audio.duration){
          this.pauseTrack()
          this.stepNext()
        }
      }

    },
    playTrack(){
      this.paused=false
      if(!this.audio){
        console.log('新建一次')
        this.audio = new Audio('http://47.115.222.108/music/collapse-as-snowslide.mp3')
        this.audio.addEventListener('timeupdate', this.updateProgressBar)
      }
      this.audio.volume = this.volumePercent/100 // 初次播放时调整音量
      this.audio.play() 
    },
    pauseTrack(){
      this.paused=true
      this.audio.pause()    
    },
    
    stepPrev(){
      console.log('开始播放上一首')
    },
    stepNext(){
      console.log('开始播放下一首')
      console.log('读取下一首歌曲 替换audio')
      console.log('playTrack')
    },
    loopCurrentTrack(){
      console.log('循环当前曲目')
    },
    
    toggleMuted(){
      this.muted = !this.muted
      this.muted ? this.volumePercent= 0 : this.volumePercent=this.volume*100 // 即使没有音乐载入，音量条也要可以调整z
      if(this.audio){
        if(this.muted){
          this.audio.volume = 0
        }
        else{
          this.audio.volume = this.volume
        }
      }
    },
    chVolume(e){
      // 保证音量条不会隐藏
      clearTimeout(this.volumeBarTimer) 
      this.openVolumeJudgeArea = true
      this.showVolumeBar = true
      // 按下时开始调节音量
      if(e.type == 'mousedown'){ 
        this.changingVolume = true
        this.volumeControlCalc(e)
        addEventListener('mousemove', this.volumeControlCalc)
        addEventListener('mouseup', this.volumeControlUp)
      }
    },
    volumeControlCalc(e){
      this.muted = false
      let a = e.clientY - this.$refs.volume__groove.getBoundingClientRect().top - this.$refs.volume__groove.getBoundingClientRect().height
      // *取模
      if(a < 0 && a >-100){
        a = -a  
      } 
      else if(a <= -100){
        a = 100
      } 
      else if(a > 0){
        a = 0
        this.muted = true 
      } 
      this.volumePercent = a
      this.volume = this.volumePercent/100 //percent audio.volume 同时为零时，仍然可以复原音量 (volume ~ tmp)
    },
    volumeControlUp(e){
      // 鼠标抬起，去掉监听器，隐藏音量条
      this.changingVolume = false
      removeEventListener('mousemove',this.volumeControlCalc)
      this.finVolume(e) 
    },
    finVolume(e){
      if(this.changingVolume) return 
      else if(e.type == 'mouseup' && e.target.className.substring(0,6) == 'volume') // 鼠标单击音量条，不隐藏
        return       
      // 移开后开始计时，随后隐藏
      else if(this.showVolumeBar){
        this.volumeBarTimer = setTimeout(() => {
          this.showVolumeBar = false
          setTimeout(() => {
            this.openVolumeJudgeArea = false
            removeEventListener('mouseup', this.volumeControlUp)
          }, 100); // 先启动关闭动画，延迟后关闭定位区（延迟时间与动画时间相同
        }, 0);
      }
    }, 
    chAudioTime(e){
      clearInterval(this.progressBarTimer) // 进度条的点
      this.onProgressBar=true
      if(!this.audio) return // 没有音乐载入 控制进度条非法
      else if(e.type == 'mousedown'){
        this.changingTime = true
        this.progressBarMoveDisplay(e)
        addEventListener('mousemove',this.progressBarMoveDisplay)
        addEventListener('mouseup',this.progressBarUp)
      }
    },
    progressBarMoveDisplay(e){
      // 移动时的效果显示
      let groove = this.$refs.progress__judge.getBoundingClientRect().width
      let dot = e.clientX - this.$refs.progress__judge.getBoundingClientRect().left 
      if(dot<=0) 
        dot = 0
      else if(dot > groove) 
        dot = groove
      let percent = dot/groove
      this.currentTimeSeconds = percent*this.durationSeconds
      this.jumpToSeconds = Math.floor(percent * this.durationSeconds)
    },
    progressBarUp(e){
      this.changingTime = false
      removeEventListener('mousemove', this.progressBarMoveDisplay)
      this.progressBarMoveDisplay(e)
      this.audio.currentTime = this.currentTimeSeconds
      this.finAudioTime(e)
    },
    finAudioTime(e){
      if(this.changingTime) return
      else if(e.type == 'mouseup'){
        // 鼠标单击进度条，不隐藏
        if(e.target.className.substring(0,8) == 'progress' 
        || e.target.className.substring(0,8) == 'timeline')
          return
      }    
      //移开后开始计时并隐藏
      this.progressBarTimer = setTimeout(() => {
        this.onProgressBar = false
        removeEventListener('mouseup',this.progressBarUp)
      },100)
    }
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



/* 进度条相关 */
.progressBar__container{
  height: 100%;
  display: flex;
    flex-shrink: 0;
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
.timeline__target{
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 4px;
  border-radius: 4px;
  color: #f2f2f2;
  border: #e3e3e3;
  background: #333;
  font-size: 16px;
  font-weight: bold;
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
    flex-shrink: 0;
  align-items: center;
  transform: translateX(-9px);
  cursor: pointer;
}


/* 音量条显示定位 */
.volume__pos{
  position: absolute;
  width: 32px;
  height: 125px;
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
  transform: translateX(-50%) translateY(-4px);
}



/* 播放列表 */
.track__container{
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
}
.ctrl__left{
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 280px;
}
.artist:hover{
  color: #111;
}
.track__title{
  margin-left: 10px;
  color: #666;
  cursor: pointer;
  width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.track__title:hover{
  color: #111;
}
.ctrl__right{
  position: absolute;
   right: 0;
}
.playlist__pos{
  position: absolute;
  right: 0;

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