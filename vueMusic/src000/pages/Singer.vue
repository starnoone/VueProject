<template>
	<div class="">
		<!-- S 头部 -->
		<HeaderTab></HeaderTab>
		<!-- E 头部 -->

		<!-- S singerList -->
		<div class="singer-wrapper">
			<div class="content">
				<div class="singer-item" v-for = "(item,k) in indexTool" :key = "k">
					<h2 v-text="indexTool[k]"></h2>
					<ul>
						<router-link :to="'/singer/'+singer.Fsinger_mid" v-for = "(singer,i) in singerList[k].singer" :key="singer.Fsinger_id">
							<li>
								<img :src="'https://y.gtimg.cn/music/photo_new/T001R150x150M000'+singer.Fsinger_mid+'.jpg?max_age=2592000'">
								<span v-text = "singer.Fsinger_name"></span>
							</li>
						</router-link>
					</ul>
				</div>
			</div>
			<!-- S 索引 -->
			<div class="index-tool">
				<ul>
					<li v-for="(index,k) in indexTool" :class="{active:curIndex===k}">{{index}}</li>
				</ul>
			</div>
			<!-- E 索引 -->
		</div>
		<!-- E singerList -->

		<!-- S Loading -->
		<Loading :state="LoadingState"></Loading>
		<!-- E Loading -->

	</div>
</template>

<script>
//引入头部组件
import HeaderTab from '@/components/HeaderTab';
//引入loading组件
import Loading from '@/components/base/loading/Loading';

//引入better-scroll
import BScroll from 'better-scroll';
//引入Jsonp
import jsonp from 'jsonp';
//引入接口地址
import api from '../api/singerApi.js';

export default{
	name:'',
	data(){
		return {
			LoadingState:true,
			indexTool:[],
			singerList:[],
			myScroll:{},
			curIndex:0
		}
	},
	mounted(){
		jsonp(api.singerListApi,{param:'jsonpCallback'},(err,data)=>{
			this.getIndexTool();
			this.getOrderSingerList(data.data.list);
			this.LoadingState = false;
			console.log(this.singerList);
		});

		this.myScroll = new BScroll('.singer-wrapper',{
			probeType:3,
			click:true
		});
		this.myScroll.on('scroll',(pos)=>{
			//console.log(pos);
			let posY = Math.abs(pos.y);
			let singerList = this.singerList;
			let len = singerList.length-1;
			for(let k=0;k<=len;k++){
				if(posY<=singerList[k].distance){
					this.curIndex = k;
					break;
				}
			}
		})

		this.$nextTick(()=>{
			
		})
		setTimeout(()=>{
			this.getDistance()
		},100)
	},
	methods:{
		getOrderSingerList:function(data){//整理歌曲列表结构【热门 A-Z】
			//整理热门 前十
			let hotSingerList = {index:'热',singer:[]};
			hotSingerList.singer=data.slice(0, 10);
			this.singerList.push(hotSingerList);
			//遍历A-Z
			for(let i=1;i<=26;i++){
				let curIndex = this.indexTool[i];
				let temp = {index:curIndex,singer:[]};
				data.forEach((item,k) => {
					if(item.Findex === curIndex){
						temp.singer.push(item);
						data.splice(k,1);
					}
				});
				this.singerList.push(temp);
			}
			//去掉singer为空的数据
			this.singerList.map((item,j)=>{
				let len = item.singer.length;
				if(len <= 0){
					this.singerList.splice(j,1);
					this.indexTool.splice(j,1);
				}
			})
			
		},
		getIndexTool:function(){//获取index索引
			let indexArr = ['热'];
			//将A-Z压入数组indexArr
			for(let code=65;code<=90;code++){
				indexArr.push(String.fromCharCode(code));
			}
			this.indexTool = indexArr;
		},
		getDistance:function(){
			let singerItem = document.querySelectorAll('.singer-item');
			let offset = 0;
			let len = singerItem.length-1;
			let singerList = this.singerList;
			for(let i=0;i<=len;i++){
				offset += singerItem[i].offsetHeight;
				singerList[i].distance = offset;
			}
		}
	},
	components:{
		HeaderTab,
		Loading
	}
}
</script>

<style lang='scss' scoped>
@import '../assets/scss/_themes.scss';
.singer-wrapper{
	height:calc(100vh - 105px);
	overflow: hidden;
	.content{
		.singer-item{
			h2{
				font-size: 15px;
			    line-height: 30px;
			    background: #131313;
			    font-weight: 400;
			    text-indent: 1em;
			    color: $white;
			}
			ul{
				padding-left: 25px;
    			padding-bottom: 20px;
				li{
					display: flex;
				    line-height: 50px;
				    margin-top: 20px;
				    img{
				    	width: 50px;
					    height: 50px;
					    border-radius: 50%;
				    }
				    span{
				    	color: $white;
					    flex-grow: 1;
					    margin-left: 20px;
					    white-space: nowrap;
					    overflow: hidden;
					    text-overflow: ellipsis;
					    padding-right: 8px;
				    }
				}
			}
		}
	}
	.index-tool{
		width: 16px;
	    position: fixed;
	    top: 50%;
	    right: 10px;
	    margin-top: -145px;
	    background-color: hsla(0,0%,92%,.1);
	    font-size: 12px;
	    border-radius: 10px;
	    padding: 5px 0;
	    color: #c8c8c8;
	    li{
	    	text-align: center;
	    	&.active{
	    		color: #d3442c;
	    	}
	    }
	}
}
</style>