<template>
  <div id="app">
    <div class="container">
      <h1>전국 방탈출 카페 검색</h1>
      <section id="search" class="search-section">
        <form class="search-form" @submit.prevent="searchEscapeRooms">
          <input type="text" v-model="keyWord" placeholder="키워드 입력 (카페명, 테마명 등)">
          <select v-model="storeRegion">
            <option value="ALL">지역 선택</option>
            <option value="SEOUL">서울</option>
            <option value="BUSAN">부산</option>
            <option value="DAEGU">대구</option>
            <option value="INCHEON">인천</option>
            <option value="GWANGJU">광주</option>
            <option value="DAEJEON">대전</option>
            <option value="ULSAN">울산</option>
            <option value="SEJONG">세종</option>
            <option value="GYEONGGI">경기도</option>
            <option value="GANGWON">강원도</option>
            <option value="CHUNGBUK">충청북도</option>
            <option value="CHUNGNAM">충청남도</option>
            <option value="JEONBUK">전라북도</option>
            <option value="JEONNAM">전라남도</option>
            <option value="GYEONGBUK">경상북도</option>
            <option value="GYEONGNAM">경상남도</option>
            <option value="JEJU">제주도</option>
          </select>
          <button type="submit">검색</button>
        </form>
      </section>

      <section class="search-results">
        <div v-for="result in searchResults" :key="result.storeId" class="theme-card" @click="navigateToTheme(result.storeId)">
          <img :src="result.storeImage" class="theme-image" width="300" height="200">
          <div class="theme-details">
            <div>
              <div class="theme-title">{{ result.title }}</div>
              <div class="theme-difficulty">주소: {{ result.address }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import apiSearch from '@/api/Search.js'

export default {
  data() {
    return {
      keyWord: '',
      storeRegion: 'ALL',
      searchResults: []
    }
  },
  mounted() {
    apiSearch.getStores()
      .then(response => {
        this.searchResults = response.data.data.content;  // response.data가 themes 배열을 포함한다고 가정합니다.
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    searchEscapeRooms() {
      console.log(this.storeRegion);
      apiSearch.getStores(null, null, null, this.keyWord, this.storeRegion, null)
        .then(response => {
          console.log(response);
          this.searchResults = response.data.data.content;  // response.data가 themes 배열을 포함한다고 가정합니다.
        })
        .catch(e => {
          console.log(e);
        });
    },
    navigateToTheme(storeId) {
      console.log(storeId);
      this.$router.push({ name: 'Theme', params: { storeId: storeId } });
    },
    login() {
      alert('로그인 버튼 클릭');
      // 로그인 로직을 여기에 추가하세요.
    },
    signup() {
      alert('회원가입 버튼 클릭');
      // 회원가입 로직을 여기에 추가하세요.
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
  margin-top: 2rem;
  text-shadow: 0 0 15px #0f0;
}
.search-section {
  background-color: rgba(0, 255, 0, 0.05);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 20px #0f0;
  margin: 2rem 0;
}
.search-form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
input[type="text"], select {
  padding: 0.5rem;
  border: 1px solid #0f0;
  background-color: #000;
  color: #0f0;
  border-radius: 5px;
}
button {
  background-color: #0f0;
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 5px;
}
button:hover {
  background-color: #000;
  color: #0f0;
  border: 1px solid #0f0;
}
.search-results {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  justify-content: center;
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
.theme-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.theme-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.theme-location, .theme-genre, .theme-difficulty {
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
}
.theme-rating {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
.star {
  color: #ff0;
  font-size: 1.2rem;
  margin-right: 0.2rem;
}
.book-button {
  background-color: #0f0;
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 5px;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  display: block;
}
.book-button:hover {
  background-color: #000;
  color: #0f0;
  border: 1px solid #0f0;
}
</style>
