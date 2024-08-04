// src/store/axios.js
import axios from 'axios';
import store from '@/store';

const axiosSearch = axios.create({
    baseURL: 'http://localhost:8085',
    headers: {
        'Content-Type': 'application/json'
    }
})

const axiosCore = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosAdmin = axios.create({
    baseURL: 'http://localhost:8081',
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosManager = axios.create({
    baseURL: 'http://localhost:8082',
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosReservation = axios.create({
    baseURL: 'http://localhost:8084',
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosConsumer = axios.create({
    baseURL: 'http://localhost:8083',
    headers: {
        'Content-Type': 'application/json'
    }
});

const setInterceptors = (axiosInstance) => {
    axiosInstance.interceptors.request.use(config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use(response => {
        return response;
    }, async error => {
        const originalRequest = error.config;
        if (error.response && error.response.data.statusCode === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');

                const response = await axios.post('http://localhost:8080/auth/reissue', {}, {
                    headers: {
                        'Authorization': accessToken,
                        'Refreshtoken': refreshToken
                    }
                });

                const newAccessToken = response.headers['authorization'];
                const newRefreshToken = response.headers['refreshtoken'];

                localStorage.setItem('accessToken', newAccessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                originalRequest.headers['Authorization'] = `${newAccessToken}`;
                return axios(originalRequest);
            } catch (e) {
                store.dispatch('auth/logout');
                // 로그인 화면으로 리디렉션
                window.location.href = '/login';
            }
        } else if(error.response && error.response.data.statusCode === 500) {
            store.dispatch('auth/logout');
            // 로그인 화면으로 리디렉션
            window.location.href = '/login';
        }
        return Promise.reject(error);
    });
};

// Set the interceptors for each axios instance
setInterceptors(axiosCore);
setInterceptors(axiosAdmin);
setInterceptors(axiosManager);
setInterceptors(axiosReservation);
setInterceptors(axiosConsumer);

export default {
    namespaced: true,
    actions: {
        async axiosCoreRequest(_, config) {
            return axiosCore(config);
        },
        async axiosAdminRequest(_, config) {
            return axiosAdmin(config);
        },
        async axiosManagerRequest(_, config) {
            return axiosManager(config);
        },
        async axiosReservationRequest(_, config) {
            return axiosReservation(config);
        },
        async axiosConsumerRequest(_, config) {
            return axiosConsumer(config);
        },
        async axiosSearchRequest(_, config) {
            return axiosSearch(config);
        },
    }
}

