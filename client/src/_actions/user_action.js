import axios from 'axios'
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types'

export const loginUser = (dataToSubmit) => {
  console.log('로그인 정보 body(dataToSubmit): ', dataToSubmit)
  const request = axios.post('/login', dataToSubmit)
    .then(response => response.data)
    .catch((err) => console.log(err))

  return {
    type: LOGIN_USER,
    payload: request
  }
}

export const registerUser = (dataToSubmit) => {
  console.log('회원가입 정보 body(dataToSubmit): ', dataToSubmit)
  const request = axios.post('/register', dataToSubmit)
    .then(response => response.data)
    .catch((err) => console.log(err))

  return {
    type: REGISTER_USER,
    payload: request
  }
}

export const authUser = () => {
  const request = axios.get('/auth')
    .then(response => response.data)
    .catch((err) => console.log(err))

  return {
    type: AUTH_USER,
    payload: request
  }
}