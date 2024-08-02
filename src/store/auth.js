
const state = {
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null
};

const mutations = {
    SET_LOGIN_STATE(state, payload) {
        console.log(payload);
        state.isLoggedIn = payload.isLoggedIn;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
    },
    LOGOUT(state) {
        state.isLoggedIn = false;
        state.accessToken = null;
        state.refreshToken = null;
    },
};

const actions = {
    async login({ commit, dispatch }, { email, password }) {
        try {
            const response = await dispatch('axios/axiosCoreRequest', {
                method: 'post',
                url: '/users/login',
                data: { email, password },
            }, { root: true });

            const accessToken = response.headers['authorization'];
            const refreshToken = response.headers['refreshtoken'];

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            commit('SET_LOGIN_STATE', {
                isLoggedIn: true,
                accessToken,
                refreshToken
            });
        } catch (error) {
            console.error('Error logging in:', error);
            throw new Error('Failed to log in. Please try again.');
        }
    },
    logout({ commit }) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        commit('LOGOUT');
        alert("로그인 화면으로 이동합니다.")
    },
};

const getters = {
    isLoggedIn: state => state.isLoggedIn,
    accessToken: state => state.accessToken
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};