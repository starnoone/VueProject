<template>
	<div class="">
		<div class="header">
			<h1><i></i>音乐</h1>
		</div>
		<div class="nav">
			<router-link to="/index" active-class="active">
				<span>推荐</span>
			</router-link>
			<router-link to="/singer" active-class="active">
				<span>歌手</span>
			</router-link>
			<router-link to="/search" active-class="active">
				<span>搜索</span>
			</router-link>
		</div>
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

	}
}
</script>

<style lang='scss' scoped>
@import '../assets/scss/_themes.scss';
.header{
	padding:15px 0;
	h1{
		font-weight: 400;
	    font-size: 22px;
	    color: #fff;
	    text-align: center;
	    i{
	    	display:inline-block;
	    	width:33px;
	    	height:33px;
	    	background: url(../assets/icon/logo.png) no-repeat;
	    	background-size: 100% 100%;
	    	vertical-align: middle;
	    }
	}
}
.nav{
	display:flex;
	padding:10px 0;
	a{
		flex:1;
		text-align: center;
		span{
			padding-bottom: 8px;
			border-bottom: 2px solid $black;
		}
		&.active{
			span{
				border-bottom: 2px solid $red;
				color:$red;
			}
		}
	}
}
</style>