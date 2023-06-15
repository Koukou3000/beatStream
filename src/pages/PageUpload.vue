<template>
  <div>
    <ul class="route__container">
      <li @click="changeModel(1)" ref="tab1" class="selected">Upload</li>
      <li @click="changeModel(2)" ref="tab2">Edit</li>
    </ul>


    <div class="workbench__bg">
      
      <div class="upload__box" v-show="manualModel==1">
        <div class="box__header">
          <span class="box__tab">填写歌曲信息</span>
        </div>
        <div class="box__content">
          
          <div class="content__left">
            <img src="" alt="" class="preview__img"/>
          </div>
          <div class="content__right">
            上传前会获取state.tracks.length,作为新tid
            <br>
            
            选择的文件名：【本地】<br>
              |   标题 ：<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         |   种类：<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         |   自定义标签：<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         |   描述：<br>
            preview片段<br>
            ||||||||||||||||||||||||||||||<br>
            <!-- <button @click="uploadSingle">uploadSingle</button> -->

          </div>
         

        </div>
        
      </div>
      <div class="edit__box" v-show="manualModel==2">
        出全部歌曲，一页18个，点击后读入信息到表单，修改后走流程一样，只是有了id
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      manualModel: 1,
    }
  },
  computed:{
    track(){      
      return this.$store.state.track
    }
  },
  methods:{
    changeModel(type){
      this.manualModel = type
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
    uploadSingle(){
      // 获取表单信息
      var track = {
                id: 1,
                title: 'Frankenstein Complex',
                artist: 'scene From gore girls',
                audio_url: 'http://sfgg.work/album/1/1',
                img_url: 'http://sfgg.work/album/poster'
            }
      this.$store.dispatch('track/uploadSingle', track)
      // 根据返回值弹窗
    },
    uploadPlaylist(){
      // 收集个数 & 每个track的信息
      // 上传成
    
    }
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
  height: 700px;
  background: #fff;
  display: flex;
  justify-content: center;
}
.upload__box{
  position: relative;
  margin: 50px 0;
  width: 66%;
  background: #fff;
  box-shadow: 0 0 4px 4px rgb(242,242,242);
  padding: 25px;
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
}
.box__tab{
  border-bottom: 1px solid #ff5500;
  color: #ff5500;
  font-size: 22px;
}

/* 表单内容 */
.box__content{
  padding: 25px 0;
  display: flex;
  justify-content: space-between;
}
.content__left{
  position: relative;
  width: 30%;
  height: 0;
  padding-top: 30%;
}
.preview__img{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}
.content__right{
  width: 70%;
  padding: 0 15px;
}

</style>