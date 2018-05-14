<template>
	<transition name="playSong">
		<div class="play-song">
			<div class="header">
				<h1><i @click="back"></i>{{getSong.musicData.singer[0].name}}</h1>
				<span>{{getSong.musicData.songname}}</span>
			</div>
			<div class="playing" :class="[getPlayState?'thumb-pause':'thumb-play']">
				<img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+getSong.musicData.albummid+'.jpg?max_age=2592000'">
			</div>
			<div class="opt-btn">
				<a href="javascript:" class="mode"></a>
				<a href="javascript:" class="prev" @click="playPrev"></a>
				<a href="javascript:" class="playPause" :class="[getPlayState?'pause':'play']" @click="playOrPause"></a>
				<a href="javascript:" class="next" @click="playNext"></a>
				<a href="javascript:" class="like"></a>
			</div>
			<div class="bg-alb">
				<img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+getSong.musicData.albummid+'.jpg?max_age=2592000'">
			</div>
		</div>
	</transition>
</template>

<script>
//引入Jsonp
import jsonp from 'jsonp';
//引入接口地址
import api from '../api/songApi.js';

//引入Vuex
import {mapGetters,mapMutations} from 'vuex';
export default{
	name:'',
	data(){
		return {
			smid:'',
			mid:'',
			src:'',
		}
	},
	computed:{
		...mapGetters([
			'getPlaySrc',
			'getPlayState',
			'getSong',
			'getCurPlayIndex',
			'getPlayListSong'
		])
	},
	created(){
		this.smid = this.$route.params.smid;
		this.mid = this.$route.params.mid;
		//获取播放路径
		this._getPlaySrc(this.smid,this.mid);
	},
	methods:{
		back(){//回退
			this.$router.go(-1)
		},
		playOrPause(){//控制播放or暂停
			var playerNode = document.querySelector('#player');
			var playingNode = document.querySelector('.playing');
			if(this.getPlayState){
				playerNode.pause();
			}else{
				playerNode.play();
			}
			this.setPlayState(!this.getPlayState);
		},
		playPrev(){//上一首
			let prevIndex = this.getCurPlayIndex-1;
			prevIndex = prevIndex<=0?0:prevIndex;
			//改变当前索引
			this.setCurPlayIndex(prevIndex);
			//改变当前歌曲信息
			this.setSong(this.getPlayListSong[this.getCurPlayIndex]);
			//改变当前歌曲路径
			this._getPlaySrc(this.getSong.musicData.songmid,this.getSong.musicData.albummid);
			//重置状态
			this.setPlayState(true);
		},
		playNext(){
			let nextIndex = this.getCurPlayIndex+1;
			let maxIndex = this.getPlayListSong.length-1;
			nextIndex = nextIndex>=maxIndex?maxIndex:nextIndex;
			//改变当前索引
			this.setCurPlayIndex(nextIndex);
			//改变当前歌曲信息
			this.setSong(this.getPlayListSong[this.getCurPlayIndex]);
			//改变当前歌曲路径
			let curMusicData = this.getPlayListSong[this.getCurPlayIndex].musicData;
			this._getPlaySrc(curMusicData.songmid,curMusicData.albummid);
			//重置状态
			this.setPlayState(true);
		},
		_getPlaySrc(smid,mid){//获取播放路径函数
			this.smid = smid;
			this.mid  = mid;
			let url = api.vKeyApi + `&songmid=${this.smid}&filename=C400${this.smid}.m4a`;
			jsonp(url,{param:'callback'},(err,data)=>{
				let vkey = data.data.items[0].vkey;
				this.src = `http://dl.stream.qqmusic.qq.com/C400${this.smid}.m4a?vkey=${vkey}&guid=7120953682&uin=0&fromtag=66`;
				//将当前获取的播放地址更新到state
				this.setPlaySrc(this.src);
			})
			
			
		},
		...mapMutations({
			'setPlaySrc':'setPlaySrc',
			'setPlayState':'setPlayState',
			'setCurPlayIndex':'setCurPlayIndex',
			'setSong':'setSong'
		}),
	}
}
</script>

<style lang='scss' scoped>
@import '../assets/scss/_themes.scss';
.play-song{
	z-index:9999;
	position: relative;
	height:100vh;
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
		&.thumb-pause{
	    	animation-play-state:running;
	    }
	    &.thumb-play{
	    	animation-play-state:paused;
	    }
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
	    
    	.play{
			background: url(../assets/icon/play.png) no-repeat;
			background-size:100% 100%;
			background-position: center center;
    	}
		.pause{
			background: url(../assets/icon/pause.png) no-repeat;
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
.playSong-enter-active,.playSong-leave-active{
	transition: all .3s ease;
}
.playSong-enter,.playSong-leave-to{
	margin-top:700px;
}
.playSong-enter-to,.playSong-leave{
	margin-top:0px;
}
</style>