<template>
	<div class="">
		<HeaderTab></HeaderTab>
		<div class="slider">
			<div class="swiper-container">
			    <div class="swiper-wrapper">
			        <div class="swiper-slide" v-for="(v,k) in slider">
			        	<img :src='v.picUrl'>
			        </div>
			    </div>
			    <div class="swiper-pagination"></div>
			</div>
		</div>
		<div class="rank-list">
			<h2>歌曲排行榜</h2>
			<div class="song-container">
				<ul>
					<li v-for = "(v,k) in songlist">
						<div class="thumb">
							
						</div>
						<div class="info">
							<span class="song-name">{{v.data.songname}}</span>
							<span class="songer-name">{{v.data.singer[0].name}}</span>
						</div>
						<div class="play-time"></div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
//引入头部组件
import HeaderTab from '@/components/HeaderTab';

//引入API
import indexApi from '../api/indexApi';

//引入jsonp
import jsonp from 'jsonp';

//引入swiper插件
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

export default{
	name:'',
	data(){
		return {
			slider:[],
			songlist:[]
		}
	},
	methods:{

	},
	components:{
		HeaderTab
	},
	mounted:function(){
		var _self = this;
		let bannerUrl = indexApi.bannerApi;
		let playListUrl = indexApi.topListApi;
		//获取轮播图片地址
		jsonp(bannerUrl,{param:'jsonpCallback'},(err,data) => {
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

		//播放列表
		jsonp(playListUrl,{param:'jsonpCallback'},(err,data) => {
			this.songlist = data.songlist;
			console.log(this.songlist);
		})

	}
}
</script>

<style lang='scss'>
@import '../assets/scss/_themes.scss';
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
					background-color: pink;
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
					background: #fff;
				}
			}
		}
	}
}
</style>