<template>
  <div class="container">
    <h1>EscapeSparta</h1>
    <input type="text" v-model="name" placeholder="Enter your name" required>
    <input type="email" v-model="email" placeholder="Enter your email" required>
    <input type="password" v-model="password" placeholder="Create a password" required>
    <input type="text" v-model="certificateCode" placeholder="Enter certificate code" required>
    <input type="text" v-model="adminKey" placeholder="Enter admin key (if applicable)">
    <button type="button" @click="createAccount">Create Account</button>
    <p>Or sign up with:</p>
    <div class="social-buttons">
      <button @click="socialSignUp('Google')">Google</button>
      <button @click="socialSignUp('Kakao')">Kakao</button>
      <button @click="socialSignUp('Naver')">Naver</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      certificateCode: '',
      adminKey: ''
    };
  },
  methods: {
    async createAccount() {
      try {
        const response = await axios.post('/users/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
          certificateCode: this.certificateCode,
          adminKey: this.adminKey
        });
        console.log('Account creation response:', response);
        alert('Account created successfully.');
      } catch (error) {
        console.error('Error creating account:', error);
        alert('Failed to create account. Please try again.');
      }
    },
    socialSignUp(platform) {
      console.log(`Sign up with ${platform}`);
      // 각 소셜 플랫폼에 맞는 회원가입 로직을 추가하세요.
    }
  }
};
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
  text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00;
}

input, button {
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
</style>