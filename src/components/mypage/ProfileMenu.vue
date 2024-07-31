<template>
  <div class="profile-menu">
    <button :class="{ active: activeMenu === 'profile' }" @click="navigate('profile')">프로필</button>
    <button :class="{ active: activeMenu === 'reservations' }" @click="navigate('reservations')">예약 확인</button>
    <button :class="{ active: activeMenu === 'followed' }" @click="navigate('followed')">팔로우한 지점</button>
  </div>
</template>

<script>
export default {
  name: 'ProfileMenu',
  data() {
    return {
      activeMenu: 'profile'
    }
  },
  methods: {
    navigate(menu) {
      this.activeMenu = menu;
      if (menu === 'reservations') {
        this.$router.push('/profile/reservations');
      } else if (menu === 'followed') {
        this.$router.push('/profile/followed-branches');
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
}
.container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 80px;
}
header {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 255, 0, 0.3);
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #0f0;
  text-shadow: 0 0 10px #0f0;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
h1, h2 {
  margin-top: 0;
  text-shadow: 0 0 15px #0f0;
}
.profile-menu {
  width: 200px;
  margin-right: 2rem;
}
.profile-menu button {
  display: block;
  width: 100%;
  background-color: #000;
  color: #0f0;
  border: 1px solid #0f0;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}
.profile-menu button:hover, .profile-menu button.active {
  background-color: #0f0;
  color: #000;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>