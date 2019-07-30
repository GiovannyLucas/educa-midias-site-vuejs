<template>
  <div class="container">
  <h1>Alterar dados sobre nós</h1>
    <v-flex>
      <v-textarea label="Descreva o que é o projeto, o nome dos seus membros" :rules="descricaoRules" v-model="form.descricao"></v-textarea>
    </v-flex>
    <v-flex xs12>
      <input required type="file" @change="handleFile($event)" style="width: 100%"/>
    </v-flex>
    <div xs4 class="div-img">
      <img class="preview" alt="" v-if="view">
      <v-icon class="icon-close" v-if="form.file" @click="clearFile()">close</v-icon>
    </div>
    <div class="form-group">
      <v-btn color="green darken-1" text @click="submit()">
        <span style="color: white;"> <i class="fa fa-plus"></i> &nbsp; Adicionar</span>
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    view: true,
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
    async submit () {
      let url

      const ref = this.$firebase.database().ref('sobre_nos')
      const id = ref.push().key

      const snapshot = await this.$firebase.storage()
        .ref('sobre_nos')
        .child(this.fileName)
        .put(this.form.file)

      url = await snapshot.ref.getDownloadURL()

      const valores = {
        id,
        o_que_e: this.form.descricao,
        img_dos_membros: url
      }

      ref.child(id).set(valores, err => {
        if (err) {
          console.log(err)
        } else {
          this.form.descricao = ''
          this.form.file = ''
        }
      })
    }
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
