<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null
    })
  }
}
</script>
