<template>
  <div>
    <!-- 
      接下来是做Upload：上传歌曲/播放列表
      需要一个歌曲数据库，存放一些基本信息；
      这个数据维护在App这种地方的话需要频繁通信，所以应该是用vuex会好一些，读的时候就从this.$store中取，写的时候就调用action；
      做这个是为了能主动给歌曲库添加歌曲，还有就是回顾一下vuex；

      写一个表单，在里面可以输入给歌曲定义的属性，还有比较关键用来展示的preview_start属性，这个属性在Trend展示的时候比较关键，当然只是美化而不是必要信息，所以不强制填写。Trend读不到这条属性就只展示图片和名字就好了，不放动画；

      感觉还是要提一下trend ，不然这个项目没有什么目的性了；Trend读取state中的数据，一页的个数写死，然后读第几页的内容，第几页传给actions，然后读出来的列表展示，如果看第一页的话就有swiper了，swiper是选id前三的，排名是我乱编的。
      如果确定track的预览属性在，就要去拿音频文件，这上面的整个过程都是在播放loading，当文件都准备好了才会渲染出来，业务角度的话就算给前三留了点悬念；

      所以这个upload的业务逻辑就很简单了，填一些资源获取的链接，组成对象，然后保存到state中。
      之后就可以考虑做Trend，顺便把搜索给做了。
      然后就可以开始完善我这个playbar的nextup，调顺序，单曲循环，前后调整，由playbar自己维护这个nextup列表。
      看看lrc文件做歌词滚动，再看看webAudio做频谱图。
     -->
    <ul class="guide__container">
      <li class="selected">Track</li>
      <li>Playlist</li>
      <li>Edit</li>
    </ul>
    <div class="upload__form">
      <input type="text"><br>
      <input type="text"><br>
      <input type="text"><br>
      <input type="text"><br>
      <button @click="doaction">doaction</button>

    </div>

    <div style="display:none;">
     Upload   -- 维护一个track列表
      添加一个track对象到state中
      添加一个trackList到state中

      Track:{
        releaseTime发布时间,
        title标题,
        audio存储地址,
        poster存储地址,
        preview__start开始时间,
        comments:[{
          at时间戳,
          content评论内容,
        }]
      } 
    </div>
    {{track.trackname}} 
        computed:{
        personAbout(){
            return this.$store.state.personAbout
        },
        countAbout(){
            return this.$store.state.countAbout
        },
        // ...mapState(['personAbout','countAbout']),     
        len1(){
            return this.$store.getters['personAbout/len'] //getters.personAbout/len 
        }
        // ...mapGetters({len1:'personAbout/len'}) 
    },
    methods: {
        add(){
            this.$store.dispatch('countAbout/add',3)
        },
        addMu(){
            this.$store.commit('countAbout/ADD',114)
        }

    },

     
  </div>
</template>

<script>
export default {
  computed:{
    track(){
      return this.$store.state.track
    }
  },
  methods:{
    
  },
  mounted(){
    console.log(this.track.trackList)
  }
}
</script>

<style scoped>
.guide__container{
  width: 100%;
  height: 49px;
  background: #fff;
  border: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}
ul{
  margin: 0;
  padding: 0;
}
li{
  position: relative;
  display: inline-block;
  list-style-type: none;
  margin: 0 20px;
  height: 100%;
  line-height: 49px;
  cursor: pointer;
}
.selected{
  color: #ff5500;
}
.selected::before{
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0;
  background: #ff5500;
}
.upload__form{
  width: 100%;
  height: 700px;
  background: #fff;
}


</style>