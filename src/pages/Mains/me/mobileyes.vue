<template>
    <div>
         <!-- 页头 -->
        <div class="MINTOP">
            <el-page-header @back="goBack"></el-page-header>
        </div>
         <ul>
              <li>
                <span class="TEXT"><i class="el-icon-caret-right"></i>手机号</span>

                <span class="phonenum">
                    {{phonenumber}}
                    <i class="el-icon-arrow-right"></i>
                </span>               
              </li>
         </ul>
      </div>
</template>

<script>
import TopComponent from '@/components/login/top-component'
export default {
    data(){
        return{
            phonenumber:null
            // userPhone:null
        }
    },
    components: {
    TopComponent,
    },
    created(){
         this.phonenumber =  localStorage.getItem('currentPhone')
        },
    methods: {
    goBack () {
      this.$router.push({path:'/me'})
    }
  }

}
</script>

<style lang="scss">
.MINTOP {
    color: #FF9000;
    margin-top: 15px;
    margin-left: 10px;
}
ul{
    
    li{
      margin-top: 20px;
      width: 100%;
      background-color: #fff;
      text-align: left;
      border-bottom:solid 1px #f2f3f4 ;
      border-top:solid 1px #f2f3f4 ;
      padding:15px 0 15px 15px ;
      font-size: 16px;
      color:black;
      z-index: 10000;

      .TEXT{
      float: none;

      i{
      color:#FF9000;
      margin-right: 10px;
      font-size: 20px;
      }
      }

      .phonenum{  
        float: right;
        padding-right: 10px;
        i{
          color:#9a9a9a;
          padding-right: 10px;
          font-style: normal;
        }
      }
    }
    
  }
</style>