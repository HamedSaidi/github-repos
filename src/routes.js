import VueRouter from 'vue-router'
import Vue from 'vue'

import { listPage, detailsPage } from './pages'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'search',
      path: '/',
      component: listPage
    },
    {
      name: 'details',
      path: '/details/:owner/:repo',
      component: detailsPage
    }
  ]
})

export default router
