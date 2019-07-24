import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/Menu'
import Home from '@/components/Home'
import Galeria from '@/components/Galeria'
import Noticias from '@/components/Noticias'
import SobreNos from '@/components/Sobre_nos'
import FaleConosco from '@/components/Fale_conosco'

// Admin
import Login from '@/components/admin/login'
import Admin from '@/components/admin/pages/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
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
      path: '/login',
      name: 'loginAdmin',
      component: Login
    },
    {
      path: '/admin',
      name: 'adminHome',
      component: Admin
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!window.uid && to.name === 'adminHome') {
    next({ name: 'loginAdmin' })
  } else {
    next()
  }
})

export default router
