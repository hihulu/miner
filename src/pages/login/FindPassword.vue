<template>

<div>
  <!-- 页头和标题 -->
  <top-component :head="mintitle"></top-component>
  <!-- 用户名 -->
  <name-componnet @transferName="getName" style="margin-top: 20px;"></name-componnet>
  <!-- 请输入手机号 -->
  <phone-component @transferPhone="getPhone" style="margin-top: 20px;"></phone-component>
  <!-- 请输入验证码 -->
  <code-component @transferCode="getCode" :isphone='phone'></code-component>
  <!-- 新密码 -->
  <psd-component @transferPsd="getPsd" ref="message" :placeholder="newPlaceholder" :pwdTitle="newTitle"></psd-component>
  <!-- 提交按钮 -->
  <div class="ALTER">
    <el-button type="primary" round @click.native.prevent="findpsd">提交</el-button><br>
  </div>
</div>
</template>

<script>
import TopComponent from '@/components/login/top-component'
import NameComponnet from '@/components/login/name-component'
import PhoneComponent from '@/components/login/phone-component'
import CodeComponent from '@/components/login/code-component'
import PsdComponent from '@/components/login/psd-component'
export default {
  data () {
    return {
      name:'',
      phone:'',
      code:'',
      password:'',
      mintitle: '找回密码',
      newTitle: '新密码',
      newPlaceholder: '6-20字符，请设置您的新密码',
    }
  },
  methods: {  
    getName(msg){
      this.name=msg
    },
    getPhone(msg){
      this.phone=msg
      console.log(this.phone)
    },
    getCode(msg){
      this.code=msg
    },
    getPsd(msg){
      this.password=msg
    },

    findpsd(){
      this.$axios({
            method: 'put',
            url: '/api/v1/users/fp',
            headers: {
              'Content-Type': "application/json;charset=UTF-8"
            },
            params:{
              name:this.name,
              telephone: this.phone,
              otpCode:this.code,
              password:this.password
            }  
          })
          .then(res=>{                    //请求成功后执行函数
            if(res.data.message === 'SUCCESS'){
            this.$router.push('/login')	//登录验证成功路由实现跳转
            console.log("密码修改成功")
            }else{
              console.log("密码修改失败")
            } 
          })
          .catch(() => {
             console.log("请求错误")
            })
    }
  },
  components: {
    TopComponent,
    NameComponnet,
    PhoneComponent,
    CodeComponent,
    PsdComponent
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
