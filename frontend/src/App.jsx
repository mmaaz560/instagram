import React from 'react'
import Home from './pages/main/Home'
import Login from './pages/auth/Login'
import OtpVerification from './pages/auth/OtpVerification'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import Signup from './pages/auth/Signup';
import Profile from './pages/main/Profile';
const App = () => {
  return (
    <>
      
      <Router>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/profile/:user_id' element={<Profile/>}/>
            <Route path='/OTP-verification/:my_otp' element={<OtpVerification/>}/>

        </Routes>
        <Toaster/>
      </Router>

    </>
  )
}

export default App