<template>
  <div>
    <div class="NAME">
      <p>用户名</p>
      <el-input
        placeholder="请输入用户名"
        @change="setName"
        v-model="name"
        maxlength="11"
        clearable
      >
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
    }
  },
  methods: {
    // 子传父
    setName(){
      this.$emit('transferName',this.name)
      // console.log(this.username)
    }
  },
  computed: {
  },
  watch: {
  }
}
</script>
<style lang="scss">
.NAME {
  p {
    margin-left: 10%;
    font-family: 微软雅黑;
    font-size: 14px;
    font-weight: bold;
  }
  div {
    text-align: center;
    input {
      width: 70%;
      margin: 0 auto;
      border-bottom: 1px solid #E4E4E4;
      border-top:0px;
      border-left:0px;
      border-right:0px;
    }
  }
}
input:focus {
  width: 70%;
  border-bottom: 2px solid CornflowerBlue;
  border-top:0px;
  border-left:0px;
  border-right:0px;
  z-index: 999;
}
</style>
