<template>
   <div class="page__container">
        <div class="content">
            <!-- 上半部分，歌曲播放，tag -->
            <div class="listen__hero">
                <div class="fullHero__container">
                    
                    <div class="fullHero__foreground">
                        <div class="fullHero__artwork"></div>
                        <div class="fullHero__header">
                            <div class="header__btn pausebtn" v-if="!paused && nowTid==track.tid" @click="pauseClick"></div>
                            <div class="header__btn playbtn" v-else @click="playClick"></div>
                            <div class="header__title">
                                <div style="margin-bottom:7px">
                                    <span class="title__songname">{{trackTitle}}</span>
                                </div>
                                <div><span class="title__artist" style="">{{trackArtist}}</span></div>
                            </div>
                        </div>
                        <div class="fullHero__info">
                            <div class="info__release">1年前</div>
                            <div class="info__tag"># Pop</div>
                        </div>
                        <!-- 进度条 -->
                        <div class="fullHero__playerArea">
                            当前播放的 与 当前页面一致  当前播放比例{{progressPercent}}                      
                            <div class="waveformWrapper" :style="{opacity: paused ? 0.5 : 1}">
                                <!-- <div class="waveform__shorter"></div> -->
                                <div class="waveform__longer" :style="{width: `${progressPercent}%`}"></div>
                                <div class="waveform__under"></div>
                            </div>
                            <div class="commentWrapper"></div>
                        </div>
                    </div>
                    <!-- canvas抽取背景颜色 -->
                    <div class="backgroundGradient" style="background: linear-gradient(135deg, rgb(210, 198, 205) 0%, rgb(163, 166, 187) 100%)"></div>
                    
                </div>
            </div>


            <!-- 下半评论，其他推荐，歌曲介绍 -->
            <div class="listen__wrapper">
                <div class="about__main">     
                    <div class="about__rows">

                        <div class="about__row">
                            撰写评论<br>
                            like share affixNextup          |           1.14K stream   1919 like    514 share
                        </div>
                        <div class="about__row">
                            <div class="about__left">
                                <div v-if="track">{{track.artist}}</div>
                               
                            </div>
                            <div class="about__right">
                                <div class="aboutTrack">
                                    Track list <br>
                                    Tr1.Halfway <br>
                                    Tr2.On Your Mark <br>
                                    Tr3.Scramble for Bubblegum <br>
                                    Tr4.After Hours <br>
                                    Tr5.Cult Star <br>
                                </div>
                                <div class="commentList">
                                    <div class="commentList__header">
                                        <span>共计 7 条评论</span>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="listenLyric">
                    歌词<br>
                    歌词<br>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
export default {
    data(){
        return{
            // pageDetail 可能控制：进度条、播放 | 暂停

            track: null, // 歌曲详情（用于页面内容加载
            nowPlaying: null, // playbar当前播放曲目
            paused: true,


            current: 0, // 当前播放位置
            duration: 114, // 总时长
        }
    },
    computed:{
      progressPercent(){
        return this.current*100 / this.duration
      },
      trackTitle(){
        if(!this.track) return 'unknown'
        return this.track.title
      },
      trackArtist(){
        if(!this.track) return 'unknown'
        return this.track.artist
      },
      nowTid(){
        if(!this.nowPlaying) return -1
        return this.nowPlaying.tid
      }
    },
    methods:{      
        playClick(){
            // 当前点击曲目和之前当前播放曲目相同，开始播放
            if(this.track.tid == this.nowTid){
                this.$bus.$emit('playTrack')
            }
            else{
                this.$bus.$emit('nextupTaken',this.track) // 播放当前的，其他从列表删除
            }
        },
        pauseClick(){
            this.$bus.$emit('pauseTrack')
        },

        // 响应同名事件
        trackProgress(now, dur){
            this.current = now  // 更新进度条
            this.duration = dur
        },
        updateNowPlaying(t){
            this.nowPlaying = t // 接收播放曲目
        },
        updatePlayStatus(e){
            if(e=='playing')
                this.paused = false
            else
                this.paused = true
        },
    },
    mounted(){
        this.track = this.$store.getters['track/getTrackDetail'](this.$route.params.tid) // 需要用到的内容读入track
        document.title = 'Stream "'+this.track.title+'" by '+this.track.artist 
        
        // 接收来自playbar的进更新  
        this.$bus.$on('trackProgress',this.trackProgress) 
        this.$bus.$on('updateNowPlaying', this.updateNowPlaying)
        this.$bus.$on('updatePlayStatus', this.updatePlayStatus)

        // 进入时需要判断当前播放曲目
        this.paused = this.$route.params.playStatus
        this.nowPlaying = this.$route.params.nowPlaying
    },
    beforeDestroy(){
        this.$bus.$off('trackProgress')
        this.$bus.$off('updateNowPlaying')
        this.$bus.$off('updatePlayStatus')
    },  
    beforeRouteUpdate(to, from, next){
         // mounted只调用一次，参数变化时也能刷新页面
        this.track = this.$store.getters['track/getTrackDetail'](to.params.tid) 
        document.title = 'Stream "'+this.track.title+'" by '+this.track.artist
        next()
    },
    
   
    
}
</script>

<style scoped>
.page__container{
    width: 1180px;
    padding: 0 30px; 
    background: #fff;
}

/* 播放曲目视作主角Hero，响应式全屏full */
.fullHero__container{
    height: 380px;
    margin-left: -30px;
    margin-right: -30px;
    background: #e5e5e5;
    position: relative;
    overflow: hidden;
}
.backgroundGradient{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 1;
    transition: opacity .3s;
}
/* 图片文字分区 */
.fullHero__foreground{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 30px 560px 20px 30px;
    z-index: 1;
}
/* 图片 */
.fullHero__artwork{
    top: 20px;
    right: 20px;
    width: 340px;
    height: 340px;
    position: absolute;
    background: #000;
    z-index: 1;
}


/* 按钮 */
.fullHero__header{
    display: flex; 
}
.header__btn{
    position: relative;
    width: 60px;
    height: 60px;
    margin-right: 5px;
    border-radius: 50%;
    background: #ff5500;
    cursor: pointer;
}
.header__btn:hover{
    background: #ff3300;
}
.playbtn::before{
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
}
.pausebtn::before{
    content: "";
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE4cHgiIGhlaWdodD0iMjdweCIgdmlld0JveD0iMCAwIDE4IDI3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4yLjIgKDk5ODMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPlBhdXNlIDYwPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9ImJ1dHRvbnMiIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzQxLjAwMDAwMCwgLTgxOC4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE3NTIsODE4IEwxNzUyLDg0NSBMMTc1OSw4NDUgTDE3NTksODE4IEwxNzUyLDgxOCBaIE0xNzQxLDgxOCBMMTc0MSw4NDUgTDE3NDgsODQ1IEwxNzQ4LDgxOCBMMTc0MSw4MTggWiIgaWQ9IlBhdXNlLTYwIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=);
    background-size: 42% 56%;
    background-position: 50% 51%;
    background-repeat: no-repeat;
    transition: opacity .3s;
    opacity: 1;
}

/* 标题作者 */
.header__title{
    flex: 1;
    min-width: 0;
    word-break: break-word;
    word-wrap: break-word;
}
.title__songname{
    background: rgba(0,0,0,.8);
    color: #fff;
    font-size: 24px;
    padding: 4px 7px;
    display: inline;
    font-family: Tahoma,Verdana,sans-serif,Lucida Sans,Garuda;
    line-height: 37px;/* 不同字体设定不同，目的保证换行后 黑底无间隙 */
    margin-bottom:10px;
}
.title__artist{
    display:inline;
    background: rgba(0,0,0,.8);
    color: #ccc;
    padding: 2px 7px 3px;
    font-size: 16px;
    font-family: Tahoma,Verdana,sans-serif,Lucida Sans,Garuda;
}

/* 发布时间 & 标签 */
.fullHero__info{
    position: absolute;
    top: 29px;
    right: 390px;
    text-align: right;
    color: #fff;
    font-size: 16px;
}
.info__release{
    margin-bottom: 16px;
}
.info__tag{
    height: 24px;
    padding: 0 8px;
    line-height: 24px;
    border: 1px solid #999;
    background: #999;
    border-radius: 20px;
    font-family: sans-serif;
    cursor: pointer;
}
.info__tag:hover{
    background: #666;
}


/* 波形图进度条 */
.fullHero__playerArea{
    position: absolute;
    bottom: 0;
    left: 30px;
    right: 390px;
}
.waveformWrapper{
    position: relative;
    width: 100%;
    height: 100px;
    margin-bottom: 30px;
}
.waveform__under{
    background: #fff;
    width: 100%;
    height: 100%;   
}
.waveform__shorter{
    position: absolute;
    background: #ff5500;
    height: 100%;
    width: 50%;
}
.waveform__longer{
    position: absolute;
    background: #ff550086;
    height: 100%;
    width: 70%;
}



/* 评论 */
.commentWrapper{
    position: absolute;
    width: 100%;
    height: 20px;
    background: #888;
    bottom: 30px;
    z-index: 1;
}


/* 歌曲详情 */
.listen__wrapper{
    position: relative;
}
.about__main{
    padding-top: 20px;
    margin-right: 400px;
}
.about__rows{
    padding-right: 30px;
    border-right: 1px solid #f2f2f2;
}
.about__row{
    margin-bottom: 20px;
    position: relative;

}
.about__left{
    position: absolute;
    top: 0;
    left: 0;
    width: 120px;
    background: #888;
    color: white;
}
.about__right{
    padding-left: 150px;
}

/* 歌曲介绍 */
.aboutTrack{
    margin-bottom: 10px;
}

/* 评论 */
.commentList{
    border-bottom: 1px solid #f2f2f2;
}
.commentList__header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 7px;
}

/* 歌词 */
.listenLyric{
    position: absolute;
    top: 30px;
    width: 370px;
    right: 0;
    background: #888;
    color: white;
}
</style>