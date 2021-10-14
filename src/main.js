import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import store from './store';

import "tailwindcss/tailwind.css"

Vue.config.productionTip = false

new Vue({
  store,
  axios,
  render: h => h(App),
}).$mount('#app')
