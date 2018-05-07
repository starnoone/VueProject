<template>
	<div class="singer-detail">
		<div class="header">
			<h1><i @click="back"></i>{{singerDetail.singer_name}}</h1>
		</div>
		<div class="thumb" v-html="thumb"></div>
		<div class="detail-wrapper">
			<div class="content">
				<div class="song-list">
					<ul>
						<router-link :to="'/play/' + song.musicData.songmid + '/' + song.musicData.albummid" tag="div" v-for="(song,k) in singerDetail.list" @click.native="watchSong(song)">
							<li>
								<h2 v-text="song.musicData.songname"></h2>
								<p>{{song.musicData.singer[0].name}} - {{song.musicData.albumname}}</p>
							</li>
						</router-link>
					</ul>
				</div>
			</div>
		</div>
		<!-- S Loading -->
		<Loading :state="LoadingState"></Loading>
		<!-- E Loading -->
	</div>
</template>

<script>
//引入loading组件
import Loading from '@/components/base/loading/Loading';
//引入better-scroll
import BScroll from 'better-scroll';
//引入Jsonp
import jsonp from 'jsonp';
//引入接口地址
import api from '../api/singerApi.js';
//引入Vuex
import {mapGetters,mapMutations} from 'vuex';

export default{
	name:'',
	data(){
		return {
			myScroll:null,
			singerDetail:{},
			thumb:'',
			LoadingState:true
		}
	},
	computed:{
		...mapGetters([
			'getSong',
			'getPlayListSong'
		])
	},
	components:{
		Loading
	},
	mounted(){
		this.$nextTick(()=>{
			this.getData();
		})
		this.myScroll = new BScroll('.detail-wrapper',{
			scrollY:true,
			click:true
		});

	},
	methods:{
		getData:function(){//获取歌曲列表信息
			let url = api.singerDetailApi+this.$route.params.sid;
			jsonp(url,{param:'jsonpCallback'},(err,data)=>{
				this.singerDetail = data.data;
				this.thumb = `<img src="https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.singerDetail.singer_mid}.jpg" style="width:100%;">`;
				this.LoadingState = false;
			})
		},
		back:function(){//回退
			this.$router.go(-1);
		},
		...mapMutations({
			'setSong':'setSong',
			'setPlayListSong':'setPlayListSong',
			'setPlayState':'setPlayState',
			'setCurPlayIndex':'setCurPlayIndex'
		}),
		watchSong(song){//调用vuex方法，将song信息更新到state中（点击事件触发）
			
			this.setSong(song);
			//初始化状态
			this.setPlayState (true);

			//防止数据重复
			let flag = 0;
			let songId = song.musicData.songid;
			this.getPlayListSong.forEach((val,k)=>{
				if(songId == val.musicData.songid){
					flag++;
				}
			});
			if(flag<=0){
				this.setPlayListSong(song);
				this.setCurPlayIndex(this.getPlayListSong.length-1);
			}
		}
	}

}
</script>

<style lang='scss' scoped>
.singer-detail{
	height: 100vh;
	.header{
		text-align: center;
	    line-height: 55px;
	    color: #fff;
	    position: fixed;
	    width: 100%;
		h1{
	    	font-size: 20px;
	    	font-weight: normal;
		}
		i{
			display: inline-block;
		    width: 25px;
		    height: 25px;
		    padding: 15px;
		    background: url(../assets/icon/back.png) no-repeat;
		    background-size: 25px 25px;
		    background-position: 50%;
		    position: absolute;
		    left: 0;
		}
	}
	.thumb{
		img{
			width:100%;
		}
	}
	.song-list{
		width: 100vw;
	    background-color: #060506;
	    color: #fff;
	    overflow: hidden;
	    li{
	    	padding: 0 10px;
   			padding-top: 10px;
   			h2{
   				font-weight: 400;
    			font-size: 18px;
   			}
   			p{
   				font-size: 16px;
   			}
	    }
	}
	.detail-wrapper{
		height:340px;
		overflow: hidden;
		position: fixed;
	    bottom: 0;
	    z-index: 99;
	}
}
</style>