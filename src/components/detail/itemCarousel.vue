<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in imgs" :key="item">
      <h3><img :src="item"></h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
// import { Swipe, SwipeItem,  } from 'vant';
export default {
  data() {
    return{
      imgs:[],
      token:'',
      jobId:''
    }
  },

  methods: {
      getpic() {
         this.$axios({
            method: 'get',
            url: '/demo/job/get',
            headers: {
                'Content-Type': "application/json;charset=UTF-8",
                'Authorization': 'Bearer ' + this.token,
            },
            params: {
              id: this.jobId,
            }
          })
          .then(res=>{
            if(res.data.code === 0){
              var res = res.data.data
              // console.log(res.imgUrl)
              //把照片变成数组格式
              var arr = res.imgUrl.substr(1);
              var arr = arr.substring(0,arr.length-1);
              var arr = arr.split(",")
              this.imgs = arr
              console.log("获取成功")
            }else{
              console.log("获取失败")
            }
          })
          .catch(err=>{
            console.log("请求错误")
          })
      },

  },

  created(){
    this.jobId = localStorage.getItem('jobId')
    this.getpic()
  },
}
</script>

<style>
  .block{
    width: 100%;
    padding-top: 40px;
  }
  img{
        width: 100%;
        height: 100%;
    }
</style>