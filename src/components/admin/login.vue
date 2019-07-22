<template>
  <div class="form-login">
    <div class="div-logo">
      <img src="../../assets/logo-educa.png" alt="">
      <h2>Área administrativa</h2>
    </div>
    <div class="content-login">
      <form>
        <v-text-field
          color="white"
          v-model="name"
          :counter="100"
          :rules="nameRules"
          label="Nome"
          required
          class="font-btn"
        ></v-text-field>

        <v-text-field
          color="white"
          v-model="pass"
          :rules="passRules"
          label="Senha"
          type="password"
          required
          class="font-btn"
        ></v-text-field>

        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Você é realmente um administrador?"
          color="white"
          required
        ></v-checkbox>

        <v-btn
          class="font-btn"
          :disabled="!valid"
          color="green"
          @click="validate()"
          right
        >
          Entrar
        </v-btn>
      </form>
    </div>

    <v-layout row justify-center v-if="dialog">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Aviso!</v-card-title>
        <v-card-text>{{msg_alert}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="dialog = false">Fechar</v-btn>
          <v-btn color="green darken-1" flat @click="dialog = false">Certo</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Nome do ADM é obrigatório',
      v => (v && v.length <= 50) || 'Nome pode ter até 50 caracteres'
    ],
    pass: '',
    passRules: [
      v => !!v || 'Senha é obrigatória'
    ],
    checkbox: false,
    dialog: false,
    msg_alert: ''
  }),
  methods: {
    validate () {
      if (this.name === '' || this.pass === '' || !this.checkbox) {
        this.msg_alert = 'Preenha todos os campos e marque a opção!'
        this.dialog = true
      } else if (this.name === '' && this.pass === '' && !this.checkbox) {
        this.msg_alert = 'Preenha todos os campos!'
        this.dialog = true
      } else {
        console.log('Verificação OK')
      }
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.form-login {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to right, #240f6a, #f298e2);
}
.content-login {
  width: 40%;
  height: 100vh;
  align-items: center;
}
.font-btn {
  color: white;
}
.div-logo img {
  width: 200px;
}
</style>
