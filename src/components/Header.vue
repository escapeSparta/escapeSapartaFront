<template>
  <header>
    <nav>
      <div class="logo">EscapeSparta</div>
      <div>
        <router-link to="/" class="nav-link">홈</router-link>
        <router-link to="/search-store" class="nav-link">검색</router-link>
        <router-link to="/reviews" class="nav-link">리뷰게시판</router-link>
        <router-link to="/profile" class="nav-link">프로필</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
header {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 255, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #0f0;
  text-shadow: 0 0 10px #0f0;
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
</style>