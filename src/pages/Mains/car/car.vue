<template>
<div>
  <home-header class="TOP" :message='topTitle'></home-header>
  <div class="cart">
    <van-checkbox-group class="card-goods" v-model="checkedGoods" ref="checkboxGroup" v-if="cartList.length>0">
      <div v-for="(item,index) in cartList" :key="index" class="card-goods__item">
        <!-- 单个item的选中 -->
        <van-checkbox :name="index"></van-checkbox>
        <van-card
          style="margin-left:20px;"
          :title="item.title"
          :price="item.price"
        >
        <!-- 描述从第几周开始的 -->
        <template #desc>
          <span class="desc">2020年第{{item.weekNum}}周开始</span>
        </template>
        <!-- 星期几的标签,利用v-if没有数值就不显示 -->
        <template #tags>
          <span class="tags">
              <van-tag plain size="medium"  v-if="item.dayOfWeek1.length>0" type="primary">{{item.dayOfWeek1}}</van-tag>
              <van-tag plain size="medium"  v-if="item.dayOfWeek2.length>0" type="primary">{{item.dayOfWeek2}}</van-tag>
              <van-tag plain size="medium"  v-if="item.dayOfWeek3.length>0" type="primary">{{item.dayOfWeek3}}</van-tag>
              <van-tag plain size="medium"  v-if="item.dayOfWeek4.length>0" type="primary">{{item.dayOfWeek4}}</van-tag>
              <van-tag plain size="medium"  v-if="item.dayOfWeek5.length>0" type="primary">{{item.dayOfWeek5}}</van-tag>
              <van-tag plain size="medium"  v-if="item.dayOfWeek6.length>0" type="primary">{{item.dayOfWeek6}}</van-tag>
              <van-tag plain size="medium"  v-if="item.dayOfWeek7.length>0" type="primary">{{item.dayOfWeek7}}</van-tag>
          </span>   
        </template>
        <!-- 选择周数 -->
        <div slot="price-top" style="vertical-align: middle;">
            <!-- <span style="display: inline;height:40px;font-size:12px;margin-bottom:-10px">周数：</span> -->
            <van-stepper style="display: inline;" v-model="item.num" name='周数' @change="changeNum(item.num,item.id)" disableInput/>
        </div>
        <!-- 删除按钮 -->
        <template #footer>
          <van-button type="warning" round size="mini" @click="order(item.num,item.id,index)" >结算</van-button>
          <van-button type="danger" round size="mini" @click="delCar(item.id,index)">删除</van-button>
        </template>  
      </van-card>
      </div>
      <br>


      <!-- 底部固定 -->
    </van-checkbox-group>
    <!-- 结算按钮 -->
    <van-submit-bar
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="submit"
      v-if="cartList.length>0"
    >
    <!-- 全选按钮 -->
     <van-checkbox v-model="checkedAll" @click="checkAll" style="padding: 0 10px">全选</van-checkbox>
     <van-button round size="small" style="margin-right:130px" @click="clear" type="info">清空</van-button>
    </van-submit-bar>
    
    <div class="no-data" v-if="cartList.length ===0 ">
      <p style="text-align: center;color:lightgray">
        <van-icon name="cart-o" style="text-align: center" size="3rem"/><br>
        购物车还是空的</p>
      <van-button type="default" block round @click="toHome">去逛逛</van-button>
    </div>
    
  </div>
  </div>
</template>

<script>
import { Dialog,Tag,Checkbox, CheckboxGroup, Card, SubmitBar, Toast, NavBar, Tabbar, TabbarItem,Stepper, Button, Icon  } from 'vant';
import HomeHeader from "@/components/common/header"
export default {
    components: {
        HomeHeader,
        [Card.name]: Card,
        [Checkbox.name]: Checkbox,
        [SubmitBar.name]: SubmitBar,
        [CheckboxGroup.name]: CheckboxGroup,
        [NavBar.name]: NavBar,
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
        [Stepper.name]: Stepper,
        [Button.name]: Button,
        [Icon.name]: Icon,
        [Tag.name]:Tag,
        [Dialog.name]:Dialog
    },

    data() {
        return {
          topTitle: '购物车',
            checkedGoods: [],
            checkeAllCarts:[],
            cartList: [],
            checkedAll: false,
            token:'',
            // 更新购物车所需参数
            oneOfWeek: 0,
	          sevenOfWeek: 0,
	          sixOfWeek: 0,
	          threeOfWeek: 0,
            twoOfWeek: 0,
            fiveOfWeek: 0,
            fourOfWeek: 0,
            weekNum:'',
            wid:''

        }
    },
    mounted(){
      this.init()
    },
    computed: {
        submitBarText() {
            const count = this.checkedGoods.length;
            return '结算' + (count ? `(${count})` : '');
        }
    },

    methods: {
      //初始化获得购物车
        init(){
          this.$axios({
            method: 'get',
            url: '/demo/job-car/get',
            headers: {
              'Content-Type': "application/json;charset=UTF-8",
              'Authorization': 'Bearer ' + this.token,
            }
          })
          .then(res=>{                    //请求成功后执行函数
            if(res.data.code === 0){
            var res = res.data.data
            this.cartList = res
            console.log("获取购物车成功")
          }else{
            console.log("获取购物车失败")
          }
          })
          .catch(err=>{                   //请求错误后执行函
            console.log("请求错误")
          })     
        },

        //修改购物车的数量
        changeNum(num,id) {
          console.log(num); //数量
          console.log(id); //id
          //找到数组cartlist里对应id的对象
          var obj=this.cartList.find(function (x) {
              return x.id === id
          });
          // console.log(obj);
          //后端传的是dayofweek，而这个接口需要oneofweek，通过if进行转换
              if(!obj.dayOfWeek1==""){
                this.oneOfWeek=1
              }
              if(!obj.dayOfWeek2==''){
                this.twoOfWeek=1
              }
              if(!obj.dayOfWeek3==''){
                this.threeOfWeek=1
              }
              if(!obj.dayOfWeek4==''){
                this.fourOfWeek=0
              }
              if(!obj.dayOfWeek5==''){
                this.fiveOfWeek=0
              }
              if(!obj.dayOfWeek6==''){
                this.sixOfWeek=0
              }
              if(!obj.dayOfWeek7==''){
                this.sevenOfWeek=0
              }
              this.weekNum=obj.weekNum;
              this.wid=obj.wid;
           
          this.$axios({
            method: 'PUT',
            url: '/demo/job-car/update',
            headers: {
              'Content-Type': "application/json;charset=UTF-8",
              'Authorization': 'Bearer ' + this.token,
            },
            data:{
              oneOfWeek: this.oneOfWeek,
              twoOfWeek: this.twoOfWeek,
              threeOfWeek: this.threeOfWeek,
              fourOfWeek: this.fourOfWeek,
              fiveOfWeek: this.fiveOfWeek,
              sixOfWeek: this.sixOfWeek,
              sevenOfWeek: this.sevenOfWeek, 
              id:id,
              num:num,
              weekNum:this.weekNum,
              wid:this.wid
            }
          })
          .then(res=>{                    //请求成功后执行函数
            if(res.data.code === 0){
            var res = res.data.data
            this.init
            console.log("更新成功")
          }else{
            console.log("更新失败")
          }
          })
          .catch(err=>{                   //请求错误后执行函
            console.log("请求错误")
          })     
        },
      //清空购物车
        clear(){
          this.cartList=[];
          this.$axios({
            method: 'delete',
            url: '/demo/job-car/deleteAll',
            headers: {
              'Content-Type': "application/json;charset=UTF-8",
              'Authorization': 'Bearer ' + this.token,
            }
          })
          .then(res=>{                    //请求成功后执行函数
            if(res.data.code === 0){
              console.log("清空成功")
            }else{
              console.log("清空失败")
            }
          })
          .catch(err=>{                   //请求错误后执行函
            console.log("请求错误")
          })
        },

        //单笔订单的删除按钮，根据订单id删除
        delCar(id,index){
          this.cartList.splice(index,1)//'1' 代表删除一个
          console.log(id); //id
          this.$axios({
            method: 'delete',
            url: '/demo/job-car/delete',
            headers: {
              'Content-Type': "application/json;charset=UTF-8",
            },
            params:{
              id:id
            }
          })
          .then(res=>{                    //请求成功后执行函数
            if(res.data.code === 0){
              console.log("删除成功")
            }else{
              console.log("删除失败")
            }
          })
          .catch(err=>{                   //请求错误后执行函
            console.log("请求错误")
          })
        },

        //单个结算按钮
        order(num,id,index){
          console.log(num); //数量
          console.log(id); //id
          //找到数组cartlist里对应id的对象
          var obj=this.cartList.find(function (x) {
              return x.id === id
          });
          // console.log(obj);
          //后端传的是dayofweek，而这个接口需要oneofweek，通过if进行转换
              if(!obj.dayOfWeek1==""){
                this.oneOfWeek=1
              }
              if(!obj.dayOfWeek2==''){
                this.twoOfWeek=1
              }
              if(!obj.dayOfWeek3==''){
                this.threeOfWeek=1
              }
              if(!obj.dayOfWeek4==''){
                this.fourOfWeek=0
              }
              if(!obj.dayOfWeek5==''){
                this.fiveOfWeek=0
              }
              if(!obj.dayOfWeek6==''){
                this.sixOfWeek=0
              }
              if(!obj.dayOfWeek7==''){
                this.sevenOfWeek=0
              }
              this.weekNum=obj.weekNum;
              this.wid=obj.wid;
          this.$axios({
            method: 'post',
            url: '/demo/week/chooseInJobCar',
            headers: {
              'Content-Type': "application/json;charset=UTF-8",
              'Authorization': 'Bearer ' + this.token
            },
            params:{
              num:num,
              weekNum:this.weekNum,
              wid:this.wid,
              oneOfWeek: this.oneOfWeek,
              twoOfWeek: this.twoOfWeek,
              threeOfWeek: this.threeOfWeek,
              fourOfWeek: this.fourOfWeek,
              fiveOfWeek: this.fiveOfWeek,
              sixOfWeek: this.sixOfWeek,
              sevenOfWeek: this.sevenOfWeek, 
              id:id
            }  
          })
          .then(res=>{                    //请求成功后执行函数
            if(res.data.message === 'SUCCESS'){
                this.cartList.splice(index,1)
                Dialog.alert({
                  message: '下单成功'
                }).then(() => {});
            console.log("拼兼职成功")
            }else{
              console.log("拼兼职失败")
            } 
          })
          .catch(() => {
             console.log("请求错误")
            })
        },

        // 最下面那个结算按钮，因为后端不好实现批量结算，此按钮仅做装饰用
        submit() {
            this.$router.push('/')
        },
       
        //购物车是空的，去主页逛逛
        toHome() {
            this.$router.push('/')
        },
        
        //全选和反选按钮，利用vant-ui简单实现
        checkAll( ) {
          if(this.checkedGoods.length === this.cartList.length){
            this.$refs.checkboxGroup.toggleAll();
          }else{
            this.$refs.checkboxGroup.toggleAll(true);
          }
        },
    },
    created(){
      this.token =  localStorage.getItem('token')     
    },
};

</script>

<style lang="scss">
  
  .TOP {
        position: fixed;
    }  
  .cart{
    padding-top: 45px;
    padding-bottom: 80px;
  }
  .van-submit-bar{
   bottom:48px;
  }
.card-goods {
  background-color: #fff;
  

  &__item {
    position: relative;
    background-color: #fafafa;

    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }

    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }

    .van-card__title {
      // padding-top: 5px;
      font-family: 微软雅黑;
      font-size: 16px;
      font-weight: bold;
      // text-overflow: ellipsis;
      display: -webkit-box;
      margin-bottom: 5px;
      overflow:auto;
    }
    .van-card__price {
      vertical-align: middle;
      color: #f44;
    }
    .desc {
      font-size: 15px;
      margin-top: 7px;
      margin-bottom: 15px;
      font-family: 微软雅黑;
    }
    .tags{
      margin-left: 5px;
    }
  }
}
</style>
