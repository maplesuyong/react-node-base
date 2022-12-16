import axios from 'axios'
import { LOGIN_USER } from './types'

export const loginUser = (dataToSubmit) => {
  console.log('로그인 정보 body(dataToSubmit): ', dataToSubmit)
  const request = axios.post('/login', dataToSubmit)
    .then(response => response.data)
    // .catch((err) => console.log(err))

  return {
    type: LOGIN_USER,
    payload: request
  }
}