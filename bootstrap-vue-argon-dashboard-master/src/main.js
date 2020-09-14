import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import router from './routes/router';

require('@/store/subscriber')

Vue.config.productionTip = false

// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/';
// router setup
// plugin setup
Vue.use(DashboardPlugin);

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    el: '#app',
    store,
    render: h => h(App),
    router
  });
})
/* eslint-disable no-new */

