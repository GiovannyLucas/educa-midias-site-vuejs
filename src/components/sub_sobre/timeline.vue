<template>
  <v-timeline align-top>
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      :color="item.color"
      :icon="item.icon"
      fill-dot
    >
    <v-card
    :color="item.color"
    dark
    >
        <v-card-title class="title">{{item.title}}</v-card-title>
        <v-card-text class="black text--primary">
          <p>{{item.text}}</p>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>  
</template>
<script>
export default {
  name: 'Colaboradores',
  data: () => ({
    items: [
    {
        color: 'red lighten-2',
        icon: 'mdi-star',
        title: 'Titulo 01',
        text: 'Teste de texto 01'
    },
    {
        color: 'purple darken-1',
        icon: 'mdi-book-variant',
        title: 'Titulo 02',
        text: 'Teste de texto 02'
    },
    {
        color: 'green lighten-1',
        icon: 'mdi-airballoon',
        title: 'Titulo 03',
        text: 'Teste de texto 03'
    },
    {
        color: 'indigo',
        icon: 'mdi-buffer',
        title: 'Titulo 04',
        text: 'Teste de texto 04'
    }
    ]
  })
}

</script>
<style scoped>

</style>
