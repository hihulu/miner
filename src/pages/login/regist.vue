<template>
  <div class="login-container">
    <el-form ref="signForm" :model="signForm" :rules="signRules" class="login-form" autocomplete="on" label-position="left">
 
      <div class="title-container">
        <img class="title-img" src="@/assets/images/Login/logo.jpg" alt="logo">
        <h3 class="title">注册</h3>
      </div>

      <el-form-item prop="username">
        <span class="iconfont svg-container">
          &#xe632;
        </span>
        <el-input
          ref="username"
          v-model="signForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
          <span class="iconfont svg-container">
            &#xe663;
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="signForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleRegister"
          />
          <span class="el-icon-view show-pwd" @click="showPwd">
          </span>
      </el-form-item>
      <el-form-item prop="repassword">
          <span class="iconfont svg-container">
            &#xe663;
          </span>
          <el-input
            :key="passwordType"
            ref="repassword"
            v-model="signForm.repassword"
            :type="passwordType"
            placeholder="再次确认密码"
            name="repassword"
            tabindex="2"
            autocomplete="on"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleRegister"
          />
          <span class="el-icon-view show-pwd" @click="showPwd">
          </span>
      </el-form-item>
      
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">注册</el-button>
      <!-- 其他登录方式 -->
      <div style="text-align:right; width:100%">
        <router-link style="color:#409EFF" to="/login"> 账号密码登录</router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    // const validateRepassword = (rule, value, callback) => {
    //   if (value.length >=this.signForm.password.length && value !== this.signForm.repassword) {
    //     callback(new Error('两次密码不一致'))
    //   } else {
    //     callback()
    //   }
    // }
    var validatePass = (rule, value, callback) => {
        if (value === '') {
                callback(new Error('请输入密码'));
        } else {
                if (this.signForm.repassword !== '') {
                    this.$refs.signForm.validateField('checkPass');
                }
                callback();
            }
        };
var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.signForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
    return {
      signForm: {
        username: '15605207529',
        password: '123456789',
        repassword:'123456789'
      },
      // 发生改变时触发validate事件
      signRules: {
        username: [
          {required: true, trigger: 'change' },
          {min:1,max:11,message:'请输入1-11个字符',trigger: 'blur'}
        ],
        password: [
          { required: true, trigger: 'change' },
          {min:6,max:10,message:'密码须为3-10个字符',trigger: 'blur'},
          { validator: validatePass, trigger: 'blur' }
        ],
        repassword: [
          {required: true, trigger: 'change' },
          {min:6,max:10,message:'密码须为3-10个字符',trigger: 'blur'},
           { validator: validatePass2, trigger: 'blur'}
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      // 用来监听，当路由发生变化时执行
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    //如果输入框为空聚焦输入框
    if (this.signForm.username === '') {
      this.$refs.username.focus()
    } else if (this.signForm.password === '') {
      this.$refs.password.focus()
    } else if (this.signForm.repassword === '') {
      this.$refs.repassword.focus()
    }
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
    handleRegister() {
      this.$refs.signForm.validate(valid => {
        // 获取loginform的实例（el-form），找到validate方法，根据验证规则rules校验是否valid
        if (valid) {
        this.loading = true
          this.$axios({
            method: 'post',
            url: '/api/v1/sign',
            headers: {
              'Content-Type': "application/json;charset=UTF-8"
            },
            data: {
              name: this.signForm.username,
              password: this.signForm.password
            }
          })
          .then(res=>{                    //请求成功后执行函数
            if(res.data.message === 'SUCCESS'){
            this.$router.push('/login')	//登录验证成功路由实现跳转
            this.$notify({
              title: '提示',
              message: '注册成功',
              duration: 3000
            });
            }else{
              this.$notify({
                title: '提示',
                message: '用户登录失败',
                duration: 3000
              });
            } 
          })
          .catch(() => {
             his.$notify({
              title: '提示',
              message: '用户访问错误',
              duration: 3000
            });
              console.log(err)
            })
          } else {
          console.log('error submit!!')
          return false
          }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
/* reset element-ui css */
.login-container {
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

  .title-container {
    position: relative;
    text-align: center;

    .title-img{
      width: 30%;
      height: 30%;
      border-radius: 50%;
    }

    .title {
      font-size: 26px;
      margin: 20px auto 40px auto;
      font-weight: bold;
    }
  }

  .show-pwd {
    padding: 4px 5px 4px 5px;
    color: #F3B64A;
    font-size: 20px;
    vertical-align: middle;
    width: 20px;
    display: inline-block;
  }

}
</style>
