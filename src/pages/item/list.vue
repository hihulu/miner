<template>
  <div class="contact-list">

    <div class="contact-list-content">
      <div>
        <div class="contact-list-wrap">
        <div class="title-container">
            <i @click="backme" class="el-icon-arrow-left" style="margin-left: 20px;position: absolute;height: 40px;line-height: 60px;color: white;font-size: 19px;"></i>
            <div class="title">我的发布</div>
        </div>
          <br/>
          <div class="contact-list-header" style="margin: 0px 15px 0px 0px">
            <el-button @click="goCreate"  style="background:#FF9000;opacity:0.9;color: white">发布招聘</el-button>
          </div>

        <!--列表-->
        <el-table :data="tableData" :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%;">

            <el-table-column prop="title" label="职位名称"  ></el-table-column>
            <el-table-column prop="address" label="地址"  ></el-table-column>
            <el-table-column prop="price" label="佣金/天"  ></el-table-column>
            <el-table-column prop="imgUrl" label="图片"  >
                 <!-- 图片的显示 -->
                 <template   slot-scope="scope">            
                    <img :src="scope.row.imgUrl"  min-width="45" height="45" />
                 </template>         
            </el-table-column> 
            <el-table-column label="操作" >



            <template slot-scope="scope">
              <div>
                <div>
                  <el-button type="text" @click="handleEdit(scope.row.id)">修改</el-button>
                </div>
                <div>
                  <el-button type="text" @click="handleDelete(scope.row.id)">删除</el-button>
                </div>

                <!-- 点击修改弹出修改界面 -->
                <el-dialog
                  title="修改招聘信息" :visible.sync="dialogVisible" width="93%" >
                  <el-form  :model="updateform" ref="updateformRef" label-width="80px" :rules="rules" class="create-form">

                    <el-form-item label="公司名称" prop="companyName">
                      <el-input v-model="updateform.companyName"></el-input>
                    </el-form-item>
                    <el-form-item label="工作城市" prop="address">
                      <el-input v-model="updateform.address"></el-input>
                    </el-form-item>
                    <el-form-item label="职称" prop="title">
                      <el-input v-model="updateform.title"></el-input>
                    </el-form-item>
                    <el-form-item label="职位详情" prop="description">
                      <el-input type="textarea" v-model="updateform.description"></el-input>
                    </el-form-item>
                    <el-form-item label="佣金/天" prop="price">
                      <el-input v-model="updateform.price"></el-input>
                    </el-form-item>

                    <el-form-item label="图片">
                      <!-- <el-image style="width: 100px; height: 100px" :src="firstimg"></el-image> -->
                    </el-form-item>
                    <el-carousel :interval="5000" arrow="always">
                      <el-carousel-item v-for="item in imgs" :key="item">
                        <h3><img :src="item"></h3>
                      </el-carousel-item>
                    </el-carousel>

                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="update">确 定</el-button>
                  </span>
                </el-dialog>

              </div>

            </template>


            </el-table-column>
        </el-table>
        </div>
      </div>
    </div>
  </div>
</template>



<script>

  export default {
    name: 'list',
    data() {
      return {
        imgs: [],            //updateform图片数组
        firstimg: '',        //updateform第一张图片
        tableData: [],
        token:'',
        dialogVisible: false,
        rules: {
          title: [ {required: true, message: '职位名称不能为空', trigger: 'blur' }],
          description: [ {required: true, message: '请描述职位详情', trigger: 'blur' }],
          price: [ {required: true, message: '请输入佣金/天', trigger: 'blur' }],
          companyName: [ {required: true, message: '公司名称不能为空', trigger: 'blur' }],
          address: [ {required: true, message: '地址不能为空', trigger: 'blur' }]
        },

        //根据id查询updateform数据
        updateform: {}

      }
    },

    created(){
      this.getItemList()
    },
    methods: {
      goCreate: function () {
        this.$router.push('/create')
      },
      backme: function () {
        this.$router.push('/me')
      },

      //获取“我的发布”列表
      getItemList() {
       this.$axios({
          method: 'get',
          url: '/demo/job/',
          headers: {
              'Content-Type': "application/json;charset=UTF-8",
              'Authorization': 'Bearer ' + this.token,
          }
        })
        .then(res=>{
          if(res.data.code === 0){
            var res = res.data.data
            //取第一张照片
            for (var j = 0; j < res.length; j++){
              res[j].imgUrl = res[j].imgUrl.substr(1);
              res[j].imgUrl = res[j].imgUrl.substring(0,res[j].imgUrl.length-1);
              res[j].imgUrl = res[j].imgUrl.split(",")
              res[j].imgUrl = res[j].imgUrl[0]
            }
            this.tableData = res
            console.log(this.tableData)
            console.log("获取Item列表成功")
          }else{
            console.log("获取Item列表失败")
          }
        })
        .catch(err=>{                   
          console.log("请求错误")
        })
      },

      //根据id值查询信息
      handleEdit(id) {      //接收id
        this.dialogVisible = true      //展示编辑对话框
         this.$axios({
            method: 'get',
            url: '/demo/job/get',
            headers: {
                'Content-Type': "application/json;charset=UTF-8",
                'Authorization': 'Bearer ' + this.token,
            },
            params: {
              id: id,
            }
          })
          .then(res=>{
            console.log(res);
            if(res.data.code === 0){
              var res = res.data.data
              this.updateform = res

              //把imgUrl图片变成数组形式
              var arr = this.updateform.imgUrl.substr(1)
              var arr = arr.substring(0,arr.length-1)
              var arr = arr.split(",")
              this.firstimg = arr[0]
              this.updateform.imgUrl = arr
              this.imgs = arr

              console.log(this.updateform)
              console.log("获取成功")
            }else{
              console.log("获取失败")
            }
          })
          .catch(err=>{
            console.log("请求错误")
          })
      },

      //修改信息点击确定后提交
      update(){
          this.$refs.updateformRef.validate(valid => {
            if (valid) {
              this.$axios({
                method: 'put',
                url: '/demo/job/update',
                headers: {
                  'Content-Type': "application/json;charset=UTF-8",
                  'Authorization': 'Bearer ' + this.token,
                },
                params: {
                  id: this.updateform.id,
                  title: this.updateform.title,
                  description: this.updateform.description,
                  price: this.updateform.price,
                  // imgUrl: this.updateform.imgUrl,
                  companyName: this.updateform.companyName,
                  address: this.updateform.address
                }
              })
              .then(res=>{
                if(res.data.message !== 0){
                  this.$message.error('修改失败')
                }
                  //关闭对话框
                  this.dialogVisible = false
                  //刷新职位列表
                  this.getItemList()
                  //提示修改成功
                  this.$message.success('修改完成')
              })

              } else {
              console.log('error submit!!')
              return false
              }
          })
      },

      //删除
      handleDelete(id) {      //接收id
         this.$axios({
            method: 'delete',
            url: '/demo/job/delete',
            headers: {
                'Content-Type': "application/json;charset=UTF-8",
                'Authorization': 'Bearer ' + this.token,
            },
            params: {
              id: id,
            }
          })
          .then(res=>{
            console.log(res);
            if(res.data.code === 0){
              this.getItemList()
              return this.$message.success('删除成功')
              console.log("删除成功")
            }else{
              console.log("删除失败")
            }
          })
          .catch(err=>{
            console.log("请求错误")
          })
      },


    },

  }
</script>

<style lang="stylus" scoped>

  .contact-list-header
    text-align right
    .el-button
      display inline-block
      text-align center

  .contact-list-content
    text-align left

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

  .xiangqing {
    font-size: 17px;
    margin: 3px auto 6px auto;
    font-weight: bold;
  }

  .bg {
    background-color:#F3B64A
  }



</style>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .msgBox{
    width: 90%;
  }
</style>


