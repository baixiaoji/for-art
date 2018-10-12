import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import radarMap from '@/components/radarMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/radarMap',
      name: 'radarMap',
      component: radarMap
    }
  ]
})
