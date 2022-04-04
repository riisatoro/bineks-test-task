import App from './App.vue'
import piniaPersist from 'pinia-plugin-persist'

import { createApp } from 'vue'
import { createPinia } from 'pinia';

const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App)

app.use(pinia);
app.mount('#app');
