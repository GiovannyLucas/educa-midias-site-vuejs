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
                <v-badge>
                  <template v-slot:badge style="color: white; backgound: blue">{{ nlidas.length }}</template>
                  <v-icon class="color-light">mail</v-icon>
                </v-badge>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="color-light">
                  <router-link class="color-light" id="link-text" to="/msgAdm">
                    Mensagens
                  </router-link>
                </v-list-tile-title>
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
        <ul v-if="!closing" @click.stop="logout()" style="justify-content: center; list-style: none; cursor: pointer">
            <li class="color-light">
              Sair
              <i class="fa fa-power-off"></i>
            </li>
        </ul>
        <ul v-else style="justify-content: center; list-style: none; cursor: pointer">
            <li class="color-light">
              Saindo...
              <i class="fa fa-power-off fa-spin"></i>
            </li>
        </ul>
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
        {title: 'Notícias', route: 'noticiasAdm', icon: 'insert_drive_file'},
        {title: 'Slide', route: '/slideAdm', icon: 'slideshow'},
        {title: 'Root', route: '/root', icon: 'lock'},
        {title: 'Sobre nós', route: '/sobreAdm', icon: 'supervised_user_circle'}
      ],
      drawer: false,
      closing: false,
      mensages: [],
      nlidas: []
    }
  },
  props: {
    source: String
  },
  methods: {
    async logout () {
      this.closing = true
      await this.$firebase.auth().signOut()
      this.closing = false

      this.$router.push({ name: 'loginAdmin' })
    },
    renderMsg () {
      const ref = this.$firebase.database().ref('mensagens')

      ref.on('value', data => {
        const values = data.val()

        this.mensages = Object.keys(values).map(i => values[i])

        for (let index = 0; index < this.mensages.length; index++) {
          if (!this.mensages[index].lida) {
            this.nlidas.push(this.mensages[index])
          }
        }
      })
    }
  },
  created () {
    this.$root.on('MsgLida::true', () => {
      const ref = this.$firebase.database().ref('mensagens')

      ref.on('value', data => {
        const values = data.val()

        this.mensages = Object.keys(values).map(i => values[i])

        for (let index = 0; index < this.mensages.length; index++) {
          if (!this.mensages[index].lida) {
            this.nlidas.push(this.mensages[index])
          }
        }
      })
    })
  },
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null

      if (!window.uid) {
        this.$router.push({ name: 'loginAdmin' })
      }
    })

    this.renderMsg()
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
