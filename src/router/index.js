import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import radarMap from '@/components/radarMap'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: HelloWorld
    },
    {
      path: '/radarMap',
      name: 'radarMap',
      component: HelloWorld
    }
  ]
})
