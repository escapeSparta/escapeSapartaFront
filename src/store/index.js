import {createStore} from "vuex";
import axiosModule from './axios';
import authModule from './auth'; // 로그인 상태를 관리하는 모듈

const store = createStore({
    modules: {
        axios: axiosModule,
        auth: authModule,
    },
});

export default store;
