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
        align="center"
        justify="center"
      >
        <v-col cols="12">
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 12 : 2"
              class="mx-auto"
              height=""
              max-width="1200"
            >
              <v-card-text class="" style="font-size: 30px; font-family: Acme">Projeto Educa+Mídias</v-card-text>
              <v-col style="width: 100%">
                <v-img
                  :src="quem_somos[0].img_dos_membros"
                  height="400"
                  style="width:100%"
                ></v-img>
              </v-col>
              <v-col style="">
                <v-card-item style="">
                  <span style="font-size: 20px">
                    {{ quem_somos[0].o_que_e }}
                  </span>
                </v-card-item>
              </v-col>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-layout class="footer">
        <img
          class="footer-dev"
          style=""
          src="https://firebasestorage.googleapis.com/v0/b/site-educa-midias.appspot.com/o/sobre_nos%2Fcartaz03-1564941785016.jpg?alt=media&token=df948370-152a-48d1-b27d-898f33973e8d"
        />
        &nbsp;&nbsp;&nbsp;<p style="color: #FFF; margin-top: 25%">Giovanny Lucas</p>
      </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    slides: [],
    galeria: [],
    noticias: [],
    quem_somos: []
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
    },
    getDataQuemSomos () {
      const ref = this.$firebase.database().ref('sobre_nos')

      ref.on('value', data => {
        const values = data.val()

        this.quem_somos = Object.keys(values).map(i => values[i])
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
    this.getDataQuemSomos()
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
  .footer {
    width: 100%;
    display: flex;
    background: linear-gradient(to right, #240f6a, #f298e2);
    padding: 20px;
    margin-top: 5%;
  }
  .footer-dev {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
</style>
