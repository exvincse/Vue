// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import VeeValidate from 'vee-validate'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import zhTW from 'vee-validate/dist/locale/zh_TW'

import App from './App'
import router from './router'
import './bus'
import './cart'
import curr from './filters/filter'
import date from './filters/DateFilter'

Vue.use(VueAxios, axios)
Vue.use(VeeValidate, {
  events: 'blur'
})
VeeValidate.Validator.localize('zh_TW', zhTW)

Vue.config.productionTip = false
axios.defaults.withCredentials = true

Vue.component('Loading', Loading)
Vue.filter('currency', curr)
Vue.filter('DateFilter', date)
/* eslint-disable no-new */

router.afterEach(() => {
  window.scrollTo(0, 0)
})
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router: router
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`
    axios.post(api, this.user).then((response) => {
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
