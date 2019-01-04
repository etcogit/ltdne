import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

// Import the client 'auth' module which allows us to check if there's an authenticated user
import auth from 'src/auth'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    // console.log('to: ' + to + ' | from: ' + from + ' | next: ' + next)
    // console.log(to)
    if (!to.meta.requiresAuth || auth.authenticated()) {
      // All is okay, let the route change continue
      next()
    } else {
      console.log('Not authenticated')
      // Cancel the route change and redirect back to the Home page
      next({ path: '/home' })
    }
  })

  return Router
}
