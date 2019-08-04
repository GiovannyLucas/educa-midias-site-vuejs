<template>
    <div>
    <h1>Notícias</h1>
    <hr>
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
          <button><i style="color: blue" class="fa fa-refresh"></i></button> |
          <button @click="getDataUnica(valores.id)"><i style="color: green" class="fa fa-eye"></i></button> |
          <button @click="removeItem(valores.id)"><i style="color: red" class="fa fa-trash"></i></button>
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
                <v-text-field :rules="tituloRules" v-model="form.titulo" label="Título da notícia*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea :rules="noticiaRules" label="Escreva a notícia aqui" v-model="form.noticia"></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-textarea :rules="resumoRules" label="Escreva o resumo aqui" v-model="form.resumo"></v-textarea>
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

  <v-layout justify-center>
    <v-dialog v-model="dialog2" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card class="card-dialog">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog2 = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Ver notícia</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>{{ this.mensage[1] }}</v-subheader>
          <v-list-item><br>
            <v-list-item-content xs12>
              <v-list-item-title style="font-size: 25px">{{ this.mensage[5] }}</v-list-item-title><br>
              <div style="margin-left: 33%">
                <div class="col-md-6">
                  <span left>Resumo:</span><br>
                  <span>{{ this.mensage[4] }}</span><br>
                </div>
                <div class="col-md-6">
                  <span left>Notícia:</span><br>
                  <span>{{ this.mensage[3] }}</span><br><br>
                </div>
              </div>
              <v-list-item-subtitle xs12>
                <img :src="mensage[2]" style="width: 50%; height: 40vh" alt="Imagem da notícia"><br><br>
                <span>{{ this.mensage[0] }}</span><br>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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
    dialog2: false,
    mensage: [],
    noticias: [],
    tituloRules: [
      v => !!v || 'Título é obrigatório'
    ],
    noticiaRules: [
      v => !!v || 'Notícia é obrigatória'
    ],
    resumoRules: [
      v => !!v || 'Resumo é obrigatório'
    ]
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
            this.form.noticia = ''
            this.form.resumo = ''
            this.form.titulo = ''
            this.form.file = ''
            this.dialog = false
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    getData () {
      const ref = this.$firebase.database().ref('noticias')

      ref.on('value', data => {
        const values = data.val()

        this.noticias = Object.keys(values).map(i => values[i])
      })
    },
    removeItem (key) {
      if (this.noticias.length === 1) {
        this.noticias = []
      }

      const ref = this.$firebase.database().ref('noticias')

      ref.child(key).remove()
    },
    getDataUnica (id) {
      const ref = this.$firebase.database().ref(`noticias/${id}`)

      ref.on('value', data => {
        const values = data.val()

        this.mensage = Object.keys(values).map(i => values[i])
      })
      this.dialog2 = true
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
