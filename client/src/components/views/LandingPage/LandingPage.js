import React, { useEffect } from 'react'
import axios from 'axios'

const LandingPage = () => {
  useEffect(() => {
    console.log('useEffect 실행')
    axios.get('/')
      .then(response => response.data)
      .catch(err => console.log(err))
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <h2>시작 페이지</h2>
    </div>
  )
}

export default LandingPage