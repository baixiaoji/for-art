<template>
	<div class="wrapper">
		<div style="width:100%;" v-show="isShow">
			<h3>测评证书生成</h3>
			<el-form label-position="top" label-width="80px" :model="formLabelAlign">
				<el-form-item>
					<el-input v-model="formLabelAlign.name" placeholder='请填写学生姓名'></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="formLabelAlign.age" placeholder='请填写学生年龄'></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="formLabelAlign.score" placeholder='请输入学生课程分数'></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="formLabelAlign.comment" type="textarea" max="300" min=“200” placeholder='请输入评语（文字仅限200-300）' ></el-input>
				</el-form-item>
			</el-form>
			<div class="star-wrapper">
				<div class="box">
					<span class="demonstration">创造能力</span>
					<el-rate v-model="score.create"></el-rate>
				</div>
				<div class="box">
					<span class="demonstration">造型能力</span>
					<el-rate v-model="score.modelling"></el-rate>
				</div>
				<div class="box">
					<span class="demonstration">色彩感知</span>
					<el-rate v-model="score.color"></el-rate>
				</div>
				<div class="box">
					<span class="demonstration">构图能力</span>
					<el-rate v-model="score.composition"></el-rate>
				</div>
				<div class="box">
					<span class="demonstration">学习能力</span>
					<el-rate v-model="score.learn"></el-rate>
				</div>
			</div>
			<el-button type="primary" style='width: 100%; background: #39a6ba; color: #fff; margin-top:20px;' @click='formatData'>一键生成测评证书</el-button>
		</div>
		<div class="img-box" v-show="isImgShow">
			<img style="width:100%" src="../assets/bg.png" alt="">
			<div class="info-box">
					<img class="logo" src="../assets/logo.png" alt="">
					<div class="title">测评证书</div>
					<div class="user-info">
						<div class="name">{{formLabelAlign.name}}</div>
						<div class="age">{{formLabelAlign.age}}岁</div>
						<div class="score">{{formLabelAlign.score}}分</div>
					</div>
					<div class="map" id="myChart" :style="{width: '100%', height: '105px'}">

					</div>
					<div class="comment-box">
						{{formLabelAlign.comment}}
					</div>
			</div>
			<img class="gaizhang" src="../assets/gaizhang.png" alt="">
			<img class="code" src="../assets/code.png" alt="">
		</div>
	</div>
</template>
<script>
import html2canvas from 'html2canvas';
export default {
    data () {
			return {
				isShow: true,
				isImgShow: true,
				formLabelAlign: {
					name: '',
					age: '',
					score: '',
					comment: ''
				},
				score: {
					create: null,
					modelling: null,
					color: null,
					composition: null,
					learn: null
				}
			}
		},
		methods: {
			formatData () {
				console.log(this.score);
				// 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
				// 绘制图表
				let scoreArray = [];
				scoreArray.push(this.score.create);
				scoreArray.push(this.score.modelling);
				scoreArray.push(this.score.color);
				scoreArray.push(this.score.composition);
				scoreArray.push(this.score.learn);
        myChart.setOption({
					radar: [
						{
							indicator: [
								{text: '创造能力', max: 5},
								{text: '造型能力', max: 5},
								{text: '色彩感知', max: 5},
								{text: '构图能力', max: 5},
								{text: '学习兴趣', max: 5}
							],
							radius: 35,
							center: ['50%','60%'],
							name: {
								fontSize: 12
							},
							nameGap: 5
						},
					],
					series: [
							{
								type: 'radar',
								tooltip: {
									trigger: 'item'
								},
								itemStyle: {normal: {areaStyle: {type: 'default'}}},
								data: [
									{
										value: scoreArray,
										name: '测试'
									}
								],
								label: {
									normal: {
										show: true
									}
								},
								animation: false
							}
					]
				});
				this.$nextTick(() => {
          let box = document.querySelector('.img-box');
          let wrapper = document.querySelector('.wrapper');
          let _this = this
          html2canvas(box, {
            useCORS: true,
          }).then((canvas) => {
            let image = new Image();
            image.src = canvas.toDataURL("image/png");
            image.classList.add('six-class');
						wrapper.appendChild(image);
						this.isShow = false;
						this.isImgShow = false;
            console.log(image)
            return image;
          });
        })
			}
		}
}
</script>
<style>
.six-class {
  width: 100%;
}
.demonstration{
	display: inline-block;
	vertical-align: middle;
	margin-right: 20px;
}
.wrapper .el-rate{
	height: 30px;
	display: inline-block;
	vertical-align: middle;
}
.el-rate__icon{
	font-size: 30px;
}
.img-box{
	position: relative;
}
.info-box{
	position: absolute;
	text-align: center;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 80%;
}
.logo{
	width: 21%;
	margin-top: 34%;
}
.title{
	font-size: 42px;
	font-weight: bold;
}
.user-info{
	position: relative;
	display: flex;
}
.name,.age,.score{
	flex: 1;
	font-size: 12px;
}
.comment-box{
	width: 85%;
	margin:auto;
	font-size: 12px;
	text-align: left;
	font-weight: bold;
}
.gaizhang{
	position: absolute;
	left: 21%;
	bottom: 20%;
	width: 10%;
}
.code{
	position: absolute;
	right: 18%;
	bottom: 19%;
	width: 16%;
}
</style>
