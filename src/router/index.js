import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/Menu'
import Home from '@/components/Home'
import Galeria from '@/components/Galeria'
import Noticias from '@/components/Noticias'
import SobreNos from '@/components/Sobre_nos'
import FaleConosco from '@/components/Fale_conosco'

// Admin
import Admin from '@/components/admin/admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Menu',
      component: Menu,
      children: [
        {path: '/', name: 'homeContent', component: Home},
        {path: '/home', name: 'homeContent', component: Home},
        {path: '/galeria', name: 'galeriaContent', component: Galeria},
        {path: '/noticias', name: 'noticiasContent', component: Noticias},
        {path: '/fale_conosco', name: 'faleConoscoContent', component: FaleConosco},
        {path: '/sobre', name: 'sobreContent', component: SobreNos}
      ]
    },
    {
      path: '/home',
      name: 'Menu',
      component: Menu,
      children: [
        {path: '/home', name: 'homeContent', component: Home},
        {path: '/galeria', name: 'galeriaContent', component: Galeria},
        {path: '/noticias', name: 'noticiasContent', component: Noticias},
        {path: '/fale_conosco', name: 'faleConoscoContent', component: FaleConosco},
        {path: '/sobre', name: 'sobreContent', component: SobreNos}
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
