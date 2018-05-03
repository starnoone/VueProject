<template>
	<div class="miniPlayer">
		<!-- S 歌曲封面 -->
		<div class="player-thumb" style="animation-play-state:running;">
			<img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+ getSong.musicData.albummid +'.jpg'">
		</div>
		<!-- E 歌曲封面 -->
		<div class="song-info">
	   		<h3 v-text="getSong.musicData.songname"></h3>
	   		<span v-text="getSong.musicData.singer[0].name"></span>
	   	</div>
		
		<div class="song-operator">
	   		<a href="javascript:" class="play-paused" :class="[getPlayState?'pause':'play']"  @click="playOrPause()"></a>
	   		<a href="javascript:" class="song-list"></a>
	   	</div>
		<!-- S 播放器 -->
		<div class="audio">
	  		<audio id="player" :src="getPlaySrc" autoplay="autoplay"></audio>
	  	</div>
	  	<!-- E 播放器 -->
	</div>
</template>

<script>
//引入Vuex
import {mapGetters,mapMutations} from 'vuex';
export default{
	name:'',
	data(){
		return {

		}
	},
	computed:{
		...mapGetters([
			'getPlaySrc',
			'getSong',
			'getPlayState'
		])
	},
	methods:{
		...mapMutations({
			'setPlayState':'setPlayState',
		}),
		playOrPause(){
			var playerNode = document.querySelector('#player');
			var playingNode = document.querySelector('.player-thumb');
			if(this.getPlayState){
				playerNode.pause();
				playingNode.style.animationPlayState = 'paused';
			}else{
				playerNode.play();
				playingNode.style.animationPlayState = 'running';
			}
			this.setPlayState(!this.getPlayState);
		}
	}
}
</script>
<style lang='scss' scoped>
.miniPlayer{
	position:fixed;
	bottom:0;
	left:0;
	color:#fff;
	width:100%;
	height:60px;
	z-index:1111;
	background: #101010;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left:18px;
    box-sizing: border-box;
	.player-thumb{
	    animation:circleAni 5s linear infinite;
	    @keyframes circleAni{
	    	from{
	    		transform:rotateZ(0deg)
	    	}
	    	to{
	    		transform:rotateZ(360deg)
	    	}
	    }
	  	img{
	  		width:45px;
	  		height:45px;
	  		border-radius: 50%;
	  	}
	  	.song-info{
	  	flex:1;
	  	margin-left:16px;
	    overflow: hidden;
	  	h3{
	  		color: #fff;
	  		font-size:16px;
	  		font-weight: 400;
	      overflow: hidden;
	      white-space:nowrap;
	      text-overflow:ellipsis;
	  	}
	  	span{
	  		color: #ccc;
	  		font-size:12px;
	  	}
	  }
  }
  .song-operator{
  	margin-right:10px;
  	.play-paused,.song-list{
		width:30px;
		height:30px;	
		display: inline-block;
  	}
    .play-paused{
      margin-right:16px;
    }
  	.play{
  		 background:url(../assets/icon/play.png) no-repeat;
  		background-size:100% 100%;
  	}
    .pause{
    	background:url(../assets/icon/pause.png) no-repeat;
     
      background-size:100% 100%;
    }
  	.song-list{
		  background:url(../assets/icon/list.png) no-repeat;
  		background-size:100% 100%;
  	}
  }
}	
</style>