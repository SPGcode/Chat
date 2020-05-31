import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/firebase'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/ingreso',
    name: 'ingreso',
    component: () => import(/* webpackChunkName: "ingreso" */ '../views/Ingreso.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import(/* webpackChunkName: "chat" */ '../views/Chat.vue'),
    meta: {requiresAuth: true}
  }
]
})
router.beforeEach((to, from, next) =>{
  
  const user = auth.currentUser;

  if (to.matched.some(record => record.meta.requiresAuth)){
    if(user){
      next()
    }else{
    next({name: 'ingreso'})
    }
  }else{
    next()
  }
})

export default router
