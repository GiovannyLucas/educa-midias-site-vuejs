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
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td>@mdo</td>
        <td>
          <a href=""><i style="color: #1E90FF" class="fa fa-refresh"></i></a> |
          <a href=""><i style="color: green" class="fa fa-eye"></i></a> |
          <a href=""><i style="color: red" class="fa fa-trash"></i></a>
        </td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        <td>@fat</td>
        <td>
         <a href=""><i style="color: #1E90FF" class="fa fa-refresh"></i></a> |
         <a href=""><i style="color: green" class="fa fa-eye"></i></a> |
          <a href=""><i style="color: red" class="fa fa-trash"></i></a>
        </td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
        <td>@twitter</td>
        <td>
          <a href=""><i style="color: #1E90FF" class="fa fa-refresh"></i></a> |
          <a href=""><i style="color: green" class="fa fa-eye"></i></a> |
          <a href=""><i style="color: red" class="fa fa-trash"></i></a>
        </td>
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
          <span class="headline">Adicionar colaborador</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Nome*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Facebook*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Instagram*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <legend>Logo</legend>
                <input class="form-control" type="file" name="logo">
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
          <v-btn color="green darken-1" text>
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
})
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
