<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
<!-- logo和标题 -->
      <logo-component></logo-component>
<!-- 手机号 -->
      <el-form-item prop="username">
        <span class="iconfont svg-container">
          &#xe632;
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
<!-- 输入密码 -->
      <el-form-item prop="password">
          <span class="iconfont svg-container">
            &#xe663;
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="el-icon-view show-pwd" @click="showPwd">
          </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
      <!-- 其他登录方式 -->
      <div style="text-align:right; width:100%">
        <el-checkbox v-model="checked" style="float:left; text-align:left;color:#409EFF">记住密码</el-checkbox>
        <router-link to="/regist" style="color:#409EFF"> 注册新用户 </router-link>
      </div>
    </el-form>
  <el-footer class="foot">
    <router-link to="/findpassword" style="color:#409EFF">忘记密码？</router-link>
</el-footer>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex';
// import api from '@/api/api.js'
import LogoComponent from '@/components/login/logo-component'

export default {
  components:{
    LogoComponent,
  
  },
  data() {
    return {
      loginForm: {
        username: '18112211096',
        password: ''
      },
      usertoken:'',
      // 用户名和密码规则
      loginRules: {
        username: [
          {required: true, trigger: 'change' },
          {min:1,max:11,message:'请输入1-11个字符',trigger: 'blur'}
        ],
        password: [
          { required: true, trigger: 'change' },
          {min:6,max:10,message:'密码须为3-10个字符',trigger: 'blur'}
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      checked: false
    }
  },
  
  mounted() {
    //如果输入框为空聚焦输入框
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    };
    this.getCookie();
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType  = ''
      } else {
        this.passwordType = 'password'
      }
      //点完显示密码后聚焦输入框
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    handleLogin() {
      const self = this;
      //判断复选框是否被勾选 勾选则调用配置cookie方法
      if (self.checked == true) {
          console.log("checked == true");
             //传入账号名，密码，和保存天数3个参数
          self.setCookie(self.loginForm.username, self.loginForm.password, 7);
      }else {
            console.log("清空Cookie");
            //清空Cookie操作一下
            self.clearCookie();
            }

      this.$axios({
        method: 'post',
        url: '/api/v1/login',
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
            // 'Authorization': 'Bearer ' + token,
        },
        data: {
          name: this.loginForm.username,
          password: this.loginForm.password
        }
      })
      .then(res=>{                    //请求成功后执行函数
        if(res.data.code === 0){
          //定义从后端获取的userdetail
          var userDetail = res.data.data.userDetail
          var userStr = JSON.stringify(userDetail)
          //利用localstorage存储到本地
          localStorage.setItem("currentUser",userStr)
          localStorage.setItem("token",res.data.data.token)
          this.$router.push('/me')	//登录验证成功路由实现跳转
          console.log("登录成功")
        }else{
          console.log("登录失败")
        }
      })
      .catch(err=>{                   //请求错误后执行函
        console.log("请求错误")
      })
    },
    //设置cookie
            setCookie(c_name, c_pwd, exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
                window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
            },
            //读取cookie
            getCookie: function() {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'userName') {
                            this.loginForm.username = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == 'userPwd') {
                            this.loginForm.password = arr2[1];
                        }
                    }
                }
            },
            //清除cookie
            clearCookie: function() {
                this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
            },
  }
}
</script>

<style lang="scss">
/* reset element-ui css */
.login-container {
  overflow-y: scroll;/*y轴滚动*/
  touch-action: none; 
  .el-input {
    display: inline-block;
    height: 47px;
    width: 75%;

    input {
      background: transparent;
      height: 47px;
    }
  }

  .el-form-item {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
}
</style>

<style lang="scss" scoped>

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: scroll;

  .login-form {
    position: relative;
    width: 80%;
    max-width: 100%;
    padding: 100px  0;
    margin: 0 auto;
    overflow: hidden;
  }


  .svg-container {
    padding: 4px 5px 4px 12px;
    color: #F3B64A;
    font-size: 20px;
    font-weight: bold;
    vertical-align: middle;
    width: 20px;
    display: inline-block;
  }

  

  .show-pwd {
    padding: 4px 5px 4px 5px;
    color: #F3B64A;
    font-size: 20px;
    vertical-align: middle;
    width: 20px;
    display: inline-block;
  }
  .foot{
    text-align: center
  }

}
</style>
