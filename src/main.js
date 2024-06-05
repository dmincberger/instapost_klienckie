import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'

import PrimeVue from 'primevue/config';

import Button from "primevue/button"
import InputText from 'primevue/inputtext'

import 'primevue/resources/themes/saga-blue/theme.css';  // or another theme
import 'primevue/resources/primevue.min.css';

const app = createApp(App).use(store)
app.use(PrimeVue); 
app.component('Button', Button);
app.component('InputText', InputText);
app.use(router)

app.mount('#app')
