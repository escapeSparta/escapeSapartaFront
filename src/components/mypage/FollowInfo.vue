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
          <button class="button" id="unfollow-button" @click="unfollowStore(store.storeId)">팔로우 취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import {axiosConsumer} from "@/store/axios.js";
import { mapActions } from 'vuex';

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
    ...mapActions('axios', ['axiosConsumerRequest']),
    async fetchFollowStores() {
      try {
        const response = await this.axiosConsumerRequest({
          method: 'get',
          url: '/follow/stores'
        })
        this.stores = response.data.data;
      } catch (error) {
        console.error('Error fetching follow Stores:', error);
      }
    },
    async unfollowStore(id) {
      console.log(id);
      // 사용자에게 확인 팝업을 표시합니다.
      const isConfirmed = confirm(`팔로우를 취소하시겠습니까?`);

      // 사용자가 확인을 클릭한 경우에만 API를 호출합니다.
      if (isConfirmed) {
        try {
          // 예약 취소 API 호출
          const response = await this.axiosConsumerRequest({
            method: 'delete',
            url: '/follow/stores/${id}'
          })

          // 예약 목록을 업데이트합니다. (예: 취소된 예약을 제외한 예약 목록으로 업데이트)
          this.reservations = response.data.data;

          // 취소 완료 알림
          alert(`팔로우 취소 완료!`);
          await this.fetchFollowStores();
        } catch (error) {
          console.error('Error cancelling follow:', error);
          // 에러 발생 시 사용자에게 알림
          alert('팔로우 취소 중 오류가 발생했습니다.');
        }
      } else {
        // 사용자가 취소를 클릭했을 때의 처리를 할 수 있습니다. (필요시)
        console.log('팔로우 취소가 취소되었습니다.');
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
  background-color: transparent;
  color: #0f0; /* 리뷰 버튼 색상 */
  border: 1px solid #0f0;
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
  background-color: #0f0;
  color: #000;
}
</style>