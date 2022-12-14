import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value)
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    
    let body = {
      email: Email,
      password: Password,
    }

    dispatch(loginUser(body)).then(response => {
      if (response.payload.loginSuccess) {
        navigate('/');
      } else {
        alert('로그인 실패')
      }
    })

    console.log('제출')
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br/>
        <button>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage