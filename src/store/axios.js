// src/store/axios.js
import axios from 'axios';
import store from '@/store';

const coreApiUrl = import.meta.env.VITE_APP_CORE_API_URL || 'http://localhost:8080';
const adminApiUrl = import.meta.env.VITE_APP_ADMIN_API_URL || 'http://localhost:8081';
const managerApiUrl = import.meta.env.VITE_APP_MANAGER_API_URL || 'http://localhost:8082';
const consumerApiUrl = import.meta.env.VITE_APP_CONSUMER_API_URL || 'http://localhost:8083';
const reservationApiUrl = import.meta.env.VITE_APP_RESERVATION_API_URL || 'http://localhost:8084';
const searchApiUrl = import.meta.env.VITE_APP_SEARCH_API_URL || 'http://localhost:8085';


const axiosSearch = axios.create({
    baseURL: searchApiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

const axiosCore = axios.create({
    baseURL: coreApiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosAdmin = axios.create({
    baseURL: adminApiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosManager = axios.create({
    baseURL: managerApiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosReservation = axios.create({
    baseURL: reservationApiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosConsumer = axios.create({
    baseURL: consumerApiUrl,
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

