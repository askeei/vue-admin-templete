import request from './config/axios'

export function login(data) {
  const url = '/auth/signin'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}

export function getInfo() {
  const url = '/user/select'
  const param = {

  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, param, config)
}
