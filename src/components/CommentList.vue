<template>
    <div class="emptyComments" v-if="!collections">
        <div class="empty__img"></div>
        <h3>看起来有些冷清？</h3>
        <h4>留下评论，使它有更多被听到的机会</h4>
    </div>
    <div class="commentList" v-else>
        <div class="commentList__header">
            <span style="color:#999">共 {{collections.length}} 条评论</span> 
            <div class="sortbtn">排序：最新发布</div>
        </div>

        <ul class="commentList__body">
            <li class="comment__itemWrapper" v-for="c in collections" :key="c.user_name">
                <div class="comment__data">
                    <div class="comment__userAvatar"></div>
                    <div class="comment__content">
                        <div>
                            <span style="color:#999">{{c.user_name}}</span>
                             at 
                            <span class="jumpable__time">{{c.timestamp | minuteAndSec}}</span>
                        </div>
                        <div>{{c.body}}</div>
                    </div>
                    <div class="comment__meta">{{c.created_at | datetimeToRelate}}</div>
                </div>
                
            </li>
        </ul>
        <div v-if="loading">
            加载中
        </div>
        <div v-else>
            加载结束
        </div>
    </div>
</template>

<script>
export default {
    props:['collections'],
    data(){
        return{
            sortType: 'newest', // newest, oldest, tracktime 排序的类别
            loading: false,
            already: 0,         // 已经加载的评论数
        }
    },
    mounted(){
        console.log(this.collections)
    },
    filters:{
        minuteAndSec(str){
            let min = Math.floor(str/60)
            let sec = str % 60
            if(sec < 10) sec = '0'+sec
            return min+":"+sec
        },
        // 时间格式转为 x分钟前 x天前 x月前 x年前
        datetimeToRelate(str){
            str = '///施工中///'
            return str
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
.sortbtn{
    position: relative;
    border: 1px solid #f50;
    cursor: pointer;
    color: #f50;
    text-align: left;
    text-overflow: ellipsis;
    padding: 5px 25px 5px 10px;
    border-radius: 3px;
    transition: .1s;
}
.sortbtn::after{
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    right: 11px;
    top: 11px;
    border-bottom: 1px solid #f50;
    border-right: 1px solid #f50;
    transform: rotate(45deg);
}
.sortbtn:hover{
    background: #f50;
    color: #f2f2f2;
}
.sortbtn:hover::after{
    border-bottom: 1px solid #f2f2f2;
    border-right: 1px solid #f2f2f2;
}

/* 评论列表 */
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
}
.jumpable__time{
    color: #999;
    cursor: pointer;
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
}
</style>