<template functional>
  <div id="app">
    <div class="loading-screen" :class="{ on: props.on }"></div>
    <router-view v-on="listeners"/>
  </div>
</template>

<script>
export default {
  props: {
    on: { type: Boolean, required: false, default: false }
  }
}
</script>

<style lang="stylus">

$font-stack = 'Avenir', Helvetica, Arial, sans-serif

#app
  font-family: $font-stack
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px

.loading-screen
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  pointer-events: none

  &.on
    background: rgba(0, 0, 0, .7)
    pointer-events: initial

</style>
