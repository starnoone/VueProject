<template>
	<div class="play-song">
		<div class="header">
			<h1><i @click="back"></i>薛之谦</h1>
			<span>演员</span>
		</div>
		<div class="playing">
			<img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg?max_age=2592000">
		</div>
		<div class="opt-btn">
			<a href="javascript:" class="mode"></a>
			<a href="javascript:" class="prev"></a>
			<a href="javascript:" class="playPause"></a>
			<a href="javascript:" class="next"></a>
			<a href="javascript:" class="like"></a>
		</div>
		<div class="bg-alb">
			<img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg?max_age=2592000">
		</div>
		<div class="audio">
	  		<audio id="player" :src="src" autoplay="autoplay"></audio>
	  	</div>
	</div>
</template>

<script>
//引入Jsonp
import jsonp from 'jsonp';
//引入接口地址
import api from '../api/songApi.js';

export default{
	name:'',
	data(){
		return {
			smid:'',
			mid:'',
			src:''
		}
	},
	created(){
		this.smid = this.$route.params.smid;
		this.mid = this.$route.params.mid;
		let url = api.vKeyApi + `&songmid=${this.smid}&filename=C400${this.smid}.m4a`;
		jsonp(url,{param:'callback'},(err,data)=>{
			let vkey = data.data.items[0].vkey;
			this.src = `http://dl.stream.qqmusic.qq.com/C400${this.smid}.m4a?vkey=${vkey}&guid=7120953682&uin=0&fromtag=66`;
		})
	},
	methods:{
		back(){
			this.$router.go(-1)
		}
	}
}
</script>

<style lang='scss' scoped>
@import '../assets/scss/_themes.scss';
.play-song{
	.header{
		text-align: center;
	    color: $white;
	    position: relative;
	    z-index: 999;
	    h1{
	    	font-weight: 400;
		    font-size: 22px;
		    line-height: 55px;
		    i{
		    	display: inline-block;
			    width: 25px;
			    height: 25px;
			    padding: 15px;
			    background: url(../assets/icon/arrow_down.png) no-repeat;
			    background-size: 25px 25px;
			    background-position: 50%;
			    position: absolute;
			    left: 0;
		    }
	    }
	    span{
	    	font-size: 15px;
	    }
	}
	.playing{
		text-align: center;
	    margin-top: 15px;
	    position: relative;
	    z-index: 999;
	    animation: circleAni 5s linear;
	    animation-iteration-count:infinite;
		-webkit-animation-iteration-count:infinite; /* Safari 和 Chrome */
	    @keyframes circleAni{
	    	from{
	    		transform:rotateZ(0deg)
	    	}
	    	to{
	    		transform:rotateZ(360deg)
	    	}
	    }
	    img{
	    	width: 250px;
		    height: 250px;
		    border-radius: 50%;
		    border: 10px solid #000;
	    }
	}
	.bg-alb{
		background: #000;
	    height: 100vh;
	    position: fixed;
	    top: 0;
	    width: 100%;
	    transform-origin: center center;
	    img{
	    	width: 100%;
		    height: 100vh;
		    position: absolute;
		    top: 0;
		    -webkit-filter: blur(20px);
		    filter: blur(20px);
	    }
	}
	.opt-btn{
	    display: flex;
	    position: fixed;
	    z-index: 999;
	    bottom: 50px;
	    width: 100%;
	    justify-content: space-around;
	    a{
	    	width: 30px;
    		height: 30px;
	    }
	    .mode{
			background: url(../assets/icon/mode.png) no-repeat;
			background-size:100% 100%;
			background-position: center center;
	    }
	    .prev{
			background: url(../assets/icon/prev.png) no-repeat;
			background-size:100% 100%;
			background-position: center center;
	    }
	    .playPause{
			background: url(../assets/icon/play.png) no-repeat;
			background-size:100% 100%;
			background-position: center center;
	    }
	    .next{
			background: url(../assets/icon/next.png) no-repeat;
			background-size:100% 100%;
			background-position: center center;
	    }
	    .like{
			background: url(../assets/icon/like.png) no-repeat;
			background-size:100% 100%;
			background-position: center center;
	    }
	}
}
</style>