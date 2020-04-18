<template>
  <div class="app">
      <p class="TITLE">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: ['message'],
  data () {
    return {
      title: this.message
    }
  }
}
</script>

<style lang='scss'>
// position: fixed;不能加全局？
.app {
  // position: fixed;
  width: 100%;
  height: 40px;
  text-align: center;
  background-color: white;
  z-index: 100000;
}
.TITLE {
  margin-top:12px;
  font-family: 微软雅黑;
  font-weight: bold;
  font-size: 18px;
  color: #FF9000;
  height: 18px;
  letter-spacing: 5px;
}
</style>
