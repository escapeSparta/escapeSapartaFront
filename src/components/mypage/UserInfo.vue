<template>
  <div class="user-info">
    <div class="user-avatar">
      <img :src="user.avatar" alt="프로필 사진" width="150" height="150">
    </div>
    <div class="user-details">
      <div class="user-info-item" v-for="(value, key) in userInfo" :key="key">
        <span>{{ key }}</span>
        <span>{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      user: {
        avatar: 'https://escapesparta.net/images/default_avatar.png',
        name: '김탈출',
        email: 'escape_kim@example.com',
        phone: '010-1234-5678',
        joinDate: '2023년 5월 15일',
        escapeCount: '15회',
        points: '15,000 P'
      }
    }
  },
  computed: {
    userInfo() {
      return {
        이름: this.user.name,
        이메일: this.user.email,
        전화번호: this.user.phone,
        가입일: this.user.joinDate,
        탈출횟수: this.user.escapeCount,
        포인트: this.user.points
      }
    }
  }
}
</script>

<style scoped>
/* CSS 스타일 그대로 적용 */
</style>