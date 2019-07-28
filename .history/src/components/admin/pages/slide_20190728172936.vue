<template>
  <div>
    <h1>Slide</h1>
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

  </div>
</template>

<script>
export default {
  name: 'slideAdmContent',
  data: () => {
    return {
      pickerInicio: '',
      pickerFim: '',
      dialog: false
    }
  }
}
</script>

<style>

</style>
