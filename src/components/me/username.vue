<template>
    <div class="NAME">
          <p v-if="name !== ''">{{name}}<span @click="exit">退出</span></p>
          <p v-else><a href="/login">登录/注册</a></p>
    </div>
</template>

<script>
export default {
    data: function () {
            return {
              name:'',
              userDetail :null,
              token:''
            }
        },
    // created(){
    //      var currentUser = localStorage.getItem('currentUser')
    //      this.userDetail =  JSON.parse(currentUser)
    //      this.name=this.userDetail.username
    //     //  console.log(this.userDetail.username)
    //     },
    created(){
        this.token =  localStorage.getItem('token')
        },
     mounted() {
          this.$axios({
        method: 'get',
        url: '/api/v1/user',
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
            'Authorization': 'Bearer ' + this.token,
        },
        data: {
        }
      })
      .then(res=>{                    //请求成功后执行函数
        if(res.data.code === 0){
          //定义从后端获取的userdetail
          this.name=res.data.data.username
          console.log("登录成功")
        }else{
          console.log("登录失败")
        }
      })
      .catch(err=>{                   //请求错误后执行函
        console.log("请求错误")
      })
        },

    methods:{
        exit(){
          localStorage.clear();
          location.href='/login'
        }
    }
}
</script>

<style lang="scss">
    .NAME{
      background-color: #FF9000;
      opacity: 0.7;
      // border-radius: 10px;
      width:100%;
      height: 100px;
      display: flex;
      padding-top: 40px;
      position:fixed;
      p{
        margin-left: 15px;
        margin-top: 39px;
        font-family: '黑体';
        font-size: 22px;
        color:#fff;
        span{
            margin-left: 150px;
            font-size: 18px;
            background-color: blanchedalmond;
            padding: 10px;
            color: #000;
            border-radius: 10px;
        }
        a{
          color:#fff;
          
        }
      }
    }
    
    
</style>