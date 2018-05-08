<template>
	<div class="">
		<HeaderTab></HeaderTab>
		
		<div class="search-wrap">
			<!-- S 输入框 -->
			<div class="search-form">
		        <input placeholder="搜索歌曲、歌手" v-model="searchKey">
		        <i class="delete"></i>
		    </div>
			<!-- E 输入框 -->
			<!-- S 热搜词会 -->
			<div class="hotkey" v-if="showState">
		        <h2>热门搜索</h2>
		        <div class="hotkey-list">
		            <span v-for = "(key,i) in hotkeys" :key="key.n" v-text="key.k"></span>
		        </div>
		    </div>
		    <!-- E 热搜词会 -->
		    <!-- S 搜索列表 -->
		    <div class="song-wrapper" v-if="!showState">
		        <div class="content">
		          <div class="song-list">
		            <ul>
		              <!-- S 歌手直达 -->
		              <router-link :to="'/singer/'+songlist.zhida.singermid">
		                <li class="singer" v-if="!songlist.zhida.type == 0" v-text="this.songlist.zhida.singername"></li>
		              </router-link>
		              <!-- E 歌手直达 -->

		              <router-link :to="'/play/'+song.songmid+'/'+song.albummid" v-for="(song,k) in songlist.song.list" :key="k" @click.native="addSong(song)">
		                <li>{{song.songname}} - {{song.singer[0].name}}</li>
		              </router-link>
		            </ul>
		          </div>
	        	</div>
	        </div>
	        <!-- E 搜索列表 -->
		</div>
		
		

	   
	</div>
</template>

<script>
//引入头部组件
import HeaderTab from '@/components/HeaderTab';

//引入jsonp
import jsonp from 'jsonp';

//引入API
import searchApi from '../api/searchApi';

//引入Vuex
import {mapGetters,mapMutations} from 'vuex';

export default{
	name:'',
	data(){
		return {
			hotkeys:[],
			searchKey:'',
			songlist:[],
			showState:true,
		}
	},
	mounted(){
		//获取热门搜索的数据
		jsonp(searchApi.hotkeyApi,{param:'jsonpCallback'},(err,data)=>{
			this.hotkeys = data.data.hotkey.slice(0, 10);
		});
	},
	watch:{
		searchKey:function(){
			this._search();
			this._show();
		}
	},
	methods:{
		_search(){
			//获取搜索列表信息
			let url = searchApi.searchApi + this.searchKey;
			jsonp(url,{param:'jsonpCallback'},(err,data)=>{
				this.songlist = data.data;
				console.log(this.songlist);

			})
		},
		_show:function(){
			if(this.searchKey === ""){
				this.showState = true;
			}else{
				this.showState = false;
			}
		},
		addSong:function(song){
			song = {musicData:song};
			//当前播放歌曲信息
			this.setSong(song);
			//加入播放列表
			this.setPlayListSong(song);

		},
		...mapMutations({
			'setSong':'setSong',
			'setPlayListSong':'setPlayListSong'
		})
	},
	components:{
		HeaderTab
	}
}
</script>

<style lang='scss' scoped>
ul{
  list-style: none;
}
a{
  color: #676767;
}
.search-wrap{
  padding: 0 15px;
  margin: 0 auto;

  .search-form{
    padding: 8px 0;
    text-indent: 15px;
    background-color: #121212;
    margin: 0 5px;
    margin-top: 25px;
    border-radius: 8px;
    position: relative;
    margin-bottom: 20px;
    &::before{
      content: "";
      display: inline-block;
      width: 22px;
      height: 22px;
      background: url(../assets/icon/search.png) no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      margin-right: 5px;
    }
    input{
      width: 220px;
      height: 20px;
      font-size: 14px;
      line-height: 20px;
      background-color: transparent;
      border: 0;
      outline: 0;
      color: #676767;
    }
    .delete{
          display: inline-block;
      width: 22px;
      height: 22px;
      background: url(../assets/icon/delete.png) no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      position: absolute;
      right: 10px;
    }
  }

  .hotkey{
    margin-top: 30px;
    h2{
      color: #676767;
      font-size: 15px;
      text-indent: 5px;
    }
    .hotkey-list{
      color: #676767;
      display: flex;
      flex-wrap: wrap;
      span{
        padding: 4px 6px;
        background-color: #121212;
        margin: 5px;
        border-radius: 8px;
        font-size: 14px;
      }
    }
  }
}


.song-wrapper{
  height:calc(100vh - 173px);
  overflow: hidden;
}
li{
  padding: 6px 5px;
  color: #676767;
  &::before{
    content: "";
    display: inline-block;
    width: 22px;
    height: 22px;
    background: url(../assets/icon/music.png) no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
    margin-right: 5px;
  }

  &.singer{
    &::before{
      content: "";
      display: inline-block;
      width: 22px;
      height: 22px;
      background: url(../assets/icon/singer.png) no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
</style>