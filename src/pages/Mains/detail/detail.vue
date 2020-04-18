<template>
    <div class="goods">
    <!-- 页头和标题 -->
        <reback></reback>
    <!-- 轮播职位图 -->
        <item-carousel></item-carousel>
    <!-- 描述 -->
        <describe></describe>
        <!-- 评论 -->
<!--         <coms-component></coms-component> -->
    <div class="COMS">
         <ul>
              <li @click="goComments(jobId)">
                <span><i class="el-icon-tickets"></i>公司评价</span>
                <span><i class="el-icon-arrow-right"></i></span>               
              </li>
         </ul>
      <div></div>     
    </div>

        <!-- 选周次 -->
        <week @transferweekNum="getWeekNum" @transferNum="getNum"></week>
        <!-- 选礼拜日 -->
        <!-- <weekday></weekday> -->
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
        <!-- 职位描述 -->
        <content-component></content-component>
        <!-- 底部 -->
        <!-- <custom-popup></custom-popup> -->

        <div class="ACTION">
          <van-goods-action >
            <van-goods-action-icon icon="like-o"  @click="like" :color="likeColor" text="收藏"/>
            <van-goods-action-icon icon="cart-o" @click="goCar" :info="cartCount" text="拼的车"/>
            <van-goods-action-button type="warning" text="加入拼的车" @click="addCar" />
            <van-goods-action-button type="danger" text="立即拼" @click="onDeal" />
          </van-goods-action>
      </div>
    </div>
</template>

<script>
import { Checkbox, CheckboxGroup,GoodsAction, GoodsActionIcon, GoodsActionButton, Icon,Dialog } from 'vant';

import Reback from '@/components/detail/reback'
import ItemCarousel from "@/components/detail/itemCarousel"
import Describe from "@/components/detail/describe"
// import ComsComponent from "@/components/detail/coms"
import ContentComponent from "@/components/detail/ContentComponent"
import CustomPopup from "@/components/detail/CustomPopup"
import Week from "@/components/detail/week"
// import Weekday from "@/components/detail/weekday"


export default {
  data () {
    return {
      ifLike:false,
      likeColor:'black',
      likeList:[],
      cartCount:'',
      show: false,
      token:'',
      jobId:'',
      weekNum:'',
      num:'1',
       result: [],
       dayOfWeek1:'0',
       dayOfWeek2:'0',
       dayOfWeek3:'0',
       dayOfWeek4:'0',
       dayOfWeek5:'0',
       dayOfWeek6:'0',
       dayOfWeek7:'0',
    }
  },
  methods:{

    goComments (wid) {
      this.$router.push({
        path: '/CommentList', query: { wid: wid } })
        localStorage.setItem('wid',wid)
    },

    //判断是否已收藏
    init(){
      this.$axios({
        method: 'get',
        url: '/job/list',
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
            'Authorization': 'Bearer ' + this.token,
        },
        params: {
          wid:this.jobId
        }
      })
      .then(res=>{                    //请求成功后执行函数
        if(res.data.code === 0){
          //定义从后端获取的joblist
          var res = res.data.data;
          this.likeList=res
          this.likeList.forEach(item=>{
            if(item.id==this.jobId){
                this.likeColor='red';
                this.ifLike = true;
                console.log("已收藏");
            }
          })
        }else{
          console.log("err")
        }
      })
      .catch(err=>{                   //请求错误后执行函
        console.log("请求错误")
      })
    },
        getWeekNum(msg){
          this.weekNum=msg;
          // console.log(this.weekNum)
        },
        getNum(msg){
          this.num=msg
        },
        addCar(){
          this.$axios({
            method: 'post',
            url: '/demo/job-car/insert',
            headers: {
              'Content-Type': "application/json;charset=UTF-8",
              'Authorization': 'Bearer ' + this.token
            },
            data:{
              wid:this.jobId,
              weekNum:this.weekNum,
              num:this.num,
              oneOfWeek:this.dayOfWeek1,
              twoOfWeek:this.dayOfWeek2,
              threeOfWeek:this.dayOfWeek3,
              fourOfWeek:this.dayOfWeek4,
              fiveOfWeek:this.dayOfWeek5,
              sixOfWeek:this.dayOfWeek6,
              sevenOfWeek:this.dayOfWeek7
            }  
          })
          .then(res=>{                    //请求成功后执行函数
            if(res.data.message === 'SUCCESS'){
                Dialog.alert({
                  message: '加入拼车成功'
                }).then(() => {});
            console.log("加入拼车成功")
            }else{
              console.log("加入拼车失败")
            } 
          })
          .catch(() => {
             console.log("请求错误")
            })
        },
        setWeekday(){
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
        },

        like() {
            if(this.ifLike === false) {
              this.$axios({
        method: 'post',
        url: '/job/insert',
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
            'Authorization': 'Bearer ' + this.token,
        },
        params: {
          wid:this.jobId
        }
      })
      .then(res=>{                    //请求成功后执行函数
        if(res.data.code === 0){
                this.likeColor='red';
                this.ifLike = true;
                console.log("收藏成功");
          
        }else{
          console.log("err")
        }
      })
      .catch(err=>{                   //请求错误后执行函
        console.log("请求错误")
      })
            }
        },

        goCar(){
            this.$router.push("/car");        
        },
        onDeal(){
          this.$axios({
            method: 'post',
            url: '/demo/week/choose',
            headers: {
              'Content-Type': "application/json;charset=UTF-8",
              'Authorization': 'Bearer ' + this.token
            },
            params:{
              wid:this.jobId,
              weekNum:this.weekNum,
              num:this.num,
              oneOfWeek:this.dayOfWeek1,
              twoOfWeek:this.dayOfWeek2,
              threeOfWeek:this.dayOfWeek3,
              fourOfWeek:this.dayOfWeek4,
              fiveOfWeek:this.dayOfWeek5,
              sixOfWeek:this.dayOfWeek6,
              sevenOfWeek:this.dayOfWeek7
            }  
          })
          .then(res=>{                    //请求成功后执行函数
            if(res.data.message === 'SUCCESS'){
                Dialog.alert({
                  message: '拼兼职成功'
                }).then(() => {});
            console.log("拼兼职成功")
            }else{
              console.log("拼兼职失败")
            } 
          })
          .catch(() => {
             console.log("请求错误")
            })
        }
    },
    created(){
        this.token =  localStorage.getItem('token'),
        this.jobId = localStorage.getItem('jobId'),
        this.init()
        },
  components: {
    Reback,
    ItemCarousel, 
    Describe,
    // ComsComponent,
    ContentComponent,
    CustomPopup,
    Week,
    
    [Checkbox.name]:Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [Icon.name]: Icon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Dialog.name]:Dialog 
  }
}
</script>

<style lang="scss">
.goods {
        padding-bottom: 50px;
        //  touch-action: none;
}
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