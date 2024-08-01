<template>
  <div class="container">
    <h1>EscapeSparta Login</h1>
    <input type="email" v-model="email" placeholder="Enter your email" required />
    <input type="password" v-model="password" placeholder="Enter your password" required />
    <button type="button" @click="login">Login</button>
    <p>Or login with:</p>
    <div class="social-buttons">
      <button @click="socialLogin('Google')">Google</button>
      <button @click="socialLogin('Kakao')">Kakao</button>
      <button @click="socialLogin('Naver')">Naver</button>
    </div>
    <router-link to="/" class="back-link">Back to Home</router-link>
  </div>
</template>

<script>
import axios from 'axios'
import {axiosCore} from "@/axios.js";

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    point: undefined,
    createAt: undefined,

    async login() {
      try {
        const response = await axiosCore.post('/users/login', {
          email: this.email,
          password: this.password
        })
        console.log('Login response:', response)
        alert('Logged in successfully.')
        // 여기에 로그인 성공 후 처리 로직을 추가하세요 (예: 토큰 저장, 리다이렉트 등)

        console.log('Response headers:', response.headers);

        const accessToken = response.headers['authorization'];
        const refreshToken = response.headers['refreshtoken'];
        console.log(accessToken);

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        this.moveMain();

      } catch (error) {
        console.error('Error logging in:', error)
        alert('Failed to log in. Please try again.')
      }
    },
    socialLogin(platform) {
      console.log(`Login with ${platform}`)
      window.location.href = `https://escapesparta.net/oauth2/authorization/${platform}`
    },
    moveMain(){
      this.$router.push({name: 'Home'});
    }
  }
}
</script>

<style scoped>
body {
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
}

.container {
  background-color: #000000;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #00ff00;
  width: 300px;
}

h1 {
  color: #00ff00;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  text-shadow:
    0 0 5px #00ff00,
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
  text-align: center;
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
  text-align: center;
  margin-top: 20px;
  color: #00ff00;
  text-decoration: none;
}
</style>
