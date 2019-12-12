// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VModal from 'vue-js-modal'
import VueClip from 'vue-clip'

import App from './App'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueClip)
Vue.use(BootstrapVue)
Vue.use(VModal);
Vue.use(require('vue-moment'));

Vue.prototype.$EventBus = new Vue();
axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth');
// axios.defaults.timeout = 10000;
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
