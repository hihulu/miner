<template>
    <div class="CONTENT">
       <el-row>
                <span >
                  <i class="el-icon-edit"></i>
                  职位描述
                </span>    
       </el-row>
       <p>{{jobs.description}}</p>
       
    </div>
</template>

<script>
export default {
    data(){
        return{
            jobs:[],
            jobId:''
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
          console.log("职位描述获取成功")
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
  .CONTENT{
    .el-row {
        height: 40px;
        margin-bottom: 0;
        padding-top: 20px;
        padding-left: 10px;
        span{
          font-family: 宋体;
          font-size: 18px;
          font-weight: bold;
          text-overflow: ellipsis;
        }
        i{
            color:#FF9000;
          }
    }
    p{
      font-family: '微软雅黑';
      font-size: 16px;
      padding-top: 20px;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
</style>