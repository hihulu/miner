<template>
<div>
  <div class="MINTOP">
    <el-page-header @back="goBack"></el-page-header>
  </div>
</div>
</template>

<script>
export default {
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
    position: fixed;
}


</style>
