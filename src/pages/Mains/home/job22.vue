<template>
<div class="app">
    <home-header  class="TOP" :message='topTitle'></home-header>
    <joblist :typeone="one" :typetwo="two" class="Middle"></joblist>
</div>
    
</template>

<script>
import HomeHeader from "@/components/common/header"
import Joblist from "@/components/home/joblist"
export default {
    components:{
        // 局部组件
        HomeHeader,
        Joblist
    },
    data(){
        return{
            topTitle: '周结-互联网运营',
            one:'周结',
            two:'互联网运营类'
        }
    },
    methods:{

    }
}
</script>

<style lang="scss">
    .app{
        background-color: white;
    }
    .TOP {
        position: fixed;
    }
    .Middle{
        padding-top:50px
    }
</style>