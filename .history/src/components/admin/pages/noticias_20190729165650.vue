<template>
    <div>
    <h1>Notícias</h1>
    <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Título</th>
        <th scope="col">Notícia</th>
        <th scope="col">Resumo</th>
        <th scope="col">Data da postagem</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(valores, k) in noticias" :key="k">
        <th scope="row"> {{ valores.id }} </th>
        <td> {{ valores.titulo }} </td>
        <td> {{ valores.noticia }} </td>
        <td> {{ valores.resumo }} </td>
        <td> {{ valores.data_postada }} </td>
        <td>
         <a href=""><i style="color: blue" class="fa fa-refresh"></i></a> |
         <a href=""><i style="color: green" class="fa fa-eye"></i></a> |
          <a href=""><i style="color: red" class="fa fa-trash"></i></a>
        </td>
      </tr>
    </tbody>
  </table>
  <span
    style="font-size: 13pt; color: grey"
    v-if="noticias.length == 0"
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
          <span class="headline">Adicionar notícia</span>
        </v-card-title>
        <v-card-text>

          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="form.titulo" label="Título da notícia*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <textarea placeholder="Escreva a notícia aqui" class="form-control" v-model="form.noticia" rows="3"></textarea>
              </v-flex>
              <v-flex xs12>
                <textarea placeholder="Escreva o resumo aqui" class="form-control" v-model="form.resumo" rows="3"></textarea>
              </v-flex>
              <v-flex xs12>
                <input type="file" @change="handleFile($event)" style="width: 100%"/>
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
  data: () => ({
    dialog: false,
    view: true,
    form: {
      noticia: '',
      resumo: '',
      titulo: '',
      file: ''
    },
    noticias: []
  }),
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

      try {

      } catch (err) {

      }

      const ref = this.$firebase.database().ref('noticias')
      const id = ref.push().key

      const snapshot = await this.$firebase.storage()
        .ref('noticias')
        .child(this.fileName)
        .put(this.form.file)

      url = await snapshot.ref.getDownloadURL()

      const data = new Date()
      let dia = data.getDate()
      let mes = data.getMonth() + 1
      let ano = data.getFullYear()
      let hora = data.getHours()
      let minuto = data.getMinutes()

      const fullDate = `${dia}/${mes}/${ano}-${hora}:${minuto}`

      const valores = {
        data_postada: fullDate,
        id,
        img: url,
        noticia: this.form.noticia,
        resumo: this.form.resumo,
        titulo: this.form.titulo
      }

      ref.child(id).set(valores, err => {
        if (err) {
          console.log(err)
        } else {
          this.dialog = false
        }
      })
    },

    getData () {
      const ref = this.$firebase.database().ref('noticias')

      ref.on('value', data => {
        const values = data.val()

        this.noticias = Object.keys(values).map(i => values[i])
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style>
th {
  text-transform: uppercase;
}
.preview {
  width: 40%;
  height: 30vh;
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
  width: 100%;
}
.icon-close {
  margin-top: -20%;
  cursor: pointer;
}
</style>
