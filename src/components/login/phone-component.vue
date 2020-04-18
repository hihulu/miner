<template>
  <div id="app">
    <div class="PHONE">
      <p>手机号</p>
      <!-- onkeyup将输入值为非数字的字符替换为空 -->
      <el-input
        placeholder="请输入手机号"
        @change="setPhone"
        v-model="phone"
        onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
        maxlength="11"
        clearable
      >
      </el-input>
      <div class="phone-wrong">
        <span v-show="isPhoneWrong">{{phoneWrong}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phone: '',
      isPhoneWrong: this.PhoneWrong,
      phoneWrong: '手机格式有误'
    }
  },
  methods: {
    // 子传父
    setPhone(){
      this.$emit('transferPhone',this.phone)
      // console.log(this.username)
    }
  },
  computed: {
  },
  watch: {
    // 检查手机格式
    username (newVal) {
      let length
      if (newVal) {
        length = newVal.length
        if (length !== 11) {
          if (length === 1) {
            console.log('开始输入手机号')
            console.log('|')
          }
        } else {
          console.log('11位手机号输入完成,传入后端')
          console.log('|')
          this.isPhoneWrong = false
        }
      }
    },
    // 监听父组件传来的bool值，否则只按初次计算
    // 如果手机不为11位，bool为true
    PhoneWrong: function (newVal, oldVal) {
      if (newVal) {
        this.isPhoneWrong = newVal
      }
    },
    // 当提示信息时，用户重新输入时取消提示
    phoneNumber: function (newVal) {
      this.$emit('update:snycPhone', this.phoneNumber)
      if (newVal) {
        if (this.isPhoneWrong) {
          this.isPhoneWrong = false
        }
      }
    }
  }
}
</script>
<style lang="scss">
.PHONE {
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
  .phone-wrong {
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