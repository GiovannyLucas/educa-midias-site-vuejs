<template>
    <div class="container">
    <h1>Sobre nós</h1>
    <form>
  <div class="form-group">
    <legend>Descrição</legend>
    <hr>
    <textarea v-model="form.descricao" class="form-control" rows="3"></textarea>
  </div>
  <div class="form-group">
    <legend>Imagem</legend>
    <hr>
    <input type="file" class="form-control">
  </div>
  <div class="form-group">
    <v-btn color="green darken-1" text @click.prevent="submit()">
      <span style="color: white;"> <i class="fa fa-plus"></i> &nbsp; Adicionar</span>
    </v-btn>
    <span> {{ msg }} </span>
  </div>
</form>
    </div>
</template>

<script>
export default {

  data: () => ({
    form: {
      descricao: '',
      image: 'puxa do storage'
    },
    msg: ''
  }),
  methods: {
    submit () {
      const ref = this.$firebase.database().ref('sobre_nos')
      const id = ref.push().key

      const valores = {
        id,
        o_que_e: this.form.descricao,
        img_dos_membros: this.form.image
      }

      ref.child(id).set(valores, err => {
        if (err) {
          console.log(err)
        } else {
          this.msg = 'Cadastrado!!'
          this.form.descricao = ''
          this.form.image = ''
        }
      })
    }
  }
}
</script>

<style scoped>
  .cont {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
