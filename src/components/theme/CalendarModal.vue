<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <div class="calendar-header">
        <button @click="prevMonth">&lt;</button>
        <h3>{{ year }}년 {{ month + 1 }}월</h3>
        <button @click="nextMonth">&gt;</button>
      </div>
      <div class="calendar">
        <div v-for="day in days" :key="day.date" :class="['calendar-day', { disabled: day.disabled }]" @click="selectDate(day.date)">
          {{ day.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      days: []
    };
  },
  computed: {
    year() {
      return this.currentDate.getFullYear();
    },
    month() {
      return this.currentDate.getMonth();
    }
  },
  methods: {
    updateCalendar() {
      const firstDay = new Date(this.year, this.month, 1).getDay();
      const lastDate = new Date(this.year, this.month + 1, 0).getDate();
      this.days = [];

      for (let i = 0; i < firstDay; i++) {
        this.days.push({ label: '', disabled: true });
      }

      for (let i = 1; i <= lastDate; i++) {
        const date = new Date(this.year, this.month, i);
        this.days.push({ label: i, date, disabled: date < new Date() });
      }
    },
    selectDate(date) {
      if (!date || date < new Date()) return;
      this.$emit('date-selected', date.toLocaleDateString());
    },
    prevMonth() {
      this.currentDate.setMonth(this.month - 1);
      this.updateCalendar();
    },
    nextMonth() {
      this.currentDate.setMonth(this.month + 1);
      this.updateCalendar();
    }
  },
  mounted() {
    this.updateCalendar();
  }
};
</script>
