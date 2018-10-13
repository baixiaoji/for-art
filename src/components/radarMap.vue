<template>
	<div class="wrapper">
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
        <el-input v-model="formLabelAlign.score" type="textarea" max="300" min=“200” placeholder='请输入评语（文字仅限200-300）' ></el-input>
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
</template>
<script>
export default {
    data () {
			return {
				formLabelAlign: {
					name: '',
					age: '',
					score: ''
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
				console.log(this.score)
			}
		}
}
</script>
<style>
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
</style>
