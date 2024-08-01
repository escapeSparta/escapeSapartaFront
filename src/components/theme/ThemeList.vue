<template>
  <div class="theme-list">
    <h2>테마 선택</h2>
    <div v-if="themes.length >0">
    <div v-for="theme in themes" :key="theme.id" class="theme-item" @click="selectTheme(theme)">
      <img :src="theme.image" :alt="theme.name" class="theme-image">
      <div class="theme-name">{{ theme.name }}</div>
    </div>
    </div>
    <div v-else>
      <p>테마를 불러오는 중...</p>
    </div>
  </div>
</template>

<script>
import ThemeApi from '@/api/Theme.js';
import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:8085',
});


export default {
  data() {
    return {
      themes: [],
    };
  },
  created() {
    this.fetchThemes();
  },
  methods: {
    async fetchThemes() {
      ThemeApi.getTheme(1,1,1,false,'title')


      try {
        const response = await instance.get('/themes'); // 실제 API URL로 대체하세요
        this.themes = response.data;
      } catch (error) {
        console.error('Error fetching themes:', error);
      }
    },
    selectTheme(theme) {
      this.$emit('theme-selected', theme);
    }
  }
};
</script>
