import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'

import PrimeVue from 'primevue/config';

import Button from "primevue/button"
import InputText from 'primevue/inputtext'
import Carousel from 'primevue/carousel';
import Menubar from 'primevue/menubar';
import Tag from 'primevue/tag';

import 'primevue/resources/themes/saga-blue/theme.css';  // or another theme
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css'

const app = createApp(App).use(store)
app.use(PrimeVue);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Carousel', Carousel);
app.component('MenuBar', Menubar)
app.component('Tag', Tag)
app.use(router)

app.mount('#app')
