<template>
  <div style="height:100%;">
    <el-row style="height:100%;">
      <el-col style="height:100%;">
        <div class="leftBar" id="leftBar">

          <el-menu background-color="rgb(46,60,90)" text-color="white" default-active="defaultActive" router>
            <template v-for="item in navBarItems">
              <template v-if="item.subs">
                <el-submenu :index="item.index">
                  <template slot="title"><i :class="item.icon"></i>{{item.title}}</template>
                  <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index"
                                :route="item.route">{{subItem.title}}
                  </el-menu-item>
                </el-submenu>
              </template>
              <template v-else>

                <el-menu-item :index="item.index" :route="item.route">
                  <i :class="item.icon"></i>{{item.title}}
                </el-menu-item>

              </template>

            </template>
            <template>
              <div class="exit">
                <el-menu-item index="" @click="confirmLeave">
                  <i class='el-icon-close'></i>退出
                </el-menu-item>
              </div>
            </template>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
   import mockdata from '@/util/exit.js'
//import ElMenuItem from "../../../node_modules/element-ui/packages/menu/src/menu-item";
  import store from '../../vuex/store'

  export default {
//        components: {ElMenuItem},
    data() {
      return {
        defaultActive: 'query',
        navBarItems: [
          {
            icon: 'el-icon-search',
            index: '/home/query',
            title: '查询会议',
          }, {
            icon: 'el-icon-menu',
            index: '/home/create',
            title: '添加会议',
          },
        ]
      }
    },
    methods: {

      confirmLeave() {

        let _this = this;
        this.$confirm('是否退出系统?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          axios.post('/logout', {}).then((response) => {
            if (response.data.isLogout) {
              _this.$store.commit('DELETEUSER');
              _this.$router.push('/login');
            }
          }).catch((error) => {
            console.log(error);
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });

        })
      }
    },


  }
</script>

<style>
  /*.leftBar {*/
  /*!*display: block;*!*/
  /*width: 100%;*/
  /*height:100%;*/
  /*left: 0;*/
  /*top: 70px;*/
  /*bottom:0;*/
  /*background-color: #2E363F;*/

  /*}*/
  /*@import url("//unpkg.com/element-ui@1.4.0/lib/theme-default/index.css");*/

  #leftBar {
    width: 100%;
    height: 100%;
    left: 0;
    top: 70px;
    background-color: #2E363F;
  }
  /*.leftBar ul {*/
  /*height: 100%;*/
  /*}*/

</style>
