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

      <!-- 底部栏 - 歌曲信息   -->
      <div class="track__container">
        <div class="ctrl__left"> 
          <template v-if="nowPlaying">
            <router-link :to="{name:'trackDetail', params:{tid: nowPlaying.tid}}">
              <TrackArtwork :imgURL="nowPlaying.img_url" :key="nowPlaying.tid"></TrackArtwork>
            </router-link>
          </template>
          <template v-else>
              <TrackArtwork></TrackArtwork>
          </template>
          <!-- 传输 -->
          <div>
            <div class="artist">
              <span v-if="nowPlaying">{{nowPlaying.artist}}</span> 
              <span v-else>艺术家</span>
            </div>
            <div class="track__title">
              <span v-if="nowPlaying">
                <router-link :to="{name:'trackDetail', params:{tid: nowPlaying.tid}}">{{nowPlaying.title}}</router-link>
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

     
      <!-- 播放列表 -->
      <transition name="loadPanel">
         <!-- 列表定位 -->
        <div class="panel__pos" v-if="showNextup">
          <div class="track__panel">
            <!-- 顶部说明 -->
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



            <!-- 定位>可见区域>高度计算>实际内容 -->
            <div class="queue__scrollable">
              <div class="queue__scrollableInner" @mousewheel="scrolling" ref="scrollableInner">

                    <div class="queue__itemsHeight" :style="{height: (nextup.length)*48+'px'}" ref="itemsHeight">
                      <div class="queue__itemsContainer">
                          <div v-for="(t, idx) in nextup" :key="t.tid" ref="items" :style="{transform:'translateY('+ (idx)*48+'px)'}" class="queue__itemLocate">
                            <!-- item外壳，光标悬浮时高光 -->
                            <div class="queue__itemWrapper" :style="{background: nowIndex==idx? '#f8f8f8':'#fff'}"
                              @mouseenter="highlightItem(idx)" @mouseleave="delightItem(idx)">
                              <!-- 内容数据 -->
                              <div class="queue__item">
                                <div class="item__dragHandle">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                      <g fill="none" fill-rule="evenodd">
                                          <path fill="#CCC" d="M9 5h2v2H9V5zm4 0h2v2h-2V5zm0 8h2v2h-2v-2zm0-4h2v2h-2V9zm0 8h2v2h-2v-2zM9 9h2v2H9V9zm0 4h2v2H9v-2zm0 4h2v2H9v-2z"/>
                                      </g>
                                  </svg>
                                </div>
                                <div class="item__thumbnail" @click="playThis(idx)">
                                  <div class="cirtus _play" v-show="idx!=nowIndex && focusIdx == idx"></div>
                                  <TrackArtwork :imgURL="t.img_url"></TrackArtwork>
                                  <template v-if="idx==nowIndex">
                                    <div class="cirtus _play" v-show="(idx==nowIndex && paused)" ></div>
                                    <div class="cirtus _pause" v-show="(idx==nowIndex && !paused)" ></div>
                                  </template>
                                </div>
                                <div class="item__details">
                                  <div><span class="item__meta">{{t.artist}}</span></div>
                                  <router-link class="item__title" :to="{name:'trackDetail', params:{tid: t.tid}}">{{t.title}}</router-link>
                                  <div class="detail__bg" @click="playThis(idx)"></div>
                                </div>
                                <div class="item__rightside">
                                  <div style="color:#999">{{t.duration}}</div>
                                  <div class="remove__block" title="从播放列表中移除" @click="nextupRemove(idx)">x</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="queue__footer" :style="{transform:'translateY('+ ((nextup.length*48)+13)+'px)'}" ref="itemsFooter">
                            <button @click="nextupAffix">hit2add</button>
                            做添加的动画，如果nextup 关闭，弹窗提示<br>
                            列表分为页面显示部分 （高600），页面总长度（高2900），进入页面显示部分附近的都会预加载<br>
                            ·监听页面滚动事件<br>
                            ·获取页面滚动位置<br>
                            ·判断元素是否可见<br>
                            ·加载可见元素<br>
                              watch Nextup 发生变化就要写入localStorage <br>
                                 
                          </div>
                      </div>
                    </div>
                    <div class="scrollbar" ref="scrollbar"></div>
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
      volume: 0.3,                // 记录静音前的音量
      volumePercent: 30,          // 在playtrack()和updateProgressBar()中都更新到audio.volume上，同步视觉和听觉
      changingVolume: false,      // 调节进度条，控制动画效果正常进行

      // --- 列表
      showNextup: false,       // 显示播放列表
      nextup: [],     
      nowIndex: 0,            // 当前播放的索引值
      nowPlaying: null,       // 每次play前读取，曲目信息
      focusIdx: -1,           // 光标悬浮的索引值
      tidSet: new Set(),      // 拒绝tid相同的曲目进入列表
      depth: 114,               // 卷轴高度
      submarine: 0,                // 当前高度
    }
  },
  computed:{
    progressPercent(){
        return this.currentTimeSeconds*100 / this.durationSeconds
    },

  },
  watch:{
    currentTimeSeconds(now){
      this.$bus.$emit('trackProgress', now, this.durationSeconds) // 更新时传输时间 
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
        if(this.audio.currentTime == this.audio.duration){
          this.pauseTrack()
          this.stepNext()
        }
      }

    },
    playTrack(){   
      this.nowPlaying = this.nextup[this.nowIndex]
      if(!this.audio){
        this.audio = new Audio(this.nowPlaying.audio_url) // 播放组件只着手【当前曲目】，如果要分组件应该从这开始
        this.audio.addEventListener('timeupdate', this.updateProgressBar)
      }
      this.audio.volume = this.volumePercent/100 // 初次播放时调整音量
      this.audio.play() 
      this.paused=false
    },
    pauseTrack(){
      if(this.audio){
        this.audio.pause()    
      }
      this.paused=true
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

    // 播放列表
    clearThenPlay(){
      this.pauseTrack()
      this.audio = null
      this.playTrack()
    },
    playNextup(idx){
      this.nowIndex = idx
      this.clearThenPlay()
    },
    highlightItem(idx){
      this.focusIdx = idx // 表示光标悬浮
      let itemWrapper = this.$refs.items[idx].children[0]
      itemWrapper.style.background = '#f2f2f2'
      let item = itemWrapper.children[0]
      item.children[0].style.visibility = 'visible' // handle
      let right = item.children[3]
      // 只有当nowIndex和idx不同时才允许移除
      if(this.nowIndex != idx){
        right.children[0].style.display = 'none' // duration
        right.children[1].style.display = 'block' // remove
      }
    },
    delightItem(idx){
      this.focusIdx = -1
      let itemWrapper = this.$refs.items[idx].children[0]
      if(this.nowIndex == idx){
        itemWrapper.style.background = '#f8f8f8'
      }
      else
        itemWrapper.style.background = '#fff'
      let item = itemWrapper.children[0]
      item.children[0].style.visibility = 'hidden' // handle
      let right = item.children[3]
      right.children[0].style.display = 'block' // duration
      right.children[1].style.display = 'none' // remove
    },
    stepPrev(){ 
      // if 
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
    playThis(idx){
      let itemWrapper = this.$refs.items[idx].children[0]
      let right = itemWrapper.children[0].children[3]
      right.children[0].style.display = 'block' // duration
      right.children[1].style.display = 'none' // remove
      if(this.nowIndex == idx){
        //切换播放状态
        if(this.paused) this.playTrack()
        else this.pauseTrack()
      }
      else{
        this.nowIndex = idx
        this.clearThenPlay()
      }
    },
    nextupRemove(idx){
      // nowIndex < idx ，正常
      let tid = this.nextup[idx].tid
      this.tidSet.delete(tid) 
      this.$refs.items[idx].children[0].style.transform = 'translateX(100%)' //右移动画
      setTimeout(()=>{
        this.nextup.splice(idx,1) // 调用数组方法会重新计算新高度，已经预设transition= 0.3s
        if(this.nowIndex > idx){ 
          this.nowIndex -- // nowIndex > idx ，特殊处理，放在splice之后，渲染后才刷新播放按钮位置
        }
      },300)
      this.initScroll()
    },
    nextupAffix(){
      // 根据歌曲tid 从getters读取track
      let t = this.$store.getters['track/getTrackDetail'](2)
      if(this.tidSet.has(t.tid)){
        this.$notify.error({
          title: '不能添加重复元素!',
          message: '因为我不会'
        })
      }
      else{
        this.tidSet.add(t.tid)
        this.nextup.push(t)
      }
      this.initScroll()
    }, 
    clearNextup(){
      this.$notify.info({
        title: '无法清除Nextup',
        message: '这个部分还没开始做。',
        })
    },
    loopCurrentTrack(){
      this.$notify.info({
        title: '无法单曲循环',
        message: '这个部分还没开始做。',
        })
    },

    initScroll(){
      this.$nextTick(()=>{
        let scroll = this.$refs.itemsHeight.getBoundingClientRect().height // 内容长度
        let footer = this.$refs.itemsFooter.getBoundingClientRect().height // 尾部长度
        let onePage = this.$refs.scrollableInner.getBoundingClientRect().height // 一页的长度
        this.depth =  scroll + footer - onePage  // 可滚动距离 = 总长 - 页面
        this.$refs.scrollbar.style.height = onePage * onePage/(scroll+footer)+'px' // scrollbar 长度
      })
    },
    checkNextup(){
      this.showNextup = true
      this.initScroll()
    },
    scrolling(e){
      this.$nextTick(()=>{
        let oldH = this.$refs.itemsHeight.style.transform
        let a = 0        //获得之前的高度值，预设0
        let b = e.deltaY //获得滚动的高度 
        if(oldH){
          let regex = /translateY\((-?\d+(\.\d+)?)px\)/i; // 小数点也要带上，不然正则出问题
          a = regex.exec(oldH)[1] 
        }
      
        if(a>=0 && b<0){return} // 向上滚到头不做操作
        else if(this.submarine>=this.depth && b>0) {return} // 下滚到底不做操作
        else{
          let ans = a - b //  向下滚动66，期望值应该是translateY(-66px)，但是deltaY是66，所以相减
          this.$refs.itemsHeight.style.transform = 'translateY('+ ans +'px)';  // 卷轴滚动
          this.submarine += b // 记录已滚动距离

          // 滑条移动 --------------------------
          let before = this.$refs.scrollbar.style.top
          if(!before){
            before = 0
          }
          else{
            before = parseFloat(before)
          }
          let scroll_items = this.$refs.itemsHeight.getBoundingClientRect().height // 内容长度
          let scroll_footer = this.$refs.itemsFooter.getBoundingClientRect().height // 尾部长度
          let onePage = this.$refs.scrollableInner.getBoundingClientRect().height // 一页的长度
          
          let move = onePage * b / (scroll_items + scroll_footer)
          let after = move + before 
 
          let barH = parseFloat(this.$refs.scrollbar.style.height)  
          if(after + barH >= onePage){
            after = onePage - barH // 滑条触底，当top+height相加等于onePage说明到底了，不允许再向下滑动
          }
          else if(after < 0){
            after = 0 // 触顶
          }         
          this.$refs.scrollbar.style.top = after +'px'
        }
      }) 
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
  },
  //暂时的初始化，后面删
  mounted(){
    localStorage.removeItem('nextup_list') 
    let tracks = this.$store.getters['track/getAllTracks']()
    let val = JSON.stringify(tracks)
    localStorage.setItem('nextup_list',val)
    this.nextup = tracks
    tracks.forEach(t => {
      this.tidSet.add(t.tid)
    });
  },  
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
  overflow: hidden;
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
}
.queue__scrollableInner{
  width: inherit;
  height: inherit;
  padding-right: 30px;
}
.queue__itemsHeight{
  width: inherit;
  transition: .3s;
  transform: translateY(0);
}
.queue__footer{
  border-top:1px solid #e5e5e5;
  background: #fff;
  transition: .3s;
  padding: 15px;
}
.scrollbar{
  background: rgba(0,0,0,.3);
  box-shadow: 0 0 1px #fff;
  border-radius: 7px;
  width: 7px;
  height: 200px;
  right: 2px;
  position: absolute;
  z-index: 1;
  transition: top .3s;
  top: 0;
}






/* 列表内容 */
.queue__itemsContainer{
  font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
  font-weight: 100;
  position: relative;
  flex: 1;
  height: 100%;
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
.remove__block{
  width: 24px;
  height: 24px;
  text-align: center;
  display: none;
}


/* nextup动画 */
.queue__itemLocate{
  position: absolute;
  width: 100%;
  transition-property: transform,opacity,visibility;
  transition-duration: .3s;
}

</style>