import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authUser } from '../_actions/user_action'

const hoc = (SpecificComponent, option, adminRoute = null) => {
  // options
  // null => 아무나 출입 가능한 페이지
  // true => 로그인한 유저만 출입 가능한 페이지
  // false = > 로그인한 유저는 출입 불가능한 페이지
  const AuthenticationCheck = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      dispatch(authUser()).then(response => {
        console.log(response);

        if (!response.payload.isAuth) {
          if (option) {
            navigate('/login')
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            navigate('/')
          } else {
            if (option === false) {
              navigate('/')
            }
          }
        }
      })
    }, [dispatch, navigate])
  
    return <SpecificComponent />
  }

  return AuthenticationCheck
}

export default hoc