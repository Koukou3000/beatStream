<template>
  <div class="player">
    <div class="element__container">
      <i class="el-icon-edit"></i>
      <i class="el-icon-edit"></i>
      <i class="el-icon-edit"></i>
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
  height: 50px;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: center;
}
.element__container{
  width:1240px;
  height: 100%;
  background: #333;
  opacity: 0.5;
}
</style>