<!-- UserInfo.vue -->
<template>
  <div class="user-info">
    <h1>프로필 조회</h1>
    <div class="user-container">
      <div class="user-avatar">
        <img src="https://b13-escape-sparta.s3.ap-northeast-2.amazonaws.com/default/default_profile.png" alt="프로필 사진" class="avatar">
      </div>
      <div class="user-details">
        <div class="user-info-header">
          <h2>{{ userInfo.이름 }}</h2>
        </div>
        <div class="user-info-items">
          <div class="user-info-item">
            <span class="label">이메일:</span>
            <span class="value">{{ userInfo.이메일 }}</span>
          </div>
          <div class="user-info-item">
            <span class="label">포인트:</span>
            <span class="value">{{ userInfo.포인트 }}</span>
          </div>
        </div>
        <div class="user-info-actions">
          <button class="button edit-profile-btn" @click="showEditProfileModal">
            프로필 수정
          </button>
          <button class="button change-password-btn" @click="showChangePasswordModal">
            비밀번호 변경
          </button>
          <a href="#" class="delete-account-link" @click.prevent="confirmDeleteAccount">
            회원 탈퇴
          </a>
        </div>
      </div>
    </div>
    <EditProfileModal v-if="isEditProfileModalVisible" :isVisible="isEditProfileModalVisible" @close="closeEditProfileModal" />
    <EditPasswordModal v-if="isEditPasswordModalVisible" :isVisible="isEditPasswordModalVisible" @close="closeChangePasswordModal" />
    <WithdrawModal v-if="isWithdrawModalVisible" :isVisible="isWithdrawModalVisible" @close="closeWithdrawModal" />
  </div>
</template>

<script>
import { axiosCore, axiosConsumer } from "@/axios.js";
import EditProfileModal from "@/components/mypage/EditProfileModal.vue";
import EditPasswordModal from "@/components/mypage/EditPasswordModal.vue";
import WithdrawModal from "@/components/mypage/WithdrawModal.vue";

export default {
  name: 'UserInfo',
  components: {
    WithdrawModal,
    EditPasswordModal,
    EditProfileModal,
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        point: ''
      },
      isEditProfileModalVisible: false,
      isEditPasswordModalVisible: false,
      isWithdrawModalVisible: false
    }
  },
  computed: {
    userInfo() {
      return {
        이름: this.user.name,
        이메일: this.user.email,
        포인트: this.user.point
      }
    }
  },
  async created() {
    await this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await axiosConsumer.get('/users/profile');
        const userData = response.data.data;
        this.user = {
          name: userData.name,
          email: userData.email,
          point: userData.point
        };
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
    showEditProfileModal() {
      this.isEditProfileModalVisible = true;
    },
    closeEditProfileModal() {
      this.isEditProfileModalVisible = false;
      this.fetchUserProfile();
    },
    showChangePasswordModal() {
      this.isEditPasswordModalVisible = true;
    },

    closeChangePasswordModal() {
      this.isEditPasswordModalVisible = false;
      this.fetchUserProfile();
    },

    confirmDeleteAccount() {
      if (confirm('정말로 회원 탈퇴를 하시겠습니까?')) {
        this.isWithdrawModalVisible = true;
      }
    },

    closeWithdrawModal() {
      this.isWithdrawModalVisible = false;
    },

    async deleteAccount() {
      try {
        // 예약 취소 API 호출
        await axiosCore.put(`/users/withdraw`, {
          password: this.password,
        });
        alert(`회원 탈퇴가 완료되었습니다.`);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        this.isWithdrawModalVisible = false;
        this.$router.push('/');
      } catch (error) {
        let errorMessage = '리뷰 등록 중 오류가 발생했습니다.';
        if (error.response && error.response.data) {
          errorMessage = error.response.data.message;
        }
        console.error('Error Writing Review:', error);
        // 에러 발생 시 사용자에게 알림
        alert(errorMessage);
      }
    }
  }
}
</script>

<style scoped>
.user-info {
  margin: 20px 0;
}
.user-container {
  display: flex;
  align-items: center;
}
.user-avatar {
  margin-left: 5rem;
  margin-right: 5rem;
}
.user-avatar .avatar {
  width: 15rem; /* 원하는 크기로 조정 */
  height: 15rem; /* 원하는 크기로 조정 */
  border-radius: 50%; /* 동그랗게 만들기 */
  object-fit: cover; /* 이미지가 영역에 맞게 조정되도록 */
}
.user-details {
  flex: 1;
}
.user-info-header h2 {
  margin: 0;
  font-size: 2rem; /* 이름 크게 */
}
.user-info-items {
  margin-top: 1rem;
}
.user-info-item {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  font-size: 1.1rem; /* 폰트 크기 키움 */
}
.user-info-item .label {
  font-weight: bold;
  margin-right: 5px; /* 텍스트와 값 간의 간격 조정 */
}
.user-info-actions {
  margin-top: 1rem;
  position: relative; /* 상대적 위치 설정 */
}
.button {
  background-color: transparent;
  color: #0f0;
  border: 1px solid #0f0;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 1.5rem;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 4px;
}
.edit-profile-btn:hover {
  background-color: #0f0;
  color: #000;
}
.change-password-btn {
  background-color: #f44336; /* 비밀번호 수정 버튼 색상 */
  border: 1px solid #f44336;
  color: white;
}
.change-password-btn:hover {
  background-color: #c62828;
}
.delete-account-link {
  display: inline-block;
  margin-top: 10px;
  color: #f44336;
  text-decoration: underline;
  cursor: pointer;
  position: absolute;
  bottom: -30px; /* 버튼 아래에 위치하도록 */
  right: 0;
}
.delete-account-link:hover {
  color: #c62828;
}
</style>