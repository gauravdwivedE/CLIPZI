import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FaTachometerAlt, FaLink, FaQrcode, FaEye } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Sidebar = ({sidebarOpen}) => {
  const location = useLocation()
  const {theme}  = useSelector((state) => state.theme)
  
  // Utility function to determine if a route is active (for subroutes)
  const isActivePath = (path) => {
    return location.pathname.startsWith(path)
  }

  const linkClass = (isActive) =>
    `flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
      isActive ? 'bg-[#144EE3] text-white' : 'hover:bg-[#144EE3] hover:text-white'
    }`

  return (
    <div className={`absolute md:static w-[12rem] md:w-[16rem]   ${sidebarOpen ? 'left-0' :'-left-80'} h-full border-r border-[#2A2F3A] ${theme === 'light' ? 'bg-[#fff] md:bg-transparent': 'bg-[#0E131E] md:bg-transparent'} pr-4 md:p-5 flex flex-col gap-4 shadow-xl text-[11px] md:text-sm transition-all duration-200 z-50`}>
      <NavLink to="/dashboard" end  className={({ isActive }) => linkClass(isActive || location.pathname === '/')}>
        <FaTachometerAlt />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/dashboard/links/create" className={({ isActive }) => linkClass(isActive)}>
        <FaLink />
        <span>Create Short Links</span>
      </NavLink>

      <NavLink to="/dashboard/qrs/generate" className={({ isActive }) => linkClass(isActive)}>
        <FaQrcode />
        <span>Create QR Code</span>
      </NavLink>

      <NavLink to="/dashboard/links" className={() => linkClass(isActivePath('/dashboard/links') && location.pathname !== '/dashboard/links/create')}>
        <FaEye />
        <span>Your Short Links</span>
      </NavLink>

      <NavLink to="/dashboard/qrs" className={() => linkClass(isActivePath('/dashboard/qrs') && location.pathname !== '/dashboard/qrs/generate')}>
        <FaEye />
        <span>Your QR Codes</span>
      </NavLink>
    </div>
  )
}

export default Sidebar
