import { defineStore } from 'pinia'
import { login, register, logout, getUserInfo } from '@/api/login'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null')
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    username: (state) => state.userInfo?.nickname || '用户'
  },

  actions: {
    // 登录
    async login(loginForm) {
      try {
        const res = await login(loginForm)
        console.log('store login 响应:', res)
        
        // 检查响应的 code 字段而不是 HTTP 状态码
        if (res && typeof res.code !== 'undefined') {
          if (res.code === 200) {
            this.token = res.data.token
            this.userInfo = res.data.userInfo
            
            // 保存到localStorage
            localStorage.setItem('token', this.token)
            localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
            
            // 处理记住密码
            if (loginForm.rememberPassword) {
              localStorage.setItem('savedUsername', loginForm.username)
              localStorage.setItem('savedPassword', loginForm.password)
            } else {
              localStorage.removeItem('savedUsername')
              localStorage.removeItem('savedPassword')
            }
            
            console.log('登录成功，返回消息:', res.message)
            return { success: true, message: res.message }
          } else {
            // 后端返回了错误响应（如 401）
            console.log('登录失败，code:', res.code, '消息:', res.message)
            return { success: false, message: res.message || '登录失败' }
          }
        } else {
          // 响应格式异常
          console.log('响应格式异常:', res)
          return { success: false, message: '登录失败，请稍后重试' }
        }
      } catch (error) {
        console.error('登录异常:', error)
        // 处理网络错误等异常
        const errorMsg = error.message || '网络连接失败'
        console.log('catch 块返回错误:', errorMsg)
        return { 
          success: false, 
          message: errorMsg
        }
      }
    },

    // 退出登录
    async logout() {
      try {
        await logout()
        this.token = ''
        this.userInfo = null
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        return { success: true }
      } catch (error) {
        return { success: false, message: error.message }
      }
    },

    // 用户注册
    async register(registerForm) {
      try {
        const res = await register(registerForm)
        console.log('store register 响应:', res)

        if (res && typeof res.code !== 'undefined') {
          if (res.code === 201) {
            console.log('注册成功，返回消息:', res.message)
            return { success: true, message: res.message, data: res.data }
          } else {
            console.log('注册失败，code:', res.code, '消息:', res.message)
            return { success: false, message: res.message || '注册失败' }
          }
        } else {
          console.log('响应格式异常:', res)
          return { success: false, message: '注册失败，请稍后重试' }
        }
      } catch (error) {
        console.error('注册异常:', error)
        const errorMsg = error.message || '网络连接失败'
        return {
          success: false,
          message: errorMsg
        }
      }
    },

    // 获取记住的密码
    getSavedCredentials() {
      const savedUsername = localStorage.getItem('savedUsername')
      const savedPassword = localStorage.getItem('savedPassword')
      return {
        username: savedUsername || '',
        password: savedPassword || '',
        rememberPassword: !!(savedUsername && savedPassword)
      }
    },

    // 获取用户信息
    async fetchUserInfo() {
      try {
        const res = await getUserInfo()
        if (res.code === 200) {
          this.userInfo = res.data
          return { success: true, data: res.data }
        }
      } catch (error) {
        return { success: false, message: error.message }
      }
    }
  }
})
