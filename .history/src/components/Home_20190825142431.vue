<template>
  <v-layout>
    <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="(slide,i) in slides"
            :key="i"
            :src="slide.url"
          >
          <h2 id="descri">{{ slide.Titulo }}</h2>
          </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-layout>

</template>

<script>
export default {
  data: () => ({
    slides: []
  }),

  methods: {
    getDataSlides () {
      const ref = this.$firebase.database().ref('slide')

      ref.on('value', data => {
        const values = data.val()

        this.slides = Object.keys(values).map(i => values[i])
      })
    },

    // getDataUnica (id) {
    //   const ref = this.$firebase.database().ref(`colaboradores/${id}`)

    //   ref.on('value', data => {
    //     const values = data.val()

    //     this.mensage = Object.keys(values).map(i => values[i])
    //   })
    //   this.dialog2 = true
    // }

  }
}
</script>

<style scoped>
  #descri {
    position: relative;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 18%;
  }
</style>
