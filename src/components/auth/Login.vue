<template>
  <div id="app">
    <div class="container">
      <h1>EscapeSparta Login</h1>
      <input type="email" v-model="email" placeholder="Enter your email" required />
      <input type="password" v-model="password" placeholder="Enter your password" required />
      <button type="button" @click="loginUser">Login</button>
<!--      <p>Or login with:</p>-->
<!--      <div class="social-buttons">-->
<!--        <button @click="socialLogin('Google')">Google</button>-->
<!--        <button @click="socialLogin('Kakao')">Kakao</button>-->
<!--        <button @click="socialLogin('Naver')">Naver</button>-->
<!--      </div>-->
      <router-link to="/" class="back-link">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('auth', ['login']),
    async loginUser() {
      try {
        await this.login({
          email: this.email,
          password: this.password,
        });
        alert('Escape Sparta에 오신 것을 환영합니다!');
        this.$router.push({name: 'Home'});
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Failed to log in. Please try again.');
      }
    },
    socialLogin(platform) {
      console.log(`Login with ${platform}`);
      window.location.href = `https://escapesparta.net/oauth2/authorization/${platform}`;
    },
  },
};
</script>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
}

.container {
  background-color: #000000;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #00ff00;
  width: 300px;
  text-align: center; /* Center align text and buttons */
}

h1 {
  color: #00ff00;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  text-shadow: 0 0 5px #00ff00,
  0 0 10px #00ff00;
}

input,
button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid #00ff00;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #000000;
  color: #808080;
}

input::placeholder {
  color: #808080;
}

button {
  background-color: #00ff00;
  color: #000000;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #00cc00;
}

p {
  color: #808080;
  margin-top: 20px;
  margin-bottom: 10px;
}

.social-buttons {
  display: flex;
  justify-content: space-between;
}

.social-buttons button {
  width: 30%;
  background-color: #00ff00;
  color: #000000;
}

.back-link {
  display: block;
  margin-top: 20px;
  color: #00ff00;
  text-decoration: none;
}
</style>