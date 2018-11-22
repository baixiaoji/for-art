import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import radarMap from '@/components/radarMap'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/xiang/',
      name: 'index',
      component: Index
    },
    {
      path: '/xiang/radarMap',
      name: 'radarMap',
      component: radarMap
    }
  ]
})
