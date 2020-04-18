<template>
  <div>
    <div class="title-container">
        <i @click="back" class="el-icon-arrow-left" style="margin-left: 20px;position: absolute;height: 40px;line-height: 60px;color: white;font-size: 19px;"></i>
        <div class="title">商品评价</div>
    </div></br>


  <el-table
    :data="List"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="time"
      label="日期"
      :formatter="formatter"
      width="90">
    </el-table-column>
    <el-table-column
      prop="userName"
      label="用户"
      :formatter="formatter"
      width="90">
    </el-table-column>
    <el-table-column
      prop="content"
      label="评价内容"
      :formatter="formatter"
      width="120">
    </el-table-column>
    <el-table-column prop="comImg" label="图片"  >
       <template   slot-scope="scope">            
          <img :src="scope.row.comImg"  min-width="45" height="45" />
       </template>         
    </el-table-column> 
<!--     <el-table-column
      prop="logistics"
      label="物流"
      sortable
      width="80">
    </el-table-column>
    <el-table-column
      prop="quality"
      label="质量"
      sortable
      width="80">
    </el-table-column>
    <el-table-column
      prop="service"
      label="服务"
      sortable
      width="80">
    </el-table-column> -->
  </el-table>


  </div>
</template>

<script>
export default {
    data(){
        return{
            List: [],
            List2: [],
            wid:'',
            token:''
        }
    },

    created(){
        this.token = localStorage.getItem('token')
        this.wid = localStorage.getItem('wid')
        this.getComment()
        },

    methods: {
      back: function () {
        this.$router.push('/detail')
      },

      //点击商品评价获取
      getComment() {
       this.$axios({
          method: 'get',
          url: '/jobComment/get',
          headers: {
              'Content-Type': "application/json;charset=UTF-8",
              'Authorization': 'Bearer ' + this.token,
          },
          params: {
            wid: this.wid
          }
        })
        .then(res=>{
          if(res.data.code === 0){
            var res = res.data.data
            //评论时间、把照片变成数组格式
            for (var j = 0; j < res.length; j++){
              res[j].time = res[j].time.substring(0,10);
              res[j].comImg = res[j].comImg.substr(1);
              res[j].comImg = res[j].comImg.substring(0,res[j].comImg.length-1);
              res[j].comImg = res[j].comImg.split(",")
            }
            this.List = res
            // this.List.time = res.time.substring(0,10)
            console.log(this.List)
            console.log("获取评论成功")
          }else{
            console.log("获取评论失败")
          }
        })
        .catch(err=>{
          console.log("请求错误")
        })

       this.$axios({
          method: 'get',
          url: '/jobGrade/queryAll',
          headers: {
              'Content-Type': "application/json;charset=UTF-8",
              'Authorization': 'Bearer ' + this.token,
          },
          params: {
            wid: this.wid
          }
        })
        .then(res=>{
          if(res.data.code === 0){
            var res = res.data.data
            this.List2 = res
            for (var j = 0; j < res.length; j++){
            this.List[j].logistics = this.List2[j].logistics
            this.List[j].quality = this.List2[j].quality
            this.List[j].service = this.List2[j].service
            }
            console.log(this.List)
            console.log("获取评论成功")
          }else{
            console.log("获取评论失败")
          }
        })
        .catch(err=>{
          console.log("请求错误")
        })

      }





    },
    
}
</script>

<style>
  .title-container{
    background-color: #FF9000;
    opacity: 0.7;
    display:flex;
    height: 60px;
    position: relative;
  }

  .title {
    font-size: 22px;
    color:#fff;
    margin:0 auto;
    height: 40px;
    line-height: 60px;
    position: relative;
  }




</style>
