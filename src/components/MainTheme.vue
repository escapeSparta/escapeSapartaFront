<template>
  <div id="app">
    <div class="container">
      <h2 id="popular">이번 주 인기 테마</h2>
      <section class="popular-themes">
        <div v-for="theme in themes" :key="theme.storeId" class="theme-card">
          <img :src="theme.storeImage" :alt="theme.title" class="theme-image" width="200" height="150">
          <h3>{{ theme.title }}</h3>
          <p>{{ theme.address }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import apiSearch from '@/api/Search.js'

export default {
  name: 'App',
  data() {
    return {
      themes: []
    }
  },
  mounted() {
    apiSearch.getStores(null, null, null, null, null, null)
      .then(response => {
        this.themes = response.data.data.content;  // response.data가 themes 배열을 포함한다고 가정합니다.
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    navigateTo(page) {
      window.location.href = page;
    }
  }
}
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #000;
  color: #0f0;
  height: 100%;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

header {
  background-color: rgba(0, 255, 0, 0.1);
  padding: 1rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buttons button {
  color: #0f0;
  background-color: #000;
  border: 1px solid #0f0;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.buttons button:hover {
  background-color: #0f0;
  color: #000;
}

h1, h2 {
  text-align: center;
  margin-top: 5rem;
  text-shadow: 0 0 15px #0f0;
}

.popular-themes {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  justify-content: center; /* Add this line to center the themes */
}

.theme-card {
  background-color: rgba(0, 255, 0, 0.05);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.theme-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
}

.theme-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 1rem;
}
</style>
