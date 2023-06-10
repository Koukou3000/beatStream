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
          <span v-if="timeType" @click="timeType=!timeType">3:22</span>
          <span v-else @click="timeType=!timeType">-1:04</span>
        </div>
      </div>

      <!-- 音量条 -->
      <button class="icon volume__state" v-if="!muted" 
        @mouseover="showVolumeBar=true" 
        @click="muted=!muted">
      </button>
      <button class="icon muted__state" v-else @click="muted=!muted"></button>

      <!-- 歌曲信息&列表入口 -->
      <div class="track__container">
        <div class="poster__image"></div>
        <div>
          <div class="artist">uncalc</div>
          <div class="track__title">samidare</div>
        </div>
        <div class="icon playlist" v-if="!showPlaylist" @click="showPlaylist=true"></div>
        <div class="icon playlist-active" v-else @click="showPlaylist=false"></div>
      </div>
      
    
    </div>
    
  </div>
</template>

<script>
export default {
  data(){
    return{
      paused: true,
      timeType: false,
      muted: false,
      onProgressBar: false,
      showVolumeBar: false,
      showPlaylist: false,
    }
  },
  methods:{
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

/* 操作图标 */
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
  cursor: pointer;
}
/* 音量相关 */
.volume__state{
  margin: 25px;
  background: url(../assets/playbar/volume.svg) 0 0 no-repeat;
  background-size: cover;
}
.muted__state{
  margin: 25px;
  background: url(../assets/playbar/volume-muted.svg) 0 0 no-repeat;
  background-size: cover;
}

/* 播放信息相关 */
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