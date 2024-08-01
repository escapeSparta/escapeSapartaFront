<template>
  <div class="booking-info" v-if="booking">
    <h2>Selected Booking</h2>
    <p><strong>방탈출카페명:</strong> {{ booking.storeTitle }}</p>
    <p><strong>위치:</strong> {{ booking.storeAddress }}</p>
    <p><strong>테마명:</strong> {{ booking.themeTitle }}</p>
    <p><strong>난이도:</strong> {{ booking.level }}</p>
    <p><strong>날짜시간:</strong> {{ booking.startTime }}</p>
    <p><strong>인원:</strong> {{ booking.minPlayer }} ~ {{ booking.maxPlayer }}</p>
    <p><strong>플레이타임:</strong> {{ booking.duration }} 분</p>
    <p><strong>이미지:</strong> {{ booking.themeImage }}</p>
    <p><strong>예약시간:</strong> {{ booking.createAt }}</p>
    <p><strong>총가격:</strong> {{ booking.totalPrice }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>

export default {
  name: 'BookingInfo',
  data() {
    return {
      booking: {
        storeTitle: 'Escape Room',
        storeAddress: '123 Main St',
        themeTitle: 'Haunted House',
        level: 'Hard',
        startTime: '2023-08-01 14:00',
        minPlayer: 2,
        maxPlayer: 6,
        duration: 60,
        themeImage: 'image_url',
        createAt: '2023-08-01 12:00',
        totalPrice: 50000
      }
    }
  },
  // methods: {
  //   goToBookingInfo() {
  //     this.$router.push({
  //       path: '/booking-info',
  //       query: {
  //         booking: JSON.stringify(this.booking)
  //       }
  //     })
  //   }
  // }
}
</script>
