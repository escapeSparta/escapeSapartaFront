<template>
  <header>
    <nav>
      <div class="logo">EscapeSparta</div>
      <div>
        <router-link to="/" class="nav-link">홈</router-link>
        <router-link to="/search-store" class="nav-link">검색</router-link>
        <router-link to="/reviews" class="nav-link">리뷰게시판</router-link>
        <router-link to="/profile" class="nav-link" v-if="accessToken && isLoggedIn">프로필</router-link>
        <router-link to="/signup" class="nav-link" v-if="!accessToken && !isLoggedIn">회원가입</router-link>
        <router-link to="/login" class="nav-link" v-if="!accessToken && !isLoggedIn">로그인</router-link>
        <button @click="handleLogout" class="nav-link logout-button" v-if="accessToken && isLoggedIn">로그아웃</button>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'accessToken']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async handleLogout() {
      try {
        await this.logout();  // Vuex의 logout 액션 호출
        this.$router.push('/login');  // 로그인 화면으로 리디렉션
      } catch (error) {
        console.error('Error logging out:', error);
        alert('Failed to log out. Please try again.');
      }
    },
    hasAccessToken() {
      const token = localStorage.getItem('accessToken');
      console.log(!!token);
      return !!token; // token이 null, undefined, 빈 문자열이 아니면 true 반환
    }},
    created() {
    if (this.hasAccessToken()) {
      this.$store.commit('auth/SET_LOGIN_STATE', {
        isLoggedIn: true,
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
      });
    }
  }
};
</script>

<style scoped>
header {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 255, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #0f0;
  text-shadow: 0 0 10px #0f0;
}
.nav-link {
  color: #0f0;
  text-decoration: none;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid #0f0;
  border-radius: 5px;
  transition: all 0.3s ease;
  background-color: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.nav-link:hover {
  background-color: #0f0;
  color: #000;
}

.nav-link:active {
  background-color: #0d0; /* 클릭 시 색상 */
}

.logout-button {
  font-size: 1rem;
}
</style>