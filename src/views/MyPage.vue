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
  max-width: 1200px;
  margin: 0 auto;
}

.profile-content {
  flex-grow: 1;
  background-color: rgba(0, 255, 0, 0.1);
  border-radius: 10px;
  padding: 2rem;
  margin-left: 2rem;
}

.edit-profile-btn {
  background-color: #0f0;
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  margin-top: 1rem;
}

.edit-profile-btn:hover {
  background-color: #000;
  color: #0f0;
  border: 1px solid #0f0;
}
</style>