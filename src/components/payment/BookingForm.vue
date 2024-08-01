<template>
  <div class="booking-form">
    <h2>Complete Your Booking</h2>
    <form @submit.prevent="submitForm">
      <h3>Number of Players:</h3>
      <div class="button-group" id="players-group">
        <button type="button" class="selection-button" v-for="n in 5" :key="n" @click="selectPlayers(n+1)">
          {{ n + 1 }} Players
        </button>
      </div>
      <div id="total-price">Total Price: ₩{{ totalPrice.toLocaleString() }}</div>
      <h3>Payment Method:</h3>
      <div class="button-group" id="payment-group">
        <button type="button" class="selection-button" v-for="method in paymentMethods" :key="method"
                @click="selectPayment(method)">
          {{ methodNames[method] }}
        </button>
      </div>
      <button type="submit">Proceed to Payment</button>
    </form>
  </div>
</template>

<script>
import apiPayment from '@/api/payment.js'

export default {
  data() {
    return {
      pricePerPerson: 25000,
      selectedPlayers: 0,
      selectedPayment: '',
      paymentMethods: ['kakao-pay'],
      methodNames: {
        'kakao-pay': 'Kakao Pay'
      }
    }
  },
  computed: {
    totalPrice() {
      return this.selectedPlayers * this.pricePerPerson
    }
  },
  methods: {
    selectPlayers(players) {
      this.selectedPlayers = players
    },
    selectPayment(payment) {
      this.selectedPayment = payment
    },
    async submitForm() {
      if (this.selectedPlayers === 0) {
        alert('인원을 선택해주세요.')
        return
      }

      if (!this.selectedPayment) {
        alert('결제방식을 선택해주세요.')
        return
      }
      try {
        console.log("트라이");
        const response = await apiPayment.getReservationForPay(1); // 1은 테스트용 예약 ID입니다.
        console.log('받은 url:', response);
        const nextRedirectPcUrl = response.data.url;
        if (nextRedirectPcUrl) {
          window.location.href = nextRedirectPcUrl; // Redirect to the Kakao Pay payment page
        } else {
          console.error('nextRedirectPcUrl is not defined');
        }
      } catch (error) {
        console.error('Error proceeding to payment:', error);
        alert('결제 처리 중 오류가 발생했습니다.');
      }
    }

  }
}
</script>
