<template>
    <div>
    <h1>Colaboradores</h1>
    <hr>
    <table class="table table-hover tabela">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">nome</th>
        <th scope="col">Url do Facebook</th>
        <th scope="col">Url do Instagram</th>
        <th scope="col">Url da logo</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(valores, k) in colaboradores" :key="k">
        <th scope="row"> {{ valores.id }}</th>
        <td> {{valores.nome}} </td>
        <td> {{ valores.url_facebook }} </td>
        <td> {{ valores.url_instagram }} </td>
        <td>
          <img :src="valores.url_logo" width="100" height="80">
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
    v-if="colaboradores.length === 0"
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
          <span class="headline">Adicionar colaborador</span>
        </v-card-title>
        <v-card-text>

          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field :rules="nomeRules" v-model="form.nome" label="Nome*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field :rules="faceRules" v-model="form.facebook" label="Facebook*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field :rules="instaRules" v-model="form.instagram" label="Instagram*" required></v-text-field>
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
  /* eslint-disable */
  data: () => ({
    dialog: false,
    view: true,
    form: {
      nome: '',
      facebook: '',
      instagram: '',
      file: ''
    },
    colaboradores: [],
    nomeRules: [
      v => !!v || 'Nome é obrigatório'
    ],
    faceRules: [
      v => !!v || 'Facebook é obrigatório'
    ],
    instaRules: [
      v => !!v || 'Instagram é obrigatório'
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

      const ref = this.$firebase.database().ref('colaboradores')
      const id = ref.push().key

      const snapshot = await this.$firebase.storage()
        .ref('colaboradores')
        .child(this.fileName)
        .put(this.form.file)

      url = await snapshot.ref.getDownloadURL()

      const valores = {
        id,
        nome: this.form.nome,
        url_facebook: this.form.facebook,
        url_instagram: this.form.instagram,
        url_logo: url
      }

      ref.child(id).set(valores, err => {
        if (err) {
          console.log(err)
        } else {
          this.form.nome = ''
          this.form.facebook = ''
          this.form.instagram = ''
          this.form.file = ''
          this.dialog = false
        }
      })
    },
    getData () {
      const ref = this.$firebase.database().ref('colaboradores')

      ref.on('value', data => {
        const values = data.val()

        this.colaboradores = Object.keys(values).map(i => values[i])
      })
    },
    removeItem (key) {
      if (this.colaboradores.length === 1) {
        this.colaboradores = []
      }

      const ref = this.$firebase.database().ref('colaboradores')

      ref.child(key).remove()
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
.background-modal {
  background: rgba(0, 0, 0, .5);
  width: 100%;
  height: 100vh;
  z-index: 1000;
  position: absolute;
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
