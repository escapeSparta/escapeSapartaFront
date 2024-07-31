<template>
  <div id="mypageapp">
    <Header />
    <ProfileMenu />
    <UserInfo />
  </div>
</template>

<script>
import ProfileMenu from './components/mypage/ProfileMenu.vue';
import UserInfo from './components/mypage/UserInfo.vue';
import Header from "./components/Header.vue";

export default {
  name: 'MypageApp',
  components: {
    ProfileMenu,
    Header,
    UserInfo
  }
};
</script>

<style>
/* 전역 스타일을 여기에 추가할 수 있습니다. */

/* 예시: 기본 margin 및 padding을 제거하는 스타일 */
body, h1, p, input, button {
  margin: 0;
  padding: 0;
}

/* 예시: 박스 모델을 설정하는 스타일 */
* {
  box-sizing: border-box;
}
</style>