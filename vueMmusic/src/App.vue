<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
h1{
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
