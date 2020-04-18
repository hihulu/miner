<template>

<div>
  <!-- 页头和标题 -->
  <top-component :head="mintitle" ></top-component>
  <!-- 请输入手机号 -->
  <phone-component @transferPhone="getPhone" style="margin-top: 20px;"></phone-component>
  <!-- 请输入验证码 -->
  <code-component @transferCode="getCode" :isphone='phone'></code-component>
  <!-- 提交按钮 -->
  <div class="ALTER">
    <el-button type="primary" round @click.native.prevent="mobileyes">提交</el-button><br>
  </div>
</div>
</template>

<script>
import TopComponent from '@/components/login/top-component'
import PhoneComponent from '@/components/login/phone-component'
import CodeComponent from '@/components/login/code-component'
export default {
  name:'Mobile',
  data () {
    return {
      mintitle: '绑定新手机号',
      phone:'',
      code:'',
      userDetail:null
    }
  },
  created(){
         var currentUser = localStorage.getItem('currentUser')
         this.userDetail =  JSON.parse(currentUser)
         console.log(this.userDetail.id)
        },
  methods: {
    getPhone(msg){
      this.phone=msg
      console.log(this.phone)
    },
    getCode(msg){
      this.code=msg
      console.log(this.code)
    },
    mobileyes(){
      this.$axios({
            method: 'put',
            url: '/api/v1/users/binding',
            headers: {
              'Content-Type': "application/json;charset=UTF-8"
            },
            params:{
              telephone: this.phone,
              otpCode:this.code,
              id:this.userDetail.id
            }  
          })
          .then(res=>{                    //请求成功后执行函数
            if(res.data.message === 'SUCCESS'){
            var userPhone=this.phone;
            localStorage.setItem('currentPhone',userPhone)
            this.$router.push('/mobileyes')	//登录验证成功路由实现跳转
            console.log("手机号绑定成功")
            }else{
              console.log("手机号绑定 · 失败")
            } 
          })
          .catch(() => {
             console.log("请求失败")
            })
    }
  },
  components: {
    TopComponent,
    PhoneComponent,
    CodeComponent
  }
}
</script>

<style lang='scss' scoped>
.ALTER {
  text-align: center;
  button {
    margin-top: 40px;
    width: 70%;
    margin-bottom: 20px;
    // background: #F3B64A;
  }
}
</style>
