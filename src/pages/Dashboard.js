import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../slices/authSlice'

export const Dashboard = () => {
  
  const navigate=useNavigate()
  const dispatch=useDispatch()

  function clickHandler(){
    localStorage.setItem("token",null)
    dispatch(setToken(null))
    navigate("/login")
  }

  return (
    <div className="w-full h-full flex items-center justify-center">

        <div className='bg-yellow-50 py-5 px-3'>Dashboard</div>
    </div>
  )
}
