<template>
  <div class="coverWrapper" >
    <transition name="showArtwork">
      <div v-show="!imgLoaded && !imgError" :class="'cover artwork-placeholder-'+rand" style="z-index:1"></div>
    </transition>
    
    <div class="cover artwork" v-show="imgLoaded" :style="{'background-image': `url(${imgURL})`}"></div>
    <div :class="'cover artwork-placeholder-'+rand" v-show="imgError"></div>
  </div>
</template>

<script>
export default {
    props:['imgURL'],
    data(){
      return{
        rand: Math.floor(Math.random()*10),
        imgLoaded: false,
        
        imgError: false, // 超过10秒没有加载出来，就不再尝试显示图片
        timer: null,

      }
    },
    mounted(){
      let image = new Image()
      if(this.imgURL){   
        image.onload = ()=>{
          this.imgLoaded = true
          this.imgError = false
          clearTimeout(this.timer)
          this.timer = null
        }
        image.src = this.imgURL
      }
      this.timer = setTimeout(() => {
        clearTimeout(this.timer)
          this.timer = null
          this.imgLoaded = false
          this.imgError = true
      }, 10000);
    },

}
</script>

<style scoped>
.coverWrapper{
  width: 30px;
  height: 30px;
  position: relative;
}
.cover{
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.1);
}
.showArtwork-enter-active{
  animation: strip reverse .3s forwards;
}
.showArtwork-leave-active{
  animation: strip .3s forwards;
}
@keyframes strip {
  from{opacity: 1;}
  to{opacity: 0;}
}
.artwork{
  background-size: cover;
}
.artwork-placeholder-0 {
    background-image: linear-gradient(135deg,#846170,#70929c);
}
.artwork-placeholder-1 {
    background-image: linear-gradient(135deg,#8e8485,#70929c);
}
.artwork-placeholder-2 {
    background-image: linear-gradient(135deg,#846170,#8e8485);
}
.artwork-placeholder-3 {
    background-image: linear-gradient(135deg,#70929c,#846170);
}
.artwork-placeholder-4 {
    background-image: linear-gradient(135deg,#70929c,#e6846e);
}
.artwork-placeholder-5 {
    background-image: linear-gradient(135deg,#70929c,#8e8485);
}
.artwork-placeholder-6 {
    background-image: linear-gradient(135deg,#e6846e,#846170);
}
.artwork-placeholder-7 {
    background-image: linear-gradient(135deg,#e6846e,#70929c);
}
.artwork-placeholder-8 {
    background-image: linear-gradient(135deg,#e6846e,#8e8485);
}
.artwork-placeholder-9 {
    background-image: linear-gradient(135deg,#8e8485,#846170);
}

</style>