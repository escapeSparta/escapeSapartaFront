<template>
  <div class="profile-menu">
    <router-link
        to="/profile"
        :class="{ active: activeMenu === 'profile' }"
        @click="setActiveMenu('profile')"
    >
      프로필
    </router-link>
    <router-link
        to="/profile/reservations"
        :class="{ active: activeMenu === 'reservations' }"
        @click="setActiveMenu('reservations')"
    >
      예약 확인
    </router-link>
    <router-link
        to="/profile/follow"
        :class="{ active: activeMenu === 'follow' }"
        @click="setActiveMenu('follow')"
    >
      팔로우한 지점
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeMenu: 'profile', // 기본 활성화 메뉴
    };
  },
  methods: {
    setActiveMenu(menu) {
      this.activeMenu = menu;
    }
  }
}
</script>

<style scoped>
.profile-menu {
  width: 200px;
  margin-right: 2rem;
}

.profile-menu a {
  display: block;
  width: 100%;
  background-color: #000;
  color: #0f0;
  text-decoration: none;
  border: 1px solid #0f0;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.profile-menu a.active,
.profile-menu a:hover {
  background-color: #0f0;
  color: #000;
}

</style>