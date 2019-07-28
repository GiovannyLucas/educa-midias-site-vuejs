<template>
  <div>
    <h1>Galeria</h1>
    <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Data Início</th>
        <th scope="col">Data Fim</th>
        <th scope="col">Título</th>
        <th scope="col">Url imagem</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>@twitter</td>
        <td>@twitter</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        <td>@twitter</td>
        <td>@twitter</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
        <td>@twitter</td>
        <td>teste</td>
      </tr>
    </tbody>
  </table>

  <v-layout justify-center>
    <v-dialog v-model="dialog" fullscreen="true" persistent max-width="600px">
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
          <span class="headline">Adicionar imagem</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="form.titulo" label="Título*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <textarea v-model="form.descricao" required placeholder="Descrição...*" style="width: 100%"></textarea>
              </v-flex>
              <v-flex xs12>
                <input type="file" style="width: 100%"/>
              </v-flex>
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
  data: () => {
    return {
      dialog: false,
      form: {
        titulo: '',
        descricao: ''
      }
    }
  },
  methods: {
    submit() {
      const ref = this.$firebase.database().ref('galeria');
      const id = ref.push().key;

      const data = new Date()
      let dia = data.getDate();
      let mes = data.getMonth();
      let ano = data.getFullYear();

      const fullDate = dia+'/'+mes+'/'+ano

      const valores = {
        id,
        data_postagem: fullDate,
        descricao: this.form.descricao,
        titulo: this.form.titulo,
        url_img: 'puxa do storage'
      }

      ref.child(id).set(valores, err => {
        if (err) {
          console.log(err);
        } else {
          this.dialog = false;
        }
      })
    }
  }
}
</script>

<style scoped>
  th {
    text-transform: uppercase;
  }
</style>
