// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

//懒加载
import VueLazyload from 'vue-lazyload'
//懒加载图片路径
import Loading from './assets/icon/lazyload.png'

Vue.config.productionTip = false

Vue.use(VueLazyload,{
	loading:Loading,

})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
