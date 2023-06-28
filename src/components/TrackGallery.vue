<template>
  <div class="gallery">
        <div class="title">{{title}}</div>
        <div class="track__Viewport" ref="viewport">

            <!-- 滚动面板 -->
            <div class="track__panel" :style="{transform: `translateX(${nowX}px)`}">
                <!-- 一首乐曲 -->
                <div class="track__frame" v-for="(t, idx) in tracks" :key="t.tid" ref="items">
                    <div class="track__cover">     
                            <!-- 小于visitedIdx 在可视范围内 -->                         
                        <div class="track__" @mouseenter="focusIdx=idx" @mouseleave="focusIdx=-1" @click="pictureClick" v-if="idx <= visitedIdx">
                            <TrackArtwork style="position:absolute;width:100%;height:100%;top:0;" :imgURL="t.img_url"/>
                            <div class="play__now" v-show="focusIdx==idx" @click.stop="playClick"></div>
                            <div class="play__actions" v-show="focusIdx==idx" @click.stop="addNextup"></div>
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
            <div class="gallery__backward" @mouseenter="ready2Left" @click="goLeft" v-show="hasBackward" :style="hasForward ? 'right:96%' : 'right:92%'">
                <div class="gallery__button icon__backward"></div>
            </div>
            <div class="gallery__forward" @mouseenter="ready2Right" @click="goRight" v-show="hasForward" :style="hasBackward ? 'left:96%' : 'left:92%'">
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
        }
    },
    props:{
        title: String,
        isPlaylist : Boolean,       // 列表的每一项是否是单曲
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
                this.$nextTick(()=>{
                     this.checkVisible() 
                })
            },
            immediate: true
        },
       
    
    },
    methods:{
        playClick(){
            console.log('点击播放按钮')
        },
        addNextup(){
            console.log('添加到nextup')
        },
        pictureClick(){
            console.log('点击图片')
        },
        ready2Left(){
            if(this.moving) return
            this.$nextTick(()=>{
                this.nowX += 15
                setTimeout(() => {
                    this.nowX -= 15
                }, 200);
            })     
        },
        ready2Right(){
            if(this.moving) return
            this.$nextTick(()=>{
                this.nowX -= 15
                setTimeout(() => {
                    this.nowX += 15
                }, 200);
            })
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
        // 检查元素是否可见
        checkVisible(){
            let window_left = this.$refs.viewport.getBoundingClientRect().left
            let window_width = this.$refs.viewport.getBoundingClientRect().width
            let items = this.$refs.items

            setTimeout(() => {
                for(let i=0; i<items.length; i++){
                    let item_left = items[i].getBoundingClientRect().left
                    if(item_left - window_left < window_width){
                        if(i > this.visitedIdx){
                            this.visitedIdx = i
                        }    
                    }
                }
            }, 600);
            
        }
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
    transition: opacity .3s;
    opacity: 1;
    cursor: pointer;
}
.play__actions{
    position: absolute;
    width: 100%;
    height: 50px;
    background: linear-gradient(to bottom, transparent, rgba(0,0,0,.4));
    bottom: 0;
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



</style>
