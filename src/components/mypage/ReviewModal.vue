<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h1>리뷰 작성</h1>
      <p><strong>방탈출 카페:</strong> {{ storeName }}</p>
      <p><strong>테마:</strong> {{ themeName }}</p>
      <div class="rating">
        <span v-for="star in 5" :key="star" @click="setRating(star)" class="star" :class="{ filled: star <= review.rating }">&#9733;</span>
      </div>
      <div class="form-group">
        <input type="text" v-model="review.title" id="title" placeholder="제목을 입력하세요" />
      </div>
      <div class="form-group">
        <textarea v-model="review.contents" id="content" placeholder="내용을 입력하세요"></textarea>
      </div>
      <div class="button-group">
        <button class="submit-button" @click="submitReview()">리뷰 제출</button>
        <button class="close-button" @click="closeModal">닫기</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  props: { // 부모 컴포넌트가 자식 컴포넌트에 데이터를 전달하는 방법
    isVisible: {
      type: Boolean,
      required: true
    },
    storeName: {
      type: String,
      required: true
    },
    themeName: {
      type: String,
      required: true
    },
    reservationId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      review: {
        rating: 0,
        title: '',
        contents: ''
      }
    };
  },
  methods: {
    ...mapActions('axios', ['axiosConsumerRequest']),
    setRating(star) {
      this.review.rating = star;
    },
    closeModal() {
      this.review = {
        rating: 0,
        title: '',
        contents: ''
      };
      this.$emit('close');
    },
    async submitReview() {
      console.log(this.reservationId);
      // 실제 리뷰 제출 로직을 여기에 추가
      try {
        // 예약 취소 API 호출
        const response = await axiosConsumerRequest({
          method: 'post',
          url: '/reviews',
          data: {
            reservationId: this.reservationId,
            title: this.review.title,
            contents: this.review.contents,
            rating: this.review.rating
          }
        });
        alert(`리뷰 작성 완료!`);
        this.closeModal();
      } catch (error) {
        let errorMessage = '리뷰 등록 중 오류가 발생했습니다.';
        if (error.response && error.response.data) {
          errorMessage = error.response.data.message;
        }
        console.error('Error Writing Review:', error);
        // 에러 발생 시 사용자에게 알림
        alert(errorMessage);
      }
    }
  }
}
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: black;
  padding: 20px;
  border-radius: 8px;
  width: 50rem; /* 모달창의 가로 길이를 늘림 */
  max-width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #0f0;
}

h1 {
  margin-top: 0;
  text-align: center;
}

.rating {
  margin: 10px 0;
}

.star {
  font-size: 30px;
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s;
}

.star.filled {
  color: #0f0;
}

.form-group {
  width: 50%;
  margin-bottom: 3rem;
  box-sizing: border-box;
}

.form-group label {
  display: block;
  margin-bottom: 1rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  height: 100px; /* 텍스트 영역의 높이 설정 */
  resize: vertical; /* 수직으로 크기 조절 가능 */
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
}

.submit-button,
.close-button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button {
  background-color: black;
  color: #0f0; /* 리뷰 버튼 색상 */
  border: 1px solid #0f0;
}

.submit-button:hover {
  background-color: #0f0;
  color: #000;
}

.close-button {
  background: #ccc;
  color: black;
}

.close-button:hover {
  background: grey;
  color: white;
}
</style>