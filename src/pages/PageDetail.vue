<template>
   <div class="page__container">
        <div class="content">
            <!-- 上半部分，歌曲播放，tag -->
            <div class="listen__hero">
                <div class="fullHero__container" v-if="track">
                    
                    <div class="fullHero__foreground" >
                        <div class="fullHero__artwork">
                            <TrackArtwork style="width:100%;height:100%" :imgURL="track.img_url"/>
                        </div>
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
                            <div class="info__release">{{track.release_time | datetimeToRelate}}</div>
                            <div class="info__tag" v-if="track.tag"># {{track.tag | firstTag}}</div>
                        </div>
                        <!-- 波形图进度条 -->
                        <div class="fullHero__playerArea">
                            <div class="waveformWrapper" :style="{opacity: paused ? 0.5 : 1}">
                                <!-- <div class="waveform__shorter"></div> -->
                                <div class="waveform__longer" :style="{width: `${progressPercent}%`}"></div>
                                <div class="waveform__under"></div>
                            </div>

                            <!-- 时间轴评论  -->
                            <div class="commentWrapper" :key="track.tid" ref="commentsLine">
                                <ul class="commentQueue" :style="{opacity: readyComment?'0.3':'1'}">
                                    <li class="user__thumbnail" v-for="c in threadComments" :key="c.timestamp" @click="copyTimeReady(c.timestamp)"
                                    :style="{left: `${c.leftPadding}%`}"></li>
                                </ul>
                                <!-- 鼠标上移显示commentPop................................................................................................ -->
                                <transition name="showComment">
                                    <div class="commentPop" v-if="colm!=-1">
                                        <!-- 当进度条过半时，方向翻转 -->
                                        <div :class="{'comment__locate':true, 'stickRight':threadComments[colm].timestamp >= duration/2}" 
                                              :style="{left: `${threadComments[colm].leftPadding}%`}">
                                            <span :class="threadComments[colm].timestamp >= duration/2 ? 'comment__usernameRight':'comment__username'">
                                                {{threadComments[colm].user_name}}
                                            </span>
                                            <span class="comment__body">{{threadComments[colm].body}}</span>
                                        </div>
                                    </div>
                                </transition>
                                <div class="my__thumbnail" :style="{left:`${myCommentPaddingLeft}%`}"></div>
                            </div>
                        </div>
                    </div>
                    <!-- canvas抽取背景颜色 -->
                    <div class="backgroundGradient" style="background: linear-gradient(135deg, rgb(33 33 33) 0%, rgb(155 155 155) 100%)"></div>
                    
                </div>
            </div>


            <!-- 用户请求，歌曲信息 -->
            <div class="listen__wrapper">
                <div class="about__main">     
                    <div class="about__rows">

                        <div class="about__row">
                            <div class="comment__rightnow" @click.stop="timelineReady">                       
                                <input type="text" class="comment__input" placeholder="在这评论" ref="commentInput" @blur="cancelReady" v-model="myCommentBody"/>        
                                <div :class="readyComment?'commentBtn__active':'commentBtn'" @click.stop="writeComment">评论</div>         
                            </div>
                            <!-- <div class="other__actions">其他操作</div> -->
                        </div>

                        <div class="about__row">
                            <div class="about__left">
                                <div class="artistFigure">
                                    <svg t="1688305627265" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3473"
                                     width="120" height="120"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 160c70.4 0 128 57.6 128 128s-57.6 128-128 128-128-57.6-128-128 57.6-128 128-128z m236.8 507.733333c-23.466667 32-117.333333 100.266667-236.8 100.266667s-213.333333-68.266667-236.8-100.266667c-8.533333-10.666667-10.666667-21.333333-8.533333-32 29.866667-110.933333 130.133333-187.733333 245.333333-187.733333s215.466667 76.8 245.333333 187.733333c2.133333 10.666667 0 21.333333-8.533333 32z"
                                      fill="#ccc" p-id="3474"></path></svg>
                                    
                                </div>
                                <div class="artistName" v-if="track">{{track.artist}}</div>
                            </div>
                            <div class="about__right">
                                <div class="aboutTrack">
                                    歌曲介绍（对象属性）<br>
                                    《 》.........., .........「 」..., ...........「 」，.......。...........「 」
                                    ....., .........、........, .......... , ........, ....「 」....
                                </div>
                                <CommentList v-if="track" :tid="track.tid" :key="track.tid"/>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 歌词 -->
                <div class="listenLyric">
                    <div class="words__box">
                        <div style="line-height: 300px;" v-if="!localLRC">无歌词</div>
                        <div class="words__container"  ref="wordsContainer" :style="{transform: `translateY(${-line*60}px)`}" v-else>
                            <div class="words__padding">歌词</div>
                            <span v-for="(o, idx) in localLRC" :key="o.time" :style="{color:line==idx?'#ff5500':'#000', fontWeight:line==idx?'bold':'normal'}">
                                {{o.words}}                   
                            </span>
                        </div>
                    </div>           
                </div>

            </div>
        </div>
   </div>
</template>

<script>
import TrackArtwork from '@/components/TrackArtwork.vue'
import CommentList from '@/components/CommentList.vue'
export default {
    components:{TrackArtwork, CommentList},
    data(){
        return{
            // pageDetail 可能控制：进度条、播放 | 暂停
            track: null,            // 歌曲详情（用于页面内容加载
            nowPlaying: {tid: -1}, // playbar当前播放曲目
            paused: true,

            current: 0,             // 当前播放位置
            duration: 114,          // 总时长
            localLRC: null,         // map对象，时间key，歌词value
            autoScroll: true,   
            line: -1,               // 歌词的当前行数

            threadComments: null,      // 在进度条下的评论
            colm: -1,                  // 当前显示的评论索引
            
            readyComment: false,
            myCommentTime: 0,           // 当前用户评论的时间戳 （点击其他用户头像，点击评论框时更新），调用readyToComment()
            myCommentBody: '',
        }
    },
    computed:{
        myCommentPaddingLeft(){
            if(!this.readyComment) return -100  // 隐藏
            let length = this.durationToSec(this.track.duration) //总时长
            return this.myCommentTime * 100 / length // 当前时间 / 总时长
        },
        progressPercent(){
            if(this.nowPlaying && this.track && this.nowPlaying.tid==this.track.tid)
                return this.current*100 / this.duration // 进度条进度
            else return 0
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
        // 评论相关 ，可以回复的状态称为 Ready
        copyTimeReady(t){
            if(!this.readyComment){
                this.readyComment = true
                this.myCommentTime = t // 点击用户头像时更新
                this.$nextTick(()=>{
                    this.$refs.commentInput.focus()
                })
            }
        },
        timelineReady(){
            if(!this.readyComment){
                this.readyComment = true
                this.myCommentTime = this.current // 点击评论框时更新
            }
        },
        cancelReady(){
            this.readyComment = false // 取消显示
        },
        writeComment(){
            // 检查评论是否为空
            if(this.myCommentBody.trim().length==0){
                this.$notify.warning({
                    title: '评论失败',
                    message: '评论内容为空',
                    position: 'bottom-left',
                    offset: 50
                })
            }
             // 发送数据
            else{
                this.$store.dispatch('comments/appendComment',{
                    tid: this.track.tid,
                    comment:{
                        body: this.myCommentBody,
                        timestamp : this.myCommentTime+0.001,
                        created_at: this.formateTimeStamp(new Date().getTime()),
                        user_name: '我',
                    }
                }).then(res=>{
                    // vuex的数据已经发生更新，此时再获取数据
                    if(res.code == 0){
                        this.$notify.success({
                            title: '添加评论成功',
                            message: '刷新评论列表...', 
                            position: 'bottom-left',
                            offset: 50
                        })
                        this.$bus.$emit('initCommentList')
                        this.loadComments()
                        this.myCommentBody = ''
                    }
                })
            }
        },
        formateTimeStamp(time){
            let date = new Date();
            date.setTime(time);
            let year = date.getFullYear();
            let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            let hour = date.getHours()< 10 ? "0" + date.getHours() : date.getHours();
            let minute = date.getMinutes()< 10 ? "0" + date.getMinutes() : date.getMinutes();
            let second = date.getSeconds()< 10 ? "0" + date.getSeconds() : date.getSeconds();
            return year + "-" + month + "-" + day+" "+hour+":"+minute+":"+second;
        },     

        // 当滚动条划过用户头像时，显示他的评论
        showComment(){
            if(!this.threadComments) return // 没有评论，返回
            if(this.nowPlaying.tid != this.track.tid) return // 播放中tid对不上页面，不需要显示
            
            let show = false
            for(let i=this.threadComments.length-1; i>=0; i--){     
                let t = this.threadComments[i].timestamp  // 获得这条乐曲的时间戳
                //  t  <= 当前时间 < t + 3s  => 显示
                if(t <= this.current && this.current < t+3){ 
                    this.colm = i
                    show = true // 有一个触发，就显示内容，如果没有人触发，就隐藏
                }               
            }
            if(!show)
                this.colm = -1
        },
        // 加载进度条评论
        loadComments(){
            this.threadComments = null
            this.$store.dispatch('comments/get200Comments',{tid: this.track.tid}) // 获得两百条评论
            .then(res=>{
                if(res.total > 0){
                    let comments = res.data // 获得评论数据
                    // 根据时间戳放置用户小图标；
                    this.$nextTick(()=>{
                        let trackDuration = this.durationToSec(this.track.duration)
                        
                        for(let i=0; i<comments.length; i++){
                            let c = comments[i].timestamp
                            let toLeft = c * 100 / trackDuration // 计算 当前时间戳 / 乐曲长度 得到的比例
                            comments[i].leftPadding = toLeft // 将评论的用户头像绘制在 left: 比例           
                        }
                        // 按时间戳顺序排序
                        comments = comments.sort((a,b)=>{
                            return  a.timestamp - b.timestamp
                        })
                        this.threadComments = comments // 数据调整完，更新界面
                    })
                } 
           })      
        },
        durationToSec(str){
            let ans = 0
            let re = /(\d+):(\d+)/
            let a = str.match(re)
            // console.log(a)
            if(a.length >= 3){          
                let minute = a[1]
                let sec = a[2]
                ans = Number(minute*60) + Number(sec)
            }
            return ans
        },

        //歌词滚动
        scrollLyric(){
            // 更新歌词的当前行数
            if(!this.localLRC) return // 没有歌词不需要滚动
            if(this.nowPlaying.tid != this.track.tid) return // 播放中tid对不上页面，不需要滚动
            for(let i=0; i<this.localLRC.length ; i++){

                // 大于某一条，小于后一条  就是当前的一段歌词
                if(this.current >= this.localLRC[i].time){ 
                    // i+1 && 避免访问数组越界
                    if(i+1 < this.localLRC.length && this.current < this.localLRC[i+1].time){ 
                        this.line = i
                        return
                    }
                    // 当这一条是最后一条的时候，那直接切换
                    else if(i+1 == this.localLRC.length){ 
                        this.line = i
                        return
                    }
                }
            } 
        }, 
        loadLyric(){
            //加载歌词到 localLRC
            this.localLRC = null
            let ans = []
            if(!this.track.lyric) return
            else{
                let str = atob(this.track.lyric) // 解码后
                let lines = str.split('\n') // 按行分隔
                let regex = /\[(\d+:\d+.\d+)\](.*)/ // [01:14.514] *words*
    
                for(let i=0; i<lines.length; i++){
                    let line = lines[i].match(regex)
                    if(line){ // 匹配到了内容
                        if(line.length >= 3){
                            let time = line[1]  
                            time = this.timeToSeconds(time) // 123.456
                            let words = line[2]     
                            if(words){
                                // console.log(time, '-' ,words)
                                ans.push({time,words})
                            }
                        }
                    }
                }
                ans.sort((a,b)=>{a.time-b.time}) // 保证列表中的内容是按时间顺序排序的    
            }    
            // console.log(ans)
            this.localLRC = ans
        },
        // 01:20.30 => 80.30 ，方便timeupdate对比时间戳
        timeToSeconds(str){
            let ans = 0
            let reg = /(\d+):(\d+\.\d+)/
            let a = str.match(reg)
            
            if(a.length >= 3){
                let minute = a[1] // 分钟数
                let sec = a[2]      // 秒数
                ans = Number(minute*60) + Number(sec)
            }
            return ans
        },

        // 播放按钮
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

            // 更新歌词滚动
            this.scrollLyric()
            // 更新评论显示
            this.showComment()
        },
        updateNowPlaying(track){
            this.nowPlaying = track // 接收播放曲目
        },
        updatePlayStatus(stat){
            this.paused = stat
        },
        jumpToSeconds(time){
            this.playClick()
            this.$bus.$emit('adjustTime', time)
        },
    },
    mounted(){
        this.track = this.$store.getters['track/getTrackDetail'](this.$route.params.tid) // 需要用到的内容读入track 
        document.title = 'Stream "'+this.track.title+'" by '+this.track.artist 
        
        // 来自 $route.push，进入时判断当前播放状态的参数
        this.paused = this.$route.params.playStatus
        this.nowPlaying = this.$route.params.nowPlaying
        this.loadLyric()  //打开时加载歌词
        this.loadComments() // 加载进度条下的评论

        // 接收来自playbar的更新  
        this.$bus.$on('trackProgress',this.trackProgress) 
        this.$bus.$on('updateNowPlaying', this.updateNowPlaying)
        this.$bus.$on('updatePlayStatus', this.updatePlayStatus)
        // 接收来自commentList的更新
        this.$bus.$on('jumpToSeconds', this.jumpToSeconds)
    },

    beforeDestroy(){
        this.$bus.$off('trackProgress')
        this.$bus.$off('updateNowPlaying')
        this.$bus.$off('updatePlayStatus')
        this.$bus.$off('jumpToSeconds')
    },  
    beforeRouteUpdate(to, from, next){
         // mounted只调用一次，参数变化时也能刷新页面
        this.track = this.$store.getters['track/getTrackDetail'](to.params.tid) 
        document.title = 'Stream "'+this.track.title+'" by '+this.track.artist

        this.loadLyric() // 更新歌词
        this.loadComments() // 加载进度条下的评论
        next()

    
    },

    filters:{
         // 时间格式转为 x分钟前 x小时 x天前 x月前 x年前
        datetimeToRelate(str){
            let comTime = new Date(str).getTime()
            let nowTime = new Date().getTime()
            let diff = nowTime - comTime
            let sec = Math.floor(diff/1000)
            let min = Math.floor(sec/60)
            let hour = Math.floor(min/60)
            let day = Math.floor(hour/24)
            let month = Math.floor(day/30)
            let year = Math.floor(month/12)
            if(year>0) return  year+'年前'
            else if(month>0) return month+'月前'
            else if(day>0) return day+'天前'
            else if(hour>0) return hour+'小时前'
            else if(min>0) return min+'分钟前'
            else if(sec>0) return sec+'秒前'
            return '未知'
        },
        firstTag(tagStr){
            let arr = tagStr.split(';')
            let firstTag = arr.filter(item => item.trim().length > 0)[1]
            if(firstTag) return firstTag
            else return 'unknown'            
        },
    }
 
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
    background: #e5e5e5;
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
    /* cursor: pointer; */
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
    background: #bebebe;
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

/* 进度条的评论 */
.commentWrapper{
    position: absolute;
    width: 100%;
    height: 30px;
    bottom: 30px;
    z-index: 1;
    border-top: 1px solid black;
}
.commentQueue{
    position: absolute;
    width: inherit;
    height: 20px;
    padding: 0;
    top: 0;
    margin: 0;
    list-style: none;
    transition: .3s;
}
.user__thumbnail{
    position: absolute;
    width: 20px;
    height: 20px;
    background: #666;
    border-left: 1px solid #f70;
}
.showComment-enter-active{
    animation: dropdown .3s forwards;
}
.showComment-leave-active{
    animation: dropdown reverse .3s forwards;
}
@keyframes dropdown {
    from{
        transform: translateY(-10px);
        opacity: 0;
    }
    to{
        opacity: 1;    
    }
}
.commentPop{
    position: absolute;
    top: 15px;
    width: 100%;
    height: inherit;
    float: right;
}
.comment__locate{
    position: absolute;
    display: flex;
}

/* 用户名 - 评论内容 */
.stickRight{
    display: flex;
    flex-direction: row-reverse;
    transform: translateX(-100%);
}
.comment__username{
    padding: 10px 0 0 10px;
    color: #ff5500;
    display: inline-block;
    max-width: 100px;
    white-space: nowrap; /* 设置单行显示 */
    overflow: hidden;
    text-overflow: ellipsis; /* 使用省略号隐藏超出内容 */
}
.comment__username::before{
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 1px;
    display: block;
    background-image: linear-gradient(rgba(255,85,0,.95),rgba(255,85,0,.1));
}
/* 评论内容 - 用户名 */
.comment__usernameRight{
    padding: 10px 10px 0 10px;
    color: #ff5500;
}
.comment__usernameRight::before{
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 1px;
    display: block;
    background-image: linear-gradient(rgba(255,85,0,.95),rgba(255,85,0,.1));
}
.comment__body{
    padding: 10px 0 0 10px;
    color: #fff;
    max-width: 200px;
    white-space: nowrap; /* 设置单行显示 */
    overflow: hidden;
    text-overflow: ellipsis; /* 使用省略号隐藏超出内容 */
}




/* 歌曲详情 */
.listen__wrapper{
    position: relative;
}
.about__main{
    padding: 20px 0;
    margin-right: 400px;
    min-height: 350px;
}
.about__rows{
    padding-right: 30px;
    border-right: 1px solid #f2f2f2;
}
.about__row{
    position: relative;
    margin-bottom: 20px;    
    
}

/* 点击在当前时间戳评论 */
.comment__rightnow{
    height: 40px;
    box-sizing: border-box;
    padding: 5px;
    background: #f2f2f2;
    border: 1px solid #e5e5e5;
}
.comment__input{
    width: 100%;
    box-sizing: border-box;
    border-radius: 4px;
    height: 27px;
    font-size: 14px;
    padding: 0 9px;
    font-size: 14px;
    outline: none;
    cursor: pointer;
    border: 1px solid #e5e5e5;
}
.commentBtn{
    position: absolute;
    width: 50px;
    height: 25px;
    right: 0;
    margin: 7px;
    top: 0;
    text-align: center;
    line-height: 25px;
    cursor: pointer;
    background: #f2f2f2;
}
.commentBtn__active{
    position: absolute;
    width: 50px;
    height: 25px;
    right: 0;
    margin: 7px;
    top: 0;
    text-align: center;
    line-height: 25px;
    cursor: pointer;
    color: #fff;
    background: #ff5500;
}
/* 用户点击评论位置显示 */
.my__thumbnail{
    right: 0px;
    position: absolute;
    height: 20px;
    width: 20px;
    background: white;
}



.about__left{
    position: absolute;
    top: 0;
    left: 0;
    width: 120px;
}
.artistFigure{
    width: 120px;
    height: 120px;
    border-radius: 50%;
}
.artistName{
    color: #333;
    text-align: center;
}
.about__right{
    padding-left: 150px;
}

/* 歌曲介绍 */
.aboutTrack{
    margin-bottom: 10px;
    word-break: break-word;
}



/* 歌词 */
.listenLyric{
    position: absolute;
    top: 70px;
    width: 370px;
    right: 0;
}
.words__box{
    width: 100%;
    height: 300px;
    overflow: hidden;
    user-select: none;
    background-image: linear-gradient(0deg,transparent ,#eee, transparent);
    display: flex;
    justify-content: center;
}
.words__container{
    width: 90%;
    transition: .3s;
}
.words__padding{
    position: relative;
    height: 120px;
    line-height: 120px;
    text-align: center;
    font-size: 70px;
    font-weight: bold;    
    color: #5e5e5e;
}
.words__padding::before{
    content: 'Lyric';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #ccc;
    font-size: 150px;
    z-index: -1;
}
.words__container span{
    display: block;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    text-align: center;
}

</style>