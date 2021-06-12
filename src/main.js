import Vue from 'vue'
import App from './App.vue'

import Buefy from 'buefy'
import './buefy.scss'
import VueMasonry from 'vue-masonry-css'
import Vuex from 'vuex'
import store from './store'

Vue.use(Vuex)
Vue.use(VueMasonry);
Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
