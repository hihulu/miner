<template>
    <div class="DESCRIBE">
       <el-row  class="jobs-title">
                <span >
                  {{jobs.title}}
                </span>    
       </el-row>
       <el-row class="jobs-location">
                <span >
                  <i class="el-icon-location-information"></i>
                  {{jobs.address}}
                </span>    
       </el-row>
       <el-row class="jobs-price">
                <span>
                    {{'￥'+jobs.price+'/日'}}
                    <span class="jobs-way">{{jobs.typeOne}}</span>
                </span>    
       </el-row>
       <el-row class="jobs-location">
                <span>
                    {{'已售出'+jobs.sales+'天 / 库存'+jobs.n+'天'}}
                </span>    
       </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
          jobs:[],
          jobId:''
            // jobs: {
            //     title: '公众号运营',
            //     location:'中国矿业大学南湖校区',
            //     price: '80',
            //     way:'日结'
            // }
        }
    },
    methods: {
    getJobs() {
     this.$axios({
        method: 'get',
        url: '/demo/job/get',
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
        },
        params: {
          id: this.jobId
        }
      })
      .then(res=>{                    //请求成功后执行函数
        if(res.data.code === 0){
          //定义从后端获取的joblist
          var res = res.data.data
          this.jobs = res
          console.log("获取职位详情成功")
        }else{
          console.log("获取失败")
        }
      })
      .catch(err=>{                   //请求错误后执行函
        console.log("请求错误")
      })
    },
  },
  mounted: function () {
      this.getJobs()
  },
  created(){
         this.jobId = localStorage.getItem('jobId')
        //  console.log(this.jobId)
  },

}
</script>

<style lang="scss">
  .DESCRIBE{
    .el-row {
        height: 40px;
        margin-bottom: 0
    // &:last-child {
    //   margin-bottom: 0;
    // }
  }
  }
  .jobs-title{
     padding-top: 20px;
      padding-left: 10px;
      font-family: 宋体;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      display: -webkit-box;
      margin-bottom: -1px;
  }
  .jobs-location{
       padding-top: 10px;
       padding-left: 10px;
       margin-bottom: -1px;
      color: gray;
    //   width: 100px;
      i{
        color: #409EFF
      }
  }
  .jobs-price{
       padding-left: 10px;
       padding-bottom: 0;
       margin-bottom: 0;
      font-family: 微软雅黑;
      font-size: 16px;
      color:rgb(240, 63, 63);
      font-weight: normal;
  }
  .jobs-way{
      margin-left: 5px;
      border-radius: 30px;
      background-color:#409EFF;
      opacity: 0.7;
      font-size: 12px;
      color: white;
      padding: 2%;
  }
</style>