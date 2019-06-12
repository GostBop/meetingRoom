<template>
  <div style="height:100%;">
    <div class="topBar">
      <h1>会议管理系统</h1>
    </div>
    <el-row style="height:100%;">

      <el-col :span="4" style="height:100%;">
        <nav-bar></nav-bar>
      </el-col>


      <el-col :span="20">
        <transition appear name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  import NavBar from '@/components/home/navBar'

  export default {
    data() {
      return {}
    },
    components: {
      NavBar
    }

  }

</script>

<style>
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .topBar {
    width: 100%;
    background-color: rgb(46, 55, 68);
    height: 70px;
    display: block;
    /*text-align: center;*/
    margin-top: 0px;
    padding-top: 8px;
  }

  .topBar h1 {
    color: white;
    text-align: center;
    margin: auto;
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(10px);
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
