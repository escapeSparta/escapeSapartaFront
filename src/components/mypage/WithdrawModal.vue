<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h1>회원 탈퇴</h1>
      <p>비밀번호를 입력하세요.</p>
      <div class="form-group">
        <input type="password" v-model="password" placeholder="비밀번호" />
      </div>
      <div class="button-group">
        <button class="submit-button" @click="deleteAccount">탈퇴하기</button>
        <button class="close-button" @click="closeModal">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      password: '',
    };
  },
  methods: {
    ...mapActions('axios', ['axiosCoreRequest']),
    closeModal() {
      this.password = '';
      this.$emit('close');
    },
    async deleteAccount() {
      try {
        await this.axiosCoreRequest({
          method: 'put',
          url: '/users/withdraw',
          data: {
            password: this.password,
          },
        });
        alert(`회원 탈퇴가 완료되었습니다.`);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        this.$router.push('/');
      } catch (error) {
        let errorMessage = '탈퇴 중 오류가 발생했습니다.';
        if (error.response && error.response.data) {
          errorMessage = error.response.data.message;
        }
        console.error('Error Withdraw:', error);
        alert(errorMessage);
      }
    }
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: black;
  padding: 20px;
  border-radius: 8px;
  width: 50rem;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #0f0;
}

h1 {
  margin-top: 0;
  text-align: center;
}

.form-group {
  width: 50%;
  margin-bottom: 1rem;
  box-sizing: border-box;
}

.form-group input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  color: black;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
}

.submit-button,
.close-button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button {
  background-color: black;
  color: #0f0;
  border: 1px solid #0f0;
}

.submit-button:hover {
  background-color: #0f0;
  color: #000;
}

.close-button {
  background: #ccc;
  color: black;
}

.close-button:hover {
  background: grey;
  color: white;
}
</style>