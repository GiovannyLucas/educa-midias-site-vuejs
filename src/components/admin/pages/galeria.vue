<template>
  <div>
    <h1>Galeria</h1>
    <hr>
    <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Título</th>
        <th scope="col">Descrição</th>
        <th scope="col">Imagem</th>
        <th scope="col">Data da postagem</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(valores, k) in imagens" :key="k">
        <th scope="row"> {{ valores.id }}</th>
        <td> {{valores.titulo}} </td>
        <td> {{ valores.descricao }} </td>
        <td>
          <img :src="valores.url_img" width="100" height="80">
        </td>
        <td> {{ valores.data_postagem }} </td>
        <td>
          <button @click="getDataUnicaRefresh(valores.id)"><i style="color: blue" class="fa fa-refresh"></i></button> |
          <button @click="getDataUnica(valores.id)"><i style="color: green" class="fa fa-eye"></i></button> |
          <button @click="removeItem(valores.id)" ><i style="color: red" class="fa fa-trash"></i></button>
        </td>
      </tr>
    </tbody>
  </table>

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
          <span class="headline">Adicionar imagem na galeria</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field :rules="tituloRules" v-model="form.titulo" label="Título*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea :rules="descricaoRules" v-model="form.descricao" required label="Descrição...*" style="width: 100%"></v-textarea>
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
    <v-dialog v-model="refresh" fullscreen persistent max-width="600px">
      <template v-slot:activator="{ on }">
  </template>
      <v-card>
        <v-card-title>
          <span class="headline">Atualizar Imagem</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field :rules="tituloRules" v-model="formRefresh.titulo" label="Título*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea :rules="descricaoRules" v-model="formRefresh.descricao" required label="Descrição...*" style="width: 100%">

                </v-textarea>
              </v-flex>

            <v-flex>
              <v-checkbox
                v-model="alt_photo"
                label="Deseja alterar a foto?"
                class="font-text-field"
                ></v-checkbox>
            </v-flex>

              <v-flex xs12 v-if="alt_photo">
                <input required type="file" @change="handleFile($event)" style="width: 100%"/>
              </v-flex>
              <div xs12 v-else>
                <img style="width: 40%;" alt="" :src="imagensRefresh[4]">
              </div>
            </v-layout>
          </v-container>
          <small style="color: red;">*indica campo obrigatório</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="refresh = false">
            <span style="color: white;"> <i class="fa fa-times"></i> &nbsp; Fechar</span>
          </v-btn>
          <v-btn color="green darken-1" text @click.prevent="Atualizar(formRefresh.id)">
            <span style="color: white;"> <i class="fa fa-plus"></i> &nbsp; Atualizar</span>
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
          <v-toolbar-title>Ver imagem</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>{{ this.mensage[2] }}</v-subheader>
          <v-list-item><br>
            <v-list-item-content xs12>
              <v-list-item-title style="font-size: 25px">{{ this.mensage[3] }}</v-list-item-title><br>
              <span>{{ this.mensage[1] }}</span><br><br><br>
              <v-list-item-subtitle xs12>
                <img :src="mensage[4]" style="width: 50%; height: 40vh" alt="Logo do colaborador"><br><br>
                <span>{{ this.mensage[0] }}</span>
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
  /* eslint-disable */
  data: () => {
    return {
      alt_photo: false,
      refresh: false,
      dialog: false,
      view: true,
      form: {
        file: '',
        titulo: '',
        descricao: ''
      },
      formRefresh: {
        id: '',
        logo: '',
        titulo: '',
        descricao: ''
      },
      dialog2: false,
      mensage: [],
      imagens: [],
      imagensRefresh: [],
      tituloRules: [
        v => !!v || 'Título é obrigatório'
      ],
      descricaoRules: [
        v => !!v || 'Descrição é obrigatória'
      ]
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

      try {
        const ref = this.$firebase.database().ref('galeria')
        const idImg = ref.push().key

        const snapshot = await this.$firebase.storage()
          .ref('galeria')
          .child(this.fileName)
          .put(this.form.file)

        url = await snapshot.ref.getDownloadURL()

        const data = new Date()
        let dia = data.getDate()
        let mes = data.getMonth() + 1
        let ano = data.getFullYear()
        var hora = data.getHours()
        var minuto = data.getMinutes()

        const fullDate = `${dia}/${mes}/${ano}-${hora}:${minuto}`

        const valores = {
          id: idImg,
          data_postagem: fullDate,
          descricao: this.form.descricao,
          titulo: this.form.titulo,
          url_img: url
        }

        ref.child(idImg).set(valores, err => {
          if (err) {
            console.log(err)
          } else {
            this.dialog = false
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    getData () {
      const ref = this.$firebase.database().ref('galeria')

      ref.on('value', data => {
        const values = data.val()

        this.imagens = Object.keys(values).map(i => values[i])
      })
    },
    removeItem (key) {
      if (this.imagens.length === 1) {
        this.imagens = []
      }

      const ref = this.$firebase.database().ref('galeria')

      ref.child(key).remove()
    },
    getDataUnica (id) {
      const ref = this.$firebase.database().ref(`galeria/${id}`)

      ref.on('value', data => {
        const values = data.val()

        this.mensage = Object.keys(values).map(i => values[i])
      })
      this.dialog2 = true
    },
    getDataUnicaRefresh (id) {
      const ref = this.$firebase.database().ref(`galeria/${id}`)

      ref.on('value', data => {
        const values = data.val()

        this.imagensRefresh = Object.keys(values).map(i => values[i])
      })
      this.refresh = true

      this.formRefresh.logo = this.imagensRefresh[4]
      this.formRefresh.titulo = this.imagensRefresh[3]
      this.formRefresh.id = this.imagensRefresh[2]
      this.formRefresh.descricao = imagensRefresh[1]

      console.log(this.imagensRefresh[1])

    },
    async Atualizar (id) {
      let url
      const ref = this.$firebase.database().ref(`galeria`)

      if (this.alt_photo && this.formRefresh.titulo !== ''
      && this.formRefresh.descricao !== ''
      && this.formRefresh.logo !== '') {

        const snapshot = await this.$firebase.storage()
        .ref('galeria')
        .child(this.fileName)
        .put(this.form.file)

        url = await snapshot.ref.getDownloadURL()

        ref.child(id).update({
          titulo: this.formRefresh.titulo,
          descricao: this.formRefresh.descricao,
          url_img: url
          });
      } else if(!this.alt_photo && this.formRefresh.titulo !== '' && this.formRefresh.descricao !== '') {
        ref.child(id).update({
          titulo: this.formRefresh.titulo,
          descricao: this.formRefresh.descricao
          });
      }

      this.refresh = false
      this.alt_photo = false
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
}
.icon-close {
  margin-top: -20%;
  cursor: pointer;
}
</style>
