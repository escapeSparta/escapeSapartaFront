<!-- Cancel.vue -->
<template>
  <div>
    <h1>Cancel Page</h1>
    <p>결제가 취소되었습니다.</p>
    <button @click="goToMainPage">메인 페이지로 이동</button>
  </div>
</template>

<script>
export default {
  name: 'Cancel',
  methods: {
    goToMainPage() {
      this.$router.push('/');
    }
  }
}
</script>


<style scoped>
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>