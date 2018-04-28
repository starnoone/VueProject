import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Singer from '@/pages/Singer'
import Search from '@/pages/Search'
import SingerDetail from '@/pages/SingerDetail'
import PlaySong from '@/pages/PlaySong'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/singer/:sid',
      name: 'SingerDetail',
      component: SingerDetail
    },
    {
      path: '/singer/:sid/:mid',
      name: 'PlaySong',
      component: PlaySong
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
