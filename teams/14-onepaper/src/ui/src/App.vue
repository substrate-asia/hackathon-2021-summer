<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('polkadot/init')
    const pair = localStorage.getItem('pair')
    if (pair) {
      this.$store.commit('user/SET_PAIR', JSON.parse(pair))
    }
  }
}
</script>
