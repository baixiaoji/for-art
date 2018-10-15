<template>
	<div class="wrapper rader">
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
			<img style="width:100%" src="https://51nbimg.u51.com/c20fe28eda5f4d4ab673e4c926df8382.png" alt="">
			<div class="info-box">
					<img class="logo" src="https://51nbimg.u51.com/1bf91478602a4f17816423c3832d9a27.png" alt="">
					<div class="title">测评证书</div>
					<div class="user-info">
						<div class="name">{{formLabelAlign.name}}</div>
						<div class="age">{{formLabelAlign.age?formLabelAlign.age+'岁':''}}</div>
						<div class="score">{{formLabelAlign.score?formLabelAlign.score+'分':''}}</div>
					</div>
					<div class="map" id="myChart" :style="{width: '100%', height: '120px'}">

					</div>
					<div class="comment-box">
						{{formLabelAlign.comment}}
					</div>
			</div>
			<img class="gaizhang" src="https://51nbimg.u51.com/7cd6f76d022b4c50976c1ac4b7b34658.png" alt="">
			<img class="code" src="https://51nbimg.u51.com/eae6a6180dab4c279caf23abba2a5f2b.png" alt="">
		</div>
	</div>
</template>
<script>
  import html2canvas from 'html2canvas';
  
  export default {
    data() {
      return {
        isShow: true,
        isImgShow: true,
        formLabelAlign: {
          name: '',
          age: '',
          score: '',
          comment: '',
        },
        score: {
          create: null,
          modelling: null,
          color: null,
          composition: null,
          learn: null,
        },
      };
    },
    methods: {
      formatData() {
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
							radius: 40,
							center: ['50%','50%'],
							name: {
								fontSize: 10,
								color: '#333'
							},
							nameGap: 7
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
									show: true,
									fontSize: 9,
									distance: 1,
									position: 'inside'
								}
							},
							animation: false,
							areaStyle: {
								normal: {
									color: '#cbdde6'
								}
							},
							lineStyle: {
								color: '#93b9cc'
							},
							itemStyle: {
								color: '#90b7ca'
							}
						}
					]
				});
				this.$nextTick(() => {
          let box = document.querySelector('.img-box');
          let wrapper = document.querySelector('.wrapper');
          let _this = this;
          html2canvas(box, {
            useCORS: true,
          }).then((canvas) => {
            let image = new Image();
            image.src = canvas.toDataURL('image/png');
            image.classList.add('six-class');
            wrapper.appendChild(image);
            this.isShow = false;
            this.isImgShow = false;
            console.log(image);
            return image;
          });
        });
      },
    },
  };
</script>
<style>
.wrapper{
	font-family: MicrosoftYaHei Bold;
}
.six-class{
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
.rader .info-box{
	position: absolute;
	text-align: center;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 80%;
}
.logo{
	width: 21%;
	margin-top: 18%;
}
.title{
	font-size: 42px;
	line-height: 42px;
	font-weight: bold;
}
.rader .user-info{
	position: relative;
	display: flex;
	margin-top: 6px;
}
.name,.age,.score{
	flex: 1;
	font-size: 12px;
}
.comment-box{
	width: 85%;
	margin:auto;
	font-size: 11px;
	text-align: left;
	line-height: 12px;
}
.gaizhang{
	position: absolute;
	left: 21%;
	bottom: 12%;
	width: 10%;
}
.code{
	position: absolute;
	right: 18%;
	bottom: 11%;
	width: 16%;
}
.map{
	margin-top: 1%;
}
</style>
