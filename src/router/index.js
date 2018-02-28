import Vue from 'vue'
import Router from 'vue-router'
import NavHeader from '@/components/NavHeader'
// import User from '@/components/User'
import Home from '@/views/Home.vue';
import demo from '@/components/demo.vue'
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
      component: Home
    },
    {
      path: '/demo',
      name: 'd',
      component: demo
    }
  ]
})
