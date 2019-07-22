import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import firebaseVue from './firebase'

Vue.use(firebaseVue)
Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
