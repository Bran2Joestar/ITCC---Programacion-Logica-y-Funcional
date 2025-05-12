import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import router from './app/app.routing';

const app = createApp(App); // Crea la aplicación

// Configura plugins
app.use(VueCookies);
app.config.globalProperties.$http = axios; // Usa axios como propiedad global

app.use(router); // Usa el router
app.mount('#app'); // Monta la aplicación