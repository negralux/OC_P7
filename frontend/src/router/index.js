import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)



  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/inscription',
    name: 'inscription',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewInscription.vue')
  },
  //version2 {
    //path: '/dashboard',
    //name: 'dashboard',
    //component: () => import(/* webpackChunkName: "about" */ '../views/ViewDashboard.vue'),
  
  //},
  //{
    //path: '/detailDiscussion/:id',
    //name: 'detailDiscussion',
    //component: () => import(/* webpackChunkName: "about" */ '../views/ViewDetailMessage.vue')
  //},
  {
    path: '/wall',
    name: 'wall',
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewWall.vue')
  },
  {
    path: '/profil',
    name: 'profil',
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewProfil.vue')
  },
  {
    path: '/adminDashboard',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewAdmin.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
