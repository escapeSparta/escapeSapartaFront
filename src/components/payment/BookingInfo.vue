<template>
  <div class="booking-info" v-if="booking">
    <h2>Selected Booking</h2>
    <p><strong>테마:</strong> {{ booking.themeTitle }}</p>
    <p><strong>콘텐츠:</strong> {{ booking.themeContents }}</p>
    <p><strong>난이도:</strong> {{ booking.level }}</p>
    <p><strong>인원:</strong> {{ booking.minPlayer }} ~ {{ booking.maxPlayer }}</p>
    <p><strong>플레이타임:</strong> {{ booking.duration }} 분</p>
    <p><strong>인당가격:</strong> {{ booking.price }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BookingInfo',
  data() {
    return {
      booking: null,
    };
  },
  created() {
    this.fetchBookingData();
  },
  methods: {
    async fetchBookingData() {
      try {
        const response = await axios.get('http://localhost:8084/search/stores/1/theme');
        this.booking = response.data;
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    },
  },
};
</script>
