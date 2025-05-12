import { createApp } from 'vue'
import App from './App.vue'
import Vue from 'vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);
Vue.prototype.$http = axios;
createApp(App).mount('#app')
//  wasas
