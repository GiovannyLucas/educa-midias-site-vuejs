<template>
  <div>
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
    <v-layout  style="margin-top: 5%">
      <v-flex xs12 md12>
        <h3 class="title-content">GALERIA</h3>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout style="margin-top: 5%">
       <v-card
          max-width="344"
          class="mx-auto"

        >
          <v-row
            class="py-4 pl-4"
          >
            <v-col class="shrink">
              <v-img
                height="200"
                width="200"
                src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
              ></v-img>
            </v-col>
            <v-col class="text-center">
              <v-container class="pa-0">
                <v-row>
                  <v-col>
                    <v-btn icon>
                      <v-icon>favorite</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-card>
    </v-layout>

  </div>
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
    getDataGaleria () {
      const ref = this.$firebase.database().ref('galeria').limitToFirst(3)

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

  },

  created () {
    this.getDataSlides()
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
  .title-content {
    font-family: 'Acme';
    font-size: 25px;
  }
</style>
