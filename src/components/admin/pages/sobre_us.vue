<template>
  <div xs12>
    <v-tabs
      v-model="active"
      color="white"
      slider-color="black"
    >
    <v-tab
      ripple
    >
      Ver sobre
    </v-tab>
    <v-tab-item>
    <v-card flat>
      <v-container class="sub-content">
        <VerDados />
      </v-container>
    </v-card>
    </v-tab-item>
    <!--TAB Colaboradores-->
      <v-tab
        ripple
      >
        Alterar sobre
      </v-tab>
      <v-tab-item>
      <v-card flat>
        <v-container class="sub-content">
          <AlterarDados />
        </v-container>
      </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import AlterarDados from './sub_sobre/alterar_dados'
import VerDados from './sub_sobre/ver_dados'

export default {
  components: {
    AlterarDados,
    VerDados
  },
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
