<!-- EditProfileModal.vue -->
<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h1>프로필 수정</h1>
      <div class="form-group">
        <input type="text" v-model="user.name" placeholder="변경할 이름을 입력해주세요." />
      </div>
      <div class="button-group">
        <button class="submit-button" @click="submitProfile()">프로필 수정</button>
        <button class="close-button" @click="closeModal">닫기</button>
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
      user: {
        name: '',
      },
    };
  },
  methods: {
    ...mapActions('axios', ['axiosConsumerRequest']),
    async submitProfile() {
      try {
        await this.axiosConsumerRequest({
          method: 'put',
          url: '/users/profile',
          data: {
            name: this.user.name,
          },
        });
        alert('프로필 수정 완료!');
        this.closeModal();
      } catch (error) {
        let errorMessage = '프로필 수정 중 오류가 발생했습니다.';
        if (error.response && error.response.data) {
          errorMessage = error.response.data.message;
        }
        console.error('Error Editing Profile:', error);
        alert(errorMessage);
      }
    },
    closeModal() {
      this.user = {
        name: '',
      };
      this.$emit('close');
    },
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
  width: 50rem; /* 모달창의 가로 길이를 늘림 */
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
  margin-bottom: 3rem;
  box-sizing: border-box;
}

.form-group input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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
  color: #0f0; /* 리뷰 버튼 색상 */
  border: 1px solid #0f0;
}

.submit-button:hover {
  background-color: #0f0;
  color: #000;
}
</style>