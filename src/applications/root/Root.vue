<template>
  <div>
    <h1>{{ $t('title') }}</h1>
    <router-link to="bills">{{ $t('links.bill') }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'Root'
}
</script>
