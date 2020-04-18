<template>
    <div class="MELIST">
      <div class="LIST1">
         <ul>
              <li @click="goOrder">
                <span><i class="el-icon-tickets"></i>我的拼单</span>
                <span><i class="el-icon-arrow-right"></i></span>               
              </li>
              <!-- <el-divider></el-divider> -->
              <li @click="goLike">
                <span><i class="el-icon-star-off"></i>我的收藏</span>
                <span><i class="el-icon-arrow-right"></i></span>
              </li>
              <li @click="goItemList">
                <span><i class="el-icon-first-aid-kit"></i>我的发布</span>
                <span><i class="el-icon-arrow-right"></i></span>
              </li>
         </ul>
      </div>
      <div></div>
      <div class="LIST2">
          <ul>
              <li @click="dialog">
                <span><i class="el-icon-s-opportunity"></i>在线人数</span>
                <span><i class="el-icon-arrow-right"></i></span>
              </li>
              <li @click="goMobile">
                <span><i class="el-icon-mobile-phone"></i>绑定手机号</span>
                <span><i class="el-icon-arrow-right"></i></span>
              </li>
              <!-- <el-divider></el-divider> -->
              <li @click="goChangepsd">
                <span><i class="el-icon-key"></i>修改密码</span>
                <span><i class="el-icon-arrow-right"></i></span>
              </li>
              <li>
                <span><i class="el-icon-edit-outline"></i>意见反馈</span>
                <span><i class="el-icon-arrow-right"></i></span>
              </li>
         </ul>
      </div>

           
    </div>
</template>

<script>
import {Dialog } from 'vant';

export default {
    data(){
      return{
        personNum:''
      }
    },
    components:{
      [Dialog.name]:Dialog
    },
    methods:{
      goOrder(){
        this.$router.push("/order");        
      },
      goLike(){
        this.$router.push("/like");        
      },
      goItemList(){
        this.$router.push("/list"); 
      },
      dialog(){
        this.$axios({
        method: 'get',
        url: '/api/v1/show',
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
        }
      })
      .then(res=>{                    //请求成功后执行函数
        if(res.data.code === 0){
          this.personNum=res.data.data.length   
        }else{
          console.log("err")
        }
      })
      .catch(err=>{                   //请求错误后执行函
        console.log("请求错误")
      })
        Dialog.alert({
          title: '在线人数',
          message: '有'+this.personNum+'个人现在在线噢'
        }).then(() => {
          // on close
        });
        },
      goMobile(){
        this.$router.push("/mobile");
      },
      goChangepsd(){
        this.$router.push("/changepsd");        
      }
    }
}
</script>

<style lang="scss">
.MELIST{
  padding-top: 140px;
  background-color: #f2f3f4;
  ul{
    // list-style: none;
    margin-top: 20px;
    li{
      width: 100%;
      background-color: #fff;
      text-align: left;
      overflow: hidden;
      border-bottom:solid 1px #f2f3f4 ;
      padding:20px 0 20px 15px ;
      font-size: 18px;
      color:black;
      z-index: 10000;

      span{
      float: none;

      i{
      color:#FF9000;
      margin-right: 10px;
      font-size: 20px;
      }

      .el-icon-arrow-right{
        color:#9a9a9a;
        float: right;
        padding-right: 10px;
        font-style: normal;
        font-size: 20px;
      }
    }
    }
  }

}
</style>