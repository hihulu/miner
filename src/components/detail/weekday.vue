<template>
    <div>
        <p><i class="el-icon-caret-right"></i>请选择工作日</p>
        <van-checkbox-group class="WEEKDAY" @change="setWeekday" v-model="result" direction="horizontal">
            <van-checkbox v-model="dayOfWeek1" name="1">星期一</van-checkbox>
            <van-checkbox v-model="dayOfWeek2" name="2">星期二</van-checkbox>
            <van-checkbox v-model="dayOfWeek3" name="3">星期三</van-checkbox>
            <van-checkbox v-model="dayOfWeek4" name="4">星期四</van-checkbox>
            <van-checkbox v-model="dayOfWeek5" name="5">星期五</van-checkbox>
            <van-checkbox v-model="dayOfWeek6" name="6">星期六</van-checkbox>
            <van-checkbox v-model="dayOfWeek7" name="7">星期日</van-checkbox>
        </van-checkbox-group>
    </div>
</template>
<script>
import { Checkbox, CheckboxGroup } from 'vant';
export default {
    data () {
      return {
       result: [],
       dayOfWeek1:'',
       dayOfWeek2:'',
       dayOfWeek3:'',
       dayOfWeek4:'',
       dayOfWeek5:'',
       dayOfWeek6:'',
       dayOfWeek7:'',
      };
    },
    methods:{
        setWeekday(){
            // if(this.result.length=0){
            //     alert('请选择日期')
            // }else{
                 if (this.result.includes('1')) {
                     this.dayOfWeek1='1'
                    // console.log(this.dayOfWeek1);
                 }else if(this.result.includes('2')){
                    this.dayOfWeek2="1"
                    console.log(this.dayOfWeek2);
                 }else if(this.result.includes('3')){
                    this.dayOfWeek3="1"
                    // console.log(this.dayOfWeek3);
                 }else if(this.result.includes('4')){
                    this.dayOfWeek4="1"
                    // console.log(this.dayOfWeek4);
                 }else if(this.result.includes('5')){
                    this.dayOfWeek5="1"
                    // console.log(this.dayOfWeek5);
                 }else if(this.result.includes('6')){
                    this.dayOfWeek6="1"
                    // console.log(this.dayOfWeek6);
                 }else if(this.result.includes('7')){
                    this.dayOfWeek7="1";
                    // console.log(this.dayOfWeek7);
                 }else{
                     console.log("err")
                 }
                //  console.log(this.dayOfWeek2)
            // }
        }
    },
    components:{
        [Checkbox.name]:Checkbox,
        [CheckboxGroup.name]: CheckboxGroup
    }
}
</script>
<style lang="scss">
    p{
        padding-left: 10px;
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 16px;
        i{
            font-size: 20px;
            color: #FF9000;
        }
    }
    .WEEKDAY{
        padding-left: 15px;
        font-size: 15px;
        
    }
</style>