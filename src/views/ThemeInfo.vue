<template>
  <div>
    <div class="container">
      <h1>방탈출 예약하기</h1>
      <div class="store-info">
        <h2>{{ this.storeTitle }}</h2>
        <button @click="followStore(this.storeId)" class="follow-button">팔로우하기</button>
      </div>
      <div class="booking-container">
        <div class="theme-list">
          <h2>테마 선택</h2>
          <div v-for="theme in themes" :key="theme.themeId" class="theme-item" @click="fetchThemeInfo(theme.themeId)">
            <img class="theme-image" :src="theme.themeImage ? theme.themeImage : 'https://escape-sparta.s3.ap-northeast-2.amazonaws.com/default/default_image.png'" :alt="theme.title" width="200" height="200" />
            <div class="theme-name">{{ theme.title }}</div>
          </div>
        </div>

        <div class="booking-details">
          <div class="theme-info" v-if="selectedTheme">
            <h3>{{ selectedTheme.title }}</h3>
            <img :src="selectedTheme.themeImage ? selectedTheme.themeImage : 'https://escape-sparta.s3.ap-northeast-2.amazonaws.com/default/default_image.png'" :alt="selectedTheme.title" class="theme-info-image" width="600" height="400" />
            <div class="theme-description">{{ selectedTheme.description }}</div>
            <div class="theme-details">
              <span>난이도:</span><span class="difficulty-stars">{{ difficultyStars }}</span>
              <span>최소 인원:</span><span>{{ selectedTheme.minPlayer }}</span>
              <span>최대 인원:</span><span>{{ selectedTheme.maxPlayer }}</span>
              <span>시간:</span><span>{{ selectedTheme.duration }}분</span>
              <span>가격:</span><span>{{ selectedTheme.price }}원</span>
            </div>
            <div class="player-selection">
              <button @click="goToReviews(this.storeId, selectedTheme.themeId)" class="review-button">리뷰 보러 가기</button>
              <div class="player-selection-text">인원 선택하기:</div>
              <div class="player-buttons">
                <button
                    v-for="n in maxPlayersArray"
                    :key="n"
                    @click="selectPlayer(n, selectedTheme.price)"
                    :class="{ 'selected': player === n }">
                  {{ n }}인
                </button>
              </div>
            </div>
          </div>
          <div class="date-picker">
            <h2>날짜 선택</h2>
            <button @click="showDateModal">날짜 선택하기</button>
            <p>선택된 날짜: {{ formattedDate }}</p>
          </div>
          <div class="time-slots">
            <template v-if="times.length > 0">
              <div
                  v-for="time in times"
                  :key="time.startTime"
                  class="time-slot"
                  :class="{ 'disabled': time.themeTimeStatus === 'DISABLE', 'selected': selectedTime === time }"
                  @click="time.themeTimeStatus === 'ENABLE' ? selectTime(time) : null">
                {{ formatTime(time.startTime) }}
              </div>
            </template>
            <template v-else>
              <p class="no-time-slots-message">예약 가능한 시간대가 존재하지 않습니다.</p>
            </template>
          </div>


          <button v-if="selectedTime" @click="book(this.selectedTimeId, this.player, this.price)" style="margin-top: 1rem;">예약하기</button>
        </div>
      </div>
    </div>

    <div v-if="isDateModalVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="hideDateModal">&times;</span>
        <div class="calendar-header">
          <button @click="prevMonth">&lt;</button>
          <h3>{{ currentMonth }}</h3>
          <button @click="nextMonth">&gt;</button>
        </div>
        <div class="calendar">
          <div v-for="day in calendarDays" :key="day.date" class="calendar-day" :class="{ disabled: day.disabled, selected: day.selected }" @click="selectDate(day)">
            {{ day.date.getDate() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      themes: [],
      selectedTheme: null,
      selectedDate: null,
      selectedTime: null,
      selectedTimeId: null,  // 새로운 변수 추가
      isDateModalVisible: false,
      currentDate: new Date(),
      times: [],
      player: null,
      price: null
    };
  },

  props: ['storeId', 'storeTitle'],

  mounted() {
    console.log(this.storeId);
    console.log(this.storeTitle);
    this.fetchTheme(this.storeId);
    // apiSearch.getThemes(null, null, null, null, this.storeId)
    //   .then(response => {
    //     this.themes = response.data.data.content;  // response.data가 themes 배열을 포함한다고 가정합니다.
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  },

  watch: {
    async selectedDate(newDate) {
      if (newDate) {
        await this.fetchThemeTimes(this.selectedTheme.themeId);
      }
    }
  },

  computed: {
    formattedDate() {
      return this.selectedDate ? this.selectedDate.toISOString().split('T')[0] : '없음';
    },
    currentMonth() {
      return `${this.currentDate.getFullYear()}년 ${this.currentDate.getMonth() + 1}월`;
    },
    calendarDays() {
      const days = [];
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();

      for (let i = 0; i < firstDay; i++) {
        days.push({ date: new Date(year, month, i - firstDay + 1), disabled: true });
      }

      for (let i = 1; i <= lastDate; i++) {
        const date = new Date(year, month, i);
        days.push({
          date,
          disabled: date < new Date(),
          selected: this.selectedDate && this.selectedDate.toDateString() === date.toDateString()
        });
      }
      return days;
    },
    difficultyStars() {
      if (!this.selectedTheme) return '';
      return '★'.repeat(this.selectedTheme.level) + '☆'.repeat(5 - this.selectedTheme.level);
    },
    maxPlayersArray() {
      if (!this.selectedTheme) return [];
      const maxPlayers = this.selectedTheme.maxPlayer;
      const minPlayers = this.selectedTheme.minPlayer;
      return Array.from({ length: maxPlayers - minPlayers + 1 }, (_, i) => i + minPlayers);
    }
  },
  methods: {
    ...mapActions('axios', ['axiosSearchRequest', 'axiosReservationRequest', 'axiosConsumerRequest']),
    // async fetchStore(storeId) {
    //   try {
    //     const response = await this.axiosSearchRequest({
    //       method: 'get',
    //       url: ''
    //     })
    //   }
    // },
    async fetchTheme(storeId) {
      try {
        const response = await this.axiosSearchRequest({
          method: 'get',
          url: `/search/stores/${storeId}/theme`,
          params: {
            params:{
              pageNum: null,
              pageSize: null,
              isDes: null,
              sort: null
            }
          }
        })
        this.themes = response.data.data.content;
      } catch(error) {
        let errorMessage = '오류가 발생했습니다.';
        if (error.response && error.response.data) {
          errorMessage = error.response.data.message;
        }
        console.error('Error : ', error);
        alert(errorMessage);
      }
    },
    async fetchThemeInfo(themeId) {
      try {
        const response = await this.axiosSearchRequest({
          method: 'get',
          url: `/search/stores/theme/${themeId}/info`,
          params: {
            storeId: this.storeId
          }
        })
        this.selectedTheme = response.data.data;

        // 날짜와 시간을 초기화
        this.selectedDate = null;
        this.selectedTime = null;
        this.selectedTimeId = null;  // 추가: 시간 ID 초기화
        this.times = [];
        this.player = null;
        this.price = null;

      } catch (error) {
        let errorMessage = '오류가 발생했습니다.';
        if (error.response && error.response.data) {
          errorMessage = error.response.data.message;
        }
        console.error('Error : ', error);
        alert(errorMessage);
      }
    },
    updateDetails() {
      this.difficultyStars = this.computeDifficultyStars();
    },
    computeDifficultyStars() {
      if (!this.selectedTheme) return '';
      return '★'.repeat(this.selectedTheme.level) + '☆'.repeat(5 - this.selectedTheme.level);
    },
    showDateModal() {
      this.isDateModalVisible = true;
    },
    hideDateModal() {
      this.isDateModalVisible = false;
    },
    selectDate(day) {
      if (day.disabled) return;
      // 타임존 오프셋을 무시하고 UTC로 날짜를 생성
      const selectedDate = new Date(Date.UTC(day.date.getFullYear(), day.date.getMonth(), day.date.getDate()));
      this.selectedDate = selectedDate;
      this.isDateModalVisible = false;
    },
    prevMonth() {
      const prevMonth = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
      this.currentDate = new Date(prevMonth); // Trigger reactivity
    },
    nextMonth() {
      const nextMonth = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
      this.currentDate = new Date(nextMonth); // Trigger reactivity
    },
    selectTime(time) {
      this.selectedTime = time;
      this.selectedTimeId = time.themeTimeId;  // 새로운 변수 업데이트
    },
    formatTime(dateTimeString) {
      const date = new Date(dateTimeString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    async fetchThemeTimes(themeId) {
      if (!this.selectedDate || !themeId) return;
      const day = this.selectedDate.toISOString().split('T')[0];
      try {
        const response = await this.axiosSearchRequest({
          method: 'get',
          url: `/search/stores/theme/${themeId}/time`,
          params: {
            storeId: this.storeId,
            day: day
          }
        })

        console.log(response);
        this.times = response.data.data;
      } catch (e) {
        console.log(e);
      }
    },
    selectPlayer(player, selectedPrice) {
      this.player = player;
      this.price = selectedPrice * player;
    },
    goToReviews(storeId, themeId) {
      this.$router.push({ path: '/reviews', query: { storeId: storeId, themeId: themeId}})
    },
    async book(themeTimeId, player, price) {

      if (!this.selectedTheme || !this.selectedDate || !this.selectedTime || !this.player) {
        alert('테마, 날짜, 시간, 인원을 모두 선택해주세요.');
        return;
      }
      try {
        //예약 정보가 담겨있는 response
        const response = await this.axiosReservationRequest({
          method: 'post',
          url: '',
          data: {
            themeTimeId: themeTimeId,
            player: player,
            price: price
          }
        })
        console.log(response.data.data.totalPrice);

        // response가 false인 경우 즉시 흐름 종료
        if (response === false) return;

        // 화면전환 코드
        this.$router.push({
          name: 'Reservation',
          query: response.data.data

        });
      } catch(error){
        console.log(error);
        alert(error);
      }

    },
    async followStore(storeId) {
      try {
        console.log(storeId);
        //예약 정보가 담겨있는 response
        const response = await this.axiosConsumerRequest({
          method: 'post',
          url: `/follow/stores/${storeId}`
        })
        console.log(storeId);
        // response가 false인 경우 즉시 흐름 종료
        if (response === false) return;

        alert("팔로우가 완료되었습니다!");
      } catch (error) {
        let errorMessage = '팔로우 중 오류가 발생했습니다.';
        if (error.response && error.response.data) {
          errorMessage = error.response.data.message;
        }
        console.error('Error : ', error);
        alert(errorMessage);
      }
    }

  }
};
</script>

<style scoped>
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
  overflow-y: auto; /* Add this line */
  max-height: 80vh; /* Adjust as necessary */
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

.theme-item img {
  width: 100%;
  height: auto; /* 높이를 자동으로 조정하여 비율 유지 */
  max-height: 200px; /* 이미지 높이를 제한하여 너무 커지지 않도록 설정 */
  object-fit: contain; /* 이미지의 비율을 유지하면서 영역을 채우도록 설정 */
  border-radius: 5px;
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
}

.theme-info h3 {
  margin-top: 0;
}

.theme-info-image {
  width: 100%;
  height: auto; /* 높이를 자동으로 조정하여 비율 유지 */
  max-height: 400px; /* 최대 높이를 설정하여 너무 커지지 않도록 설정 */
  object-fit: contain; /* 이미지의 비율을 유지하면서 영역을 채우도록 설정 */
  margin-bottom: 1rem;
  border-radius: 5px;
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

.date-picker {
  margin-bottom: 1rem;
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
  background-color: #00c400;
  color: #000;
}

button.selected {
  background-color: #0a0;
  color: #fff;
}

.modal {
  display: flex;
  position: fixed;
  z-index: 1001;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #000;
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
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #00ff00;
  text-decoration: none;
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

.time-slot.disabled {
  position: relative;
  color: #999; /* disabled text color */
  cursor: not-allowed;
}

.time-slot.disabled::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    135deg,
    transparent,
    transparent 10px,
    rgba(255, 0, 0, 0.5) 10px,
    rgba(255, 0, 0, 0.5) 20px
  );
  pointer-events: none; /* to ensure the text is still visible */
}

.player-selection {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
}

.player-selection button {
  margin: 0.2rem;
}

.player-selection-text {
  margin: 0.5rem 0;
  font-size: 1.1rem;
  color: #0f0;
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

.time-slots {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
  margin-top: 1rem;
}

.no-time-slots-message {
  grid-column: span 2; /* 이 속성으로 메시지가 한 줄에 걸쳐서 나오도록 설정 */
  text-align: center;
  white-space: nowrap; /* 텍스트가 줄 바꿈되지 않도록 설정 */
}

</style>
