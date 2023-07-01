<template>
  <div class="coverWrapper" >
    <!-- 反光效果 -->
    <div class="reflection" v-if="reflect"></div>

    <!-- 加载时显示的 -->
    <transition name="showArtwork">
      <div v-show="!imgLoaded && !imgError" :class="'cover artwork-placeholder-'+rand" style="z-index:2"></div>
    </transition>
    
    <!-- 加载结束后显示的 -->
    <div class="cover artwork" v-show="imgLoaded" :style="{'background-image': `url(${imgURL})`}"></div>
    <div :class="`cover artwork-placeholder-${rand+1}`" v-show="imgError"></div>
  </div>
</template>

<script>
export default {
    props:{
      imgURL:{
        type: String
      },
      reflect:{
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        rand: Math.floor(Math.random()*10),
        imgLoaded: false,
        
        imgError: false, // 超过10秒没有加载出来，就不再尝试显示图片
        timer: null,

      }
    },
    mounted(){
      
      // 设置图片超时
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
  overflow: hidden;
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
.artwork-placeholder-10 {
    background-image: linear-gradient(135deg,#8e8485,#70929c);
}

/* 反光效果 */
.reflection{
  position: absolute;
  width: 40%;
  height: 120%;
  top: -10%;
  background: #fff;
  z-index: 10;
  transform: skew(-30deg) translateX(-180%);
  opacity: .3;
  filter: blur(15px);
  transition: .3s;
}
.coverWrapper:hover .reflection{
  transform: skew(-30deg) translateX(100%);
}


</style>