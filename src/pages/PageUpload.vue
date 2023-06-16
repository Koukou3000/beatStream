<template>
  <div>
    <ul class="route__container">
      <li @click="changeMode(1)" ref="tab1" class="selected">Upload</li>
      <li @click="changeMode(2)" ref="tab2">Edit</li>
    </ul>

    <!-- 导航下方白色背景 -->
    <div class="workbench__bg">
      
      <!-- 上传内容 -->
      <div class="upload__box" v-show="manualMode==1">
            <!-- 可以有多个tab，故save按钮放在upload__box下 -->
            <div class="box__header">
              <span class="box__tab">填写歌曲信息</span>
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
      <div class="edit__box" v-show="manualMode==2">
        出全部歌曲，一页18个，点击后读入信息到表单，修改后走流程一样，只是有了id    
        {{track.trackList}}
      </div>

    </div>
  </div>
</template>

<script>


export default {
  data(){
    return{
      manualMode: 1, // 上传1 /编辑2

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
    }
  },
  computed:{
    track(){      
      return this.$store.state.track
    }
  },
  methods:{
    changeMode(type){
      this.manualMode = type
      switch(type){
        case 1:
          this.$refs.tab1.className = 'selected';
          this.$refs.tab2.className = '';
          break;
        case 2:
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
      }
    },
  },
  mounted(){
    console.log(this)
  }
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
.upload__box::before{
  content: '';
  position: absolute;
  width: 100%;
  height: 5px;
  top: 0;
  left: 0;
  background: rgb(253,117,34);
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


</style>
