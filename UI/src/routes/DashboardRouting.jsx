import React from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import DashHome from '../pages/dashboard/DashHome'
import GenerateQrCode from '../pages/dashboard/GenerateQr'
import GenerateShortened from '../pages/dashboard/GenerateShortened'
import AllShortenedLinks from '../pages/dashboard/AllShortenedLinks';
import AllQRCodes from '../pages/dashboard/AllQRCodes'
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute'

const DashboardRouting = () => {
  
  return (
     <Routes path= "/dashboard">
      <Route path='/' element = { <ProtectedRoute> <DashHome/> </ProtectedRoute>} />
      <Route path='/qrs/generate' element = { <ProtectedRoute> <GenerateQrCode/> </ProtectedRoute>} />
      <Route path='/links/create' element = { <ProtectedRoute> <GenerateShortened/> </ProtectedRoute>} />
      <Route path='/links/' element = { <ProtectedRoute> <AllShortenedLinks/> </ProtectedRoute>} />
      <Route path='/qrs/' element = { <ProtectedRoute> <AllQRCodes/> </ProtectedRoute>} />
      <Route path='/*' element = { <ProtectedRoute> <NotFound/> </ProtectedRoute>} />
     </Routes>
  )
}

export default DashboardRouting
