<template>
<div>
  <div class="MINTOP">
    <el-page-header @back="goBack"></el-page-header>
  </div>
  <div class="MIDDLE">
    <span class="MINTITLE">{{mintitle}}</span>
  </div>
</div>
</template>

<script>
export default {
  props: ['head'],
  data () {
    return {
      mintitle: this.head
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
.MINTOP {
    color: #FF9000;
    margin-top: 15px;
    margin-left: 10px;
}
.MIDDLE {
  margin-top: 50px;
  text-align: center;

  .MINTITLE {
        font-family: 微软雅黑;
        font-weight: bold;
        font-size: 20px;
        color: black;
  }
}
</style>
