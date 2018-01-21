import Vue from 'vue'

function debugKey (key, options = null) {
  const keyText = key instanceof Array ? key.join(' | ') : key
  let optionsText = ''
  // options are only displayed for keys that are not related to validation (there, options are well known)
  if (options && keyText.indexOf('.validation.') === -1) {
    // in debug mode interpolation config pollutes the output
    options.interpolation = undefined
    optionsText = options !== {} ? ' * ' + JSON.stringify(options) : ''
  }
  return `${keyText}${optionsText}`
}

export default {
  computed: {
    // the $t function is a computed property to get around cached computed properties that are using $t
    $t () {
      const $debugthing = false
      if (!$debugthing) {
        return function (key, options = {}) {
          if (!key) return key
          // i18next escape is always disabled as escaping is already managed by vue

          if (this.$i18n.exists(key)) {
            options.interpolation = { escapeValue: false }
            return this.$i18n.t(key, options)
          }

          // errorHandler.missingKey(this.$i18n.lng(), this.$i18n.ns(), debugKey(key), debugKey(key, options))
          return key instanceof Array ? key[0] : key
        }
      } else {
        return function (key, options) {
          return debugKey(key, options)
        }
      }
    },

    /**
     * Checks if a key exists in the loaded translations.
     * @param {String|Array} key the key
     * @param {Object} options the options
     */
    $t_exists () {
      if (!this.$t_debugEnabled) {
        return function (key, options) {
          if (!key) return false
          return this.$i18n.exists(key, options)
        }
      } else {
        return function (key, options) {
          return true
        }
      }
    }
  },

  beforeCreate () {
    const options = this.$options
    if (options.i18n) {
      this._i18n = options.i18n
    }
  },

  created () {
    Vue.util.defineReactive(this, '$t_debugEnabled', this.$i18n ? !!this.$i18n.debug : false)
  },

  methods: {
    /**
     * Load additional translation files
     * @param {String[]} files
     * @return {Promise}
     */
    $t_load (files) {
      return this.$i18n.load(files)
    },

    /**
     * Reloads the component and its sub components taking debug mode into account.
     */
    $t_reloadAll () {
      for (const child of this.$children) {
        child.$t_reloadAll()
      }
      this.$t_debugEnabled = this.$i18n.debug
      this.$forceUpdate()
    },

    /**
     * Switches the i18n debug mode.
     * @return {Boolean}
     */
    $t_switchDebugMode () {
      this.$i18n.debug = !this.$i18n.debug
      this.$t_reloadAll()
      return this.$i18n.debug
    }
  }
}
