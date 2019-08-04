<template>
  <div>
        <legend>Membros do login</legend>
      <hr>
  <div class="form-group cont">
    <div style="overflow: auto; height: 300px" class="col-md-6">
      <table class="table table-hover" style="height: 100px">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">nome</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>
          <a href=""><i style="color: green" class="fa fa-eye"></i></a> |
            <a href=""><i style="color: red" class="fa fa-trash"></i></a>
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>
          <a href=""><i style="color: green" class="fa fa-eye"></i></a> |
            <a href=""><i style="color: red" class="fa fa-trash"></i></a>
          </td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>
          <a href=""><i style="color: green" class="fa fa-eye"></i></a> |
            <a href=""><i style="color: red" class="fa fa-trash"></i></a>
          </td>
        </tr>
        <tr>
          <th scope="row">4</th>
          <td>Larry</td>
          <td>
          <a href=""><i style="color: green" class="fa fa-eye"></i></a> |
            <a href=""><i style="color: red" class="fa fa-trash"></i></a>
          </td>
        </tr>
        <tr>
          <th scope="row">5</th>
          <td>Larry</td>
          <td>
          <a href=""><i style="color: green" class="fa fa-eye"></i></a> |
            <a href=""><i style="color: red" class="fa fa-trash"></i></a>
          </td>
        </tr>
        <tr>
          <th scope="row">6</th>
          <td>Larry</td>
          <td>
          <a href=""><i style="color: green" class="fa fa-eye"></i></a> |
            <a href=""><i style="color: red" class="fa fa-trash"></i></a>
          </td>
        </tr>
        <tr>
          <th scope="row">7</th>
          <td>Larry</td>
          <td>
          <a href=""><i style="color: green" class="fa fa-eye"></i></a> |
            <a href=""><i style="color: red" class="fa fa-trash"></i></a>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <div class="col-md-6">
      <input type="text" class="form-control" placeholder="Nome">
      <br>
      <br>
      <input type="email" class="form-control" placeholder="Email">
      <br>
      <br>
      <input type="password" class="form-control" placeholder="Senha">
      <br>
      <v-btn class="btn btn-success" color="green">
        <span style="color: white">
          <i class="fa fa-plus"></i>
          &nbsp; Adicionar
        </span>
      </v-btn>
    </div>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .cont {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
