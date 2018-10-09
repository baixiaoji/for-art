<template>
  <div class="wrapper">
    <el-form label-position="top" label-width="80px" :model="formLabelAlign" v-show="isShow">
      <el-form-item>
        <el-input v-model="formLabelAlign.name" placeholder='请填写学生姓名'></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formLabelAlign.age" placeholder='请填写学生年龄'></el-input>
      </el-form-item>
      <el-form-item label="第一课时">
        <el-input v-model="formLabelAlign.array[0].title" type="textarea" placeholder='请输入课程名称'></el-input>
        <div style='height: 10px;'></div>
        <el-input v-model="formLabelAlign.array[0].detail" type="textarea" placeholder='请输入课程知识点'></el-input>
      </el-form-item>
      <el-form-item label="第二课时">
        <el-input v-model="formLabelAlign.array[1].title" type="textarea" placeholder='请输入课程名称'></el-input>
        <div style='height: 10px;'></div>
        <el-input v-model="formLabelAlign.array[1].detail" type="textarea" placeholder='请输入课程知识点'></el-input>
      </el-form-item>
      <el-form-item label="第三课时">
        <el-input v-model="formLabelAlign.array[2].title" type="textarea" placeholder='请输入课程名称'></el-input>
        <div style='height: 10px;'></div>
        <el-input v-model="formLabelAlign.array[2].detail" type="textarea" placeholder='请输入课程知识点'></el-input>
      </el-form-item>
      <el-form-item label="第四课时">
        <el-input v-model="formLabelAlign.array[3].title" type="textarea" placeholder='请输入课程名称'></el-input>
        <div style='height: 10px;'></div>
        <el-input v-model="formLabelAlign.array[3].detail" type="textarea" placeholder='请输入课程知识点'></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" style='width: 100%;' @click='formatData' v-show="isShow">一键生成短期课程规划</el-button>
    <div class="img-box" v-show="isImageShow">
      <div class="top">
        <img src="/assets/top.png" alt="">
        <div class="user-info">
          <p>姓名：{{formLabelAlign.name}}</p>
          <p>年龄：{{formLabelAlign.age}}</p>
        </div>
      </div> 
      <div class="between">
        <div class="table-box">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="time"
              label="课时">
            </el-table-column>
            <el-table-column
              prop="title"
              label="课程内容">
            </el-table-column>
            <el-table-column
              prop="detail"
              label="知识点">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="bottom">
        <img src="/assets/bottom.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import html2canvas from 'html2canvas';
  export default {
    name: 'index',
    data() {
      return {
        isShow: true,
        isImageShow: false,
        formLabelAlign: {
          name: '',
          age: '',
          array: [
            {title: '', detail: ''},
            {title: '', detail: ''},
            {title: '', detail: ''},
            {title: '', detail: ''},
          ],
        },
        tableData: []
      }
    },
    props: {},
    methods: {
      formatData() {
        const user = {
          name: this.formLabelAlign.name,
          age: this.formLabelAlign.age,
        };
        const chinese = ['一', '二', '三', '四'];
        const tableData = this.formLabelAlign.array.map((item, index) => {
          return {
            time: `第${chinese[index]}课时`,
            title: item.title,
            detail: item.detail,
          }
        })
        this.tableData = tableData;
        console.log(this.tableData);
        this.isShow = false;
        this.isImageShow = true;
        this.$nextTick(() => {
          let box = document.querySelector('.img-box');
          let wrapper = document.querySelector('.wrapper');
          let _this = this
          html2canvas(box).then((canvas) => {
            let image = new Image();
            image.src = canvas.toDataURL("image/png");
            image.classList.add('six-class');
            _this.isImageShow = false;
            wrapper.appendChild(image);
            console.log(image)
            return image;
          });
        })
      },
    },
  };
</script>

<style>
.wrapper {
  width: 100%;
}
.six-class {
  width: 100%;
}
img{
  width: 100%;
}
.top{
  position: relative;
}
.user-info{
  position: absolute;
  left: 34px;
  bottom: 6%;
  color: #fff;
  text-align: left;
}
.img-box .top img{
  width: 100%;
  padding: 0;
  margin: 0;
}
.img-box .bottom img{
  padding: 0;
  margin: 0;
  width: 100%;
}
.between{
  width: 100%;
  background: #ff2d0a;
  margin: -6px auto 0 auto;
}
.table-box{
  width: calc(100% - 20px);
  border-radius: 6px;
  background: #fff;
  margin: auto;
  box-sizing: border-box;
  padding: 20px;
}
</style>
