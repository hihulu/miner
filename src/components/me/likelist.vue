<template>
<div class="app">
<el-row :gutter="5" type="flex" v-for="(item,index) in List" :key='item.id'  >
  <el-col :span="8" :offset="1" @click.native="routerJump(item.id)">
    <div class="grid-content bg-purple">
          <img :src="item.imgUrl">       
    </div>
  </el-col>
  <el-col :span="14">
    <div class="grid-content bg-purple-light">
      <span class="title">{{item.title}}</span><br>
              <span class="price">{{'￥'+item.price+'/日'}}
                <span class="way">{{item.typeOne}}</span>
              </span>
              <br>
              <!-- 公司名称和地址  -->
              <div class="LOCAL"> 
                <span class="company">
                  {{item.companyName}}
                </span>              
               
               <span class="city">
                <el-button type="primary" size="mini" @click="dellike(index,item.id)" round>删除</el-button>
               </span>
              </div> 
    </div>
  </el-col>
</el-row>
<div class="footer">
    <el-button class="footer" type="primary" style="font-size:16px;font-family:'微软雅黑';width:100%" @click="clear" round>清空全部</el-button>
</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      List: [],
      token:''
    }
  },
  methods: {
    //清空全部
    clear(){
            this.List=[];
            this.$axios({
        method: 'get',
        url: '/job/clear',
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
            'Authorization': 'Bearer ' + this.token,
        }
      })
      .then(res=>{                    //请求成功后执行函数
        if(res.data.code === 0){
          console.log("清空成功")
        }else{
          console.log("清空失败")
        }
      })
      .catch(err=>{                   //请求错误后执行函
        console.log("请求错误")
      })
        },
        
    dellike(index,e){
      this.List.splice(index,1)//'1' 代表删除一个
      this.$axios({
        method: 'get',
        url: '/job/remove',
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
            'Authorization': 'Bearer ' + this.token,
        },
        params:{
          wid:e
        }
      })
      .then(res=>{                    //请求成功后执行函数
        if(res.data.code === 0){
          console.log("删除成功")
        }else{
          console.log("删除失败")
        }
      })
      .catch(err=>{                   //请求错误后执行函
        console.log("请求错误")
      })
    },
    getList() {
     this.$axios({
        method: 'get',
        url: '/job/list',
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
            'Authorization': 'Bearer ' + this.token,
        }
      })
      .then(res=>{                    //请求成功后执行函数
        if(res.data.code === 0){
          //定义从后端获取的joblist
          var res = res.data.data
          this.List = res
          
          console.log("获取成功")
        }else{
          console.log("获取失败")
        }
      })
      .catch(err=>{                   //请求错误后执行函
        console.log("请求错误")
      })
    },

    routerJump (e) {
      this.$router.push({
        path: '/detail', query: { id: e } })
        localStorage.setItem('jobId',e)
          console.log(e)
    }
  },
  created(){
        this.token =  localStorage.getItem('token')
        },
  mounted: function () {
      this.getList()
  },
}
</script>
<style lang="scss">
// 行的最后一个元素下边距为tarbar的高度
  .el-row {
    height: 100px;
    background-color: white;
    margin-bottom: 10px;
    // index:1000;
    &:last-child {
      margin-bottom: 70px;
    }
  }
  .el-col {
    text-align: LEFT;
    img{
      border-radius: 10px;
    }
    // ellipsis	显示省略符号来代表被修剪的文本。
    .title {
      padding-top: 5px;
      font-family: 宋体;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      display: -webkit-box;
      margin-bottom: -1px;
    }
    .price {
      
      font-family: 微软雅黑;
      font-size: 16px;
      color:rgb(240, 63, 63);
      font-weight: normal;
    }
    .way {
      margin-left: 5px;
      border-radius: 30px;
      background-color:#409EFF;
      opacity: 0.7;
      font-size: 12px;
      color: white;
      padding: 2%;
    }
    .LOCAL {
      // display: -webkit-box;
      overflow:auto;
      padding-top: 20px;
      font-size: 13px;
      color: black;
      
      span{
        // text-align: left;
        padding-left: 2px;
        float: none;
      }
      .city{
        float: right;
        color: gray;
        width: 100px;
      i{
        color: #409EFF
      }
      }
  }

  .grid-content {
    height: 100px;
  }
  // .footer{
  //       position: fixed; 
  //       // height: 100px;
  //       bottom:5px;
  //       z-index:99999;
  //       // text-align: center;
  //   }
  }
</style>
