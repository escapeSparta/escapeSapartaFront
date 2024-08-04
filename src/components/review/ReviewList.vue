<template>
  <div>
    <h1>리뷰 게시판</h1> <!-- 제목 -->
    <div class="reviews"> <!-- 리뷰 목록을 감싸는 div -->
      <div class="review-card" v-for="review in reviews" :key="review.id"> <!-- 각 리뷰 카드 -->
        <div class="review-header">
          <span class="review-title">{{ review.title }}</span> <!-- 리뷰 제목 -->
          <span class="review-rating">{{ review.rating }} ★</span> <!-- 평점 -->
        </div>
        <div class="review-content">{{ review.contents }}</div> <!-- 리뷰 내용 -->
        <div class="review-meta">
          <span>작성자: {{ review.author }}</span> <!-- 작성자 정보 -->
          | <span>테마: {{ review.themeName }}</span> <!-- 테마 정보 -->
          | <span>작성일: {{ review.createAt }}</span> <!-- 작성일 정보 -->
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { mapActions } from "vuex";

export default {
  props: ['storeId', 'themeId'],
  data() {
    return {
      reviews: []
    };
  },
  created() {
    // 실제 애플리케이션 로직에 따라 storeId와 themeId를 설정
    this.fetchReviews();
  },
  methods: {
    ...mapActions('axios', ['axiosSearchRequest']),
    async fetchReviews() {
      console.log(this.storeId);
      console.log(this.themeId);

      try {
        // storeId와 themeId를 쿼리 파라미터로 전송
        const response = await this.axiosSearchRequest({
          method: 'get',
          url: '/search/reviews',
          params: {
            storeId: this.storeId,
            themeId: this.themeId
          }
        })
        this.reviews = response.data.data; // 응답에서 데이터 필드 접근
      } catch (error) {
        console.error("리뷰를 가져오는" + "" + "" + " 중 오류 발생:", error);
      }
    }
  }
};
</script>


<style scoped>
.reviews {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
.review-card {
  background-color: rgba(0, 255, 0, 0.05);
  border-radius: 10px;
  padding: 1rem;
  transition: all 0.3s ease;
}
.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
}
.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.review-title {
  font-size: 1.2rem;
  font-weight: bold;
}
.review-rating {
  color: #ff0;
}
.review-content {
  margin-bottom: 1rem;
}
.review-meta {
  font-size: 0.9rem;
  color: #0f0;
  opacity: 0.7;
}
</style>