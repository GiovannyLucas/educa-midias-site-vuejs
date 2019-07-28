<template>
    <div id="menu">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      left
      app
    >
    <div class="bg">
      <div>
        <v-list dense>
          <img src="../../../assets/logo-educa.png" width="200" alt="">
        </v-list>
        <v-list dense>
          <v-list-tile v-for="(item,k) in items_menu" :key="k">
            <v-list-tile-action>
              <v-icon class="color-light">{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <router-link class="color-light" id="link-text" :to="item.route">
                  {{item.title}}
              </router-link>
            </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click.stop="drawer = !drawer">
            <v-list-tile-action>
              <v-icon class="color-light">close</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="color-light">
                Fechar
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
      <div>
        <v-list-tile @click.stop="logout()" style="justify-content: center">
            <v-list-tile-title class="color-light">
              Sair
              <i class="fa fa-power-off"></i>
            </v-list-tile-title>
        </v-list-tile>
      </div>
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
        {title: 'Home', route: '/homeAdm', icon: 'home'},
        {title: 'Colaboradores', route: '/colaboradoresAdm', icon: 'group'},
        {title: 'Galeria', route: '/galeriaAdm', icon: 'perm_media'},
        {title: 'Mensagens', route: '/msgAdm', icon: 'announcement'},
        {title: 'Notícias', route: 'noticiasAdm', icon: 'insert_drive_file'},
        {title: 'Slide', route: '/slideAdm', icon: 'slideshow'},
        {title: 'Sobre nós', route: '/sobreAdm', icon: 'supervised_user_circle'}
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
  color: #fff;
}
.color-light {
  color: white;
}
.logo-educa {
  width: 70px;
}
.content {
  margin-top: -60px;
}
.bg {
  background: #000;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
