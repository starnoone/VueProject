<template>
  <div id="app">
    <router-view/>
	<miniPlayer></miniPlayer>
  </div>
</template>

<script>
import miniPlayer from '@/components/miniPlayer';
export default {
  name: 'App',
  components:{
  	miniPlayer
  }
}
</script>

<style lang='scss'>
@import 'assets/scss/_themes.scss';

body{
	padding:0;
	margin:0;
	color:$white;
	background-color: $black;
}
h1,h2,h3,h4,h5,h6,p{
	margin:0;
}
a{
	text-decoration: none;
	color:$white;
}
ul{
	list-style: none;
	padding:0;
	margin:0;
}
</style>
