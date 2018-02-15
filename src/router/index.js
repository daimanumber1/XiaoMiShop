import Vue from 'vue'
import Router from 'vue-router'
import NavHeader from '@/components/NavHeader'
import User from '@/components/User'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dd',
      name: 'NavHeader',
      component: NavHeader
    },
    {
      path: '/',
      name: 'User',
      component: User
    }
  ]
})
