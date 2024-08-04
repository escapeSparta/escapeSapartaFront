
import {router} from './router';
import { createApp } from 'vue';
import App from './App.vue';
import store from "@/store/index.js";
// import router from '@/router/router.js'


createApp(App).use(router).use(store).mount('#app'); // App.vue 컴포넌트가 index.html에서 id값이 app인 요소에 마운트됨

