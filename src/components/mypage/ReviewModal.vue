<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h1>리뷰 작성</h1>
      <p><strong>방탈출 카페:</strong> 루나 강남점</p>
      <p><strong>테마:</strong> 테마 이름</p>
<!--      <p><strong>방탈출 카페:</strong> {{ escapeCafeName }}</p>-->
<!--      <p><strong>테마:</strong> {{ themeName }}</p>-->
      <div class="rating">
<!--        <label for="rate">별점:</label>-->
        <span v-for="star in 5" :key="star" @click="setRating(star)" class="star" :class="{ filled: star <= rating }">&#9733;</span>
      </div>
      <div class="form-group">
        <input type="text" v-model="review.title" id="title" placeholder="제목을 입력하세요" />
      </div>
      <div class="form-group">
        <textarea v-model="review.content" id="content" placeholder="내용을 입력하세요"></textarea>
      </div>
      <div class="button-group">
        <button class="submit-button" @click="submitReview">리뷰 제출</button>
        <button class="close-button" @click="closeModal">닫기</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: { // 부모 컴포넌트가 자식 컴포넌트에 데이터를 전달하는 방법
    isVisible: {
      type: Boolean,
      required: true
    },
    // escapeCafeName: {
    //   type: String,
    //   required: true
    // },
    // themeName: {
    //   type: String,
    //   required: true
    // }
  },
  data() {
    return {
      rating: 0,
      review: {
        title: '',
        content: ''
      }
    };
  },
  methods: {
    setRating(star) {
      this.rating = star;
    },
    closeModal() {
      this.$emit('close');
    },
    submitReview() {
      // 실제 리뷰 제출 로직을 여기에 추가
      alert(`리뷰가 제출되었습니다.\n제목: ${this.review.title}\n내용: ${this.review.content}\n별점: ${this.rating}`);
      this.closeModal();
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