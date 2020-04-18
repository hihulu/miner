<template>
  <div class="contact-edit">
    <div class="title-container">
        <i @click="cancelForm" class="el-icon-arrow-left" style="margin-left: 20px;position: absolute;height: 40px;line-height: 60px;color: white;font-size: 19px;"></i>
        <div class="title">创建职位</div>
    </div></br></br>
    <el-form ref="addFormRef" :model="addForm" :rules="rules" style="width: 80%" class="create-form">
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="addForm.companyName" autofocus="true" placeholder="例“网易云公司”"></el-input>
      </el-form-item>
      <el-form-item label="工作城市" prop="address">
        <el-input v-model="addForm.address" placeholder="例“徐州”"></el-input>
      </el-form-item>
      <el-form-item label="职称" prop="title">
        <el-input v-model="addForm.title" placeholder="例“前端设计师”"></el-input>
      </el-form-item>
      <el-form-item label="职位详情" prop="description">
        <el-input type="textarea" v-model="addForm.description" placeholder="例“前端代码”"></el-input>
      </el-form-item>
      <el-form-item label="职位类型" prop="typeTwo">
        <el-select v-model="addForm.typeTwo" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" prop="s">
        <el-date-picker
          v-model="addForm.s"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyyMMdd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="e">
        <el-date-picker
          v-model="addForm.e"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyyMMdd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="佣金/天" prop="price">
        <el-input v-model="addForm.price" placeholder="例“200”"></el-input>
      </el-form-item>
      <el-form-item label="佣金结算方式" prop="typeOne">
        <el-select v-model="addForm.typeOne" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

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
          <h3>{{ addForm.imgs[index].name }}</h3>
        </div>
      </el-form-item>

      <el-form-item style="text-align: center;">
        <el-button style="background:#FF9000;opacity:0.9;color: white" @click="onSubmit()">新建</el-button>
        <el-button @click="cancelForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
  name: 'create',
    data () {
      return {
        options1: [{
          value: '教育培训类',
          label: '教育培训类'
        }, {
          value: '互联网运营类',
          label: '互联网运营类'
        }, {
          value: '其他',
          label: '其他'
        }],
        options2: [{
          value: '日结',
          label: '日结'
        }, {
          value: '周结',
          label: '周结'
        }],

        addForm: {
          imgs: [],
          title: '',
          description: '',
          price: '',
          typeOne: '',
          typeTwo: '',
          n: '',   
          s: '',      
          e: '',                             
          companyName: '',
          address: ''
        },
        token:'',
        rules: {
          title: [ {required: true, message: '职位名称不能为空', trigger: 'blur' }],
          description: [ {required: true, message: '请描述职位详情', trigger: 'blur' }],
          price: [ {required: true, message: '请输入佣金/天', trigger: 'blur' }],
          typeOne: [ {required: true, message: '请选择结算方式', trigger: 'blur' }],
          typeTwo: [ {required: true, message: '职位类型不能为空', trigger: 'blur' }],
          s: [ {required: true, message: '请选择开始时间', trigger: 'blur' }],
          e: [ {required: true, message: '请选择结束时间', trigger: 'blur' }],
          companyName: [ {required: true, message: '公司名称不能为空', trigger: 'blur' }],
          address: [ {required: true, message: '地址不能为空', trigger: 'blur' }]
        },
        params: '',
        imgs: [],
      }
    },
    created(){
        this.token = localStorage.getItem('token')
        },

    methods: {
      // 取消按钮事件
      cancelForm: function () {
        this.$router.push('/list')
      },
      onSubmit() {
        //计算总天数n
        var starTime = this.addForm.s.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
        var endTime = this.addForm.e.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
        function datedifference(sDate1, sDate2) {
            var dateSpan,
                tempDate,
                iDays;
            sDate1 = Date.parse(sDate1);
            sDate2 = Date.parse(sDate2);
            dateSpan = sDate2 - sDate1;
            dateSpan = Math.abs(dateSpan);
            iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            return iDays
        };
        var Days = datedifference(starTime,endTime);
        this.addForm.n = Days + 1


        // 创造表单数据
        let params = new FormData()
        for (let item in this.addForm) {
          if (item === 'imgs') {
            for (let img of this.addForm.imgs) {
              params.append(item, img)
            }
          } else {
            params.append(item, this.addForm[item]);
          }
        }
        this.$refs.addFormRef.validate(valid => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: '/demo/job/create',
              headers: {
                'Content-Type':'multipart/form-data',
                'Authorization': 'Bearer ' + this.token
              },
              data: params,
            })
            .then(res=>{                    //请求成功后执行函数
              console.log(res, 'response')
              if(res.data.code !== 0){
                this.$message.error('创建失败')
              }
              else {
                this.$router.push('/list')
                this.$message.success('创建成功')
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 图片上传前钩子
      beforeUpload(params) {
        this.addForm.imgs.push(params);
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
    }
  }
</script>

<style lang="stylus" scoped>

  .contact-edit
    text-align left

  .title-container {
    position: relative;
    text-align: center;
  }

  .el-form-item {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.1); 
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }

  .create-form {
    position: relative;
    width: 80%;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
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
