<template>
  <v-app>
     <v-carousel>
    <v-carousel-item
      v-for="(image,i) in images"
      :key="i"
      :src="image.src"
    >
    <h2 id="descri">{{ image.desc }}</h2>
    </v-carousel-item>
  </v-carousel>
    <v-footer color="#00008B" app>
      <span style="margin-left: 1%" class="white--text">Educa+Midias &copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    images: [
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        desc: 'Esquilo'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        desc: 'Céu'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        desc: 'Pássaro'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        desc: 'Planeta'
      }
    ]
  })
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
