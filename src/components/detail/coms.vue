<template>
    <div class="COMS">
         <ul>
              <li @click="goComments(wid)">
                <span><i class="el-icon-tickets"></i>公司评价</span>
                <span><i class="el-icon-arrow-right"></i></span>               
              </li>
         </ul>
      <div></div>     
    </div>
</template>

<script>
export default {
    data(){
      return{
        wid: ''
      }
    },


  created(){
         this.wid = localStorage.getItem('wid')
         // console.log(this.wid)
  },

    methods:{

      goComments (wid) {
        this.$router.push({
          path: '/CommentList', query: { wid: wid } })
          localStorage.setItem('wid',wid)
      }
    }
}
</script>

<style lang="scss">
.COMS{
  padding-top: 10px;
  // padding-bottom: 10px;
  background-color: #f2f3f4;
  ul{
    // margin-top: 10px;
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