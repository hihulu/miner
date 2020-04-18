<template>
  <div class="CODE">
    <p>验证码</p>
    <div class="code-input">
        <el-input
            placeholder="验证码"
            @change="setCode"
            v-model="codeNumber"
            onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
            maxlength="6"
        >
        </el-input>
    <el-button type="primary" @click.native.stop="SendCode" :disabled="disabled=!show">
       <span v-show="show">获取验证码</span>
       <span v-show="!show" class="count">{{count}} s</span>
    </el-button>
    </div>
    <div class="code-wrong">
      <span v-show="isCodeWrong">{{codeWrong}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isrephone:{
      type:String
    }
  },
  //更改倒计时时间
  data () {   
    return {
      // phone:this.isphone,
      recode:null,
      show: true,  // 初始启用按钮
      count: '',   // 初始化次数
      timer: null,
      codeNumber: '',
      isCodeWrong: false,
      codeWrong: '验证码有误'
    }
  },
  components:{
      
    },
  methods: {
    // 子传父
    setCode(){
      this.$emit('transferCode',this.codeNumber)
      // console.log(this.username)
    },
    SendCode() {
      // console.log(this.isphone)
      // this.isSendCode = true;
      var selfb=this.isrephone
      console.log(selfb)
      console.log("...")
      this.$axios({
        method: 'post',
        url: '/api/v1/users/getotp',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        params:{
          telephone:selfb
        }     
      })
      .then(res=>{  
        if(res.data.message === 'SUCCESS'){          
           this.recode =res.data.data
           console.log(this.recode)
        }else{
           console.log("err")
        }
      })
      .catch(err=>{                   //请求错误后执行函数
        console.log(err)
      })
      const TIME_COUNT= 60;
      if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                  } else {
                    this.show = true;
                    clearInterval(this.timer);  // 清除定时器
                    this.timer = null;
                  }
                }, 1000)
              };
    }

  },
  watch: {
    codeNumber (newVal) {
      let length
      if (newVal) {
        this.isCodeWrong = false
        length = newVal.length
        if (length === 1) {
          console.log('开始输入验证码')
          console.log('|')
        }
        if (length <= 6 && length>=5) {
          console.log('验证码输入完成')
          if(this.recode===this.codeNumber){
            console.log('res输入密码和后台密码一致')
          }else{
            // alert("验证码错误")
            this.isCodeWrong=true
          }
          console.log('|')
        }
      }
    }
  }
}
</script>

<style lang="scss">
.CODE {
  p {
    margin-left: 10%;
    font-family: 微软雅黑;
    font-size: 14px;
    font-weight: bold;
  }
  div {
    display: table;
    text-align: left;
    margin-left: 15%;
    .el-input {
      display: table-cell;
      width: 50%;
    }
    input {
      width: 70%;
      margin: 0 auto;
      border-bottom: 1px solid #E4E4E4;
      border-top:0px;
      border-left:0px;
      border-right:0px;
    }
    button {
      // background: #F3B64A;
    }
  }
  .code-wrong {
    text-align: left;
    margin-left: 20%;
    margin-top: 2%;
    font-size: 10px;
    font-weight: bold;
    color: firebrick;
  }
}
</style>
