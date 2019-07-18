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
      v-model="name"
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
          v-model="mensage"
          name="input-7-1"
          label="Digite a mensagem aqui"
          value=""
          :rules="textRules"
          required
        ></v-textarea>

    <v-btn
      :disabled="!valid"
      color="success"
      @click="validate"
    >
      Enviar
    </v-btn>

    <v-btn
      color="error"
      @click="reset"
    >
      Resetar formulário
    </v-btn>

    <v-btn
      color="warning"
      @click="resetValidation"
    >
      Resetar validação
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
      name: '',
      nameRules: [
        v => !!v || 'Name é necessário',
        v => (v && v.length <= 50) || 'O nome tem que ter 50 caracteres no máximo'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail é necessário',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      mensage: '',
      textRules: [
        v => !!v || 'Mensagem é necessária',
      ],
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
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
