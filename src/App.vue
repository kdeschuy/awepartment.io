<template functional>
  <div id="app">
    <h1>{{ props.title }}</h1>
    <router-view v-on="listeners"/>
  </div>
</template>

<style lang="stylus">
$font-stack = 'Avenir', Helvetica, Arial, sans-serif

#app
  font-family: $font-stack
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px
</style>
