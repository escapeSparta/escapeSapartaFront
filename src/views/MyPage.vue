<template>
  <div class="container">
    <ProfileMenu />
    <div class="profile-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import ProfileMenu from '@/components/mypage/ProfileMenu.vue';
import UserInfo from '@/components/mypage/UserInfo.vue';

export default {
  name: 'MyPage',
  components: {
    ProfileMenu,
    UserInfo,

  },
  methods: {
    editProfile() {
      alert('프로필 수정 페이지로 이동합니다.');
      // 실제로는 프로필 수정 페이지로 이동하는 코드를 작성해야 합니다.
      // this.$router.push('/profile/edit');
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  margin: 0 auto; /* 컨테이너를 중앙에 위치시킴 */

}

.profile-menu {
  width: 200px; /* 메뉴의 고정 폭 */
  flex-shrink: 0; /* 메뉴가 축소되지 않도록 설정 */
}

.profile-content {
  flex-grow: 1; /* 남은 공간을 차지하도록 설정 */
  border-radius: 10px;
  padding: 2rem;
  margin-left: 2rem; /* 메뉴와 컨텐츠 사이의 간격 설정 */
  min-height: 0;
}
</style>