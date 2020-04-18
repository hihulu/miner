<template>
<div class="block">
  <el-carousel trigger="click" height="180px" indicator-position="outside">
    <el-carousel-item v-for="item in pic" :key="item.id">
      <h3 class="small">
            <img :src="item.src">
      </h3>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
export default {
  name:'Carousel',
  data(){
    return{
      pic:[
        {
          id:1,
          src: require('@/assets/images/Main/Carousel/c1.jpg')
        },
        {
          id:2,
          src: require('@/assets/images/Main/Carousel/c2.jpg')
        },
        {
          id:3,
          src: require('@/assets/images/Main/Carousel/c3.jpg')
        }
      ]
    }
  }
}
</script>
<style>
  .block{
    width: 100%;
    padding-top: 40px;
  }
  img{
        width: 100%;
        height: 100%;
    }
</style>
