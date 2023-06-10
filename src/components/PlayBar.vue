<template>
  <div class="player">
    <div class="element__container">
      <button>1</button>
      <button class="playbutton"></button>
      <button>3</button>

    </div>
    
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
body{
  font: 12px/1.4 Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
  color: #333;
}
.player{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 49px;
  border-top: 1px solid #e3e3e3;
  background: #f2f2f2;
  display: flex;
  justify-content: center;
}
.element__container{
  width: 1240px;
  height: 100%;
  display: flex;
  align-items: center;
}

.playbutton{
  display: block;
  background: url(../assets/playbar/play.svg) 0 0 no-repeat;
  background-size: cover;
  width: 20px;
  height: 20px;
  border: 0;
  cursor: pointer;
}
</style>