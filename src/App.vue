// src/App.vue
// 최상단 컴포넌트
<template>
  <div id="app">
    <Header />
    <div id="content-main" class="content">
      <router-view/>
    </div>
<!--    <SignUp />-->
  </div>
</template>

<script>
import SignUp from './components/signup/SignUp.vue';
import Header from "./components/Header.vue";

export default {
  name: 'App',
  components: {
    SignUp,
    Header
  }
};
</script>

<style>
/* 전역 스타일을 여기에 추가할 수 있습니다. */
body, html {
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #000;
  color: #0f0;
  height: 100%;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

#content-main {
  padding: 5rem; /* 헤더의 고정 높이만큼 패딩 추가 */
}

</style>
