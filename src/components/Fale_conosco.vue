<template>
    <v-container align-center align-content-center>
        <v-layout row wrap>
            <v-flex xs12>
            <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="nome"
      :counter="50"
      :rules="nameRules"
      label="Nome"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

        <v-textarea
          v-model="mensagem"
          name="input-7-1"
          label="Digite a mensagem aqui"
          value=""
          :rules="textRules"
          required
        ></v-textarea>
    <v-btn
      id="btnEnv"
      :disabled="!valid"
      color="success"
      @click="validate"
    >
      Enviar
    </v-btn>

    <v-btn
      id="btnReset"
      color="error"
      @click="reset"
    >
      Resetar formulário
    </v-btn>
  </v-form>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
/* eslint-disable */
    data: () => ({
      valid: true,
      nome: '',
      nameRules: [
        v => !!v || 'Name é necessário',
        v => (v && v.length <= 50) || 'O nome tem que ter 50 caracteres no máximo'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail é necessário',
        v => /.+@.+/.test(v) || 'E-mail precisa ser válido'
      ],
      mensagem: '',
      textRules: [
        v => !!v || 'Mensagem é necessária',
      ]
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
          const ref = this.$firebase.database().ref('mensagens')
          const id = ref.push().key

          const data = new Date()
          let dia = data.getDate()
          let mes = data.getMonth() + 1
          let ano = data.getFullYear()
          let hora = data.getHours()
          let minuto = data.getMinutes()

          const fullDate = `${dia}/${mes}/${ano}-${hora}:${minuto}`
          const msgLida = false

          const valores = {
            id,
            nome: this.nome,
            email: this.email,
            mensagem: this.mensagem,
            data_envio: fullDate,
            lida: msgLida
          }

          ref.child(id).set(valores, err => {
            if (err) {
              console.log(err)
            } else {
              this.$router.push({name: 'homeContent'})
            }
          })
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      }
    }
  }
</script>

<style scoped>
  #btnEnv {
    background-color: green;
  }

  #btnReset {
    background-color: red;
  }

  #btnWarn {
    background-color: orange;
  }
</style>

