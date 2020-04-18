<template>
	<div style="margin: 9px 9px 9px 9px" ref="commentFormRef" :model="commentForm">
    <div class="title-container">
        <i @click="backorder" class="el-icon-arrow-left" style="margin-left: 20px;position: absolute;height: 40px;line-height: 60px;color: white;font-size: 19px;"></i>
        <div class="title">评价</div>
    </div></br>
    <div>
      <p class="jobtitle">&nbsp;{{commentForm.jobTitle}}</p>
      <br/>
      <p class="jobtitle">&nbsp;订单号： {{id}}</p>
    </div><br/>

		<!-- 文字评论 -->
		<el-input
		  type="textarea" :rows="3" placeholder="说说您的感受吧~" v-model="commentForm.content">
		</el-input>
		<br/><br/>

    <el-form>
		<!-- 图片评论 -->
      <el-form-item label="上传图片">
        <el-upload
          class="upload-demo"
          action=''
          :before-upload="beforeUpload"
          list-type="picture">
          <el-button size="small" style="background:#FF9000;opacity:0.9;color: white;margin-left:20px">点击上传图片</el-button>
        </el-upload>
        <div class="imgs" v-for="(img, index) in imgs" :key="index">
          <img :src="img">
          <h3>{{ commentForm.imgs[index].name }}</h3>
        </div>
      </el-form-item>
    </el-form>

		</br></br/>
		<!-- 星级评价 -->
		<div style="margin-left:20px;font-size: 16px">
			<p style="font-size: 20px">星级评价</p>
      </br>
			<div class="block">
        <p style="font-size: 12px">物流</p>
			  <el-rate v-model="commentForm.logistics"></el-rate>
			</div>
      <div class="block">
        <p style="font-size: 12px">质量</p>
        <el-rate v-model="commentForm.quality"></el-rate>
      </div>
      <div class="block">
        <p style="font-size: 12px">服务</p>
        <el-rate v-model="commentForm.service"></el-rate>
      </div>
		</div>
		<div style="text-align: center;">
			<el-button size="big" style="width:70%;margin-top:60px;background:#FF9000;opacity:0.9;color: white;font-size: 20px" @click="submit()">发表评价</el-button>
		</div>
		
	</div>
</template>

<script>
  export default {
    data() {
      return {
        commentForm: {
          wid: '',
          jobTitle: '',
          imgs: [],
          content: '',
          logistics: '',        //物流打分
          quality: '',          //质量打分
          service: ''           //服务打分
        },
        id:'',
        token:'', 
        params: '',
        imgs: [],
      };
    },
    created(){
        this.token = localStorage.getItem('token')
        this.id =  localStorage.getItem('id')
        this.getOrder()
        },

    methods: {
      backorder: function () {
        this.$router.push('/order')
      },

      //根据id值查询订单信息
      getOrder(id) {      //接收id
         this.$axios({
            method: 'get',
            url: '/demo/job-order/get',
            headers: {
                'Content-Type': "application/json;charset=UTF-8",
                'Authorization': 'Bearer ' + this.token,
            },
            params: {
              id: this.id,
            }
          })
          .then(res=>{
            if(res.data.code === 0){
              var res = res.data.data
              this.commentForm.wid = res.wid
              this.commentForm.jobTitle = res.title
              console.log("订单获取成功")
            }else{
              console.log("订单获取失败")
            }
          })
          .catch(err=>{
            console.log("请求错误")
          })
      },

      // 图片上传前钩子
      beforeUpload(params) {
        this.commentForm.imgs.push(params);
        // 生成预览图
        const _this = this;
        let reads = function (file) {
          let imgs = _this.imgs;
          let reader = new FileReader();                   
          reader.readAsDataURL(file);
          reader.onload = function(e) {
            imgs.push(e.target.result);
          };
          _this.imgs = imgs;
        }
        reads(params);
      },

      submit(){
        // 打分
        this.$axios({
          method: 'post',
          url: '/jobGrade/insert',
          headers: {
            'Content-Type': "application/json;charset=UTF-8",
            'Authorization': 'Bearer ' + this.token
          },
          data: {
            jobTitle: this.commentForm.jobTitle,
            logistics: this.commentForm.logistics,
            quality: this.commentForm.quality,
            service: this.commentForm.service,
            wid: this.commentForm.wid
          }
        })
        .then(res=>{
          if(res.data.code === 0){
            console.log("打分成功")
          }else{
            console.log("打分失败")
            // console.log(this.data)
          }
        })
        .catch(err=>{
          console.log("请求错误")
        })



        // 创造图文评论表单数据
        let params = new FormData()
        for (let item in this.commentForm) {
          if (item === 'imgs') {
            for (let img of this.commentForm.imgs) {
              params.append(item, img)
            }
          } else {
            params.append(item, this.commentForm[item]);
          }
        }

        //图文评论
        this.$axios({
          method: 'post',
          url: '/jobComment/insert',
          headers: {
            'Content-Type':'multipart/form-data',
            'Authorization': 'Bearer ' + this.token
          },
          data: params
        })
        .then(res=>{                    //请求成功后执行函数
          // console.log(res, 'response')
          if(res.data.code === 0){
            console.log("图文评论成功")
            // console.log(res)
            alert("评论成功")
            this.$router.push('/Me')

          }
          else {
            console.log("图文评论失败")
            // console.log(this.data)
          }
        })
        .catch(err=>{
          console.log("请求错误")
        })

        




      }




    }
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

    .jobtitle {
    padding-top: 5px;
    font-family: 宋体;
    font-size: 16px;
    font-weight: bold;
    text-overflow: ellipsis;
    display: -webkit-box;
    margin-bottom: -1px;
     overflow:auto;
    .date{
        font-size: 12px;
        font-family: '微软雅黑';
        color: grey;
      //  padding-left: 2px;
    }
  }

  .imgs{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0px;
    background-color: rgba(#343434, .1);
    border-radius: 20px;
    margin-bottom: .05rem;
    margin-top: .05rem;
  }
  .imgs > img {
    width: 40px;
    height: 40px;
    margin-left: 15px;
  }
  .imgs > h3 {
    margin-right: 15px;
    letter-spcing: 2px;
  }

</style>
