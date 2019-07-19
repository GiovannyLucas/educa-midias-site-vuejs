import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Galeria from '@/components/Galeria'
import Noticias from '@/components/Noticias'
import SobreNos from '@/components/Sobre_nos'
import FaleConosco from '@/components/Fale_conosco'

// Sub sobre nós
import Colaboradores from '@/components/sub_sobre/colaboradores'
import Localizacao from '@/components/sub_sobre/localizacao'
import QuemSomos from '@/components/sub_sobre/quem_somos'
import Timeline from '@/components/sub_sobre/timeline'

// Admin
import Admin from '@/components/admin/admin'

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
    },
    {
      path: '/sobre/colaboradores',
      name: 'colaboradores',
      component: Colaboradores
    },
    {
      path: '/sobre/localizacao',
      name: 'localização',
      component: Localizacao
    },
    {
      path: '/sobre/quem_somos',
      name: 'Quem somos',
      component: QuemSomos
    },
    {
      path: '/sobre/timeline',
      name: 'Timeline',
      component: Timeline
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
