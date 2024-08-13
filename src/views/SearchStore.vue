<template>
  <div id="app">
    <div class="container">
      <h1>전국 방탈출 카페 검색</h1>
      <section id="search" class="search-section">
        <form class="search-form" @submit.prevent="searchStores">
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
          <input type="text" v-model="keyWord" placeholder="키워드 입력 (카페명, 테마명 등)">
          <button type="submit">검색</button>
        </form>
      </section>

      <section class="search-results">
        <div v-for="result in searchResults" :key="result.storeId" class="theme-card" @click="navigateToTheme(result.storeId, result.title)">
          <img :src="result.storeImage ? result.storeImage : 'https://escape-sparta.s3.ap-northeast-2.amazonaws.com/default/default_image.png'" class="theme-image" width="300" height="200">
          <div class="theme-details">
            <div>
              <div class="theme-title">{{ result.title }}</div>
              <div class="theme-difficulty">주소: {{ result.address }}</div>
            </div>
          </div>
        </div>
      </section>
      <section class="pagination">
        <button @click="changePage(pageNum - 1)" :disabled="pageNum === 1">이전</button>

        <span v-for="page in pagesToShow" :key="page">
    <span @click="changePage(page)" :class="{ active: page === pageNum, pageText: true }">
      {{ page }}
    </span>
  </span>

        <button @click="changePage(pageNum + 1)" :disabled="pageNum === totalPages">다음</button>
      </section>
    </div>
  </div>
</template>

<script>
import apiSearch from '@/api/Search.js'
import { mapActions } from "vuex";

export default {
  data() {
    return {
      keyWord: '',
      storeRegion: 'ALL',
      searchResults: [],
      pageNum: 1,
      pageSize: 9,
      totalPages: '',
      pageRange: 5
    }
  },
  mounted() {
    this.searchStores();
    // apiSearch.getStores()
    //   .then(response => {
    //     this.searchResults = response.data.data.content;
    //     this.totalPages = response.data.data.totalPages;
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
  },
  computed: {
    // 현재 페이지와 페이지 범위를 기반으로 표시할 페이지 목록 계산
    pagesToShow() {
      const startPage = Math.max(1, this.pageNum - Math.floor(this.pageRange / 2));
      const endPage = Math.min(this.totalPages, startPage + this.pageRange - 1);
      const pages = [];

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    }
  },
  methods: {
    ...mapActions('axios', ['axiosSearchRequest']),
    async searchStores() {
      try {
        const response = await this.axiosSearchRequest({
          method: 'get',
          url: '/search/stores',
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            isDesc: null,
            keyWord: this.keyWord,
            storeRegion: this.storeRegion,
            sort: null
          }
        })
        this.searchResults = response.data.data.content;
        this.totalPages = response.data.data.totalPages;
      } catch (error) {
        console.error("오류 발생: ", error);
      }
    },
    // searchEscapeRooms() {
    //   console.log(this.storeRegion);
    //   apiSearch.getStores(this.pageNum, this.pageSize, null, this.keyWord, this.storeRegion, null)
    //     .then(response => {
    //       console.log(response);
    //       this.searchResults = response.data.data.content;  // response.data가 themes 배열을 포함한다고 가정합니다.
    //       this.totalPages = response.data.data.totalPages;
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // },
    navigateToTheme(storeId, storeName) {
      console.log(storeId);
      this.$router.push({ name: 'Theme', params: { storeId: storeId, storeTitle: storeName } });
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.pageNum = page;
        this.searchStores();
      }
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
  margin-top: 5rem;
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
  flex-shrink: 0;
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 1rem;
  flex-direction: row;
}

select{
  padding: 0.5rem;
  border: 1px solid #0f0;
  background-color: #000;
  color: #0f0;
  border-radius: 5px;
  min-width: 50px; /* 선택 영역 및 입력창의 최소 너비 설정 */
}

input[type="text"] {
  padding: 0.5rem;
  border: 1px solid #0f0;
  background-color: #000;
  color: #0f0;
  border-radius: 5px;
  min-width: 200px; /* 선택 영역 및 입력창의 최소 너비 설정 */
}

button[type="submit"] {
  flex-shrink: 0;
  background-color: #0f0;
  color: #000;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 5px;
  margin-top: 0;
}

button{
  flex-shrink: 0;
  background-color: #0f0;
  color: #000;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 5px;
  margin-top: 0;
  padding: 0.5rem;
}


button:hover {
  background-color: #000;
  color: black;
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
  object-fit: contain;
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
.pagination {
  display: flex;
  justify-content: center; /* 가로 가운데 정렬 */
  align-items: center;
  margin-top: 2rem;
}
.pagination span.pageText {
  cursor: pointer;
  padding: 0.5rem;
  color: white; /* 다른 페이지는 흰색 */
}

.pagination span.active {
  color: #00ff00; /* 현재 페이지는 형광색 */
  font-weight: bold;
}
</style>
