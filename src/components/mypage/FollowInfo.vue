<template>
  <div class="content">
    <h1>팔로우한 지점</h1>
    <p>팔로우한 지점 수: {{ stores.length }}개</p>
    <div class="grid">
      <div v-for="store in stores" :key="store.storeId" class="card">
        <img :src="store.storeImage ? store.storeImage : 'https://b13-escape-sparta.s3.ap-northeast-2.amazonaws.com/default/default_image.png'" alt="Neon lit store corner at night" width="100%" height="150">
        <h3>{{ store.name }}</h3>
        <p>{{ store.address }}</p>
        <p>전화: {{ store.phoneNumber }}</p>
        <div class="button-group">
          <button class="button">예약하기</button>
          <button class="button" id="unfollow-button">팔로우 취소</button>
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
import {axiosConsumer} from "@/axios.js";

export default {
  name: 'FollowInfo',
  data() {
    return {
      stores: []
    }
  },
  async created() { // 컴포넌트가 생성된 후 호출
    await this.fetchFollowStores();
  },
  methods: {
    async fetchFollowStores() {
      try {
        const response = await axiosConsumer.get('/follow/stores');
        this.stores = response.data.data;
      } catch (error) {
        console.error('Error fetching follow Stores:', error);
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