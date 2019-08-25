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

    <v-layout style="margin-top: 0%">
       <v-card
          v-for="(galery, k) in galeria" :key="k"
          max-width="500"
          class="mx-auto"
        >
          <v-row
            class="py-5 pl-5"
          >
            <v-col class="shrink">
              <v-img
                height="300"
                width="300"
                :src="galery.url_img"
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
    <v-layout style="margin-left: 10%; margin-top: 2%">
      <router-link to="/galeria" right>Ver todas as imagens...</router-link>
    </v-layout>

    <v-layout  style="margin-top: 5%">
      <v-flex xs12 md12>
        <h3 class="title-content">NOTÍCIAS</h3>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-container>
      <v-layout>
        <div style="display:flex" v-for="(noticia, k) in noticias" :key="k">
          <div>
            <img
              height="300"
              width="300"
              :src="noticia.img"
            />
          </div>
          <div style="padding-left: 5%; text-align: start; ">
            <div>
              <h3 class="title-noticia">{{ noticia.titulo }}</h3>
              <br/>
              <span style="">{{ noticia.resumo }}</span>
            </div>
            <div>
              <router-link to="/noticias" right>Ver todas as notícias...</router-link>
            </div>
          </div>
        </div>
      </v-layout>
    </v-container>

    <v-layout  style="margin-top: 5%">
      <v-flex xs12 md12>
        <h3 class="title-content">QUEM SOMOS</h3>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>

      <v-row
        align="start"
        justify="center"
      >
        <v-col cols="12">
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 12 : 2"
              class="mx-auto"
              height="400"
              max-width="1200"
            >
              <v-card-text class="my-4 text-center title">Educa+Mídias</v-card-text>
              <v-col cols="4" style="">

                <v-card-item>{{  }}</v-card-item>
              </v-col>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    slides: [],
    galeria: [],
    noticias: []
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

        this.galeria = Object.keys(values).map(i => values[i])
      })
    },
    getDataNoticias () {
      const ref = this.$firebase.database().ref('noticias').limitToFirst(3)

      ref.on('value', data => {
        const values = data.val()

        this.noticias = Object.keys(values).map(i => values[i])
      })
    }

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
    this.getDataGaleria()
    this.getDataNoticias()
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
    font-size: 40px;
  }
  .title-noticia {
    font-size: 30px;
    font-family: 'Arial', 'Helvetica', 'sans-serif';
  }
</style>
