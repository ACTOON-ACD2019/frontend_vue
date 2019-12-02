import Vue from 'vue'
import Router from 'vue-router'

import Root from "../view/root"
import Login from "../view/login"
import Regist from "../view/regist"
import Test from "../test"

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/root',
      name: 'root',
      component: Root
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/regist',
      name: 'regist',
      component: Regist
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})
/*
router.beforeEach((to, from, next) => {
  if (to.name === 'regist' || to.name ==='login') {
    if(localStorage.getItem('token')){
      alert("이미 로그인이 되어 있습니다.");
      next({ path: '/root' })
    }
  }
  else {
    if(!localStorage.getItem('token')){
      alert("로그인을 해야합니다.");
      next({ path: '/login' })
    }
  }
  next()
})
*/
export default router