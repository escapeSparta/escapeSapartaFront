// import { createStore } from 'vuex';
// import axios from 'axios';
// import { axiosCore } from '@/axios.js';
//
// const store = createStore({
//     state() {
//         return {
//             accessToken: localStorage.getItem('accessToken') || '',
//             refreshToken: localStorage.getItem('refreshToken') || '',
//         };
//     },
//     mutations: {
//         setTokens(state, { accessToken, refreshToken }) {
//             state.accessToken = accessToken;
//             state.refreshToken = refreshToken;
//             localStorage.setItem('accessToken', accessToken);
//             localStorage.setItem('refreshToken', refreshToken);
//         },
//         removeTokens(state) {
//             state.accessToken = '';
//             state.refreshToken = '';
//             localStorage.removeItem('accessToken');
//             localStorage.removeItem('refreshToken');
//         },
//     },
//     actions: {
//         async login({ commit }, credentials) {
//             try {
//                 const response = await axiosCore.post('/users/login', credentials);
//                 const accessToken = response.headers['authorization'];
//                 const refreshToken = response.headers['refreshtoken'];
//
//                 commit('setTokens', { accessToken, refreshToken });
//             } catch (error) {
//                 throw error;
//             }
//         },
//         async logout({ commit }) {
//             try {
//                 await axiosCore.put('/users/logout', {}, {
//                     headers: {
//                         'Authorization': `Bearer ${this.state.accessToken}`,
//                     },
//                 });
//                 commit('removeTokens');
//             } catch (error) {
//                 console.error('Error logging out:', error);
//             }
//         },
//         async refreshToken({ commit }) {
//             try {
//                 const response = await axios.post('http://localhost:8080/auth/reissue', {}, {
//                     headers: {
//                         'Authorization': `Bearer ${this.state.accessToken}`,
//                         'Refreshtoken': this.state.refreshToken,
//                     },
//                 });
//                 const newAccessToken = response.headers['authorization'];
//                 const newRefreshToken = response.headers['refreshtoken'];
//
//                 commit('setTokens', { accessToken: newAccessToken, refreshToken: newRefreshToken });
//             } catch (error) {
//                 throw error;
//             }
//         },
//     },
// });
//
// export default store;