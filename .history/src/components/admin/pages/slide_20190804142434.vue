<template>
  <div>
    <h1>Slide</h1>
    <hr>
    <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Data Início</th>
        <th scope="col">Data Fim</th>
        <th scope="col">Título</th>
        <th scope="col">Url imagem</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(valores, k) in slides" :key="k">
        <th scope="row"> {{ valores.id }} </th>
        <td> {{ valores.Data_Inicio }} </td>
        <td> {{ valores.Data_Fim }} </td>
        <td> {{ valores.Titulo }} </td>
        <td>
          <img :src="valores.url" width="100" height="80">
        </td>
        <td>
          <button><i style="color: blue" class="fa fa-refresh"></i></button> |
          <button><i style="color: green" class="fa fa-eye"></i></button> |
          <button @click="removeItem(valores.id)" ><i style="color: red" class="fa fa-trash"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
  <span
    style="font-size: 13pt; color: grey"
    v-if="slides.length === 0"
  >
    Nenhum dado encontrado!
    <i class="fa fa-spinner fa-spin" v-if="init"></i>
  </span>
  <v-layout justify-center>
    <v-dialog v-model="dialog" fullscreen persistent max-width="600px">
      <template v-slot:activator="{ on }">
    <v-btn v-on="on" class="btn btn-info" color="blue" data-toggle="modal" data-target="#exampleModal">
      <span style="color: white;">
        <i class="fa fa-plus"></i>
      &nbsp; Add
      </span>
    </v-btn>
  </template>
      <v-card>
        <v-card-title>
          <span class="headline">Adicionar imagem</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6>
                <legend>Data marcada para começar a passar</legend>
                <v-date-picker locale="pt-br" color="black" v-model="form.pickerInicio"></v-date-picker>
              </v-flex>
              <v-flex xs6>
                <legend>Data marcada para parar de passar</legend>
                <v-date-picker locale="pt-br" color="black" v-model="form.pickerFim"></v-date-picker>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="form.titulo" label="Título*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <input required type="file" @change="handleFile($event)" style="width: 100%"/>
              </v-flex>
              <div xs4 class="div-img">
                <img class="preview" alt="" v-if="view">
                <v-icon class="icon-close" v-if="form.file" @click="clearFile()">close</v-icon>
              </div>
            </v-layout>
          </v-container>
          <small style="color: red;">*indica campo obrigatório</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">
            <span style="color: white;"> <i class="fa fa-times"></i> &nbsp; Fechar</span>
          </v-btn>
          <v-btn color="green darken-1" text @click.prevent="submit()">
            <span style="color: white;"> <i class="fa fa-plus"></i> &nbsp; Adicionar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      init: false,
      dialog: false,
      view: true,
      form: {
        pickerInicio: '',
        pickerFim: '',
        titulo: '',
        descricao: '',
        file: ''
      },
      slides: []
    }
  },
  computed: {
    fileName () {
      const {file} = this.form

      if (file) {
        const split = file.name.split('.')
        return `${split[0]}-${new Date().getTime()}.${split[1]}`
      } else {
        return ''
      }
    }
  },
  methods: {
    handleFile (evt) {
      this.form.file = ''
      this.view = true
      this.form.file = evt.target.files[0]

      const durl = this.form.file

      const preview = document.querySelector('.preview')

      const fr = new FileReader()

      fr.onload = (e) => (preview.src = e.target.result)
      fr.readAsDataURL(durl)
    },
    clearFile () {
      this.form.file = ''
      this.view = false
      const preview = document.querySelector('.preview')

      preview.src = ''
      this.view = true
    },
    async submit () {
      let url

      const ref = this.$firebase.database().ref('slide')
      const key = ref.push().key

      const pickerIni = this.form.pickerInicio.split('-')
      const pckI = `${pickerIni[2]}/${pickerIni[1]}/${pickerIni[0]}`

      const pickerFin = this.form.pickerFim.split('-')
      const pckF = `${pickerFin[2]}/${pickerFin[1]}/${pickerFin[0]}`

      const snapshot = await this.$firebase.storage()
        .ref('slide')
        .child(this.fileName)
        .put(this.form.file)

      url = await snapshot.ref.getDownloadURL()

      const valores = {
        Data_Fim: pckF,
        Data_Inicio: pckI,
        Titulo: this.form.titulo,
        id: key,
        url
      }

      ref.child(key).set(valores, err => {
        if (err) {
          console.log(err)
        } else {
          this.dialog = false
        }
      })
    },
    getData () {
      this.init = true
      const ref = this.$firebase.database().ref('slide')

      ref.on('value', data => {
        const values = data.val()

        this.slides = Object.keys(values).map(i => values[i])
      })
    this.init = false
    },
    removeItem (key) {
      if (this.slides.length === 1) {
        this.slides = []
      }

      const ref = this.$firebase.database().ref('slide')

      ref.child(key).remove()
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>
th {
  text-transform: uppercase;
}
</style>
