<!-- Fail.vue -->
<template>
  <div>
    <h1>Fail Page</h1>
    <p>결제가 실패하였습니다.</p>
    <button @click="goToMainPage">메인 페이지로 이동</button>
  </div>
</template>

<script>
import apiPayment from '@/api/payment.js'

export default {
  name: 'Fail',
  mounted() {
    apiPayment.getPaymentFailedURL(this.$route.query.reservationId);
  },
  methods: {
    goToMainPage() {
      this.$router.push('/');
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