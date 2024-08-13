<template>
  <div id="app">
    <div class="container">
      <h1>EscapeSparta</h1>
      <div class="input-group">
        <input type="email" v-model="email" placeholder="Enter your email" required>
        <button type="button" class="verify-button" @click="sendVerificationCode">이메일 인증</button>
      </div>
      <input v-if="showVerificationInput" type="text" v-model="certificateCode" placeholder="Enter certificate code" required>
      <input type="password" v-model="password" placeholder="Create a password" required>
      <input type="text" v-model="name" placeholder="Enter your name" required>
      <!--      <input type="text" v-model="adminKey" placeholder="Enter admin key (if applicable)">-->
      <button type="button" class="signup-button" @click="createAccount">회원가입</button>
      <p>Or sign up with:</p>
      <div class="social-buttons">
        <button @click="socialSignUp('Google')">Google</button>
        <button @click="socialSignUp('Kakao')">Kakao</button>
        <button @click="socialSignUp('Naver')">Naver</button>
      </div>
      <router-link to="/" class="back-link">Back to Home</router-link>
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
      adminKey: '',
      showVerificationInput: false
    };
  },
  methods: {
    async sendVerificationCode() {
      try {
        const response = await axios.post('https://escapesparta.store/api/core/users/mail', {
          email: this.email,
          userType: 'USER'
        });
        console.log('Verification code sent:', response);
        this.showVerificationInput = true;
        alert('인증번호가 전송되었습니다.');
      } catch (error) {
        console.error('Error sending verification code:', error);
        alert('인증 번호 전송에 실패했습니다. 다시 시도해주세요.');
      }
    },
    async createAccount() {
      try {
        const response = await axios.post('https://escapesparta.store/api/core/users/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
          certificateCode: this.certificateCode,
          adminKey: this.adminKey
        });
        console.log('Account creation response:', response);
        alert('Account created successfully.');
        this.$router.push("/login");
      } catch (error) {
        let errorMessage = 'Failed to create account. Please try again.'
        if (error.response && error.response.data) {
          errorMessage = error.response.data.message;
        }
        console.error('Error Editing Profile:', error);
        alert(errorMessage);
        console.error('Error creating account:', error);
        alert(errorMessage);
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
}

h1 {
  color: #00ff00;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00;
}

.input-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
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

.verify-button {
  width: 40%;
  margin-left: 0.5rem;
}

p {
  color: #808080;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
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
  text-align: center;
}
</style>