// import './assets/main.css'
// import Vue from 'vue'
import {router} from './router';
import { createApp } from 'vue';
import App from './App.vue';
// import router from '@/router/router.js'


createApp(App).use(router).mount('#app'); // App.vue 컴포넌트가 index.html에서 id값이 app인 요소에 마운트됨

