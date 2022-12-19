import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const LandingPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    console.log('useEffect 실행')
    axios.get('/')
      .then(response => response.data)
      .catch(err => console.log(err))
  }, [])

  const onClickHandler = () => {
    axios.get('/logout')
      .then(response => {
        console.log(response.data.success)
        if (response.data) {
          navigate('/login')
        } else {
          alert('로그아웃 실패...')
        }
      })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <h2>시작 페이지</h2>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  )
}

export default LandingPage