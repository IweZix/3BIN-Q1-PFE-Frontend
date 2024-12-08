import '@/assets/css/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import './assets/css/main.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);
app.use(router);
app.mount('#app');

app.config.errorHandler = (err: unknown, vm: any, info: string): void => {
    console.warn('Erreur capturée globalement'); // Pas de log détaillé dans la console
  };
