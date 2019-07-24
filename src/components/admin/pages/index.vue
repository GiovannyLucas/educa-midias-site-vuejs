<template>
  <div>
    <h1>Index AdminHome</h1>
  </div>
</template>

<script>
export default {
  name: 'adminHome',
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null

      if (!window.uid) {
        this.$router.push({ name: 'loginAdmin' })
      }
    })
  }
}
</script>

<style>

</style>
