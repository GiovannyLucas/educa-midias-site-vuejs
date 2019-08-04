<template>
  <div class="container">
  <h1>Alterar dados sobre nós</h1>
    <v-flex>
      <v-textarea label="Descreva o que é o projeto, o nome dos seus membros" :rules="descricaoRules" v-model="form.descricao">

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
      <img style="width: 40%;" alt="" :src="dados[1]">
    </div>
    <div xs4 class="div-img">
      <img class="preview" alt="" v-if="view">
      <v-icon class="icon-close" v-if="form.file" @click="clearFile()">close</v-icon>
    </div>
    <div xs12 class="form-group">
      <v-btn color="green darken-1" text @click="submit(dados[0])">
        <span style="color: white;"> <i class="fa fa-plus"></i> &nbsp; Adicionar</span>
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    alt_photo: false,
    view: false,
    dados: [],
    form: {
      descricao: '',
      file: ''
    },
    msg: '',
    descricaoRules: [
      v => !!v || 'Descrição é obrigatória'
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
    async submit (key) {
      let url

      const ref = this.$firebase.database().ref('sobre_nos')

      if (this.alt_photo && this.form.descricao !== '') {
        const snapshot = await this.$firebase.storage()
          .ref('sobre_nos')
          .child(this.fileName)
          .put(this.form.file)

        url = await snapshot.ref.getDownloadURL()

        ref.child(key).update({ o_que_e: this.form.descricao, img_dos_membros: url })
      } else if (this.alt_photo && this.form.descricao === '') {
        const snapshot = await this.$firebase.storage()
          .ref('sobre_nos')
          .child(this.fileName)
          .put(this.form.file)

        url = await snapshot.ref.getDownloadURL()
        ref.child(key).update({ img_dos_membros: url })
      } else {
        ref.child(key).update({ o_que_e: this.form.descricao })
      }
    },
    getData () {
      const ref = this.$firebase.database().ref('sobre_nos/-Ll3HIG_7DWI-UPOfOAZ')

      ref.on('value', data => {
        const values = data.val()

        this.dados = Object.keys(values).map(i => values[i])
        console.log(Object.keys(values).map(i => values[i]))
      })
    }
  },
  mounted () {
    this.getData()
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
