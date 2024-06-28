import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/instruction',
    children: [
      {
        path: '/instruction',
        name: 'instruction',
        component: () => import(/* webpackChunkName: "instruction" */ '../views/InstructionView.vue')
      },
      {
        path: '/shp',
        name: 'shp',
        component: () => import(/* webpackChunkName: "shp" */ '../views/ShpView.vue')
      },
      {
        path: '/ini',
        name: 'ini',
        component: () => import(/* webpackChunkName: "ini" */ '../views/IniView.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
