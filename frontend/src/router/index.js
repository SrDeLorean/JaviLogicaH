import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/auth/Login.vue')
  },
  //route the admin
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: () => import( '../views/admin/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      if(store.getters['auth/user'].role!="admin"){
        return next({
          name: 'home'
        })
      }
      next()
    }
  },
  //route the hotel
  {
    path: '/hotel/dashboard',
    name: 'hotel-dashboard',
    component: () => import( '../views/hotel/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      if(store.getters['auth/user'].role!="hotel"){
        return next({
          name: 'home'
        })
      }
      next()
    }
  },
  //route the tour
  {
    path: '/tour/dashboard',
    name: 'tour-dashboard',
    component: () => import( '../views/tour/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      if(store.getters['auth/user'].role!="tour"){
        return next({
          name: 'home'
        })
      }
      next()
    }
  },
  //route the user
  {
    path: '/user/dashboard',
    name: 'user-dashboard',
    component: () => import( '../views/user/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      if(store.getters['auth/user'].role!="user"){
        return next({
          name: 'home'
        })
      }
      next()
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
