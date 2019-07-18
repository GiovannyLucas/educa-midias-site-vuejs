import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Galeria from '@/components/Galeria'
import Noticias from '@/components/Noticias'
import SobreNos from '@/components/Sobre_nos'
import FaleConosco from '@/components/Fale_conosco'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/galeria',
      name: 'Galeria',
      component: Galeria
    },
    {
      path: '/noticias',
      name: 'Noticias',
      component: Noticias
    },
    {
      path: '/sobre',
      name: 'SobreNos',
      component: SobreNos
    },
    {
      path: '/fale_conosco',
      name: 'FaleConosco',
      component: FaleConosco
    }
  ]
})
