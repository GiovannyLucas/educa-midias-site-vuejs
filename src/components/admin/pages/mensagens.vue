<template>
    <div>
        <h1>Mensagens</h1>
        <hr>
        <div xs12>
        <v-tabs
        v-model="active"
        color="white"
        slider-color="black"
        >
        <!--TAB Colaboradores-->
        <v-tab
            ripple
        >
            Não Lidas
        </v-tab>
        <v-tab-item>
        <v-card flat>
            <v-container class="sub-content">
               <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Email</th>
        <th scope="col">Mensagem</th>
        <th scope="col">Data - Hora</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody v-for="(valores, k) in mensages" :key="k">
      <tr v-if="valores.lida === false">
        <td> {{ valores.nome }} </td>
        <td> {{ valores.email }} </td>
        <td> {{ valores.mensagem }} </td>
        <td> {{ valores.data_envio }} </td>
        <td>
          <button @click="lerMsg(valores.id, valores.id)"><i style="color: green" class="fa fa-eye"></i></button> |
          <button  @click="removeItem(valores.id)"><i style="color: red" class="fa fa-trash"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
            </v-container>
        </v-card>
        </v-tab-item>
        <!--TAB Localização-->
        <v-tab
            ripple
        >
            Lidas
        </v-tab>
        <v-tab-item>
        <v-card flat>
            <v-container class="sub-content">
            <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Email</th>
        <th scope="col">Mensagem</th>
        <th scope="col">Data - Hora</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody v-for="(valores, k) in mensages" :key="k">
      <tr v-if="valores.lida === true">
        <td> {{ valores.nome }} </td>
        <td> {{ valores.email }} </td>
        <td> {{ valores.mensagem }} </td>
        <td> {{ valores.data_envio }} </td>
        <td>
          <button><i style="color: green" class="fa fa-eye"></i></button> |
          <button @click="removeItem(valores.id)"><i style="color: red" class="fa fa-trash"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
            </v-container>
        </v-card>
        </v-tab-item>
        </v-tabs>
  </div>
  <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Remetente: {{ mensage[5] }}</span>
        </v-card-title>
        <v-card-text>

          <v-container grid-list-md>
            <v-layout wrap>
               <legend> Mensagem </legend>
               <div class="col-md-12">
                   {{ mensage[4] }}
                   <v-spacer></v-spacer>
                   <span> {{ mensage[0] }} </span>
               </div>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">
            <span style="color: white;"> <i class="fa fa-times"></i> &nbsp; Fechar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
    </div>
</template>

<script>
export default {
  data: () => ({
    mensages: [],
    mensage: [],
    dialog: false,
    id_lendo: ''
  }),
  methods: {
    getData () {
      const ref = this.$firebase.database().ref('mensagens')

      ref.on('value', data => {
        const values = data.val()

        this.mensages = Object.keys(values).map(i => values[i])
      })
    },
    getDataUnica () {
      const ref = this.$firebase.database().ref(`mensagens/${this.id_lendo}`)

      ref.on('value', data => {
        const values = data.val()

        this.mensage = Object.keys(values).map(i => values[i])
      })
    },
    lerMsg (key, k) {
      const ref = this.$firebase.database().ref('mensagens')

      this.id_lendo = k
      this.dialog = true
      this.getDataUnica()

      ref.child(key).update({ lida: true })
    },
    removeItem (key) {
      if (this.mensages.length === 1) {
        this.mensages = []
      }

      const ref = this.$firebase.database().ref('mensagens')

      ref.child(key).remove()
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style>

</style>
