//获取播放地址
export const getPlaySrc = (state)=>{
	return state.playSrc
}
//获取播放状态
export const getPlayState = (state)=>{
	return state.playState
}
//获取歌曲信息
export const getSong = (state)=>{
	return state.song
}
//获取歌曲播放列表
export const getPlayListSong = (state)=>{
	return state.playListSong
}
//获取当前歌曲播放索引
export const getCurPlayIndex = (state)=>{
	return state.curPlayIndex
}
