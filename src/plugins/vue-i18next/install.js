// import errorHandler from 'helpers/errorHandler'
import Mixin from './mixin'

export let _Vue

export default function install (Vue) {
  if (!Vue.prototype.hasOwnProperty('$i18n')) {
    _Vue = Vue

    // Install read-only accessor to root i18next instance.
    Object.defineProperty(Vue.prototype, '$i18n', {
      get () { return this.$root._i18n }
    })

    Vue.mixin(Mixin)
  }
}
