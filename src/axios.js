import axios from 'axios';

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

axiosCore.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = `${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axiosCore.interceptors.response.use(response => {
    return response;
}, async error => {
    const originalRequest = error.config;
    if (error.response.data.statusCode === 401) {
        originalRequest._retry = true;

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
    }
    return Promise.reject(error);
});

axiosConsumer.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = `${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axiosConsumer.interceptors.response.use(response => {
    return response;
}, async error => {
    const originalRequest = error.config;
    if (error.response.data.statusCode === 401) {
        originalRequest._retry = true;
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
    }
    return Promise.reject(error);
});

axiosReservation.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = `${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axiosReservation.interceptors.response.use(response => {
    return response;
}, async error => {
    const originalRequest = error.config;
    if (error.response.data.statusCode === 401) {
        originalRequest._retry = true;
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
    }
    return Promise.reject(error);
});
export {axiosCore, axiosAdmin, axiosConsumer, axiosManager, axiosReservation};
