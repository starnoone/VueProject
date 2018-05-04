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
//设置当前歌曲播放列表
export const setPlayListSong = (state,songData)=>{
	state.playListSong.push(songData);
}
//设置当前歌曲播放索引
export const setCurPlayIndex = (state,index)=>{
	state.curPlayIndex = index
}