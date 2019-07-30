<template>
  <div class="container">
  <h1> {{ dado.o_que_e }} </h1>
    <v-card
      class="mx-auto"
      xs12
    >
      <v-img
        class="white--text"
        height="200px"
        :src="dado.img_dos_membros"
      >
        <v-card-title class="align-end fill-height">Top 10 Australian beaches</v-card-title>
      </v-img>

      <v-card-text>
        <span>Number 10</span><br>
        <span class="text--primary">
          <span>Whitehaven Beach</span><br>
          <span>Whitsunday Island, Whitsunday Islands</span>
        </span>
      </v-card-text>

      <v-card-actions>
        <v-btn
          text
          color="orange"
        >
          Share
        </v-btn>
        <v-btn
          text
          color="orange"
        >
          Explore
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    view: true,
    dados: [],
    dado: []
  }),
  methods: {
    getData () {
      const ref = this.$firebase.database().ref('sobre_nos')

      ref.on('value', data => {
        const values = data.val()

        this.dados = Object.keys(values).map(i => values[i])
        console.log(Object.keys(values).map(i => values[i]))
      })
    },
    getDataUm () {
      this.dado = this.dados[0]
      console.log(this.dado)
    }
  },
  mounted () {
    this.getData()
    this.getDataUm()
  }
}
</script>

<style scoped>
.cont {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.preview {
  width: 40%;
  transform: scale(1);
  transition: 1s;
}
.preview:hover {
  transform: scale(1.3);
  transition: 1s;
}
.div-img {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.icon-close {
  margin-top: -20%;
  cursor: pointer;
}
</style>
