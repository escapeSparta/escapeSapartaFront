<template>
  <div class="content">
    <h1>팔로우한 지점</h1>
    <div class="grid">
      <div class="card">
        <img src="https://websim.ai/neon-store-corner.jpg" alt="Neon lit store corner at night" width="100%" height="150">
        <h3>강남점</h3>
        <p>주소: 서울특별시 강남구 테헤란로 123</p>
        <p>전화: 02-1234-5678</p>
        <div class="button-group">
          <button class="button">예약하기</button>
          <button class="button">팔로우 취소</button>
        </div>
      </div>

      <div class="card">
        <img src="https://websim.ai/crowded-city-street-night.jpg" alt="Crowded city street at night with bright neon signs" width="100%" height="150">
        <h3>홍대점</h3>
        <p>주소: 서울특별시 마포구 홍대로 456</p>
        <p>전화: 02-9876-5432</p>
        <div class="button-group">
          <button class="button">예약하기</button>
          <button class="button">상세보기</button>
        </div>
      </div>

      <div class="card">
        <img src="https://websim.ai/busy-night-street-crowd.jpg" alt="Busy night street with large crowd and neon signs" width="100%" height="150">
        <h3>종로점</h3>
        <p>주소: 서울특별시 종로구 인사동길 789</p>
        <p>전화: 02-2468-1357</p>
        <div class="button-group">
          <button class="button">예약하기</button>
          <button class="button">상세보기</button>
        </div>
      </div>

      <div class="card">
        <img src="https://websim.ai/neon-lit-alley.jpg" alt="Neon lit alley with traditional Korean architecture" width="100%" height="150">
        <h3>인사동점</h3>
        <p>주소: 서울특별시 종로구 인사동길 101</p>
        <p>전화: 02-3691-2468</p>
        <div class="button-group">
          <button class="button">예약하기</button>
          <button class="button">상세보기</button>
        </div>
      </div>

      <div class="card">
        <img src="https://websim.ai/modern-cafe-interior.jpg" alt="Modern cafe interior with neon accents" width="100%" height="150">
        <h3>이태원점</h3>
        <p>주소: 서울특별시 용산구 이태원로 202</p>
        <p>전화: 02-7531-9514</p>
        <div class="button-group">
          <button class="button">예약하기</button>
          <button class="button">상세보기</button>
        </div>
      </div>

      <div class="card">
        <img src="https://websim.ai/riverside-night-view.jpg" alt="Riverside night view with neon reflections" width="100%" height="150">
        <h3>여의도점</h3>
        <p>주소: 서울특별시 영등포구 여의대로 303</p>
        <p>전화: 02-1597-5328</p>
        <div class="button-group">
          <button class="button">예약하기</button>
          <button class="button">상세보기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8082';

export default {
  name: 'FollowInfo',
  data() {
    return {
      name: '',
      address: '',
      phoneNumber: '',
      storeImage: ''
    }
  },
  methods: {
    async followInfo() {
      try {
        const response = await axios.get('/follow/stores');
        const userData = response.data.data;
        this.user = {
          avatar: userData.avatar || '', // avatar 데이터가 있을 경우 사용
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          joinDate: userData.createdAt,
          points: userData.point
        };
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  }
}
</script>

<style scoped>
.content {
  margin: 20px 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card {
  border: 1px solid #0f0;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card img {
  border-radius: 8px;
}

.button-group {
  margin-top: 10px;
}

.button {
  background-color: #0f0;
  border: none;
  color: black;
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

.button:hover {
  background-color: white;
  color: white;
  border: 2px solid #4CAF50;
}
</style>