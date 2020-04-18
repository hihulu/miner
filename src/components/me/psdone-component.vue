<template>
  <div id="app">
    <div class="PASSWORD">
      <p>{{title}}</p>
      <el-input :placeholder=PsdPlaceHolder @change="setPsdone" v-model="psd" show-password
        maxlength="20"></el-input>
      <div class="password-wrong">
        <span v-show="isPasswordWrong">{{passwordWrong}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'password',
  props: ['placeholder',
    'pwdTitle'],
  data () {
    return {
      title: '密码',
      psd: '',
      isPasswordWrong: false,
      passwordWrong: '密码格式有误',
      PsdPlaceHolder: this.placeholder
    }
  },
  created () {
    if (this.pwdTitle) {
      this.title = this.pwdTitle
    }
  },
  methods: {
    setPsdone(){
      this.$emit('transferPsdone',this.psd)
      // console.log(this.username)
    }
  },
  watch: {
  }
}
</script>
<style lang="scss">
.PASSWORD {
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
  .password-wrong {
    text-align: left;
    margin-left: 20%;
    margin-top: 2%;
    font-size: 10px;
    font-weight: bold;
    color: firebrick;
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
