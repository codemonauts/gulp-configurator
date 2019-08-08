import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VuePrism from 'vue-prism'
import VueClipboard from 'vue-clipboard2'

import 'prismjs/themes/prism.css'

Vue.use(VuePrism)
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
