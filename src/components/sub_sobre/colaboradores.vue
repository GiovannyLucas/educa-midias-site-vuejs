<template>
<v-layout row wrap>
  <v-flex style="padding: 10px;" v-for="i in 12" :key="`12${i}`" xs12 sm6>
    <v-hover>
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="344"
    >
      <v-img
        :aspect-ratio="16/9"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>
      <h1>Título</h1>
      <v-card-title>
        <h1 class="icon-ig"><i class="fa fa-instagram"></i></h1>
        <div>
          <span>Instagram</span>
          <div class="d-flex">
          </div>
        </div>
        <v-spacer></v-spacer>
        <h1 class="icon-facebook"><i class="fa fa-facebook-square"></i></h1>
        <div>
          <span> Facebook</span>
          <div class="d-flex">
          </div>
        </div>
      </v-card-title>
    </v-card>
  </v-hover>
  </v-flex>
</v-layout>
</template>

<script>
export default {
  name: 'Colaboradores',
  data: () => ({
    reviews: 413,
    value: 4.5
  })
}
</script>
<style scoped>
  .icon-facebook {
    color: #3b5998;
  }
  .icon-ig {
    color: purple;
  }
</style>
