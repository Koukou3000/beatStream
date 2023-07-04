<template>
    <!-- 按照特定排序方式获取评论 -->
    <div class="commentList" ref="commentList">
        
        <div class="emptyComments" v-if="total==0">
            <div class="empty__img"></div>
            <h3>看起来有些冷清？</h3>
            <h4>留下评论，使它有更多被听到的机会</h4>
        </div>
        <div v-else>
            <div class="commentList__header">
                <span style="color:#999">共 {{total}} 条评论</span> 
                <div class="selectWrapper">
                    <button class="sortBtn" @click="showSelect" @blur="hideSelect">排序：{{sortTypeShown}}</button>
                    <ul v-show="showPanel" class="sort__panel">
                        <li :class="{selected: sortType=='newest'}" @mousedown="changeSortType('newest')">最新</li>
                        <li :class="{selected: sortType=='oldest'}" @mousedown="changeSortType('oldest')">最早</li>
                        <li :class="{selected: sortType=='tracktime'}" @mousedown="changeSortType('tracktime')">时间轴</li>
                    </ul>
                </div>
            </div>
            <ul class="commentList__body" v-if="list">
                <li class="comment__itemWrapper" v-for="(c,idx) in list" :key="idx">
                    <div class="comment__data">
                        <div class="comment__userAvatar"></div>
                        <div class="comment__content">
                            <div style="font-size: 12px;">
                                <span style="color:#999">{{c.user_name}}</span>
                                <span style="color:#ccc"> at </span>
                                <span class="jumpable__time" @click="singalJump(c)">{{c.timestamp | minuteAndSec}}</span>
                            </div>
                            <div>{{c.body}}</div>
                        </div>
                        <div class="comment__meta">{{c.created_at | datetimeToRelate}}</div>
                    </div>
                </li>
            </ul>
            <div v-if="loading && total!=0" class="loading">
                <img src="@/assets/detail/loader.gif" alt="">
            </div>
            <div v-if="!loading && page>=pages" class="loadend"></div>

        </div>      
    </div>
</template>

<script>
export default {
    props:['tid'],
    data(){
        return{
            loading: false,         // 是否在加载评论
            total: '...',           // 总评论数
            list: [],           
            page: 1,                // 当前页数
            pages: 114,             // 总页数        

            //排序用
            sortType: 'newest',     // 顺序、倒序、乐曲时间
            showPanel: false,   // 评论类型 选择面板
        }
    },
    computed:{
        sortTypeShown(){
            switch(this.sortType){
                case 'newest': return '最新';
                case 'oldest': return '最早';
                case 'tracktime': return '时间轴';
                default : break;
            }
            return '未选择'
        }
    },
    mounted(){
        // 加载后读取第一页
        addEventListener('scroll',this.handleScroll)
        this.requestData()
    },  
    methods:{
        // 修改列表排序规则
        showSelect(){
            if(this.showPanel) 
                this.showPanel = false
            else
                this.showPanel = true
        },
        hideSelect(){
            this.showPanel = false 
        },
        changeSortType(type){
            // 刷新列表
            if(!this.loading){
                this.list = []
                this.page = 1
                this.pages = 114
                this.total = '...'
                this.sortType = type
                this.requestData()
            }
        },

        //  发送跳转至某一秒的信号
        singalJump(comment){
            this.$bus.$emit('jumpToSeconds', comment.timestamp)
        },
        handleScroll(){
            this.$nextTick(()=>{
                if(!this.$refs.commentList) return
                let section = this.$refs.commentList.getBoundingClientRect().bottom
                let viewport = window.innerHeight
                // 页面出现在视窗
                if(section <= viewport){
                    this.requestData()
                }
            })
        },
        requestData(){        
            if(this.total==0) return
            if(!this.loading && this.page < this.pages){ // 如果没有在加载，就开始加载新内容
                // 发送请求     
                this.loading = true // 播放动画
                let ret = this.$store.dispatch('comments/getComments',{
                    tid:  this.tid, 
                    page: this.page,
                    sortType: this.sortType
                })
                // 再对收到的数据做响应
                setTimeout(() => {
                    ret.then((res)=>{
                        this.total = res.total
                        this.pages = res.pages
                        if(res.page == this.page){
                            this.page++
                        }
                        this.list = this.list.concat(res.data) // 拼接数组
                        this.loading = false
                    })
                }, 1000);
              
            }
        }
    },
    filters:{
        minuteAndSec(str){
            let min = Math.floor(str/60)
            let sec = str % 60
            if(sec < 10) sec = '0'+sec
            return min+":"+sec
        },
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
            return '刚刚'
        }
    }
}
</script>

<style scoped>
/* 无回复，提示 */
.emptyComments{
    text-align: center;
    padding: 40px 0;
}
.empty__img{
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAMAAADnYz6mAAAAQlBMVEUAAAD09PTz8/P19fX19fXr6+vt7e319fX19fXx8fH09PT19fX19fX09PT09PS/v7/09PTMzMz19fX09PTz8/P19fXpFaatAAAAFXRSTlMAd1Uzxg0Ox8U4WvT4jKYEpwXEjhaS10p/AAABSklEQVR4XuzPuQ2AMAAEsKNNIh6h7L8qS9CcZG/gXOOoNp6cu9ydtcut7HoKP1BQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCYu9zMu8t91c+7DQIxAMBQEx+fFDQI9l+VjvoUCSn2AtZ7whwnuiwfXuO/TU7mquBxZZPMC3BZECccGwkwL8C8APMCzAswL8C8APMCzAswL8C8APMCzAswL8C8APMCzAswL8C8APMCzAswL8C8APMCzAswL8C8APMCzAswL8C8APMCXBAUCMeNUOYFmBdgXoB5AeYFmBdgXoB5AeYFmBdgXoB5AeYF+BPECfewAPMCzAswL8C8APMC3hsLvt9F8VIcwPHcAAAAAElFTkSuQmCC);
    background-size: 194px 195px;
    height: 195px;
    width: 240px;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: 50% 50%;
}
h3{
    font-size: 18px;
    margin: 18px 0 0;
    font-weight: 400;
}
h4{
      font-size: 18px;
    margin: 8px 0 0;
    font-weight: 100;
}

/* 评论：顶部填充 */
.commentList__header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 7px;
     border-bottom: 1px solid #f2f2f2;
}


/* 评论样式 */
ul{
    margin: 0;
    padding: 0;
}
li{
    list-style: none;
}
.comment__itemWrapper{
    padding: 10px 10px 10px 0;
}
.comment__data{
    display: flex;
}
.comment__userAvatar{
    height: 40px;
    width: 40px;
    background: #ccc;
    border-radius: 50%;
    margin-right: 10px;
}
.comment__content{
    flex: 1 0;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    color: #333;
}
.jumpable__time{
    color: #999;
    cursor: pointer;
    text-decoration: underline;
}
.jumpable__time:hover{
    color: #333;
}
.comment__meta{
    color: #999;
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 12px;
}

/* 加载中，加载结束提示 */
.loading{
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loadend{
    position: relative;
    height: 14px;
    /* margin: 30px 0 0; */
    display: flex;
    border-top: 1px solid #f2f2f2;
    justify-content: center;
}
.loadend::after{
    position: absolute;
    content: '没有更多内容了！';
    text-align: center;
    top: -10px;
    display: inline;
    background: #fff;
    padding: 0 10px;
    color: #999;
}


/* 评论类型控制 */
.sortBtn{
    border: 1px solid #f50;
    cursor: pointer;
    color: #f50;
    text-align: left;
    text-overflow: ellipsis;
    border-radius: 4px;
    padding: 5px 25px 5px 10px;  
    transition: .1s;
    position: relative;
    background: #fff;
}
.sortBtn::after{
    position: absolute;
    content: '';
    width: 5px;
    height: 5px;
    border-right: 1px solid #f50;
    border-bottom: 1px solid #f50;
    right: 10px;
    top: 10px;
    transform: rotate(45deg);
}
.sortBtn:hover{
    color: #f2f2f2;
    background: #f50;
}
.sortBtn:hover::after{
    border-color: #f2f2f2;
}
.sortBtn:focus{
    outline: none;
    box-shadow: 0 0 0 4px #e5e5e5;
}
.selectWrapper{
    position: relative;
}
.sort__panel{
    position: absolute;
    left: 0;
    background: #fff;
    padding: 10px 0;
    box-shadow: 0 1px 8px rgba(0,0,0,.2);
}
.sort__panel li{
    display: block;
    cursor: pointer;
    padding: 0 15px;
    line-height: 28px;
}
.sort__panel li:hover{
    color: #ff5500;
}
.selected{
    color: #ff5500;
}

</style>