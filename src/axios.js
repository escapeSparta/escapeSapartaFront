import axios from 'axios';

const axiosCoreInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});


// axiosCoreInstance.interceptors.request.use(config => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });
//
// axiosCoreInstance.interceptors.response.use(response => {
//     return response;
// }, async error => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         const refreshToken = localStorage.getItem('refreshToken');
//         const response = await axios.post('/users/refresh-token', { token: refreshToken });
//         const { accessToken } = response.data;
//         localStorage.setItem('accessToken', accessToken);
//         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//         return axios(originalRequest);
//     }
//     return Promise.reject(error);
// });

export {axiosCoreInstance};
