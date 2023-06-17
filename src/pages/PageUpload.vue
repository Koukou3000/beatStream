<template>
  <div>
    <ul class="route__container">
      <li @click="switchTab('upload')" ref="tab1" class="selected">Upload</li>
      <li @click="switchTab('edit')" ref="tab2">Edit</li>
    </ul>

    <!-- 导航下方白色背景 -->
    <div class="workbench__bg">




      <div class="upload__box" v-show="manualMode=='upload'">
          <div class="banner__edit" v-if="isEdit"></div>
          <div class="banner__upload" v-else></div>  

          <div class="box__header">
            <span class="box__tab">填写歌曲信息</span>
            <span class="new__hint" v-if="!isEdit">New!</span>
          </div>   
          <div class="box__content">
            <div class="content__left">  
              <div class="preview__img" v-if="!tmp_track.img_url"></div>           
              <div class="preview__img" v-else :style="{'background-image': 'url('+tmp_track.img_url+')'}"/>
              <div class="input__field" @click="inputFocus(5)">
                <span>封面图片</span>
                <input placeholder="url地址" v-model="tmp_track.img_url" ref="inputImgURL"/>
              </div>
            </div>
            <div class="content__right">    
              <div class="input__field" @click="inputFocus(1)">
                <span class="required__mark">标题</span>
                <input type="text" placeholder="歌曲显示的标题" v-model="tmp_track.title" ref="inputTitle"/>
              </div>
              <div class="input__field" @click="inputFocus(2)">
                <span>自定义标签</span>
                <input type="text" placeholder="以'#'分割" v-model="tmp_track.tags" ref="inputTags"/>
              </div>
              <div class="input__field" @click="inputFocus(3)">
                <span>描述</span>
                <textarea rows="6" placeholder="歌曲介绍" v-model="tmp_track.description" ref="inputDescription"></textarea>
              </div>
              <div class="input__field" @click="inputFocus(4)">
                <span class="required__mark">音频</span>
                <input type="" placeholder="url地址" v-model="tmp_track.audio_url" ref="inputAudioURL"/>  
                <div v-if="tmp_track.audio_url">
                preview片段<br>
                ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
              </div>
              </div> 
            </div>
          </div>
          <div class="box__footer">
            <button class="cancel_Btn" @click="clearForm">清空已输入</button>
            <button class="save__Btn" @click="uploadSingle">提交</button>
          </div>
      </div>


      <!-- 修改内容 -->
      <div class="edit__box" v-show="manualMode=='edit'">
        <div class="edit__header">选择编辑对象</div>
        <div class="track__container">
          
          <div class="track" v-for="(item,index) in tracksCurrentPage" :key="item.tid" @click="modifySingle(item)">
            <div :class="'track__img artwork__placeholder__'+index" :style="{'background-image':'url('+item.img_url+')'}"></div>
            <div class="track__textInfo">
              <div class="track__title">{{item.title}}</div>
              <div class="track__artist">{{item.artist}}</div>
            </div>
          </div>

        </div>
        <div class="edit__footer"></div>
        <div class="track__page">
            <ul>
              <li v-if="page>1" @click="page--">上一页</li>
              <template v-for="p in pageRange">
                <li v-if="p!=page" :key="p" @click="page=p" >{{p}}</li>
                <li v-else          :key="p" @click="page=p" class="page__selected">{{p}}</li>
              </template>
              <li v-if="pagesCount!=page" @click="page++">下一页</li>
            </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>


export default {
  data(){
    return{
      manualMode: 'upload', // upload / edit
      isEdit: false, // 本次操作是否为修改旧歌曲

      // 暂存数据
      tmp_track:{
        tid: '',
        title: '',
        artist: '',
        audio_url: '',
        img_url: '',
        releast_time: '',
        preview_start: 0, // 秒为单位，显示成 [分钟:秒]                
        tags:'',
        description: ''
      },

      page: 1, // 用于edit页
      pagesCount: 1, // 总页数
      tracksCurrentPage:[], // 这一页的歌曲列表
      pageRange: []
    }
  },
  computed:{
    track(){      
      return this.$store.state.track
    }
  },
  watch:{
    manualMode(newVal){
      // if(newVal == 'upload'){
      //   保持旧的内容不变即可
      // }
      if(newVal == 'edit'){
        this.getBunchOfTrack() // 读取页数 从state拉数据
      } 
    },
    page(newPage){
      this.page = newPage
      this.getBunchOfTrack()
    }
  },
  methods:{
    switchTab(type){
      this.manualMode = type
      switch(type){
        case 'upload':
          this.$refs.tab1.className = 'selected';
          this.$refs.tab2.className = '';
          break;
        case 'edit':
          this.$refs.tab1.className = '';
          this.$refs.tab2.className = 'selected';
          break;        
        default:
          break;
      }
    },
    inputFocus(item){
      switch(item){
        case 1: this.$refs.inputTitle.focus();break;
        case 2: this.$refs.inputTags.focus();break;
        case 3: this.$refs.inputDescription.focus();break;
        case 4: this.$refs.inputAudioURL.setSelectionRange(0,this.tmp_track.audio_url.length);
                this.$refs.inputAudioURL.focus();
                break;
        case 5: this.$refs.inputImgURL.setSelectionRange(0,this.tmp_track.img_url.length);
                this.$refs.inputImgURL.focus();
                break;
        default:break;
      }
    },
    clearForm(){
      this.tmp_track = {
        tid: -1,
        title: '',
        artist: '',
        audio_url: '',
        img_url: '',
        releast_time: '',
        preview_start: 0, // 秒为单位，显示成 [分钟:秒]     
      }
      this.isEdit = false // 如果有旧歌曲编辑，点击按钮会变成上传歌曲的情况
    },
    uploadSingle(){
      //检查表单输入
      if(this.tmp_track.title.trim().length == 0 
        || this.tmp_track.audio_url.trim().length == 0){
        this.$notify({
          title: '错误',
          message: '必填项输入为空',
          type: 'error'
        })
      }
      else{
        var track = this.tmp_track
        this.$store.commit('track/UPLOAD_SINGLE', track)
        this.clearForm()
      }
    },

    // 总页数计算
    calcPagesCount(){
      // 每页十个，计算trackList总页数
      let length = this.track.trackList.length
      let consult = Math.floor(length / 10) //商
      let remain = length % 10 //余
      if(remain > 0)
        this.pagesCount = consult + 1
      else
        this.pagesCount = consult
    },
    getBunchOfTrack(){
      console.log('getbunch')
      this.calcPagesCount() // 渲染页面前需要获取总页数
      // 通过当前的页数拉取state中数据
      let from = (this.page-1)*10
      this.tracksCurrentPage = this.track.trackList.slice(from, from+10)// 渲染到页面上 （放入tracksCurrentPage
      
      // 刷新页脚
      this.pageRange = []
      let p = this.page
      let offset = -5 //  1 = 6+(-5) ;  10 = 6+(+4)
      for(let i=0; i<9; i++){
        if(p+offset>=1    &&   p+offset<=this.pagesCount){
          this.pageRange.push(p+offset)
        }
        offset++
      }
    },
    modifySingle(item){
      // 当点击某一首歌曲，读取点击的那个 :key=tid
      // 读取trackList (index)，切换标签 upload
      this.tmp_track = item
      this.isEdit = true
      this.switchTab('upload')
    },

  },

}
</script>

<style scoped>
.route__container{
  width: 100%;
  height: 49px;
  background: #fff;
  border: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
  /* flex-direction: row-reverse; */
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
  bottom: -1px;
  background: #ff5500;
}

/* 工作区背景 */
.workbench__bg{
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
}


/* 上传 */
.upload__box{
  position: relative;
  margin: 50px 0;
  width: 60%;
  background: #fff;
  box-shadow: 0 0 4px 4px rgb(242,242,242);
}
.new__hint{
  position: absolute;
  border: 1px solid #ff5500;
  color: #ff5500;
  padding: 0 5px;
  user-select: none;
  margin: 5px 0 0 5px;
}
.banner__upload{
  position: absolute;
  display: block;
  top: 0;
  width: 100%;
  height: 5px;
  background: rgb(253,117,34);
}
.banner__edit{
  position: absolute;
  display: block;
  top: 0;
  width: 100%;
  height: 5px; 
  background: linear-gradient(to right,rgb(253,117,34), rgb(29,120,201));
}
.box__header{
  border-bottom: 1px solid #f2f2f2;
  margin: 25px 25px 0 25px;
}
.box__tab{
  border-bottom: 1px solid #ff5500;
  color: #ff5500;
  font-size: 22px;
}

/* 表单内容 */
.box__content{
  margin: 25px;
  display: flex;
  justify-content: space-between;
}
.content__left{
  position: relative;
  width: 35%;
}
.preview__img{
  width: 100%;
  height: 0;
  padding-top: 100%;
  top: 0;
  background-image: linear-gradient(135deg,#e6846e,#70929c);
  background-size: cover;
}


.content__right{
  width: 63%;
}
.input__field{
  cursor: pointer;  
  margin-bottom: 10px;
}
.input__field span{
  user-select: none;
}
.input__field>:nth-child(2){
   transition: .3s;
}
.input__field:hover>:nth-child(2){
  background: #f2f2f2;
}
input, textarea{
  width: 100%;
  border: 1px solid #ccc;
  resize: none;
  font: 13px Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
  padding: 2px 6px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 4px;
}
input:focus{
  outline: none;
}
textarea:focus{
  outline: none;
}
.required__mark{
  position: relative;
}
.required__mark::before{
  content: '*';
  position: absolute;
  top: -10px;
  right: -15px;
  color: red;
  font-size: 30px;
}


/* 保存/取消按钮 */
.box__footer{
  width: 100%;
  text-align: right;
  border-top: 1px solid #f2f2f2;
  padding: 20px 25px;
  box-sizing: border-box;
}
.box__footer > button{
  cursor: pointer;
  border-radius: 3px;
  border: none;
  padding: 4px 10px;
  margin-left: 5px;
  transition: .3s;
}
.save__Btn{
  color: #fff;
  background: #ff5500;
}
.save__Btn:hover{
  background: #ff8800;
}
.cancel_Btn{
  background: #fff;
}
.cancel_Btn:hover{
  background: #f2f2f2;
}

/* 编辑歌曲信息 */
.edit__box{
  position: relative;
  box-sizing: border-box;
  width: 100%;
  margin: 25px;
}
.edit__header{
  font-size: 26px;
}
.edit__header span{
  border-bottom: 1px solid #f2f2f2;
}
.edit__footer{
  width: 100%;
  height: 1px;
  background: #f2f2f2;
}
.track__container{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 30px 25px 0 35px;
}
.track{
  position: relative;
  width: 200px;
  height: 200px;
  padding: 0 0 50px 0;
  margin: 0 30px 30px 0;
  cursor: pointer;
  transition: .3s;
}
.track:hover{
  box-shadow: 0 0 4px 3px #ccc;
  color: #ff5500;
}

.track__textInfo{
  position: absolute;
  bottom: 0;
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
   padding-left: 5px;
}

.track__artist{
  color: grey;
  font-size: 12px;
}
.track__img{
  width: 100%;
  height: 0;
  padding-top: 100%;
  background-size: cover;
}
.artwork__placeholder__0{
  background-image: linear-gradient(135deg,#846170,#70929c)
}
.artwork__placeholder__1{
  background-image: linear-gradient(135deg,#846170,#e6846e)
}
.artwork__placeholder__2{
  background-image: linear-gradient(135deg,#846170,#8e8485)
}
.artwork__placeholder__3{
  background-image: linear-gradient(135deg,#70929c,#846170)
}
.artwork__placeholder__4{
  background-image: linear-gradient(135deg,#70929c,#e6846e)
}
.artwork__placeholder__5{
  background-image: linear-gradient(135deg,#70929c,#8e8485)
}
.artwork__placeholder__6{
  background-image: linear-gradient(135deg,#e6846e,#846170)
}
.artwork__placeholder__7{
  background-image: linear-gradient(135deg,#e6846e,#70929c)
}
.artwork__placeholder__8{
  
  background-image: linear-gradient(135deg,#e6846e,#8e8485);
}
.artwork__placeholder__9{
  background-image: linear-gradient(135deg,#8e8485,#846170);
}

/* 分页 */
.track__page{
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.track__page li{
  user-select: none;
  text-align: center;
  margin: 0 5px;
  padding: 0 10px;
  line-height: 40px;
}
.track__page li:hover{
  background: #fb8e58;
  color: #f2f2f2;
}
.page__selected{
  background: #fb8e58;
  color: #f2f2f2;
}



</style>
