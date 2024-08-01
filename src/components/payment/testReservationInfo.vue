<template>
  <div>
    <button @click="goToBookingInfo">View Booking Info</button>
  </div>
</template>

<script>
export default {
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
  methods: {
    // goToBookingInfo() {
    //   this.$router.push({
    //     path: '/booking-info',
    //     query: {
    //       booking: JSON.stringify(this.booking)
    //     }
    //   })
    // }
  }
}
</script>
