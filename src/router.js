import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/configurator',
      name: 'configurator',
      component: () => import(/* webpackChunkName: "configurator" */ './views/Configurator.vue')
    },
    {
      path: '/snippets',
      name: 'snippets',
      component: () => import(/* webpackChunkName: "snippets" */ './views/Snippets.vue')
    },
    {
      path: '/output',
      name: 'output',
      component: () => import(/* webpackChunkName: "snippets" */ './views/Output.vue')
    }
  ]
})
