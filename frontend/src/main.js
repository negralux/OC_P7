import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "bootswatch/dist/journal/bootstrap.min.css"; //bootstrat theme from bootswatch


import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
