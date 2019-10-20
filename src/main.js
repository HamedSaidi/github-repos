import Vue from 'vue'

import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css'

import App from './App.vue'
import store from './store/store'
import router from './routes'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
