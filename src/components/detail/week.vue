<template>
    <div class="WEEK">
         <ul>
              <li>
                  <el-date-picker
                      v-model="weekNum"
                      @change="setWeekNum"
                      size="large"
                      type="week"
                      format="yyyy 第 WW 周"
                      placeholder="请选择周次">
                  </el-date-picker>
                  <!-- <el-button><el-button -->
              </li>
              <li>
                <el-input-number v-model="num" @change="setNum" :min="1" :max="10" label="描述文字"></el-input-number>
              </li>
         </ul>
      <div></div>     
    </div>
</template>

<script>
export default {
    data(){
      return{
           weekNum: '',
           weekVal:'',
           num: 1
      }
    },
    methods:{
      setWeekNum(){
        
      var moment = require("moment");
      // return moment(Number(val)).format("YYYY-WW");
       this.weekVal= moment(this.weekNum).utcOffset(480).format("WW")
        console.log(this.weekVal)  
        this.$emit('transferweekNum',this.weekVal)
      },
      setNum(value) {
        this.$emit('transferNum',value)
        console.log(value);
      }
    },
    mounted(){

    }
}
</script>

<style lang="scss">
.WEEK{
  padding-bottom: 10px;
  background-color: #f2f3f4;
  touch-action: none;
  ul{
    // margin-top: 10px;
    li{
      width: 100%;
      background-color: #fff;
      text-align: left;
      overflow: hidden;
      border-bottom:solid 1px #f2f3f4 ;
      padding:10px 0 10px 7px ;
      font-size: 18px;
      color:black;
      z-index: 10000;
      i{
      color:#FF9000;
      margin-right: 10px;
      font-size: 20px;
      }
    }
  }

}
</style>