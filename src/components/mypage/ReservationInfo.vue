<template>
  <div class="reservations">
    <h1>예약 확인</h1>
    <div class="reservation-list">
      <div class="reservation-item">
<!--      <div v-for="reservation in reservations" :key="reservation.id" class="reservation-item">-->
        <img src="https://b13-escape-sparta.s3.ap-northeast-2.amazonaws.com/default/default_image.png" alt="Store image" class="reservation-image" />
        <div class="reservation-details">
<!--          <h3>{{ reservation.themeName }}</h3>-->
<!--          <p><strong>예약일:</strong> {{ reservation.bookingDate }}</p>-->
<!--          <p><strong>방탈출 카페:</strong> {{ reservation.escapeCafeName }}</p>-->
<!--          <p><strong>인원:</strong> {{ reservation.personCount }}인</p>-->
<!--          <p><strong>가격:</strong> {{ reservation.price }} 원</p>-->
<!--          <p><strong>예약 상태:</strong> {{ reservation.status }}</p>-->
          <h3>시간이 간다</h3>
          <p><strong>예약일:</strong> 2024.03.24</p>
          <p><strong>방탈출 카페:</strong> 방탈출 카페 루나 강남점</p>
          <p><strong>인원:</strong> 4인</p>
          <p><strong>가격:</strong> 100000원</p>
          <p><strong>예약 상태:</strong> 예약 완료</p>
        </div>
        <div class="reservation-actions">
<!--          <button-->
<!--              v-if="isPastDate(reservation.bookingDate) && reservation.status !== 'Completed'"-->
<!--              class="button review-button"-->
<!--              @click="writeReview(reservation.id)"-->
<!--          >-->
<!--            리뷰 쓰기-->
<!--          </button>-->
<!--          <button-->
<!--              v-else-->
<!--              class="button cancel-button"-->
<!--              @click="cancelReservation(reservation.id)"-->
<!--          >-->
<!--            예약 취소-->
<!--          </button>-->
          <button

              class="button review-button"

          >
            리뷰 쓰기
          </button>
          <button
              class="button cancel-button"
          >
            예약 취소
          </button>
        </div>
      </div>
      <div class="reservation-item">
        <!--      <div v-for="reservation in reservations" :key="reservation.id" class="reservation-item">-->
        <img src="https://b13-escape-sparta.s3.ap-northeast-2.amazonaws.com/default/default_image.png" alt="Store image" class="reservation-image" />
        <div class="reservation-details">
          <!--          <h3>{{ reservation.themeName }}</h3>-->
          <!--          <p><strong>예약일:</strong> {{ reservation.bookingDate }}</p>-->
          <!--          <p><strong>방탈출 카페:</strong> {{ reservation.escapeCafeName }}</p>-->
          <!--          <p><strong>인원:</strong> {{ reservation.personCount }}인</p>-->
          <!--          <p><strong>가격:</strong> {{ reservation.price }} 원</p>-->
          <!--          <p><strong>예약 상태:</strong> {{ reservation.status }}</p>-->
          <h3 id="themeName">시간이 간다</h3>
          <p><strong>예약일:</strong> 2024.03.24</p>
          <p><strong>방탈출 카페:</strong> <span id="cafeName">방탈출 카페 루나 강남점</span></p>
          <p><strong>인원:</strong> 4인</p>
          <p><strong>가격:</strong> 100000원</p>
          <p><strong>예약 상태:</strong> 예약 완료</p>
        </div>
        <div class="reservation-actions">
          <!--          <button-->
          <!--              v-if="isPastDate(reservation.bookingDate) && reservation.status !== 'Completed'"-->
          <!--              class="button review-button"-->
          <!--              @click="writeReview(reservation.id)"-->
          <!--          >-->
          <!--            리뷰 쓰기-->
          <!--          </button>-->
          <!--          <button-->
          <!--              v-else-->
          <!--              class="button cancel-button"-->
          <!--              @click="cancelReservation(reservation.id)"-->
          <!--          >-->
          <!--            예약 취소-->
          <!--          </button>-->
          <button
              class="button review-button"
            @click="openReviewModal()"
          >
            리뷰 쓰기</button>
          <button
              class="button cancel-button"
          >
            예약 취소
          </button>
        </div>
      </div>
    </div>
  </div>
  <ReviewModal
      :isVisible="isModalVisible"
      @close="closeReviewModal"
  />
<!--  <ReviewModal-->
<!--      :isVisible="isModalVisible"-->
<!--      :escapeCafeName="selectedEscapeCafeName"-->
<!--      :themeName="selectedThemeName"-->
<!--      @close="closeReviewModal"-->
<!--  />-->
</template>

<script>
import axios from 'axios';
import ReviewModal from "@/components/mypage/ReviewModal.vue";

export default {
  name: 'Reservations',
  components: {
    ReviewModal
  },
  data() { // 컴포넌트의 초기 데이터 상태 정의
    return {
      isModalVisible: false,
      reservations: [], // 예약 내역 배열
    };
  },
  // async created() { // 컴포넌트가 생성된 후 호출
  //   await this.fetchReservations();
  // },
  methods: { // 컴포넌트의 메서드 정의
    async fetchReservations() {
      try {
        const response = await axios.get('/reservations'); // 예약 내역을 가져오는 API 호출
        this.reservations = response.data; // API 응답 데이터
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    },
    isPastDate(date) {
      const today = new Date();
      const reservationDate = new Date(date);
      return reservationDate < today;
    },
    cancelReservation(id) {
      // 예약 취소 로직
      alert(`예약 ${id}이(가) 취소되었습니다.`);
    },
    writeReview(id) {
      // 리뷰 작성 로직
      alert(`리뷰 작성 페이지로 이동합니다.`);
    },
    openReviewModal() {
      // this.selectedEscapeCafeName = cafeName;
      // this.selectedThemeName = themeName;
      this.isModalVisible = true;


    },
    // openReviewModal(cafeName, themeName) {
    //   // this.selectedEscapeCafeName = cafeName;
    //   // this.selectedThemeName = themeName;
    //   this.isModalVisible = true;
    //
    //
    // },
    closeReviewModal() {
      this.isModalVisible = false;
    }
  }
};
</script>
<style scoped>
.reservations {
  padding: 2rem;
}

.reservation-list {
  max-height: 80vh; /* 스크롤을 위해 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 활성화 */
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
  object-fit: cover;
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
  background-color: black;
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