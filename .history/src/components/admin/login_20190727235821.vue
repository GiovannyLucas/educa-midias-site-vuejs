<template>
  <div class="form-login">
    <div class="div-logo">
      <img src="../../assets/logo-educa.png" alt="">
      <h2>Área administrativa</h2>
    </div>
    <div class="content-login">
        <form @submit.prevent="doLogin()">
          <v-text-field
            color="white"
            v-model="email"
            :counter="100"
            :rules="emailRules"
            label="E-mail"
            required
            class="font-text-field"
          ></v-text-field>

          <v-text-field
            color="white"
            v-model="pass"
            :rules="passRules"
            label="Senha"
            type="password"
            required
            class="font-text-field"
          ></v-text-field>

          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'Marcação obrigatória!']"
            label="Você é realmente um administrador?"
            color="white"
            required
            class="font-text-field"
          ></v-checkbox>

          <v-btn
            class="font-btn"
            :disabled="loading"
            color="green"
            @click="validate()"
            left
          >
            <template v-if="loading">
              Entrando... &nbsp;
              <i class="fa fa-spinner fa-spin" right></i>
            </template>
            <template v-else>
              Entrar &nbsp;
              <i class="fa fa-sign-in" right></i>
            </template>
          </v-btn>

          <v-btn
            class="font-btn"
            color="orange"
            @click="reset()"
            left
          >
            Limpar
          </v-btn>
        </form>
    </div>
  <div>

  </div>
    <v-layout row justify-center v-if="dialog">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Aviso!</v-card-title>
        <v-card-text>{{msg_alert}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="dialog = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
</template>

<script>
export default {
  name: 'loginAdmin',
  data: () => ({
    valid: true,
    loading: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail do ADM é obrigatório',
      v => (v && v.length <= 100) || 'E-mail pode ter até 100 caracteres'
    ],
    pass: '',
    passRules: [
      v => !!v || 'Senha é obrigatória'
    ],
    checkbox: false,
    dialog: false,
    msg_alert: '',
    erro: false,
    msg_erro: ''
  }),
  methods: {
    async validate () {
      if (this.name === '' || this.pass === '' || !this.checkbox) {
        this.msg_alert = 'Preenha todos os campos e marque a opção!'
        this.dialog = true
      } else {
        const {email, pass} = this
        try {
          this.loading = true
          const res = await this.$firebase.auth().signInWithEmailAndPassword(email, pass)

          window.uid = res.user.uid
          this.$router.push({ name: 'adminHome' })
        } catch (err) {
          this.msg_alert = err.code
          this.dialog = true
        }
        this.loading = false
      }
    },
    reset () {
      console.log(window.uid)
    }
  },
  mounted () {
    setTimeout(() => {
      console.log(window.uid + ' hash user')
    }, 500)
  }
}
</script>

<style scoped>
h2 {
  font-family: 'Acme', Helvetica, sans-serif;
}
.form-login {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #240f6a, #f298e2);
}
.content-login {
  margin-top: 20px;
  width: 50%;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
.font-btn {
  color: white;
  font-family: 'Acme', Courier, monospace;
  font-size: 19px;
}
.font-text-field {
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}
.div-logo img {
  width: 200px;
}
</style>
