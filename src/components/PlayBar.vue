<template>
  <div class="player">
    <div class="element__container">
      <!-- 播放列表操作按钮 -->
      <button class="icon prev__btn" @click="stepPrev"></button>
      <button class="icon play__btn" @click="playTrack" v-if="paused"></button>
      <button class="icon pause__btn" @click="pauseTrack" v-else></button>
      <button class="icon next__btn" @click="stepNext"></button>
      <button class="icon loop__btn" @click="loopCurrentTrack"></button>
      
   
      <!-- 进度条 -->
      <div class="progressBar__container">
        <div class="progress__current">0:26</div>
        <div class="progress__judge" @mouseover="showDot" @mouseout="hideDot">
          <div class="timeline__bar" style="width: 56%;">
            <div class="timeline__dot" v-show="onProgressBar"></div>
          </div>
          <div class="timeline__background"></div>
        </div>
        <div class="progress__end">
          <div v-if="timeType" @click="timeType=!timeType">3:22</div>
          <div v-else          @click="timeType=!timeType">-1:04</div>
        </div>
      </div>

      

      <!-- 音量条 -->
      <div class="volume__judge" @mouseover="chVolume" @mouseout="finVolume" @click="muted=!muted">
        <button class="icon volume__state" v-show="!muted"></button>
        <button class="icon muted__state" v-show="muted"></button>
      </div>
      <div class="volume__pos" @mouseover="chVolume" @mouseout="finVolume">
        <transition name="transVolume">
          <div class="volume__content" v-show="showVolumeBar"></div>
        </transition>
      </div>

      <!-- 歌曲信息&列表入口 -->
      <div class="track__container">
        <div class="poster__image"></div>
        <div>
          <div class="artist">uncalc</div>
          <div class="track__title">samidare</div>
        </div>
        <div class="icon playlist" v-show="!showPlaylist" @click="showPlaylist=true"></div>
        <div class="icon playlist-active" v-show="showPlaylist" @click="showPlaylist=false"></div>
      </div>
      <div class="track__ctrl"></div>
    
    </div>
    
  </div>
</template>

<script>
var volumeBarTimer = null
export default {
  data(){
    return{
      paused: true, 
      muted: false, 
      timeType: false, // 进度条时间样式
      onProgressBar: false, // 光标处于进度条判定区上
      volume: 0.7, 
      showVolumeBar: false, // 显示音量进度条
      showPlaylist: false,
    }
  },
  methods:{
    // 显示音量
    chVolume(){
      clearInterval(volumeBarTimer)
      this.showVolumeBar = true
    },
    // 隐藏音量
    finVolume(){
      if(this.showVolumeBar){
        volumeBarTimer = setTimeout(() => {
          this.showVolumeBar = false
        }, 100);
        
      }
    },
    playTrack(){
      console.log('开始播放音乐')
      this.paused=false
    },
    pauseTrack(){
      console.log('暂停播放音乐')
      this.paused=true
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
    showDot(){
      this.onProgressBar = true
    },
    hideDot(){
      this.onProgressBar = false
    },
    
  
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
  transform: translateY(-50%);
  border-radius: 50%;
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
  width: 33px;
  height: 120px;
  bottom: 42px;
  z-index: 199;
  left: 830px; 
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
</style>