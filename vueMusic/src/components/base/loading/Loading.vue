<template>
	<div class="loading" v-show="state">
		<i class="icon"></i>
		<span class="text" v-text = "title"></span>
	</div>
</template>

<script>
export default{
	name:'',
	data(){
		return {

		}
	},
	methods:{

	},
	props:{
		title:{
			type: String,
			default:'加载中...'
		},
		state:{
			type: Boolean,
			default:true
		}
	}
}
</script>

<style lang='scss' scoped>
.loading{
	display:flex;
	position: fixed;
	width:160px;
	line-height: 40px;
	top:50%;
	left:50%;
	margin-left:-80px;
	justify-content:center;
	align-items:center;
	.icon{
		dispaly:inline-block;
		width: 15px;
		height:15px;
		background: url(loading.gif) no-repeat;
		background-position: center center;
		background-size:100% 100%;
		margin-right:3px;
	}
	.text{
		font-size:14px;
		color:#333;
	}
}
</style>