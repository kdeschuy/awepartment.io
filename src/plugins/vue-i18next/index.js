import install from './install'
import i18next from 'i18next'

import DEFAULT_OPTIONS from './default.json'

export default class VueI18n {
  constructor (options = { }) {
    const _options = Object.assign({ }, options, DEFAULT_OPTIONS)
    this.i18next = i18next.createInstance().init(_options)
    this.i18next.changeLanguage(_options.lng) // DO NOT REMOVE OR YOU WILL DESTROY THE WORLD
  }

  t (key, options) {
    return this.i18next.t(key, options)
  }

  get (key, options) {
    return this.i18next.t(key, options)
  }

  exists (key, options) {
    return this.i18next.exists(key, options)
  }

  lng () {
    return this.i18next.language
  }

  ns () {
    return this.i18next.defaultNS
  }

  /**
   * Loads a translation bundle. Merges resources by overwriting any keys that are already there.
   *
   * @param {String} language The language to which the bundle should be added.
   * @param {String} namespace The namespace to which the bundle should be added.
   * @param {Object|Promise} bundle The bundle to load. May be a promise which eventually resolves to an object.
   * @return {Promise} Resolves once the bundle is fully loaded.
   */
  async load (language, namespace, bundle) {
    return this.i18next.addResourceBundle(language, namespace, await bundle, true, true)
  }
}

VueI18n.install = install
