<template>
<div class="app">
    <home-header  class="TOP" :message='topTitle'></home-header>
    <carousel-component></carousel-component>
<van-tree-select
  :items="items"
  :active-id.sync="activeId"
  :main-active-index.sync="activeIndex"
  @click-item='onitemclick'
/>

</div>
    
</template>

<script>
import { TreeSelect } from 'vant';
import HomeHeader from "@/components/common/header"
import CarouselComponent from "@/components/home/carousel-component"
export default {
    components:{
        // 局部组件
        HomeHeader,
        CarouselComponent,
        [TreeSelect.name]:TreeSelect
    },
    data(){
        return{
            topTitle: '首页',
            items: [
                { text: '日结', children: [{text:'教育培训类',id:11},{text:'互联网运营类',id:12},{text:'其他',id:13}]},
                { text: '周结', children: [{text:'教育培训类',id:21},{text:'互联网运营类',id:22}]}
            ],
            activeId: 1,
            activeIndex: 0
        }
    },
    methods:{
        onitemclick(data){
            console.log(data)
            this.$router.push({path:'/job'+data.id})
        }
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
</style>