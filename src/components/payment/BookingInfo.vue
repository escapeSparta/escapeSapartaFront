<template>
  <div class="booking-info" v-if="booking">
    <h2>Selected Booking</h2>
    <p><strong>방탈출카페명:</strong> {{ response.storeName }}</p>
    <p><strong>위치:</strong> {{ response.storeAddress }}</p>
    <p><strong>테마명:</strong> {{ response.themeTitle }}</p>
    <p><strong>난이도:</strong> {{ response.level }}</p>
    <p><strong>날짜시간:</strong> {{ response.startTime }}</p>
    <p><strong>인원:</strong> {{ response.player }}</p>
    <p><strong>플레이타임:</strong> {{ response.duration }} 분</p>
    <p><strong>이미지:</strong> <img :src="response.themeImage" alt="theme image" /></p>
    <p><strong>예약시간:</strong> {{ response.createAt }}</p>
    <p><strong>총가격:</strong> {{ response.totalPrice }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>

export default {
  name: 'BookingInfo',
  props: {
    response: {
      type: Object,
      required: true,
      default: () => ({
        storeName: '',
        storeAddress: '',
        themeTitle: '',
        level: '',
        startTime: '',
        player: '',
        duration: '',
        themeImage: '',
        createAt: '',
        totalPrice: ''
      })
    }
  }
}
</script>
