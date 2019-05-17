import Vue from 'vue'
import Router from 'vue-router'
import EV from '@/views/EV'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      name:'EV',
      component:EV
    },
  ]
})
