<template>
    <div>
      <home-header class="TOP" :message='topTitle'></home-header>
      <user-name></user-name>
      <me-list></me-list>
        
        <div>
          <p class="mine-btm">© 2020 电子商务系项目制第十三组</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import HomeHeader from "@/components/common/header"
    import UserName from "@/components/me/username"
    import MeList from "@/components/me/melist"
    export default {
        components:{
        // 局部组件
        HomeHeader,
        UserName,
        MeList
       },
        data: function () {
            return {
              topTitle: '我的',
              userDetail :{}
            }
        },
    }
</script>

<style scoped>
.TOP {
        position: fixed;
    }  
   .mine-btm{
     padding-top: 60px;
     text-align: center;
     color: #999;
   }


</style>
