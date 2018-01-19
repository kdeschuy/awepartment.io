// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueI18Next from '@/plugins/vue-i18next'

Vue.config.productionTip = false

Vue.use(VueI18Next)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  name: 'Awepartment',
  components: { App },
  router,
  i18n: new VueI18Next(),

  render (h) {
    return h('App', {
      on: {
        loading (flag) {
          console.log(flag ? 'Loading ...' : 'Done!')
        }
      }
    })
  }
})
