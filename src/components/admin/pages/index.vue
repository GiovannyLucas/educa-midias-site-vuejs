<template>
    <div id="menu">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      left
      app
    >
    <div class="btn-close">
      <v-list dense>
        <v-list-tile @click.stop="drawer = !drawer">
          <v-list-tile-action>
            <v-icon>close</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Fechar
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
    </v-navigation-drawer>
    <v-toolbar dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <div xs12 class="content">
      <v-content>
        <router-view />
      </v-content>
    </div>
  </div>
</template>

<script>
export default {
  name: 'adminHome',
  data () {
    return {
      items_menu: [
        {title: 'Home', route: '/home', icon: 'home'},
        {title: 'Galeria', route: '/galeria', icon: 'collections'},
        {title: 'Notícias', route: '/noticias', icon: 'description'},
        {title: 'Sobre nós', route: '/sobre', icon: 'group'},
        {title: 'Fale Conosco', route: '/fale_conosco', icon: 'contact_support'}
      ],
      drawer: false
    }
  },
  props: {
    source: String
  },
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null

      if (!window.uid) {
        this.$router.push({ name: 'loginAdmin' })
      }
    })
  }
}
</script>

<style scoped>
#menu {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#menu-bar {
  background: linear-gradient(to right, #240f6a, #f298e2);
}
#footer {
  background: linear-gradient(to right, #240f6a, #f298e2);
}
#title-project {
  font-family: 'Acme', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
#link-text {
  text-decoration: none;
  color: #000;
}
.btn-close {
  justify-content: space-between;
}
.logo-educa {
  width: 70px;
}
.content {
  margin-top: -60px;
}
</style>
