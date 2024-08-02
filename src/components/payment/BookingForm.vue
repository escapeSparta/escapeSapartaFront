<template>
  <div class="booking-form">
    <h2>Complete Your Booking</h2>
    <form @submit.prevent="submitForm">
      <h3>Number of Players:</h3>
      <div class="button-group" id="players-group">
        <button type="button" class="selection-button" v-for="n in 5" :key="n" @click="selectPlayers(n + 1)">
          {{ n + 1 }} Players
        </button>
      </div>
      <div id="total-price">Total Price: ₩{{ totalPrice }}</div>
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
import apiPayment from '@/api/payment.js';

export default {
  name: 'BookingForm',
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
  props: {
    response: {
      type: Object,
      required: false,
      default: () => null
    }
  },
  computed: {
    totalPrice() {
      return this.selectedPlayers * this.pricePerPerson;
    }
  },
  mounted() {
    console.log(this.response);
    if (this.response && this.response.totalPrice) {
      this.selectedPlayers = this.response.player; // 초기 인원 설정
    }
  },
  methods: {
    // selectPlayers(players) {
    //   this.selectedPlayers = players;
    // },
    selectPayment(payment) {
      this.selectedPayment = payment;
    },
    async submitForm() {
      // if (this.selectedPlayers === 0) {
      //   alert('인원을 선택해주세요.');
      //   return;
      // }

      if (!this.selectedPayment) {
        alert('결제방식을 선택해주세요.');
        return;
      }

      try {
        const response = await apiPayment.postReservationForPay({
          themeTimeId: this.response.themeTimeId,
          player: this.selectedPlayers,
          price: this.totalPrice,
          paymentMethod: this.selectedPayment
        });
        const nextRedirectPcUrl = response.data;
        console.log(nextRedirectPcUrl);
        window.location.href = nextRedirectPcUrl;
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>
