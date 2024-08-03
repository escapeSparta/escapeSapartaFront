<template>
  <div class="booking-info">
    <h2>Selected Booking</h2>
    <span><strong>방탈출카페명:</strong> {{ $route.query.storeName }}</span>
    <p><strong>위치:</strong> {{ $route.query.storeAddress }}</p>
    <p><strong>테마명:</strong> {{ $route.query.themeTitle }}</p>
    <p><strong>난이도:</strong> {{ $route.query.level }}</p>
    <p><strong>날짜시간:</strong> {{ $route.query.startTime }}</p>
    <p><strong>인원:</strong> {{ $route.query.player }}</p>
    <p><strong>플레이타임:</strong> {{ $route.query.duration }} 분</p>
    <p><strong>이미지:</strong> <img :src="$route.query.themeImage" alt="theme image" /></p>
    <p><strong>예약시간:</strong> {{ $route.query.createAt }}</p>
    <p><strong>총가격:</strong> {{ $route.query.totalPrice }}</p>
  </div>
</template>

<script>

export default {
  name: 'BookingInfo',
}
</script>
