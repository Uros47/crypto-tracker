import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DetailsPage from '@/views/DetailsPage'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/DetailsPage/:id',
    name: 'DetailsPage',
    component: DetailsPage
  }
]

const router = new VueRouter({
  routes
})

export default router
