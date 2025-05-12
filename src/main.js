import { createApp } from 'vue'
import App from './App.vue'
import Vue from 'vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import router from './app.routing';

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
Vue.use(VueCookies);
Vue.prototype.$http = axios;
createApp(App).mount('#app')
//  wasas
