// src/store/axios.js
import axios from 'axios';
import store from '@/store';

// Environment variables
const domain = 'https://escapesparta.store/api'

export const apiUrls = {
    coreApi: import.meta.env.VITE_APP_CORE_API_URL,
    adminApi: import.meta.env.VITE_APP_ADMIN_API_URL,
    managerApi: import.meta.env.VITE_APP_MANAGER_API_URL,
    consumerApi: import.meta.env.VITE_APP_CONSUMER_API_URL,
    reservationApi: import.meta.env.VITE_APP_RESERVATION_API_URL,
    searchApi: import.meta.env.VITE_APP_SEARCH_API_URL
    // searchApi: "http://localhost:8085/api"
};

const axiosCore = axios.create({
    baseURL: apiUrls.coreApi,
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosCorePermit = axios.create({
    baseURL: apiUrls.coreApi,
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosAdmin = axios.create({
    baseURL: apiUrls.adminApi,
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosManager = axios.create({
    baseURL: apiUrls.managerApi,
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosConsumer = axios.create({
    baseURL: apiUrls.consumerApi,
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosReservation = axios.create({
    baseURL: apiUrls.reservationApi,
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosSearch = axios.create({
    baseURL: apiUrls.searchApi,
    headers: {
        'Content-Type': 'application/json'
    }
})

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

            // 리프레시 토큰이 없는 경우 즉시 로그인 페이지로 리다이렉트
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');

                const response = await axios.post( domain + '/core/auth/reissue', {}, {
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
            return false; // Promise.reject 하지 않고 흐름 종료
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
        async axiosCorePermitRequest(_, config) {
            return axiosCorePermit(config);
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

