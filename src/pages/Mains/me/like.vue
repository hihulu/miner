<template>
<div class="app">
    <home-header  class="TOP" :message='topTitle'></home-header>
    <likelist  class="Middle"></likelist>
    <!-- <clear class="footer"></clear> -->
</div>

    
</template>

<script>
import HomeHeader from "@/components/common/header"
import Likelist from "@/components/me/likelist"
// import Clear from "@/components/me/clear"

export default {
    components:{
        // 局部组件
        HomeHeader,
        Likelist,
        // Clear
    },
    data(){
        return{
            topTitle: '我的收藏',
        }
    },
    methods:{
        
    },
   mounted(){
      document.querySelector('body').setAttribute('style', 'background-color:#f8f8f8');
      document.querySelector('body').setAttribute('style', 'margin-bottom: 100px');
    },
    beforeDestroy() {
      document.querySelector('body').removeAttribute('style')
    }
}
</script>

<style lang="scss">
    .app{
        background-color: white;
        width: 100%;
    }
    .TOP {
        position: fixed;
    }
    .Middle{
        padding-top:50px
    }
    .footer{
        position: fixed; 
        // height: 100px;
        bottom:5px;
        z-index:99999;
        // text-align: center;
    }
</style>