<template>
  <div class="wrapper project">
    <el-form label-position="top" label-width="80px" :model="formLabelAlign" v-show="isShow">
      <el-form-item>
        <el-input v-model="formLabelAlign.name" placeholder='请填写学生姓名'></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formLabelAlign.age" placeholder='请填写学生年龄'></el-input>
      </el-form-item>
      <el-form-item v-for="(item, index) in formLabelAlign.array" :key="index" :label="'第'+toChinesNum(index+1)+'课时'">
        <el-input v-model="item.title" type="textarea" placeholder='请输入课程名称'></el-input>
        <div style='height: 10px;'></div>
        <el-input v-model="item.detail" type="textarea" placeholder='请输入课程知识点'></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" style='width: 100%; margin: 10px 0' @click="addClass" v-show="isShow">添加课时</el-button>
    </div>
    <el-button type="primary" style='width: 100%;' @click='formatData' v-show="isShow">一键生成短期课程规划</el-button>
    <div class="img-box" v-show="isImageShow">
      <div class="top">
        <img src="https://51nbimg.u51.com/85d10802a5dd4cde9ddfbd975b149fe2.png" alt="">
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
        <img src="https://51nbimg.u51.com/08189e84ad0844e9809fda87c16c644f.png" alt="">
      </div>
    </div>
		<div class="img-wrapper" v-show="showImg">

		</div>
		<el-button type="primary" style='width: 100%; margin: 10px 0' @click="revise" v-show="showImg">修改课时</el-button>
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
				showImg: false,
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
            time: `第${this.toChinesNum(index+1)}课时`,
            title: item.title,
            detail: item.detail,
          }
        })
        this.tableData = tableData;
        console.log(this.tableData);
        this.isShow = false;
				this.isImageShow = true;
				this.showImg = true;
        this.$nextTick(() => {
          let box = document.querySelector('.img-box');
          let wrapper = document.querySelector('.img-wrapper');
          let _this = this
          html2canvas(box, {
            useCORS: true,
          }).then((canvas) => {
            let image = new Image();
            image.src = canvas.toDataURL("image/png");
            image.classList.add('six-class');
						_this.isImageShow = false;
						wrapper.innerHTML = '';
            wrapper.appendChild(image);
            console.log(image)
            return image;
          });
        })
      },
      addClass() {
				let oForm = {title: '', detail: ''}
				this.formLabelAlign.array.push(oForm)
			},
			revise() {
				this.isShow= true;
				this.showImg = false;
			},
			toChinesNum (num) {
				let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
				let unit = ["", "十", "百", "千", "万"];
				num = parseInt(num);
				let getWan = (temp) => {
					let strArr = temp.toString().split("").reverse();
					let newNum = "";
					for (var i = 0; i < strArr.length; i++) {
						newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
					}
					return newNum;
				}
				let overWan = Math.floor(num / 10000);
				let noWan = num % 10000;
				if (noWan.toString().length < 4) noWan = "0" + noWan;
				return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
			}
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
.project .user-info{
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
.bottom{
  margin-top: -1px;
}
.between{
  width: 100%;
  background-image: url(https://51nbimg.u51.com/5954d2822cb749baa08b4d0f45e98b44.png);
  background-size: 100%;
  margin: -7px auto 0 auto;
  background-repeat-y: repeat;
  background-position-y: center;
}
.table-box{
  width: 90%;
  background: #fff;
  margin: auto;
  box-sizing: border-box;
  padding: 20px;
}
</style>
