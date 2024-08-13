<template>
  <div id="app">
    <div class="container">
      <h2 id="popular">인기 방탈출 카페</h2>
      <section class="popular-themes">
        <div v-for="store in stores.slice(0, 4)" :key="store.storeId" class="theme-card" @click="goToReservation(store.storeId, store.title)">
          <img :src="store.storeImage ? store.storeImage : 'https://escape-sparta.s3.ap-northeast-2.amazonaws.com/default/default_image.png'" :alt="store.title" class="theme-image" width="200" height="150">
          <h3>{{ store.title }}</h3>
          <p>{{ store.address }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import apiSearch from '@/api/Search.js'
import {mapActions} from "vuex";

export default {
  name: 'App',
  props: ['storeId'],
  data() {
    return {
      stores: []
    }
  },
  mounted() {
    this.fetchTopStores();
    // apiSearch.getStores(null, null, null, null, null, null)
    //   .then(response => {
    //     this.stores = response.data.data.content;  // response.data가 themes 배열을 포함한다고 가정합니다.
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  },
  methods: {
    ...mapActions('axios', ['axiosSearchRequest']),
    async fetchTopStores() {
      try {
        const response = await this.axiosSearchRequest({
          method: 'get',
          url: '/search/top-stores'
        })
        this.store = response.data.data;
      } catch(error) {

      }
    },
    navigateTo(page) {
      window.location.href = page;
    },
    goToReservation(storeId, storeName) {
      this.$router.push({ name: 'Theme', params: { storeId: storeId, storeTitle: storeName } });
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
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

h2 {
  text-align: center;
  text-shadow: 0 0 15px #0f0;
}

.popular-themes {
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next line */
  justify-content: center; /* Center the content */
  padding: 1rem 0;
  gap: 1rem;
}

.theme-card {
  background-color: rgba(0, 255, 0, 0.05);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  flex-basis: calc(18% - 1rem); /* Adjust width to fit 5 items in one row */
  max-width: 200px; /* Ensure the cards don't exceed this width */
}

.theme-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
}

.theme-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 1rem;
}
</style>
