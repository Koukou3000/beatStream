<template>
  <div class="gallery">
        <div class="title">{{title}}</div>
        <div class="track__Viewport" ref="viewport">

            <!-- 滚动面板 -->
            <div class="track__panel" :style="{transform: `translateX(${nowX}px)`}">
                <!-- 一首乐曲 -->
                <div class="track__frame" v-for="(t, idx) in tracks" :key="t.tid" ref="items"  @mouseenter="focusIdx=idx" @mouseleave="focusIdx=-1">
                    <div class="track__cover">     
                            <!-- 小于visitedIdx 在可视范围内 -->                         
                        <div class="track__" @click="pictureClick(t)" v-if="idx <= visitedIdx">
                            <TrackArtwork style="position:absolute;width:100%;height:100%;top:0;" :imgURL="t.img_url"/>

                            <!-- hover && ((tid对得上 && 处于暂停状态)  || id对不上)-->
                            <transition-group name="trackControl">
                                                   
                                <div class="play__now" v-show="focusIdx==idx && ((t.tid==nowTid && paused) || t.tid!=nowTid )" :key="`${t.tid}&playBtn`"
                                    @click.stop="playClick(t)"></div>
                                <!-- hover && tid对得上 && 处于播放状态-->
                                <div class="pause__now" v-show="focusIdx==idx && t.tid==nowTid && !paused" :key="`${t.tid}&pauseBtn`"
                                    @click.stop="pauseClick"></div>
                                <div class="play__actions" v-show="focusIdx==idx" @click.stop="addNextup(t)" :key="`${t.tid}&actionBtn`">添加到Nextup</div>
               
                            </transition-group>        
                            <div class="track__text text__bigger">{{t.title}}</div>
                            <div class="track__text text__smaller">{{t.artist}}</div>
                        </div>
                        <div class="track__skeleton" v-else>
                            <div class="skeleton__text1"></div>
                            <div class="skeleton__text2"></div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            <div class="gallery__backward" @mouseover="ready2Left" @click="goLeft" v-show="hasBackward" :style="hasForward ? 'right:96%' : 'right:92%'">
                <div class="gallery__button icon__backward"></div>
            </div>
            <div class="gallery__forward" @mouseover="ready2Right" @click="goRight" v-show="hasForward" :style="hasBackward ? 'left:96%' : 'left:92%'">
                <div class="gallery__button icon__forward" :style="hasForward? 'right:0' : 'left:0'"></div>
            </div>
        </div>
        
  </div>
</template>

<script>
import TrackArtwork from '@/components/TrackArtwork'
export default {
    components:{TrackArtwork},
    data(){
        return{
            focusIdx: -1,           // 鼠标悬浮时的索引
            hasBackward: false,     // 允许后退
            hasForward: false,      // 允许前进
            page: 1,
            pages: 2,
            nowX: 0,                // 当前translateX             
            visitedIdx: 4,          // 允许加载的索引值
            moving: false,          // 避免重复的移动

            nowPlaying: null,      // 正在播放的曲目        
            paused: true,
        }
    },
    props:{
        title: String,
        tracks: Array,
    },
    watch:{
        page:{
            handler(p){
                if(p > 1){
                    this.hasBackward = true
                }
                if(p < this.pages){
                    this.hasForward = true
                }
                if(p == this.pages){
                    this.hasForward = false
                }
                if(p == 1){
                    this.hasBackward = false
                } 
                this.checkVisible() 

            },
            immediate: true
        },
    },
    computed:{
        nowTid(){
            if(this.nowPlaying) // 返回当前播放的tid用来判断显示内容
                return this.nowPlaying.tid
            return -1
        },
    },
    methods:{
        ready2Left(){
            if(this.moving) return    
            this.nowX += 15
            setTimeout(() => {
                this.nowX -= 15
            }, 200);
              
        },
        ready2Right(){
            if(this.moving) return
            this.nowX -= 15
            setTimeout(() => {
                this.nowX += 15
            }, 200);
           
        },
        goRight(){
            this.moving = true
            let once = this.$refs.viewport.getBoundingClientRect().width
            if(this.page == 1 || this.page+1 == this.pages){
                this.nowX =  this.nowX - once*0.901                  
                this.page++
            }
            else{
                this.nowX =  this.nowX - once*0.9426
                this.page++
            }
            setTimeout(() => {
                this.moving = false
            }, 600);
        },
        goLeft(){
            let once = this.$refs.viewport.getBoundingClientRect().width
            if(this.page == 2 || this.page == this.pages){
                this.nowX =  this.nowX + once*0.901  
                this.page--
            }
            else{
                this.nowX =  this.nowX + once*0.9426
                this.page--
            }
            setTimeout(() => {
                this.moving = false
            }, 600);
        },
        
        checkVisible(){
            this.$nextTick(()=>{
                let window_left = this.$refs.viewport.getBoundingClientRect().left
                let window_width = this.$refs.viewport.getBoundingClientRect().width
                let items = this.$refs.items

                setTimeout(() => {
                    for(let i=0; i<items.length; i++){
                        let item_left = items[i].getBoundingClientRect().left
                        if(item_left - window_left < window_width){ // 检查元素是否可见
                            if(i > this.visitedIdx){
                                this.visitedIdx = i
                            }    
                        }
                    }
                }, 600);
            })
        },
        // emit相关
        updateNowPlaying(t){
            this.nowPlaying = t // 接收播放曲目
        },
        updatePlayStatus(e){
            if(e=='playing')
                this.paused = false
            else
                this.paused = true
        },


        addNextup(t){
            this.$bus.$emit('nextupAffix',t) // 添加到nextup
        },
        pictureClick(t){
            this.$router.push({name:'trackDetail', params:{tid: t.tid}}) // 跳转到详情页
        },
        playClick(t){
            // 当前点击曲目和之前当前播放曲目相同，开始播放
            if(t.tid == this.nowTid){
                this.$bus.$emit('playTrack')
            }
            else{
                this.$bus.$emit('nextupTaken',t) // 播放当前的，其他从列表删除
            }
        },
        pauseClick(){
            this.$bus.$emit('pauseTrack')
        },
    },
    created(){
        // 初始化页数 i = 3.5   =>   pages = 3+1  
        let i = this.tracks.length / 4
        if(i%1!=0){
            i = parseInt(i)+1   //
        } 
        this.pages = i 
    },
    mounted(){
        this.$nextTick(()=>{
            this.checkVisible()
        })
        this.$bus.$on('updateNowPlaying',this.updateNowPlaying)
        this.$bus.$on('updatePlayStatus',this.updatePlayStatus)
    },
    beforeDestroy(){
        this.$bus.$off('updateNowPlaying')
        this.$bus.$on('updatePlayStatus')
    }

}
</script>

<style scoped>
.gallery{
    position: relative;
}
.title{
    margin-bottom: 24px;
    font: 26px 'microsoft yahei';
}
.track__Viewport{
    overflow: hidden;
}
/* 轮盘 */
.track__panel{
    display: flex;
    transition: transform .6s;
    position: relative;
    margin-right: -20px;
}
.track__frame{
    box-sizing: border-box;
    width: 23%;
    flex: 0 0 23%;
    padding-right: 20px;
}
.track__cover{
    width: 100%;
    padding-bottom: 78px;
    position: relative;  
}

/* 骨架 */
.track__skeleton{
    position: relative;
    padding-top: 100%;
    height: 0;
    background: #f2f2f2;
}
.skeleton__text1{
    width: 80%;
    height: 10px;
    margin-top: 5px;
    background: #f2f2f2;
}
.skeleton__text2{
    width: 30%;
    height: 10px;
    margin-top: 5px;
    background: #f2f2f2;
}

/* 图片 */
.track__{
    position: relative;
    padding-top: 100%;
    height: 0;
    cursor: pointer;
}
.play__now{
    position: absolute;
    width: 55px;
    height: 55px;
    background: #ff5500;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 2;
}
.play__now::before{
    content: "";
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE4cHgiIGhlaWdodD0iMjlweCIgdmlld0JveD0iMCAwIDE4IDI5IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4yLjIgKDk5ODMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPlBsYXkgNjA8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4KICAgICAgICA8ZyBpZD0iYnV0dG9ucyIgc2tldGNoOnR5cGU9Ik1TQXJ0Ym9hcmRHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2NjUuMDAwMDAwLCAtODE4LjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTY2NSw4NDcgTDE2NjkuMTUzODUsODMyLjUgTDE2NjUsODE4IEwxNjgzLDgzMi41IEwxNjY1LDg0NyBaIiBpZD0iUGxheS02MCIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+);
    background-size: 40% 60%;
    background-position: 60%;
    background-repeat: no-repeat;
    opacity: 1;
    cursor: pointer;
}
.pause__now{
    position: absolute;
    width: 55px;
    height: 55px;
    background: #ff5500;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 2;
}
.pause__now::before{
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE4cHgiIGhlaWdodD0iMjdweCIgdmlld0JveD0iMCAwIDE4IDI3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4yLjIgKDk5ODMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPlBhdXNlIDYwPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9ImJ1dHRvbnMiIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzQxLjAwMDAwMCwgLTgxOC4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE3NTIsODE4IEwxNzUyLDg0NSBMMTc1OSw4NDUgTDE3NTksODE4IEwxNzUyLDgxOCBaIE0xNzQxLDgxOCBMMTc0MSw4NDUgTDE3NDgsODQ1IEwxNzQ4LDgxOCBMMTc0MSw4MTggWiIgaWQ9IlBhdXNlLTYwIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=);
    background-size: 42% 56%;
    background-position: 50% 48%;
      content: "";
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-repeat: no-repeat;
}
.play__actions{
    position: absolute;
    width: 100%;
    height: 50px;
    background: linear-gradient(to bottom, transparent, rgba(0,0,0,.4));
    bottom: 0;
    color: #fff;
    text-align: center;
    font-weight: bold;
    line-height: 50px;
    font-size: 16px;
    z-index: 10;
}
.play__actions:hover{
    color: #ffb482;
}
.hoverTrack-enter-active{
    animation: fade reverse .3s;
}
.hoverTrack-leave-active{
    animation: fade .3s;
}
@keyframes fade {
    from{opacity: 1;}
    to{opacity: 0;}
}

.track__text{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: normal;
}
.text__bigger{
    color: #333;
    font-size: 14px;
    margin-top: 5px;
}
.text__smaller{
    font-size: 12px;
    color: #999;
}

/* 挡板，事件触发 */
.gallery__forward{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 92%;
    cursor: pointer;
}
.gallery__backward{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 96%;
    cursor: pointer;
}
/* 前进 后退按钮 */
.gallery__button{
    position: absolute;
    min-width: 25px;
    width: 32px;
    height: 32px;
    top: 0;
    bottom: 28px;
    border-radius: 3px;
    background-color: #fff;
    cursor: pointer;
    box-sizing: border-box;
    margin: auto;
    border: 1px solid #e5e5e5;
}
.icon__backward::before{
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 6px;
    height: 6px;
    border-top: 1px solid #333;
    border-right: 1px solid #333;
    transform: rotate(-135deg) translate(-2px, 2px);
}
.icon__forward::before{
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 6px;
    height: 6px;
    border-top: 1px solid #333;
    border-right: 1px solid #333;
    transform: rotate(45deg) translate(-1px, 1px);
}
/* 悬浮变色 */
.gallery__backward:hover .gallery__button,
.gallery__backward:hover .icon__backward::before,
.gallery__forward:hover .gallery__button,
.gallery__forward:hover .icon__forward::before {
    border-color: #ff6a1f;
}

.trackControl-enter-active{
    animation: fade reverse .1s forwards;
}
.trackControl-leave-active{
    animation: fade .1s forwards;
}
@keyframes fade {
    from{opacity: 1;}
    to{opacity: 0;}
}


</style>
