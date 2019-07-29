<template>
    <div>
    <h1>Colaboradores</h1>
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
        <th scope="row"> {{ valores.id }} </th>
        <td> {{valores.nome}} </td>
        <td> {{ valores.url_facebook }} </td>
        <td> {{ valores.url_instagram }} </td>
        <td> {{ valores.url_logo }} </td>
        <td>
          <a href=""><i style="color: #1E90FF" class="fa fa-refresh"></i></a> |
          <a href=""><i style="color: green" class="fa fa-eye"></i></a> |
          <a href=""><i style="color: red" class="fa fa-trash"></i></a>
        </td>
      </tr>
    </tbody>
  </table>
  <span
    style="font-size: 13pt; color: grey"
    v-if="!colaboradores.length"
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
                <v-text-field v-model="form.nome" label="Nome*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="form.facebook" label="Facebook*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="form.instagram" label="Instagram*" required></v-text-field>
              </v-flex>
              <!--
              <v-flex xs12>
                <legend>Logo</legend>
                <input class="form-control" type="file" name="logo">
              </v-flex>
              -->
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
  form: {
    nome: '',
    facebook: '',
    instagram: '',
    image: 'puxa do storage'
  },
  colaboradores: []
}),

methods: {
  submit() {
    const ref = this.$firebase.database().ref('colaboradores');
    const id = ref.push().key;

    const valores = {
      id,
      nome: this.form.nome,
      url_facebook: this.form.facebook,
      url_instagram: this.form.instagram,
      url_logo: this.form.image
    }

    ref.child(id).set(valores, err => {
      if (err) {
        console.log(err);
      } else {
        this.dialog = false;
      }
    })
  },

  getData () {
    const ref = this.$firebase.database().ref('colaboradores')

    ref.on('value', data => {
      const values = data.val()

      this.colaboradores = Object.keys(values).map(i => values[i])
    })
  }
},
mounted () {
  this.getData()
}
}
</script>

<style>
.background-modal {
  background: rgba(0, 0, 0, .5);
  width: 100%;
  height: 100vh;
  z-index: 1000;
  position: absolute;
}
</style>
