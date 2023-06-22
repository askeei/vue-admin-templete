import axios from 'axios'
import { /* MessageBox, */Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // Axios 타임아웃 설정
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // Request Header 토큰 세팅
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // Request 에러 처리
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // Response 결과
  response => {
    return response.data
  },
  error => {
    // Response 에러 처리
    const errData = error.response.data
    // 상용 환경일 경우 서버 에러로 통일
    // 로컬 및 개발환경인 경우 콘솔과 메세지 출력
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
      console.log(errData) // for debug
      Message({
        message: errData.message,
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      Message({
        message: errData.message.length > 50 ? 'Server Error' : errData.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
