<template>
<div class="app">
<el-row :gutter="5" type="flex" v-for="item in List" :key='item.id' @click.native="routerJump(item.id)" >
  <el-col :span="8" :offset="1">
    <div class="grid-content bg-purple">
          <img :src="item.imgUrl[0]">       
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
                 <i class="el-icon-location-information"></i>
                 {{item.address}}
               </span>
              </div> 
    </div>
  </el-col>
</el-row>

</div>
</template>

<script>
export default {
  props: ['typeone','typetwo'],
  data () {
    return {
      List: [],
      // List: [
      //   {
      //     id: 1,
      //     src: require('@/assets/images/Main/Joblist/j1.jpg'),
      //     title: '兼职小红书编辑',
      //     price: 80,
      //     way:'日结',
      //     company: '小红书',
      //     city: '上海市杨浦区',
      //   },
      // ]

    }
  },
  methods: {
    getList() {
     this.$axios({
        method: 'get',
        url: '/demo/job/find',
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
        },
        params: {
          typeOne: this.typeone,
          typeTwo: this.typetwo
        }
      })
      .then(res=>{                    //请求成功后执行函数
        if(res.data.code === 0){
          //定义从后端获取的joblist
          var res = res.data.data
          
          //把照片变成数组格式
          for (var j = 0; j < res.length; j++){
            res[j].imgUrl = res[j].imgUrl.substr(1);
            res[j].imgUrl = res[j].imgUrl.substring(0,res[j].imgUrl.length-1);
            res[j].imgUrl = res[j].imgUrl.split(",")
          }

          this.List = res
          // console.log(this.List)
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
  
  // .bg-purple {
  //   background: #d3dce6;
  // }
  // .bg-purple-light {
  //   background: #e5e9f2;
  // }
  // div的列高，设置与行高相同
  .grid-content {
    height: 100px;
  }
  }
</style>
