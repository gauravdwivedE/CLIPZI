import React from 'react'
import Dashboard from '../pages/dashboard/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import RedirectToOriginalURL from '../pages/RedirectToOriginalURL';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';

const IndexRouting = () => {
  return (
    <>
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/dashboard/*' element = {<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/register' element = {<Register/>}/>
      <Route path='/:shortCode' element = {<RedirectToOriginalURL/>}/>
    </Routes>
    </>
  )
}

export default IndexRouting
