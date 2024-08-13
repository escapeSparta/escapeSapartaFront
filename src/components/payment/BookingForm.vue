<template>
  <div class="booking-form">
    <h2>Complete Your Booking</h2>
    <form @submit.prevent="submitForm">
      <div id="total-price">Total Price: ₩{{ $route.query.totalPrice }}</div>
      <div>{{}}</div>
      <h3>Payment Method:</h3>
      <div class="button-group" id="payment-group">
        <button type="button" class="selection-button" v-for="method in paymentMethods" :key="method"
                @click="selectPayment(method)"
                :class="{ selected: selectedPayment === method }">

          {{ methodNames[method] }}
        </button>
      </div>
      <button type="submit">Proceed to Payment</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

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
    if (this.response && this.response.totalPrice) {
      this.selectedPlayers = this.response.player; // 초기 인원 설정
    }
  },
  methods: {
    ...mapActions('axios', ['axiosReservationRequest']),

    selectPayment(payment) {
      this.selectedPayment = payment;
    },
    async submitForm() {
      if (!this.selectedPayment) {
        alert('결제방식을 선택해주세요.');
        return;
      }

      try {
        const reservationId = this.$route.query.reservationId;
        const response = await this.axiosReservationRequest({
          method: 'post',
          url: `/${this.$route.query.reservationId}/payments`
        })
        localStorage.setItem('reservationId' ,reservationId);
        localStorage.setItem('tid', response.data.tid);
        const nextRedirectPcUrl = response.data.next_redirect_pc_url;
        window.location.href = nextRedirectPcUrl;
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>
<style>
.booking-form {
  width: 40%;
}
.selection-button {
  padding: 10px 20px;
  background-color: #001100;
  color: #0f0;
  border: 1px solid #0f0;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
.selection-button:hover, .selection-button.selected {
  background-color: #0f0;
  color: #000;
}
</style>