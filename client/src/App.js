import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import hoc from './hoc/auth'


export default function App() {
  const AuthedLandingPage = hoc(LandingPage, true)
  const AuthedLoginPage = hoc(LoginPage, false)
  const AuthedRegisterPage = hoc(RegisterPage, false)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthedLandingPage />} />
        <Route path="/login" element={<AuthedLoginPage />} />
        <Route path="/register" element={<AuthedRegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}