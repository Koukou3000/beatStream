<template>
  <header>
    <div class="header__inner">

      <div class="inner__left">
        <ul>
          <li>
            <router-link to="trend" class="selected">
              <div class="main__logo"></div>
            </router-link>
          </li>
          <li>
            <router-link to="trend" active-class="selected">Trend</router-link>
          </li>         
        </ul>
      </div>

      <div class="inner__mid">
        <div class="header__search">
          <form class="search__form">
            <input type="text" class="search__input" placeholder="Search"/>
            <button type="submit" class="search__btn"></button>
          </form>
        </div>
      </div>

      <div class="inner__right">
        <ul>
            <li>
              <router-link to="about" active-class="selected">About</router-link>
            </li>
            <li>
              <router-link to="upload" active-class="selected">Upload</router-link>
            </li>
            <li class="user__info" @click="dropDown=!dropDown" :class="{selected: dropDown}">
              <span class="avatar"></span>
              <span class="arrow_down"></span>
            </li>
            <!-- 用户菜单 -->
            <ul class="user__menu" v-show="dropDown">
              <li @click="dropDown=false">
                <span class="icon__profile"></span>
                <router-link to="user" class="menu__link">Profile</router-link>
              </li>
              <li @click="dropDown=false">
                <span class="icon__like"></span>
                <router-link to="likes" class="menu__link">Likes</router-link>
              </li>
            </ul>
        </ul>
      </div>
     
      
    </div>
  </header>
</template>

<script>
export default {

  data(){
    return{
      dropDown:false
    }
  },
  methods:{

  }
}
</script>

<style scoped>
header{
    background: rgb(51,51,51);
    width: 100%;
    height: 46px;
    position: relative;
    display: flex;
    justify-content: center;
    font-size: 14px;
}
.header__inner{
  margin: 0;
  padding: 0;
  width: 1240px;
  display: flex;
  user-select: none;
  position: relative;
}
ul{
  padding: 0;
  margin: 0;
  display: flex;
}
ul>li{
  display: block;
  color: #ccc;
  
}
a{
  text-decoration: none;
  color: #ccc;
  display: block;
  height: 46px;
  width: 104px;
  border-right: 1px solid #111;
  text-align: center;
  line-height: 46px;
}
a:hover{
  color: #eee;
}
.selected{
  background: rgb(17,17,17);
  color: #eee;
  display: flex;
  justify-content: center;
}
.main__logo{
  display: block;
  width: 60px;
  height: 46px;
  background: url(../assets/logo-ex.png) 0 -5px no-repeat;
  background-size: cover;
  position: absolute;
}


/* 搜索框 */
.header__search{
  padding: 9px 10px 8px;
}
.search__form{
  background: #e5e5e5;
  border-radius: 4px;
  position: relative;
}
.search__input{
  outline: none;
  border: 0;
  border-radius: 4px;
  padding: 5px 7px;
  width: 300px;
  line-height: 18px;
  color: #666;
  background: #e5e5e5;
  transition: all .3s ease-in-out;
  font: 12px Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
}
.search__input:focus{
  background: #fff;
}
.search__btn{
  cursor: pointer;
  background: url(../assets/navbar/search-icon.svg) 0 0 no-repeat;
  border: 0;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 7px;
  right: 8px;
}


/* 导航右侧 */
.inner__right{
  position: absolute;
  right: 0;
  display: flex;
  justify-content: right;
  width: 50px;
}

/* 用户菜单弹出 */
.user__info{
  display: flex;
  width: 64px;
  align-items: center;
  cursor: pointer;
  justify-content: space-evenly;
}
.avatar{
  display: block;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: url(https://avatars.githubusercontent.com/u/82990830?v=4) 0 0 no-repeat;
  background-size: cover;
}
.arrow_down{
  display: block;
  width: 20px;
  height: 20px;
  background: url(../assets/navbar/arrow-down.svg) 0 0 no-repeat;
  background-size: cover;
}

/* 下拉菜单 */
.user__menu{
  position: absolute;
  top: 46px;
  display: block;
  right: 0;
  border: 1px solid #ccc;
  width: 133px;
  z-index: 2;
  transform: translateX(70px);
}
.user__menu>li{
  background: white;
  padding: 8px 10px;
  margin: 0 ;
  cursor: pointer;
}
.user__menu>li:hover{
  background: rgb(242,242,242);
}
/* 重新设置a标签 */
.user__menu>li>a{
  color: #333;  
  display: block;
  height: 16px;
  line-height: 16px;
  border: 0;
  font-size: 12px;
  font-weight: bold;
  
}
.user__menu>li>a:hover{
  color: #333;
}
.icon__profile{
  position: absolute;
  width: 15px;
  height: 15px;
  background: url(../assets/navbar/profile.svg) 0 0 no-repeat;
  background-size: cover;
}
.icon__like{
  position: absolute;
  width: 15px;
  height: 15px;
  background: url(../assets/navbar/like.svg) 0 0 no-repeat;
  background-size: cover;
}
</style>