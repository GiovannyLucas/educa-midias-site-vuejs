<template>
  <div>
    <h1>Slide</h1>
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
        <td> {{ valores.url }} </td>
        <td>
         <a href=""><i style="color: #1E90FF" class="fa fa-refresh"></i></a> |
         <a href=""><i style="color: green" class="fa fa-eye"></i></a> |
          <a href=""><i style="color: red" class="fa fa-trash"></i></a>
        </td>
      </tr>
    </tbody>
  </table>
  <span
    style="font-size: 13pt; color: grey"
    v-if="!slides.length"
  >
    Nenhum dado encontrado!
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
                <input type="file" style="width: 100%"/>
              </v-flex>
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
      dialog: false,
      form: {
        pickerInicio: '',
        pickerFim: '',
        titulo: '',
        descricao: '',
        image: 'puxa do storage'
      },
      slides: []
    }
  },
  methods: {
    submit () {
      const ref = this.$firebase.database().ref('slide')
      const key = ref.push().key

      const pickerIni = this.form.pickerInicio.split('-')
      const pckI = `${pickerIni[2]}/${pickerIni[1]}/${pickerIni[0]}`

      const pickerFin = this.form.pickerFim.split('-')
      const pckF = `${pickerFin[2]}/${pickerFin[1]}/${pickerFin[0]}`

      const valores = {
        Data_Fim: pckF,
        Data_Inicio: pckI,
        Titulo: this.form.titulo,
        id: key,
        url: this.form.image
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
      const ref = this.$firebase.database().ref('slide')

      ref.on('value', data => {
        const values = data.val()

        this.slides = Object.keys(values).map(i => values[i])
      })
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
