//设置播放列表
export const setPlaySrc = (state,src)=>{
	state.playSrc = src;
}
//设置播放状态
export const setPlayState = (state,playState)=>{
	state.playState = playState;
}
//设置歌曲信息
export const setSong = (state,songs)=>{
	state.song = songs;
}