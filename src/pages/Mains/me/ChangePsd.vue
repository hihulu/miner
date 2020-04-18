<template>
<div>
  <!-- 页头和标题 -->
  <top-component :head="mintitle"></top-component>
  <!-- 旧密码 -->
  <psdone-component @transferPsdone="getPsdone" ref="message" :placeholder="newPlaceholder" :pwdTitle="newTitle"></psdone-component>
  <!-- 新密码 -->
  <psd-component @transferPsd="getPsd" ref="message1" :placeholder="surePlaceholder" :pwdTitle="sureTitle"></psd-component>
  <!-- 提交按钮 -->
  <div class="ALTER">
    <el-button type="primary" round @click="Alter">提交</el-button><br>
  </div>
</div>
</template>

<script>
import TopComponent from '@/components/login/top-component'
import PsdComponent from '@/components/login/psd-component'
import PsdoneComponent from '@/components/me/psdone-component'
export default {
  data () {
    return {
      mintitle: '修改密码',
      newTitle: '旧密码',
      newPlaceholder: '请输入旧密码',
      sureTitle: '新密码',
      surePlaceholder: '请输入新密码',
      userDetail:null,
      password1:'',
      password:''
    }
  },
  methods: {
    getPsdone(msg){
      this.password1=msg
      console.log(this.password1)
    },
    getPsd(msg){
      this.password=msg
    },

    Alter () {
      this.$axios({
        method: 'put',
        url: '/api/v1/users/resetpwd',
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
        },
        params: {
          id:this.userDetail.id,
          password: this.password1,
          newPassword: this.password
        }
      })
      .then(res=>{                    //请求成功后执行函数
        if(res.data.code === 0){
          this.$router.push('/me')	//登录验证成功路由实现跳转
          console.log("修改成功")
        }else{
          console.log("修改失败")
        }
      })
      .catch(err=>{                   //请求错误后执行函
        console.log("请求错误")
      })
    }
  },
  components: {
    TopComponent,
    PsdComponent,
    PsdoneComponent
  },
  created(){
         var currentUser = localStorage.getItem('currentUser')
         this.userDetail =  JSON.parse(currentUser)
         console.log(this.userDetail.id)
        },
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
