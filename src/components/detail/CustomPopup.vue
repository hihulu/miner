<template>
    <div class="ACTION">
        <van-goods-action >
            <van-goods-action-icon icon="like-o"  @click="like" :color="likeColor" text="收藏"/>
            <van-goods-action-icon icon="cart-o" @click="goCar" :info="cartCount" text="拼的车"/>
            <!-- <van-goods-action-button type="danger" @click="showBase = true" text="立即拼"/> -->
            <van-goods-action-button type="warning" text="加入拼的车" @click="showPopup" />
            <van-goods-action-button type="danger" text="立即拼" @click="onClickButton" />
        </van-goods-action>
    </div>
</template>

<script>
import { GoodsAction, GoodsActionIcon, GoodsActionButton, Icon } from 'vant';
export default {
    data() {
    return {
      ifLike:false,
      likeColor:'black',
      cartCount:'',
      show: false,
    //   date:''
    };
  },

            
    components:{
        [GoodsAction.name]: GoodsAction,
        [GoodsActionIcon.name]: GoodsActionIcon,
        [Icon.name]: Icon,
        [GoodsActionButton.name]: GoodsActionButton,
    },
    methods:{
        showPopup() {
            this.show = true;
        },

        like() {
            if(this.ifLike === false) {
                favorite.add(this.goods.id).then(response => {
                    Toast('收藏成功')
                    this.ifLike = true
                    this.likeColor = 'red'
                })
            }
        },

        goCar(){
            this.$router.push("/car");        
        },
    }
}
</script>