<template>
  <div>
    <h1>Home Page</h1>
    <p>결제가 성공적으로 완료되었습니다.</p>
    <button @click="goToMainPage">메인 페이지로 이동</button>
  </div>
</template>


<script>
import { mapActions } from "vuex";

export default {
  name: 'Home',
  methods: {
    ...mapActions('axios', ['axiosReservationRequest']),
    goToMainPage() {
      this.$router.push('/');
    }
  },
  async mounted() {
    const tid = localStorage.getItem('tid');
    const reservationId = localStorage.getItem('reservationId');
    if (tid) {
      // 컴포넌트가 DOM에 마운트된 후 API 요청
      try {
        await this.axiosReservationRequest({
          method: 'post',
          url: `/kakaopay-success`,
          data: {
            reservationId: reservationId,
            tid : tid
          }// 올바른 쿼리 파라미터 사용
        });
        // localStorage.removeItem('tid'); // 성공적으로 요청 후 tid 삭제
        // localStorage.removeItem('reservationId'); // 성공적으로 요청 후 reservationId 삭제
        // console.log(response)
      } catch (error) {
        console.error('API 요청 중 오류가 발생했습니다:', error);
        this.$router.push({
          name: 'payFail',
        });
      }
    } else {
      console.warn('tid가 존재하지 않습니다.');
    }
  }
}
</script>


<style scoped>
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>