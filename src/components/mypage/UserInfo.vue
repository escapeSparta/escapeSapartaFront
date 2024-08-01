<template>
  <div class="user-info">
    <h1>프로필 조회</h1>
    <div class="user-avatar">
      <img src="https://b13-escape-sparta.s3.ap-northeast-2.amazonaws.com/default/default_image.png" alt="프로필 사진" class="avatar">
    </div>
    <div class="user-details">
      <div class="user-info-header">
        <h2>{{ userInfo.이름 }}</h2>
      </div>
      <div class="user-info-items">
        <div class="user-info-item" v-for="(value, key) in userInfo" :key="key">
          <span>{{ key }}</span>
          <span>{{ value }}</span>
        </div>
      </div>
      <div class="user-info-actions">
        <button class="button edit-profile-btn" @click="editProfile">
          프로필 수정
        </button>
        <button class="button change-password-btn" @click="changePassword">
          비밀번호 수정
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8082';

export default {
  name: 'UserInfo',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      points: ''
    }
  },
  computed: {
    userInfo() {
      return {
        이름: "이서연",
        이메일: "0817frog@gmail.com",
        전화번호: "0817frog@gmail.com",
        가입일: "0817frog@gmail.com",
        // 탈출횟수: this.user.escapeCount,
        포인트: "0817frog@gmail.com"
        // 이름: this.user.name,
        // 이메일: this.user.email,
        // 전화번호: this.user.phone,
        // 가입일: this.user.joinDate,
        // // 탈출횟수: this.user.escapeCount,
        // 포인트: this.user.point
      }
    }
  },
  // created() {
  //   this.fetchUserProfile();
  // },
  // methods: {
  //   async fetchUserProfile() {
  //     try {
  //       const response = await axios.get('/profile');
  //       const userData = response.data.data;
  //       this.user = {
  //         name: userData.name,
  //         email: userData.email,
  //         points: userData.points
  //       };
  //     } catch (error) {
  //       console.error('Error fetching user profile:', error);
  //     }
  //   }
  // }
}
</script>

<style>
.user-info {
  margin: 20px 0;
}
.user-avatar {
  margin: 3rem;
  width: 50%;
}
.user-avatar .avatar {
  width: 15rem; /* 원하는 크기로 조정 */
  height: 15rem; /* 원하는 크기로 조정 */
  border-radius: 50%; /* 동그랗게 만들기 */
  object-fit: cover; /* 이미지가 영역에 맞게 조정되도록 */
}
.user-details {
  width: 50%;
}
.user-info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.button {
  background-color: #0f0;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 4px;
}

.edit-profile-btn {
  background-color: #0f0; /* 프로필 수정 버튼 색상 */
}

.edit-profile-btn:hover {
  background-color: #005f73;
}

.change-password-btn {
  background-color: #f44336; /* 비밀번호 수정 버튼 색상 */
}

.change-password-btn:hover {
  background-color: #c62828;
}
</style>