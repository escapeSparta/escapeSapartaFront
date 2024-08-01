<template>
  <div>
    <div class="container">
      <h1>방탈출 예약하기</h1>
      <div class="booking-container">
        <ThemeList @theme-selected="selectTheme" />
        <BookingDetails :selected-theme="selectedTheme" />
      </div>
    </div>
  </div>
</template>

<script>
import ThemeList from '@/components/theme/ThemeList.vue';
import BookingDetails from '@/components/theme/BookingDetails.vue';

export default {
  components: {
    ThemeList,
    BookingDetails
  },
  data() {
    return {
      selectedTheme: null
    };
  },
  methods: {
    selectTheme(theme) {
      this.selectedTheme = theme;
    }
  }
};
</script>



<style>
body, html {
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #000;
  color: #0f0;
  height: 100%;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
header {
  background-color: rgba(0, 255, 0, 0.1);
  padding: 1rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #0f0;
  text-shadow: 0 0 10px #0f0;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav a {
  color: #0f0;
  text-decoration: none;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid #0f0;
  border-radius: 5px;
  transition: all 0.3s ease;
}
nav a:hover {
  background-color: #0f0;
  color: #000;
}
h1, h2, h3 {
  text-shadow: 0 0 15px #0f0;
}
.booking-container {
  display: flex;
  margin-top: 2rem;
  gap: 2rem;
}
.theme-list {
  width: 30%;
  background-color: rgba(0, 255, 0, 0.05);
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 0 10px #0f0;
}
.theme-item {
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #0f0;
  border-radius: 5px;
  overflow: hidden;
}
.theme-item:hover, .theme-item.active {
  transform: scale(1.05);
  box-shadow: 0 0 15px #0f0;
}
.theme-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
}
.theme-name {
  padding: 0.5rem;
  text-align: center;
  background-color: rgba(0, 255, 0, 0.1);
}
.booking-details {
  width: 70%;
  background-color: rgba(0, 255, 0, 0.05);
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 0 10px #0f0;
  display: flex;
  flex-direction: column;
}
.theme-info {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: rgba(0, 255, 0, 0.1);
  border-radius: 5px;
  display: none;
}
.theme-info h3 {
  margin-top: 0;
}
.theme-info-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 1rem;
}
.theme-description {
  margin-bottom: 1rem;
}
.theme-details {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem;
  align-items: center;
}
.difficulty-stars {
  display: inline-flex;
  align-items: center;
}
.star {
  font-size: 1.2em;
  color: #0f0;
}
.date-picker {
  margin-bottom: 1rem;
}
.time-slots {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
  margin-top: 1rem;
}
.time-slot {
  padding: 0.5rem;
  text-align: center;
  border: 1px solid #0f0;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.time-slot:hover, .time-slot.selected {
  background-color: #0f0;
  color: #000;
}
button {
  background-color: #0f0;
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 5px;
}
button:hover {
  background-color: #000;
  color: #0f0;
  border: 1px solid #0f0;
}
.modal {
  display: none;
  position: fixed;
  z-index: 1001;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}
.modal-content {
  background-color: #000;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #0f0;
  width: 300px;
  box-shadow: 0 0 20px #0f0;
}
.close {
  color: #0f0;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: #00ff00;
  text-decoration: none;
  cursor: pointer;
}
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.calendar-day {
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #0f0;
  cursor: pointer;
}
.calendar-day:hover:not(.disabled) {
  background-color: #0f0;
  color: #000;
}
.calendar-day.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.calendar-day.selected {
  background-color: #0f0;
  color: #000;
}
</style>
