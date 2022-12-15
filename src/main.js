/* ============
 * Main File
 * ============
 *
 * Will initialize the application
 */

import { createApp } from 'vue';
import App from './App';
import router from './router';
import './registerServiceWorker';

const app = createApp({
  components: { App },
  template: '<App />',
});

app.use(router);

app.mount('#app');
