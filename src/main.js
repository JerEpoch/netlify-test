// import Vue from 'vue'
// import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')


// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'
import AnimatedVue from 'animated-vue'
import 'animate.css/animate.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import * as VeeValidate from 'vee-validate';
// import moment from 'moment'
import './utils/fa.config'
import './utils/filters'
// import Vuelidate from 'vuelidate'
//import VueResource from 'vue-resource'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(AnimatedVue)
Vue.use(require('vue-moment'))
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: 'veeFields'
})
// Vue.use(Vuelidate)
Vue.component('v-icon', Icon)

//font awesome stuff
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import { faJs, faVuejs } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// library.add(faCoffee, faJs, faVuejs)

Vue.component('font-awesome-icon', FontAwesomeIcon)
//end

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//Vue.use(axios)

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})