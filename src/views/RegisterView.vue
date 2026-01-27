<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-box">
        <div class="register-logo">
          <i class="fas fa-user-plus"></i>
        </div>
        <h1 class="register-title">创建账户</h1>
        <p class="register-subtitle">注册您的账户以开始使用</p>
        
        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-group">
            <label for="username">
              <i class="fas fa-user"></i>
              用户名
            </label>
            <input
              type="text"
              id="username"
              v-model="registerForm.username"
              placeholder="请输入用户名（3-20个字符）"
              required
            >
          </div>

          <div class="form-group">
            <label for="nickname">
              <i class="fas fa-id-badge"></i>
              昵称
            </label>
            <input
              type="text"
              id="nickname"
              v-model="registerForm.nickname"
              placeholder="请输入昵称（可选）"
            >
          </div>

          <div class="form-group">
            <label for="password">
              <i class="fas fa-lock"></i>
              密码
            </label>
            <div class="password-wrapper">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="registerForm.password"
                placeholder="请输入密码（至少6个字符）"
                required
              >
              <button
                type="button"
                class="toggle-password"
                @click="togglePassword"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">
              <i class="fas fa-lock"></i>
              确认密码
            </label>
            <div class="password-wrapper">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                v-model="registerForm.confirmPassword"
                placeholder="请再次输入密码"
                required
              >
              <button
                type="button"
                class="toggle-password"
                @click="toggleConfirmPassword"
              >
                <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="agreeTerms" required>
              <span class="checkmark"></span>
              <span>我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私政策</a></span>
            </label>
          </div>

          <button type="submit" class="register-button" :disabled="loading">
            <span v-if="!loading">创建账户</span>
            <span v-else>
              <i class="fas fa-spinner fa-spin"></i>
              注册中...
            </span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </form>

        <div class="register-footer">
          <p>已有账户？<router-link to="/login">立即登录</router-link></p>
        </div>
      </div>
    </div>

    <!-- 错误提示弹窗 -->
    <transition name="modal-fade">
      <div v-if="showErrorModal" class="modal-overlay" @click="closeErrorModal">
        <div class="modal-dialog" @click.stop>
          <div class="modal-header">
            <i :class="['fas', errorModalIcon]" style="color: #f56565;"></i>
            <h2>{{ errorModalTitle }}</h2>
            <button type="button" class="modal-close" @click="closeErrorModal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="error-message">{{ errorModalMessage }}</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="modal-btn-primary" @click="closeErrorModal">
              确定
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 成功提示弹窗 -->
    <transition name="modal-fade">
      <div v-if="showSuccessModal" class="modal-overlay" @click="closeSuccessModal">
        <div class="modal-dialog" @click.stop>
          <div class="modal-header" style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);">
            <i class="fas fa-check-circle" style="color: #fff;"></i>
            <h2>{{ successModalTitle }}</h2>
            <button type="button" class="modal-close" @click="closeSuccessModal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="success-message">{{ successModalMessage }}</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="modal-btn-primary" @click="handleSuccessClose">
              立即登录
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const agreeTerms = ref(false)
const showErrorModal = ref(false)
const showSuccessModal = ref(false)
const errorModalTitle = ref('')
const errorModalMessage = ref('')
const errorModalIcon = ref('fa-exclamation-triangle')
const successModalTitle = ref('注册成功')
const successModalMessage = ref('')

const registerForm = reactive({
  username: '',
  nickname: '',
  password: '',
  confirmPassword: ''
})

const togglePassword = () => {
  const passwordInput = document.getElementById('password')
  showPassword.value = !showPassword.value
  passwordInput.type = showPassword.value ? 'text' : 'password'
}

const toggleConfirmPassword = () => {
  const confirmPasswordInput = document.getElementById('confirmPassword')
  showConfirmPassword.value = !showConfirmPassword.value
  confirmPasswordInput.type = showConfirmPassword.value ? 'text' : 'password'
}

const showErrorAlert = (message) => {
  errorModalTitle.value = '注册失败'
  errorModalMessage.value = message
  errorModalIcon.value = 'fa-exclamation-triangle'
  showErrorModal.value = true
}

const showSuccess = (message) => {
  successModalMessage.value = message
  showSuccessModal.value = true
}

const closeErrorModal = () => {
  showErrorModal.value = false
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}

const handleSuccessClose = () => {
  closeSuccessModal()
  router.push('/login')
}

const validateForm = () => {
  // 验证用户名
  if (!registerForm.username.trim()) {
    showErrorAlert('请输入用户名')
    return false
  }
  if (registerForm.username.length < 3 || registerForm.username.length > 20) {
    showErrorAlert('用户名长度必须在3-20个字符之间')
    return false
  }

  // 验证密码
  if (!registerForm.password.trim()) {
    showErrorAlert('请输入密码')
    return false
  }
  if (registerForm.password.length < 6) {
    showErrorAlert('密码长度至少6个字符')
    return false
  }

  // 验证确认密码
  if (registerForm.password !== registerForm.confirmPassword) {
    showErrorAlert('两次输入的密码不一致')
    return false
  }

  // 验证协议
  if (!agreeTerms.value) {
    showErrorAlert('请同意用户协议和隐私政策')
    return false
  }

  return true
}

const handleRegister = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    const result = await userStore.register({
      username: registerForm.username,
      password: registerForm.password,
      nickname: registerForm.nickname || registerForm.username
    })

    console.log('注册结果:', result)

    if (result.success) {
      showSuccess('账户创建成功！请登录以继续')
    } else {
      showErrorAlert(result.message)
    }
  } catch (error) {
    console.error('注册异常:', error)
    showErrorAlert('注册失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.register-container {
  width: 100%;
  max-width: 480px;
}

.register-box {
  background: white;
  border-radius: 24px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  padding: 50px 45px;
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.register-logo {
  text-align: center;
  margin-bottom: 20px;
}

.register-logo i {
  font-size: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.register-title {
  text-align: center;
  color: #1a1a2e;
  margin-bottom: 10px;
  font-size: 32px;
  font-weight: 700;
}

.register-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 35px;
  font-size: 15px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
  font-size: 14px;
}

.form-group label i {
  color: #667eea;
  font-size: 14px;
}

.form-group input[type="text"],
.form-group input[type="password"] {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e8ecf4;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
  background: #fafbfc;
}

.form-group input:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.password-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  transition: color 0.3s ease;
}

.toggle-password:hover {
  color: #667eea;
}

.checkbox-group {
  margin-bottom: 25px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  color: #555;
  font-size: 13px;
  gap: 10px;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.checkbox-label a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.checkbox-label a:hover {
  color: #764ba2;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #e8ecf4;
  border-radius: 5px;
  position: relative;
  transition: all 0.3s ease;
  background: #fafbfc;
  flex-shrink: 0;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.register-button {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.register-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.register-button:active:not(:disabled) {
  transform: translateY(-1px);
}

.register-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.register-button i {
  font-size: 14px;
  transition: transform 0.3s ease;
}

.register-button:hover:not(:disabled) i {
  transform: translateX(5px);
}

.register-footer {
  margin-top: 25px;
  text-align: center;
  font-size: 14px;
}

.register-footer p {
  color: #666;
  margin: 0;
}

.register-footer a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.register-footer a:hover {
  color: #764ba2;
  text-decoration: underline;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-dialog {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  animation: modalSlideDown 0.3s ease-out;
}

@keyframes modalSlideDown {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
}

.modal-header i {
  font-size: 24px;
}

.modal-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  flex: 1;
}

.modal-close {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.modal-close:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.modal-body {
  padding: 24px;
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}

.error-message,
.success-message {
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  padding: 12px 14px;
  border-radius: 8px;
  border-left: 4px solid #f56565;
  word-break: break-word;
}

.error-message {
  color: #c53030;
  background-color: #fef2f2;
}

.success-message {
  color: #22543d;
  background-color: #f0fdf4;
  border-left-color: #48bb78;
}

.modal-footer {
  padding: 16px 24px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  border-top: 1px solid #eee;
}

.modal-btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
}

.modal-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.modal-btn-primary:active {
  transform: translateY(0);
}

/* 动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .register-box {
    padding: 40px 25px;
  }

  .register-logo i {
    font-size: 56px;
  }

  .register-title {
    font-size: 28px;
  }

  .register-subtitle {
    font-size: 14px;
  }
}
</style>
