<template>
<div id="TARBAR" ref="father">
  <router-link tag="div" v-for="item in tarbar" :key="item.id" :to="item.path" @click_active='change(item.id)'>
      <img :src="item.ico" alt="">
      <p>
        {{item.title}}
      </p>
  </router-link>
</div>
</template>

<script>
export default {
  data () {
    return {
      tarbar: [
        {
          id: 1,
          ico: require('@/assets/images/ICons/Tarbar/home.png'),
          title: '首页',
          path: '/'
        },
        {
          id: 2,
          ico: require('@/assets/images/ICons/Tarbar/car.png'),
          title: '拼的车',
          path: '/Car'
        },
        {
          id: 3,
          ico: require('@/assets/images/ICons/Tarbar/me.png'),
          title: '我的',
          path: '/Me'
        }
      ],
    }
  },
  methods: {
    change (e) {

    }
  } 
}
</script>

<style lang='scss'>
#TARBAR {
  display: table;
  width: 100%;
  // height: 3px;
  bottom: 0;
  // padding: 5px 0;
  background: #fff;
  font-family: "幼圆";
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  color: #707070;
  
  div {
    width: 25%;
    height: 50px;
    display: table-cell;
    opacity: 0.8;
    // padding-bottom: -20px;
  }
  .router-link-active {
    font-weight: bolder;
    opacity: 1;
    color: black;
  }
  img {
    height: 20px;
    width: 20px;
    margin-bottom: -13px;
  }
  p {
    margin: 12px 0;
  }
}
</style>
