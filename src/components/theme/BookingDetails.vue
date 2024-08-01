<template>
  <div class="booking-details">
    <div v-if="selectedTheme" class="theme-info">
      <h3>{{ selectedTheme.name }}</h3>
      <img :src="selectedTheme.image" class="theme-info-image">
      <div class="theme-description">{{ selectedTheme.description }}</div>
      <div class="theme-details">
        <span>난이도:</span><span>{{ '★'.repeat(selectedTheme.difficulty) + '☆'.repeat(5 - selectedTheme.difficulty) }}</span>
        <span>인원:</span><span>{{ selectedTheme.capacity }}</span>
        <span>시간:</span><span>{{ selectedTheme.duration }}</span>
      </div>
    </div>
    <div class="date-picker">
      <h2>날짜 선택</h2>
      <button @click="showCalendar = true">날짜 선택하기</button>
      <p v-if="selectedDate">선택된 날짜: {{ selectedDate }}</p>
    </div>
    <div v-if="selectedDate" class="time-slots">
      <div v-for="time in timeSlots" :key="time" class="time-slot" @click="selectTime(time)">
        {{ time }}
      </div>
    </div>
    <button v-if="selectedDate && selectedTime" @click="book">예약하기</button>
    <CalendarModal v-if="showCalendar" @date-selected="selectDate" @close="showCalendar = false" />
  </div>
</template>

<script>
import CalendarModal from './CalendarModal.vue';

export default {
  props: ['selectedTheme'],
  data() {
    return {
      showCalendar: false,
      selectedDate: null,
      selectedTime: null,
      timeSlots: ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00']
    };
  },
  methods: {
    selectDate(date) {
      this.selectedDate = date;
      this.showCalendar = false;
    },
    selectTime(time) {
      this.selectedTime = time;
    },
    book() {
      alert(`예약이 완료되었습니다!\n테마: ${this.selectedTheme.name}\n날짜: ${this.selectedDate}\n시간: ${this.selectedTime}`);
    }
  }
};
</script>
