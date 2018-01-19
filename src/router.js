import Vue from 'vue'
import Router from 'vue-router'
import Bills from '@/applications/bills/Bills'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Bills',
      component: Bills
    }
  ]
})
