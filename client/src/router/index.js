import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Login from '@/components/Login'
import Register from '@/components/register'

import store from '../vuex/store'

Vue.use(Router)

export const auth = (to,from,next)=>{

  if(store.getters.user.id){
    next() ;
  }else{
    router.push({
      path:'/login',
      query: {
        forward:to.path ,
      }
    })
  }
}

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      name: 'login',
      component: Login,
    }, {
      path: '/register',
      name: 'register',
      component: Register,
    }, {
      path: '/home',
      name : 'home' ,
      component: Home,
      //beforeEnter:auth,
      children: [
        {
          path: '/home',
          component: resolve => require(['../components/home/query.vue'], resolve)
        },
        {
          path: '/home/query',
          component: resolve => require(['../components/home/query.vue'], resolve)
        }, {
          path: '/home/create',
          component: resolve => require(['../components/home/createMeeting.vue'], resolve)
        },
      ],

    },

  ]
})

export default router
