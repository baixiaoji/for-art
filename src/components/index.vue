<template>
  <div>
    <el-form label-position="top" label-width="80px" :model="formLabelAlign">
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
    <el-button type="primary" style='width: 100%;' @click='formatData'>一键生成短期课程规划</el-button>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        formLabelAlign: {
          name: '',
          age: '',
          array: [
            {title: '',detail: ''},
            {title: '', detail: ''},
            {title: '', detail: ''},
            {title: '', detail: ''},
          ],
        }
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
        console.log(user, tableData);
      },
    },
  };
</script>

<style scoped>

</style>
