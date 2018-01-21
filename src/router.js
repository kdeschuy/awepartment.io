import Vue from 'vue'
import Router from 'vue-router'

import Root from '@/applications/root/Root'
import Bills from '@/applications/bills/Bills'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root
    },
    {
      path: '/bills',
      name: 'bills',
      component: Bills
    }
    // { path: '*', component: NotFoundComponent }
  ]
})
