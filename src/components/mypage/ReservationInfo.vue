<template>
  <div class="reservations">
    <h1>예약 확인</h1>
    <p>총 예약 건수: {{ reservations.length }}건</p>
    <div class="reservation-list">
      <div v-for="reservation in reservations" :key="reservation.reservationId" class="reservation-item">
        <img :src="reservation.themeImage ? reservation.themeImage : 'https://escape-sparta.s3.ap-northeast-2.amazonaws.com/default/default_image.png'" alt="Store image" class="reservation-image" />
        <div class="reservation-details">
          <h3>{{ reservation.themeTitle }}</h3>
          <p><strong>예약일:</strong> {{ formatDate(reservation.startTime) }}</p>
          <p><strong>방탈출 카페:</strong> {{ reservation.storeName }}</p>
          <p><strong>인원:</strong> {{ reservation.player }}인</p>
          <p><strong>가격:</strong> {{ reservation.price }} 원</p>
          <p><strong>예약 상태:</strong> {{ getReservationStatusText(reservation.reservationStatus) }}</p>
        </div>
        <div class="reservation-actions">
          <button
              v-if="isPastDate(reservation.startTime) && !isDeactive(reservation.reservationStatus)"
              class="button review-button"
              @click="openReviewModal(reservation.reservationId, reservation.storeName, reservation.themeTitle)"
          >
            리뷰 쓰기
          </button>
          <button
              v-if="!isPastDate(reservation.startTime) && !isDeactive(reservation.reservationStatus)"
              class="button cancel-button"
              @click="cancelReservation(reservation.reservationId)"
          >
            예약 취소
          </button>
        </div>
      </div>
    </div>
  </div>
  <ReviewModal
      :isVisible="isModalVisible"
      :reservationId="selectedReservationId"
      :storeName="selectedStoreName"
      :themeName="selectedThemeName"
      @close="closeReviewModal"
  />
</template>

<script>
import { mapActions } from 'vuex';
import ReviewModal from "@/components/mypage/ReviewModal.vue";

export default {
  name: 'Reservations',
  components: {
    ReviewModal
  },
  data() {
    return {
      isModalVisible: false,
      selectedStoreName: '',
      selectedThemeName: '',
      selectedReservationId: 0,
      reservations: []
    };
  },
  async created() {
    await this.fetchReservations();
  },
  methods: {
    ...mapActions('axios', ['axiosReservationRequest']),
    async fetchReservations() {
      try {
        const response = await this.axiosReservationRequest({
          method: 'get',
          url: '/reservations'
        })
        this.reservations = response.data.data;
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    },
    isPastDate(date) {
      const today = new Date();
      const reservationDate = new Date(date);
      return reservationDate < today;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    getReservationStatusText(status) {
      if (status === 'ACTIVE') {
        return '예약 완료';
      } else if (status === 'DEACTIVE') {
        return '예약 취소';
      } else {
        return '알 수 없는 상태';
      }
    },
    async cancelReservation(id) {
      const isConfirmed = confirm(`정말로 예약을 취소하시겠습니까?`);
      if (isConfirmed) {
        try {
          await this.axiosReservationRequest({
            method: 'delete',
            url: `/reservations/${id}`
          })
          alert(`예약이(가) 취소되었습니다.`);
          await this.fetchReservations();
        } catch (error) {
          console.error('Error cancelling reservation:', error);
          alert('예약 취소 중 오류가 발생했습니다.');
        }
      } else {
        console.log('예약 취소가 취소되었습니다.');
      }
    },
    isDeactive(status) {
      return status === 'DEACTIVE';
    },
    openReviewModal(id, storeName, themeName) {
      this.selectedReservationId = id;
      this.selectedStoreName = storeName;
      this.selectedThemeName = themeName;
      this.isModalVisible = true;
    },
    closeReviewModal() {
      this.isModalVisible = false;
    }
  }
};
</script>
<style scoped>
.reservation-list {
  padding-left: 15px; /* 왼쪽 패딩 추가 */
  padding-right: 15px; /* 왼쪽 패딩 추가 */
}

.reservation-item {
  display: flex;
  align-items: center;
  border: 1px solid #0f0;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.reservation-image {
  width: 14rem;
  height: 10rem;
  border-radius: 8px;
  object-fit: contain;
  margin-right: 1rem;
}

.reservation-details {
  flex: 1;
}

.reservation-actions {
  margin-left: 1rem;
}

.button {
  background-color: #4CAF50;
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

.review-button {
  background-color: transparent;
  color: #0f0; /* 리뷰 버튼 색상 */
  border: 1px solid #0f0;
}

.review-button:hover {
  background-color: #0f0;
  color: #000;
}

.cancel-button {
  background-color: #f44336; /* 취소 버튼 색상 */
}

.cancel-button:hover {
  background-color: #c62828;
}
</style>