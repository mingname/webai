import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 从localStorage获取token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log('API 成功响应:', res)
    return res
  },
  error => {
    console.log('API 错误拦截:', error)
    // 处理 HTTP 错误响应
    if (error.response && error.response.data) {
      // 后端返回错误状态码（如 401, 500 等），返回响应数据
      const errorData = error.response.data
      console.log('API错误响应数据:', errorData)
      // 直接返回错误数据，让它被视为成功的响应
      return errorData
    } else if (error.response) {
      // 有响应但没有数据
      console.log('API错误 - 无响应数据:', error.response.status)
      const errorData = {
        code: error.response.status,
        message: `请求失败 (${error.response.status})`,
        data: null
      }
      return errorData
    } else {
      // 网络错误或其他错误
      console.log('API网络错误:', error.message)
      return Promise.reject(error)
    }
  }
)

// 登录接口 - 调用真实的后端 API
export function login(data) {
  return service.post('/login', {
    username: data.username,
    password: data.password
  })
}

// 注册接口
export function register(data) {
  return service.post('/register', {
    username: data.username,
    password: data.password,
    nickname: data.nickname
  })
}

// 退出登录接口
export function logout() {
  return new Promise((resolve) => {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    resolve({
      code: 200,
      message: '退出成功'
    })
  })
}

// 获取用户信息接口
export function getUserInfo() {
  return new Promise((resolve, reject) => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      resolve({
        code: 200,
        data: JSON.parse(userInfo)
      })
    } else {
      reject({
        code: 401,
        message: '未登录'
      })
    }
  })
}
