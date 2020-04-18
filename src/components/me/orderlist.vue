<template>
<div class="app">
  <div class="search">
    <el-input
    style="width: 350px;height:30px;padding-bottom:6px;"
    @input="searchFun"
    placeholder="快速搜索拼单"
    prefix-icon="el-icon-search"
    v-model="searchVal">
  </el-input>
  </div>
  <el-row :gutter="5" type="flex" v-for="(item,index) in List" :key='item.id' >
    <el-col :span="22" :offset="1">
      <div class="grid-content bg-purple-light">
        <span class="title">{{item.title}}
            <div class="date">
                （拼日期：2020/{{item.mm}}/{{item.dd}}）
            </div>
        </span>
        <br>
        <span class="price">{{'￥'+item.price+'/日'}}
        </span>
        <br>
        <!-- 公司名称和地址  -->
        <div class="LOCAL"> 
          <span class="company">
              订单号：
            {{item.id}}
          </span>              
         <span class="city">
            <el-button type="primary" size="mini" @click="goComment(item.id)" round>评价</el-button>
         </span>
        </div> 

      </div>
      <hr/>
    </el-col>
  </el-row>

</div>
</template>

<script>
export default {
  data () {
    return {
      List: [],
      token:'',
      searchVal:'', 
      searchList:''
    }
  },
  methods: {
      goComment (id) {
        this.$router.push({
          path: '/comments', query: { id: id } })
          localStorage.setItem('id',id)
      },

      searchFun(){
        if(this.searchVal===''){
          this.getList();
        }else{
          //搜索
          let list=this.List.filter(item=>item.title.toString().indexOf(this.searchVal)>=0);
          this.List=list;
        }
                    

      },
    getList() {
     this.$axios({
        method: 'get',
        url: '/demo/job-order/',
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
          
          console.log("获取拼单成功")
        }else{
          console.log("获取拼单失败")
        }
      })
      .catch(err=>{                   //请求错误后执行函
        console.log("请求错误")
      })
    }
  },
  created(){
        this.token =  localStorage.getItem('token')
        },
  mounted: function () {
      this.getList();
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
       overflow:auto;
      .date{
          font-size: 12px;
          font-family: '微软雅黑';
          color: grey;
        //  padding-left: 2px;
      }
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
         margin-bottom: 2px;
      }
  }

  .grid-content {
    height: 100px;
  }
  }
</style>
