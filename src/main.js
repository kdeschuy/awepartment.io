// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueI18Next from '@/plugins/vue-i18next'

import firebase from '@/firebase'

Vue.use(VueI18Next)

Vue.config.productionTip = false

Vue.prototype.$forceUpdateAll = function () {
  this.$forceUpdate()
  for (const child of this.$children) { child.$forceUpdateAll() }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  name: 'Awepartment',
  components: { App },
  router,
  i18n: new VueI18Next(),

  data () {
    return {
      loading: false
    }
  },

  watch: {
    '$route' (value) { this.onRouteChange() }
  },

  methods: {
    onRouteChange () {
      this.loading = true
      const db = firebase.database()

      db.ref(`translations/en/${this.$route.name}`).on('value', snapshot => {
        this.$i18n.load('en', this.$route.name, snapshot.val())
        this.$i18n.namespace(this.$route.name)
        this.loading = false
        this.$forceUpdateAll()
      })
    },

    onLoading (flag) {
      this.loading = flag
    }
  },

  created () {
    this.onRouteChange()
  },

  render (h) {
    return h('App', {
      props: { on: this.loading },
      on: { loading: this.onLoading }
    })
  }
})
