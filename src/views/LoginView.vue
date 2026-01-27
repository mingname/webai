<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-box">
        <div class="login-logo">
          <i class="fas fa-user-circle"></i>
        </div>
        <h1 class="login-title">欢迎登录</h1>
        <p class="login-subtitle">登录您的账户以继续</p>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">
              <i class="fas fa-user"></i>
              用户名
            </label>
            <input
              type="text"
              id="username"
              v-model="loginForm.username"
              placeholder="请输入用户名"
              autocomplete="username"
              required
            >
          </div>

          <div class="form-group">
            <label for="password">
              <i class="fas fa-lock"></i>
              密码
            </label>
            <div class="password-wrapper">
              <input
                type="password"
                id="password"
                v-model="loginForm.password"
                placeholder="请输入密码"
                autocomplete="current-password"
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

          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="loginForm.rememberPassword">
              <span class="checkmark"></span>
              <span>记住密码</span>
            </label>
          </div>

          <button type="submit" class="login-button" :disabled="loading">
            <span v-if="!loading">登录</span>
            <span v-else>
              <i class="fas fa-spinner fa-spin"></i>
              登录中...
            </span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </form>

        <div class="login-footer">
          <p>还没有账户？<router-link to="/register">立即注册</router-link></p>
          <a href="#">忘记密码？</a>
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
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const showPassword = ref(false)
const loading = ref(false)
const showErrorModal = ref(false)
const errorModalTitle = ref('')
const errorModalMessage = ref('')
const errorModalIcon = ref('fa-exclamation-triangle')

const loginForm = reactive({
  username: '',
  password: '',
  rememberPassword: false
})

onMounted(() => {
  // 加载记住的密码
  const saved = userStore.getSavedCredentials()
  if (saved.username) {
    loginForm.username = saved.username
    loginForm.password = saved.password
    loginForm.rememberPassword = saved.rememberPassword
  }
})

const togglePassword = () => {
  const passwordInput = document.getElementById('password')
  showPassword.value = !showPassword.value
  passwordInput.type = showPassword.value ? 'text' : 'password'
}

const showErrorAlert = (message) => {
  errorModalTitle.value = '登录失败'
  errorModalMessage.value = message
  errorModalIcon.value = 'fa-exclamation-triangle'
  showErrorModal.value = true
}

const closeErrorModal = () => {
  showErrorModal.value = false
}

const handleLogin = async () => {
  // 表单验证
  if (!loginForm.username.trim()) {
    showErrorAlert('请输入用户名')
    return
  }
  
  if (!loginForm.password.trim()) {
    showErrorAlert('请输入密码')
    return
  }

  loading.value = true

  try {
    const result = await userStore.login({
      username: loginForm.username,
      password: loginForm.password,
      rememberPassword: loginForm.rememberPassword
    })

    console.log('登录结果:', result)

    if (result.success) {
      router.push('/home')
    } else {
      console.log('显示错误提示:', result.message)
      showErrorAlert(result.message)
    }
  } catch (error) {
    console.error('登录异常:', error)
    showErrorAlert('登录失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 420px;
}

.login-box {
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

.login-logo {
  text-align: center;
  margin-bottom: 20px;
}

.login-logo i {
  font-size: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-title {
  text-align: center;
  color: #1a1a2e;
  margin-bottom: 10px;
  font-size: 32px;
  font-weight: 700;
}

.login-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 35px;
  font-size: 15px;
}

.form-group {
  margin-bottom: 24px;
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
  padding: 16px 18px;
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
  margin-bottom: 30px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  color: #555;
  font-size: 14px;
  gap: 10px;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 22px;
  height: 22px;
  border: 2px solid #e8ecf4;
  border-radius: 6px;
  position: relative;
  transition: all 0.3s ease;
  background: #fafbfc;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  transform: scale(1.05);
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2.5px 2.5px 0;
  transform: rotate(45deg);
}

.login-button {
  width: 100%;
  padding: 18px;
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

.login-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.login-button:active:not(:disabled) {
  transform: translateY(-1px);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-button i {
  font-size: 14px;
  transition: transform 0.3s ease;
}

.login-button:hover:not(:disabled) i {
  transform: translateX(5px);
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.login-footer {
  margin-top: 25px;
  text-align: center;
  font-size: 14px;
}

.login-footer p {
  color: #666;
  margin-bottom: 10px;
}

.login-footer a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.login-footer a:hover {
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
  max-width: 420px;
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

.error-message {
  color: #c53030;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  padding: 12px 14px;
  background-color: #fef2f2;
  border-radius: 8px;
  border-left: 4px solid #f56565;
  word-break: break-word;
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
  .login-box {
    padding: 40px 25px;
  }

  .login-logo i {
    font-size: 56px;
  }

  .login-title {
    font-size: 28px;
  }

  .login-subtitle {
    font-size: 14px;
  }
}
</style>
