<template>
	<div class="">
		<!-- S 头部 -->
		<HeaderTab></HeaderTab>
		<!-- E 头部 -->
		<div class="toplist-wrapper">
			<div class="content">
				<!-- S 轮播 -->
				<div class="slider">
					<div class="swiper-container">
					    <div class="swiper-wrapper">
					        <div class="swiper-slide" v-for="(v,k) in slider" :key="k">
					        	<img :src='v.picUrl'>
					        </div>
					    </div>
					    <div class="swiper-pagination"></div>
					</div>
				</div>
				<!-- E 轮播 -->
				<!-- S 歌曲排行榜列表 -->
				<div class="rank-list">
					<h2>歌曲排行榜</h2>
					<div class="song-container">
						<ul>
							<router-link :to="'/play/' + v.data.songmid + '/' + v.data.albummid" v-for = "(v,k) in songlist" :key="v.data.songid" @click.native="indexAddSong(v)">
								<li>
									<div class="thumb">
										<img v-lazy="'https://y.gtimg.cn/music/photo_new/T002R90x90M000'+v.data.albummid+'.jpg?max_age=2592000'">
									</div>
									<div class="info">
										<span class="song-name">{{v.data.songname}}</span>
										<span class="songer-name">{{v.data.singer[0].name}}</span>
									</div>
									<div class="play-time">
										{{v.data.interval | getTime}}
									</div>
								</li>
							</router-link>
						</ul>
					</div>
				</div>
				<!-- E 歌曲排行榜列表 -->
			</div>
		</div>
		<Loading :state = "loadingState"></Loading>
	</div>
</template>

<script>
//引入头部组件
import HeaderTab from '@/components/HeaderTab';
//引入loading组件
import Loading from '@/components/base/loading/Loading';

//引入API
import indexApi from '../api/indexApi';

//引入jsonp
import jsonp from 'jsonp';
//引入Vuex
import {mapGetters,mapMutations} from 'vuex';

//引入swiper插件
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
//引入better-scroll
import BScroll from 'better-scroll';

export default{
	name:'',
	data(){
		return {
			slider:[],
			songlist:[],
			bannerUrl:'',
			playListUrl:'',
			myScroll:null,
			loadingState:true
		}
	},
	components:{
		HeaderTab,
		Loading
	},
	computed:{
		...mapGetters([
			'getPlayListSong'
		])
	},
	filters:{
		getTime:function(t){
			var m = parseInt(t/60);
			var s = t%60;
			s = s<10 ? ('0'+s) :s;
			return m + '分' + s;
		}
	},
	mounted:function(){
		this.bannerUrl = indexApi.bannerApi;
		//获取播放列表
		this.getSlider();
		//获取轮播图片地址
		this.getTopList();
		//调用better-scroll
		this.myScroll = new BScroll('.toplist-wrapper',{
			scrollY:true,
			click:true,
			pullUpLoad:{
				threshold:50
			}
		});
		//上拉加载
		this.myScroll.on('pullingUp',()=>{
			this.loadingState = true;
			this.getTopList();
			this.myScroll.refresh();
			this.myScroll.finishPullUp();
		});
	},
	methods:{
		getTopList:function(){//播放列表
			this.playListUrl = indexApi.topListApi + this.songlist.length;
			jsonp(this.playListUrl,{param:'jsonpCallback'},(err,data) => {
				this.songlist = this.songlist.concat(data.songlist);
				this.loadingState = false;
			});
		},
		getSlider:function(){//轮播图片地址
			jsonp(this.bannerUrl,{param:'jsonpCallback'},(err,data) => {
				this.slider = data.data.slider;
				//使用swiper插件
				this.$nextTick(function(){
					let mySwiper = new Swiper('.swiper-container',{
						pagination: {
						    el: '.swiper-pagination',
						    type: 'bullets',
						    bulletClass:'bullet',
	            			bulletActiveClass:'bullet-active'
						  }
					})
				})
			});
		},
		indexAddSong(song){
			var indexSong = {musicData:song.data};
			this.setSong(indexSong);
			//初始化状态
			this.setPlayState (true);

			//防止数据重复
			let flag = 0;
			let songId = indexSong.musicData.songid;
			this.getPlayListSong.forEach((val,k)=>{
				if(songId == val.musicData.songid){
					flag++;
				}
			});
			if(flag<=0){
				this.setPlayListSong(indexSong);
				this.setCurPlayIndex(this.getPlayListSong.length-1);
			}
		},
		...mapMutations({
			'setSong':'setSong',
			'setPlayListSong':'setPlayListSong',
			'setCurPlayIndex':'setCurPlayIndex',
			'setPlayState':'setPlayState',
			'setPlaySrc':'setPlaySrc'
		}),
	}
}
</script>

<style lang='scss'>
@import '../assets/scss/_themes.scss';
.toplist-wrapper{
	height: calc(100vh - 105px);
	overflow: hidden;
}
.slider{
	.swiper-container{
		.swiper-wrapper{
			.swiper-slide{
				img{
					width:100%;
					height:100%;
				}
			}
		}
		.swiper-pagination{
			.bullet{
				width: 8px;
			    height: 8px;
			    display: inline-block;
			    border-radius: 100%;
			    background: #000;
			    opacity: .2;
			    margin:0 4px;
			}
			.bullet-active{
				width: 15px;
			    background: #fff;
			    opacity: .3;
			    border-radius: 5px;
			}
		    
		}
	}
}
.rank-list{
	h2{
		line-height: 64px;
		color:$red;
		text-align: center;
		font-size: 15px;
	}
	.song-container{
		ul{
			li{
				display:flex;
				padding:0 10px;
				margin-bottom: 20px;
				.thumb{
					width:60px;
					height:60px;
					img{
						width:100%;
						height: 100%;
					}
				}
				.info{
					width:205px;
					margin-left:20px;
					padding-top:15px;
					span{
						display:block;
					}
					.song-name{
						font-size:15px;
						margin-bottom:5px;
					}
					.songer-name{
						font-size:12px;
					}
				}
				.play-time{
					width:60px;
					padding-top:15px;
					color:$gray;
					font-size:14px;
				}
			}
		}
	}
}
</style>