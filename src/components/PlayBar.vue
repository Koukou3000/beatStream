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
        <svg v-if="!loop"
          xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#333" d="M12 8H9a4 4 0 1 0 0 8h6a4 4 0 0 0 2.104-7.403l1.77-1.18.02.018A6 6 0 0 1 15 18H9A6 6 0 1 1 9 6h3V4l4 3-4 3V8z"/></svg>
        <svg v-else
          xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#f50" d="M11.027 16a4.55 4.55 0 0 0 .23 2H9A6 6 0 1 1 9 6h3V4l4 3-4 3V8H9a4 4 0 1 0 0 8h2.027zm7.725-2.61a3.997 3.997 0 0 0-1.648-4.792l1.77-1.18.02.017A5.987 5.987 0 0 1 21 12c0 1.3-.413 2.503-1.116 3.486a4.496 4.496 0 0 0-1.132-2.096z"/>
          <path fill="#f50" d="M15.5 20a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm-.5-5v4h1v-4h-1zm-1 0v1h1v-1h-1z"/></svg>
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

      <!-- 底部栏右侧 - 歌曲信息   -->
      <div class="track__container">
        <div class="ctrl__left"> 
          <div class="artwork__clickable" v-if="nowPlaying" @click="jumpDetail(nowPlaying)">
            <!-- <router-link :to="{name:'trackDetail', params:{tid: nowPlaying.tid}}"> -->
              <TrackArtwork :imgURL="nowPlaying.img_url" :key="nowPlaying.tid"></TrackArtwork>
            <!-- </router-link> -->
          </div>
          <div v-else>
              <TrackArtwork></TrackArtwork>
          </div>
          <!-- 传输 -->
          <div>
            <div class="artist">
              <span v-if="nowPlaying">{{nowPlaying.artist}}</span> 
              <span v-else>艺术家</span>
            </div>
            <div class="track__title">
              <span v-if="nowPlaying">
                <div class="title__clickable" @click="jumpDetail(nowPlaying)">{{nowPlaying.title}}</div>
                <!-- <router-link :to="{name:'trackDetail', params:{tid: nowPlaying.tid}}">{{nowPlaying.title}}</router-link> -->
              </span>
              <span v-else>曲名</span>
            </div>
          </div>
        </div>
        <div class="ctrl__right">
          <div class="icon" v-show="!showNextup" @click="checkNextup">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#333" class="playbackSoundBadge__queueIcon" d="M6 11h12v2H6zM6 7h8v2H6zM6 15h12v2H6zM16 3v6l4-3z"></path></svg>
          </div>
          <div class="icon" v-show="showNextup" @click="showNextup=false">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#ff5500" class="playbackSoundBadge__queueIcon" d="M6 11h12v2H6zM6 7h8v2H6zM6 15h12v2H6zM16 3v6l4-3z"></path></svg>
          </div>
        </div>
      </div>

     

      <!-- 底部栏右侧 - 播放列表 -->
      <transition name="loadPanel">
        <div class="panel__pos" v-show="showNextup">
          <div class="track__panel">
            <div class="panel__top">
              <div class="panel__text" @click="showNextup=false">Next up</div>
              <button class="clear__btn" @click="clearNextup">Clear</button>
              <button class="close__btn" @click="showNextup=false">           
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" fill-rule="evenodd">
                        <path fill="#000" fill-rule="nonzero" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </g>
                </svg>
              </button>
            </div>          

            <div class="queue__scrollable">
              <div class="queue__scrollableInner" ref="scrollableInner" @mousewheel="scrolling">
                    <div class="queue__itemsHeight" ref="itemsHeight" :style="{height: `${nextup.length*48}px`}">
                      <!-- 通过idx定位操作的元素 -->
                      <div class="queue__itemsContainer" ref="itemsContainer" :style="{transform: `translateY(${containerRenderOffset*48}px)`}" >      
                       
                              
                          <div class="queue__itemLocate" v-for="(t,idx) in visibleNextup" :key="t.tid" 
                                :style="{transform:`translateY(${idx*48}px)`, transition: smoothAnm? '0.3s':'0s'}" >       
                                <!-- 实际渲染列表 locate控制Y轴 item控制X轴动画-->
                                <div class="queue__itemWrapper" @mouseover="highlightItem" @mouseout="delightItem">
                                  <!--透明度表示播放状态-->
                                  <div class="queue__item" @click.stop="playThis(idx)"
                                    :style="{background: idx==hoverIdx || idx+containerRenderOffset==nowIndex ? '#f2f2f2':'#fff',
                                            opacity: (!loop && idx+containerRenderOffset<nowIndex) || (loop&&idx+containerRenderOffset!=nowIndex)? 0.5:1}">                          
                                    <div class="item__dragHandle" :style="{visibility: idx==hoverIdx && idx+containerRenderOffset!=nowIndex ?'visible':'hidden'}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <g fill="none" fill-rule="evenodd">
                                                <path fill="#CCC" d="M9 5h2v2H9V5zm4 0h2v2h-2V5zm0 8h2v2h-2v-2zm0-4h2v2h-2V9zm0 8h2v2h-2v-2zM9 9h2v2H9V9zm0 4h2v2H9v-2zm0 4h2v2H9v-2z"/>
                                            </g>
                                        </svg>
                                    </div>

                                    <div class="item__thumbnail" @click.stop="playThis(idx)">
                                        <div class="cirtus _pause" v-show="idx+containerRenderOffset==nowIndex && !paused"></div>
                                        <div class="cirtus _play" v-show="(idx+containerRenderOffset==nowIndex && paused) || (idx+containerRenderOffset!=nowIndex && idx==hoverIdx)"></div>
                                        <TrackArtwork :imgURL="t.img_url"></TrackArtwork>
                                    </div>
                                    <div class="item__details">
                                        <span class="item__meta">{{t.artist}}</span>
                                        <span class="item__title" @click.stop="jumpDetail(t)">{{t.title}}</span>
                                    </div>
                                    <div class="item__rightside">
                                        <div class="item__duration" v-if="hoverIdx!=idx || idx+containerRenderOffset==nowIndex">{{t.duration}}</div>
                                        <div class="remove__block" v-if="hoverIdx==idx && idx+containerRenderOffset!=nowIndex" title="从播放列表中移除" @click.stop="nextupRemove(idx)">x</div>
                                    </div>
                                  </div>
                                
                                </div>
                          </div>
                    
                      </div>
                      
                      <div class="queue__footer" :style="{transform:`translateY(${(nextup.length*48)-1}px)`}" ref="itemsFooter">           
                        建议使用Chrome浏览器
                      </div>
                    </div>

              </div>
              
            </div>
          </div>

        </div>
      </transition>
      

      
    
    </div>
    
  </div>
</template>

<script>
import TrackArtwork from './TrackArtwork'
export default {
  components:{TrackArtwork},
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
      volume: 0.4,                // 记录静音前的音量
      volumePercent: 40,          // 在playtrack()和updateProgressBar()中都更新到audio.volume上，同步视觉和听觉
      changingVolume: false,      // 调节进度条，控制动画效果正常进行

      // --- 列表
      showNextup: false,       // 显示播放列表
      nextup: [],               // hearable_nextup
      nowIndex: -1,            // 当前播放的索引值
      nowPlaying: null,       // 每次play前读取，曲目信息
      focusIdx: -1,           // 光标悬浮的索引值
      tidSet: new Set(),      // 拒绝tid相同的曲目进入列表
      
      loop: false,
      visibleNextup: [],           // visible_nextup 需要被渲染 
      containerRenderOffset: 5,       // 渲染列表第一个在nextup的索引值
      hoverIdx: -1,                   // 悬浮的那个索引
      smoothAnm: false,               // 删除 时的动画
      renderTimer: null,              // 滚动结束时才渲染
    }
  },
  computed:{
    progressPercent(){
        return this.currentTimeSeconds*100 / this.durationSeconds
    },

  },
  watch:{
    // 更新进度条时间 
    currentTimeSeconds(now){
      this.$bus.$emit('trackProgress', now, this.durationSeconds) 
    },
    nextup(){
      localStorage.setItem('nextup_list', JSON.stringify(this.nextup))
    },

    // 与其他组件同步音乐播放状态 ...Gallery、Detail
    $route(){
      // console.log(this.$route)
      this.$bus.$emit('updateNowPlaying', this.nowPlaying)
      this.$bus.$emit('updatePlayStatus', this.paused)
    },
    nowPlaying(newVal){
      this.$bus.$emit('updateNowPlaying',newVal)
    },
    paused(){
      this.$bus.$emit('updatePlayStatus', this.paused)
    },


  },
  methods:{
    // 播放暂停单曲
    updateProgressBar(){
      //更新播放状态（进度条、音量等
      if(this.audio){ 
        if(!this.changingTime) // 拖动进度条时不实时刷新进度条
          this.currentTimeSeconds =  this.audio.currentTime
        this.durationSeconds = this.audio.duration
        this.audio.volume = this.volumePercent/100 // 播放过程中实时调整音量
        
        // 播放进度条结束
        if(this.audio.currentTime == this.audio.duration){
            if(this.loop){
              this.audio.currentTime = 0 //如果循环则回到开始
              this.audio.play()
            }  
            else{
              this.pauseTrack()
              this.stepNext() 
            }
        }
      }
    },
    playTrack(){   
      if(this.nowIndex <0){
        this.$notify.warning({
          title: '未选择播放曲目',
          message: '请检查播放列表Nextup',
          position: 'bottom-right',
          offset: 50
        })
        return
      }
      this.nowPlaying = this.nextup[this.nowIndex]
      if(!this.audio){
        this.audio = new Audio(this.nowPlaying.audio_url) // 播放组件只着手【当前曲目】，如果要分组件应该从这开始
        this.audio.addEventListener('timeupdate', this.updateProgressBar)
      }
      this.audio.volume = this.volumePercent/100 // 初次播放时调整音量
      let a = this.audio.play() 
      if(a !== undefined){
        a.then(()=>{
           this.paused=false
        })
        .catch(err=> console.log(err))
      }
      // this.$bus.$emit('updateNowPlaying', this.nowPlaying)
      // this.$bus.$emit('updatePlayStatus', this.paused)
    },
    pauseTrack(){
      if(this.audio){
        this.audio.pause()    
      }
      this.paused=true
      // this.$bus.$emit('updatePlayStatus', this.paused) 
    },
    // 音量
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
      else if(e.type == 'mouseup'){
        if(e.target.tagName.toLowerCase() == 'div'){
          if(e.target.className.substring(0,6) == 'volume')  // 鼠标单击音量条，不隐藏
            return 
        }
      }
      if(this.showVolumeBar){
        this.volumeBarTimer = setTimeout(() => {
          this.showVolumeBar = false
          setTimeout(() => {
            this.openVolumeJudgeArea = false
            removeEventListener('mouseup', this.volumeControlUp)
          }, 100); // 先启动关闭动画，延迟后关闭定位区（延迟时间与动画时间相同
        }, 0);
      }
    }, 
    // 进度条
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
        if(e.target.tagName.toLowerCase() == 'div'){
          if(e.target.className.substring(0,8) == 'progress' || 
             e.target.className.substring(0,8) == 'timeline')
            return
        }
      }    
      //移开后开始计时并隐藏
      this.progressBarTimer = setTimeout(() => {
        this.onProgressBar = false
        removeEventListener('mouseup',this.progressBarUp)
      },100)
    },

 
    clearThenPlay(){
      this.pauseTrack()
      this.audio = null
      this.playTrack()
    },
    stepPrev(){ 
      if(this.nowIndex == 0){
        this.nowIndex = this.nextup.length
      }
      this.nowIndex --
      this.clearThenPlay()
    },
    stepNext(){
      if(this.nowIndex+1 == this.nextup.length){
      this.nowIndex = -1
      }  
      this.nowIndex ++
      this.clearThenPlay()
      
    },
    // 播放列表
    highlightItem(e){
      let mousemove = e.clientY - this.$refs.scrollableInner.getBoundingClientRect().top + this.$refs.scrollableInner.scrollTop 
      let nextupIdx = parseInt(mousemove / 48)
      this.hoverIdx = nextupIdx - this.containerRenderOffset
    },
    delightItem(){
      // let mousemove = e.clientY - this.$refs.scrollableInner.getBoundingClientRect().top + this.$refs.scrollableInner.scrollTop 
      // let nextupIdx = parseInt(mousemove / 48)
      this.hoverIdx = -1
    },
    playThis(idx){
      // 如果当前曲目和播放曲目相同，则切换状态
      if(idx+this.containerRenderOffset == this.nowIndex){
          if(this.paused){
            this.playTrack()
          }
          else{
            this.pauseTrack()
          }
      }
      else{
        this.nowIndex = idx+this.containerRenderOffset
        this.clearThenPlay()
      }
     
     
    },
    nextupRemove(idx){ 
      if(this.smoothAnm) return
      // wrapper 水平动画
      let itemWrapper = this.$refs.itemsContainer.children[idx].children[0]
      itemWrapper.style.transform = 'translateX(100%)'

      // locate 垂直动画
      this.smoothAnm = true   // 允许垂直动画
      setTimeout(() => { 
          let t = this.visibleNextup.splice(idx,1)     // 从渲染列表清除，触发transition，（渲染时会导致元素transformY变化
          this.tidSet.delete(t.pop().tid)
          this.nextup.splice(idx+this.containerRenderOffset,1) // 从实际播放列表清除
          if(idx+this.containerRenderOffset < this.nowIndex)
              this.nowIndex--
          this.renderVisible() //削除后可能导致未渲染内容进入视口，应重新渲染
      }, 300);
      setTimeout(() => {
          this.smoothAnm = false  //  timeout结束后，动画完成，此时如果进行滚动，不允许渲染，      
      }, 300);
    },
    nextupAffix(t){
      if(this.tidSet.has(t.tid)){
        this.$notify.info({
          title: t.artist +' - '+t.title,
          message: '歌曲已存在于播放列表中',
          position: 'bottom-right',
          offset: 50
        })
      }
      else {
        this.tidSet.add(t.tid) // 避免之后重复添加
        this.smoothAnm = true
        this.nextup.splice(this.nowIndex+1, 0, t)   
        this.renderVisible()
        setTimeout(() => {
          this.smoothAnm = false
        }, 300);
          // 列表未打开，弹窗提示
          if(!this.showNextup){
            this.$notify.success({
              title: t.artist +' - '+t.title,
              message: '已经加入至Nextup',
              position: 'bottom-right',
              offset: 50
            })
          }
      }
    }, 
    clearNextup(e){     
        // nextup全部删除  
      if(this.nowIndex<0 || e == 'force'){ //  nowIndex<0 ，说明没有正在播放的内容，
          this.tidSet = new Set()
          this.$refs.itemsHeight.style.background = '#fff' // 避免视觉残留，背景需要从骨架变成纯色
          for(let i=0; i<this.visibleNextup.length; i++){
            let itemWrapper = this.$refs.itemsContainer.children[i].children[0]
            itemWrapper.style.transform = 'translateX(100%)'
          }
          setTimeout(() => {
            this.visibleNextup = []       
            this.nextup = []
            // 结束后，再把骨架安回去
            this.$refs.itemsHeight.style.background = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=),url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAAwCAYAAADJnakOAAAAAXNSR0IArs4c6QAAAkhJREFUeAHt3UGKAkEAA8BRvIr/f6b4AX3BnMQYUnv10OnKQBhQ9jj8ESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDwbwKXHwS6/+CMsyNeZx/6jAABAgQIJASuiUOdSYAAAQIE1gUM8PoT4P4ECBAgEBEwwBF2hxIgQIDAusBtHeBz/0e5wbM8v/gECBCYFPAGPFm7SxMgQIBAWsAApxtwPgECBAhMChjgydpdmgABAgTSAgY43YDzCRAgQGBSwABP1u7SBAgQIJAWMMDpBpxPgAABApMCBniydpcmQIAAgbSA3wEfh9/Rpp9C5xMgQGBQwBvwYOmuTIAAAQJ5AQOc70ACAgQIEBgUMMCDpbsyAQIECOQFDHC+AwkIECBAYFDAAA+W7soECBAgkBfwLej+/4aUf4q6E/gWfHd/0hOoFfAGXFud4AQIECDQLGCAm9uTnQABAgRqBQxwbXWCEyBAgECzgAFubk92AgQIEKgVMMC11QlOgAABAs0CBri5PdkJECBAoFbAANdWJzgBAgQINAv4HbD/htT8/MpOgACBWgFvwLXVCU6AAAECzQIGuLk92QkQIECgVsAA11YnOAECBAg0Cxjg5vZkJ0CAAIFaAQNcW53gBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC3xR4A/y+BSraKNVzAAAAAElFTkSuQmCC)'
          }, 300);
      }
      else{
          let tmp = this.nextup.slice()
          tmp.splice(0,this.nowIndex)
          tmp.splice(1)
          this.visibleNextup = tmp
          this.nextup = tmp
          this.nowIndex = 0
          let s = new Set()
          s.add(this.nextup[this.nowIndex].tid)
          this.tidSet = s
      }
 
    },
    nextupTaken(t){  
      // 已经有相同的，找出这个index 直接播放
      if(this.tidSet.has(t.tid)){
        for(let i=0; i<this.nextup.length; i++){
          if(this.nextup[i].tid == t.tid){
            this.nowIndex = i
          }
        }
        this.clearThenPlay()    
      }
      // 没有相同的，把原列表清空，再播放当前曲目
      else{
        this.clearNextup('force')
        setTimeout(() => {
          this.nextupAffix(t)
          this.nowIndex = 0
          this.clearThenPlay()
        }, 400);
      }
      
    },
    loopCurrentTrack(){
      this.loop = !this.loop
    },

    // 列表渲染相关
    checkNextup(){
      this.showNextup = true
      this.$nextTick(()=>{
        this.$refs.scrollableInner.addEventListener('scroll',()=>this.scrolling())
        this.$refs.scrollableInner.scrollTop = (this.nowIndex-1)*48 // 跳转到可能操作的位置
      })
      this.renderVisible()
    },
    renderVisible(){
      // 获取当前高度，计算渲染起点，设置containerOffset，计算页面大小，计算渲染终点，slice赋值给visibleNextup
      this.$nextTick(()=>{
          let now = this.$refs.scrollableInner.scrollTop
          let start = Math.floor(now/48)
          let pageSize = Math.ceil(this.$refs.scrollableInner.getBoundingClientRect().height / 48)
          let end = start + pageSize 
          this.visibleNextup = this.nextup.slice(start, end)
          this.containerRenderOffset = start
      }) 
    },
    scrolling(){
      clearTimeout(this.renderTimer)
      this.renderTimer = setTimeout(() => {
        this.renderVisible()
      }, 200);
    },
    jumpDetail(t){
      this.$router.push({
        name:'trackDetail', 
        params:{
          tid: t.tid,
          paused: this.paused, 
          nowPlaying: this.nowPlaying
        }
      })
      // 应当在每次路由切换
      this.$bus.$emit('updateNowPlaying', this.nowPlaying)
      this.$bus.$emit('updatePlayStatus', this.paused)
    },

    // 与crossfade通信
    adjustTime(timeSec){
      // console.log('如果音频存在，跳转至对应位置 ',timeSec)
      if(this.audio){
        this.audio.currentTime = timeSec
      }
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
  },
  
  mounted(){
    //暂时的初始化，后面删------------------------
    localStorage.removeItem('nextup_list') 
    let tracks = this.$store.getters['track/getAllTracks']()
    let val = JSON.stringify(tracks)
    localStorage.setItem('nextup_list',val)
    // ------------------------------------------------------
    let c = localStorage.getItem('nextup_list')
    let arr = JSON.parse(c)
    arr.forEach(t => {      
      if(this.tidSet.has(t.tid)){
        console.log('出现重复元素 title: ', t.title)
      }
      else{
        this.nextup.push(t)
        this.tidSet.add(t.tid)
      }
    })
    this.$bus.$on('nextupAffix', this.nextupAffix) // 添加到队列
    this.$bus.$on('nextupTaken', this.nextupTaken) // 替换队列并播放
    this.$bus.$on('pauseTrack', this.pauseTrack)  
    this.$bus.$on('playTrack', this.playTrack) 
    this.$bus.$on('adjustTime', this.adjustTime)
  },  
  beforeDestroy(){
    this.$bus.$off('nextupAffix') 
    this.$bus.$off('nextupTaken') 
    this.$bus.$off('pauseTrack')
    this.$bus.$off('playTrack')
    this.$bus.$off('adjustTime')
  },
}
</script>

<style scoped>
body{
  font: 12px/1.4 Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
  color: #333;
}
.player{
  z-index: 100;
  user-select: none;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 49px;
  border-top: 1px solid #cecece;
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
  background-image: linear-gradient(135deg,#e6846e,#70929c);
}
.artist{
  margin-left: 10px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 280px;
}
.track__title{
  margin-left: 10px;
  color: #666;
  width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.track__title a{
  text-decoration: none;
  color: #666;
}

.track__title a:hover{
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
.panel__pos{
  width: 480px;
  height: 660px;
  max-height: calc(100vh - 120px);
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  position: absolute;
  bottom: 55px;
  right: 0;
}
.track__panel{
  transform: translateY(0);
  opacity: 1;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}
.panel__top{
  display: flex;
  padding: 9px 24px;
  border-bottom: 1px solid #e5e5e5;
  align-items: center;
  cursor: pointer;
  background: #fff;
  z-index: 1;
}
.panel__text{
  line-height: 46px;
  flex-grow: 1;
  font-size: 16px;
}
.clear__btn{
  display: inline-block;
  position: relative;
  height: 26px;
  margin: 0;
  padding: 2px 11px 2px 10px;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  background-color: #fff;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
  font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
  font-weight: 100;
  text-align: center;
  vertical-align: initial;
  margin-right: 14px;
}
.clear__btn:hover{
  border: 1px solid #aaa;
}
.close__btn{
  background: none;
  transition: none;
  padding-top: 3px;
  padding-bottom: 3px;
  border: none;
  cursor: pointer;
}

.loadPanel-enter-active{
  animation: load .35s forwards;
}
.loadPanel-leave-active{
  animation: load reverse 0.35s forwards ;
}
@keyframes load {
  from{
    opacity: 0;
    transform: translateY(50px);
  }
  90%{
    opacity: 1;
    transform: translateY(-3px);
  }
  to{
    opacity: 1;
    transform: translateY(0);
  }
}

/* 滚动列表 */
.queue__scrollable{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.queue__scrollableInner{
  width: inherit;
  height: inherit;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
.queue__scrollableInner::-webkit-scrollbar{
  width: 8px;
  background-color: #f5f5f5;
}
.queue__scrollableInner::-webkit-scrollbar-thumb{
  background: rgba(0,0,0,.2);
  box-shadow: 0 0 1px #fff;
}
.scrollable__Bar{
  position: absolute;
  width: 7px;
  right: 0;
  height: 80px;
  top: 0;
  background: rgba(0,0,0,.3);
}


.queue__itemsHeight{
  width: inherit;
  transition: .3s;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=),
  url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAAwCAYAAADJnakOAAAAAXNSR0IArs4c6QAAAkhJREFUeAHt3UGKAkEAA8BRvIr/f6b4AX3BnMQYUnv10OnKQBhQ9jj8ESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDwbwKXHwS6/+CMsyNeZx/6jAABAgQIJASuiUOdSYAAAQIE1gUM8PoT4P4ECBAgEBEwwBF2hxIgQIDAusBtHeBz/0e5wbM8v/gECBCYFPAGPFm7SxMgQIBAWsAApxtwPgECBAhMChjgydpdmgABAgTSAgY43YDzCRAgQGBSwABP1u7SBAgQIJAWMMDpBpxPgAABApMCBniydpcmQIAAgbSA3wEfh9/Rpp9C5xMgQGBQwBvwYOmuTIAAAQJ5AQOc70ACAgQIEBgUMMCDpbsyAQIECOQFDHC+AwkIECBAYFDAAA+W7soECBAgkBfwLej+/4aUf4q6E/gWfHd/0hOoFfAGXFud4AQIECDQLGCAm9uTnQABAgRqBQxwbXWCEyBAgECzgAFubk92AgQIEKgVMMC11QlOgAABAs0CBri5PdkJECBAoFbAANdWJzgBAgQINAv4HbD/htT8/MpOgACBWgFvwLXVCU6AAAECzQIGuLk92QkQIECgVsAA11YnOAECBAg0Cxjg5vZkJ0CAAIFaAQNcW53gBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC3xR4A/y+BSraKNVzAAAAAElFTkSuQmCC);
  background-repeat: no-repeat,repeat-y;
}
.queue__footer{
  border-top:1px solid #e5e5e5;
  background: #fff;
  transition: .3s;
  padding: 15px;
}




/* 列表内容 */

.queue__itemsContainer{
  font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
  font-weight: 100;
  position: relative;
  flex: 1;
  height: 0;
}
.queue__itemLocate{
  position: absolute;
  width: 100%;
}
.queue__itemWrapper{
  width: 100%;
  height: 48px;
  background: #fff;
  transition-property: transform,opacity,visibility;
  transition-duration: .3s;
}


.queue__item{
  padding: 0 24px;
  font-size: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform .3s;
}
.item__dragHandle{
  width: 24px;
  height: 48px;
  margin-left: -24px;
  cursor: move;
  display: flex;
  align-items: center;
  visibility: hidden;
}
.item__thumbnail{
  width: 32px;
  height: 32px;
  margin-right: 7px;
  position: relative;
}


/* 播放列表的互动 */
.cirtus{
  height: 24px;
  width: 24px;
  position: absolute;
  background: #f50;
  border-radius: 50%;
  top: 3px;
  left: 3px;
  z-index: 9;
}
._play::before{
  z-index: 10;
  display: block;
  position: absolute;
  top: 0;
  left: 1px;
  width: 100%;
  height: 100%;
  content: "";
  background-repeat: no-repeat;
  opacity: 1;
  transition: opacity .3s;
  background-position: 50%;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjdweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgNyAxMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuMi4yICg5OTgzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5QbGF5IDI0PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9ImJ1dHRvbnMiIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNjUxLjAwMDAwMCwgLTkzNC4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE2NTEsOTQ2IEwxNjUyLjYxNTM4LDk0MCBMMTY1MSw5MzQgTDE2NTgsOTQwIEwxNjUxLDk0NiBaIiBpZD0iUGxheS0yNCIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+);
}
._pause::before{
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: "";
  background-repeat: no-repeat;
  opacity: 1;
  transition: opacity .3s;
  background-position: 50%;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjhweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgOCAxMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuMi4yICg5OTgzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5QYXVzZSAyNDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPgogICAgICAgIDxnIGlkPSJidXR0b25zIiBza2V0Y2g6dHlwZT0iTVNBcnRib2FyZEdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTY4Mi4wMDAwMDAsIC05MzUuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNjg3LDkzNSBMMTY4Nyw5NDUgTDE2OTAsOTQ1IEwxNjkwLDkzNSBMMTY4Nyw5MzUgWiBNMTY4Miw5MzUgTDE2ODIsOTQ1IEwxNjg1LDk0NSBMMTY4NSw5MzUgTDE2ODIsOTM1IFoiIGlkPSJQYXVzZS0yNCIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+);
}
.item__details{
  flex-grow: 1;
  position: relative;
}
.detail__bg{
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
}
.item__meta{
  display: block;
  color: #999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: normal;
  position: relative;
  z-index: 2;
}
.item__meta:hover{
  color: #666;
}
.item__title{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: normal;
  color: #333;
  text-decoration: none;
  position: relative;
  z-index: 2;
}
.item__title:hover{
  color: #000;
}
.item__rightside{
  min-width: 52px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item__duration{
  color:#999;
}
.remove__block{
  width: 30px;
  height: 30px;
      line-height: 30px;
  text-align: center;
}




/* 预加载相关 */
.item__skeleton{
  position: absolute;
  height: 48px;
  width: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
}
.img__skeleton{
  margin-left: 24px;
  width: 30px;
  height: 30px;
  margin-right: 7px;
  background: #f2f2f2;
}
.text__skeleton{
  display: flex;
  flex-direction: column;
}
.text__skeleton :nth-child(1){
  width: 50px;
  height: 8px;
  background: #f2f2f2;
  transform: translateY(-3px);
}
.text__skeleton :nth-child(2){
  width: 130px;
  height: 8px;
  background: #f2f2f2;
  transform: translateY(3px);
}

/* debug */
.title__clickable{
  cursor: pointer;
}
.artwork__clickable{
  cursor: pointer;
}
</style>