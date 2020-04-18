<template>
<div class="app">
    <home-header  class="TOP" :message='topTitle'></home-header>          
    <orderlist  class="Middle"></orderlist>
</div>
    
</template>

<script>
import HomeHeader from "@/components/common/header"
import Orderlist from "@/components/me/orderlist"
export default {
    components:{
        // 局部组件
        HomeHeader,
        Orderlist
    },
    data(){
        return{
            topTitle: '我的拼单',
            
        }
    },
    mounted(){
      document.querySelector('body').setAttribute('style', 'background-color:#f8f8f8')
    },
    beforeDestroy() {
      document.querySelector('body').removeAttribute('style')
    }
    
}
</script>

<style lang="scss">
    .app{
background: white;
    }
    .TOP {
        position: fixed;
    }
    .Middle{
        padding-top:50px;
        
    }
</style>