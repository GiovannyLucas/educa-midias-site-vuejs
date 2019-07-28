import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/Menu'
import Home from '@/components/Home'
import Galeria from '@/components/Galeria'
import Noticias from '@/components/Noticias'
import SobreNos from '@/components/Sobre_nos'
import FaleConosco from '@/components/Fale_conosco'

// Admin
import Login from '@/components/admin/login/login'
import Admin from '@/components/admin/pages/index'
import HomeAdmin from '@/components/admin/pages/home_adm'
import colaboradoresAdm from '@/components/admin/pages/colaboradores'
import galeriaAdm from '@/components/admin/pages/galeria'
import noticiasAdm from '@/components/admin/pages/noticias'
import slideAdm from '@/components/admin/pages/slide'
import sobreAdm from '@/components/admin/pages/sobre_us'
import msgAdm from '@/components/admin/pages/mensagens'

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
      component: Admin,
      children: [
        {path: '/', name: 'homeAdmContent', component: HomeAdmin},
        {path: '/homeAdm', name: 'homeAdmContent', component: HomeAdmin},
        {path: '/colaboradoresAdm', name: 'colaboradoresAdmContent', component: colaboradoresAdm},
        {path: '/galeriaAdm', name: 'galeriaAdmContent', component: galeriaAdm},
        {path: '/sobreAdm', name: 'sobreUsAdmContent', component: sobreAdm},
        {path: '/slideAdm', name: 'slideAdmContent', component: slideAdm},
        {path: '/noticiasAdm', name: 'noticiasAdmContent', component: noticiasAdm},
        {path: '/msgAdm', name: 'mensagensAdmContent', component: msgAdm}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!window.uid && to.name === 'adminHome') {
    next({ name: 'loginAdmin' })
  } else if (window.uid && to.name === 'loginAdmin') {
    next({ name: 'adminHome' })
  } else {
    next()
  }
})

export default router
