<template>
    <div>
      <span class="display-2">Pereiro - CE, Brasil</span>
      <v-divider class="my-3"></v-divider>
      <img class="map" src="https://maps.googleapis.com/maps/api/staticmap?center=-6.046696,-38.465850&amp;zoom=16&amp;size=1000x1000&amp;maptype=roadmap&amp;markers=color:red%7C-6.046696,-38.465850&amp;key=AIzaSyCjt5xYUmM8eCivr0Ar8uXpMzk1DVuAaMc">
    </div>
</template>

<script>
export default {
  name: 'Localizacao'
}
</script>
<style scoped>
  .map {
    width: 80%;
    height: 70vh;
  }
</style>
