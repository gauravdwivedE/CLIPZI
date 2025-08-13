import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { LuArrowRightFromLine } from "react-icons/lu";
import { logout } from '../redux/user/userSlice';
import CustomeToast from './CustomeToast';
import { HiOutlineMenu } from "react-icons/hi";


const Nav = ({setSidebarOpen}) => {
  const {user} = useSelector((state) => state.user)
  const {theme}  = useSelector((state) => state.theme)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogoutOut = () => {
    dispatch(logout())
    navigate("/")
    CustomeToast("Logout success")
  }
  return (
    <div className='select-none w-full h-[70px]  rounded-full flex justify-between items-center'>
      <div className='flex gap-5 items-center'>
       
       {user &&  <span  className='text-2xl inline-block md:hidden cursor-pointer '
        onClick={() => setSidebarOpen((prev) => !prev)}
        ><HiOutlineMenu /></span>}

        <h1 className=" uppercase text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#EB568E] to-[#144EE3] bg-clip-text text-transparent">
           <NavLink to = "/"> 
            Clipzi
            </NavLink>
        </h1>
        </div>

      <div className='space-x-2  sm:space-x-4 flex items-center h-full'>
        {user ? 
        <div onClick={()=> setOpen((prev) => !prev)} className={`relative select-none flex gap-3 items-center px-3 sm:px-6 py-1 ${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-[#181E29] text-white'}  cursor-pointer  rounded-full text-sm  border-[1px] border-[#353C4A] transition-all duration-1000`}>
          <div className=' flex-1 text-ellipsis'>
              <p className='font-ligh text-[8px] sm:text-[10px]'>Welcome</p>
              <p className='text-clip text-[10px] font-semibold sm:text-[13px]'>{user?.name}</p>
          </div>
          <span className = {`transition-all duration-500 ${open && 'rotate-180 '}`}>
            <IoIosArrowDown />
          </span>
          <div 
          onClick={handleLogoutOut}
          className={`transition-all z-50 absolute w-28 sm:w-40  flex items-center rounded overflow-hidden  ${open?'h-[10] sm:h-12 -bottom-13  border-[1px] p-2 px-4' :'-bottom-0 h-0' } ${theme === 'light' ? 'bg-gray-200' :'bg-[#181E29]'} transform -translate-x-1/2 left-1/2 border-[#353C4A] duration-200`}>
          <span className='flex items-center gap-2 text-[12px] sm:text-sm font-bold'>Logout <LuArrowRightFromLine /></span>
          </div>
        </div>
        :(
          <>
        <NavLink to = "/login" className={`px-6 sm:px-8  py-3 ${theme === 'light'? 'text-gray-900 bg-gray-200' : 'bg-[#181E29] text-white '} cursor-pointer rounded-3xl sm:rounded-full text-[10px] sm:text-sm  border-[1px] border-[#353C4A] transition-all duration-1000`}>Login</NavLink>
        <NavLink to = "/register" className='px-3 sm:px-8  py-3 bg-[#144EE3] cursor-pointer text-white rounded-3xl sm:rounded-full text-[10px] sm:text-sm shadow-[12px_5px_24px_#144EE380]'>Register Now</NavLink>
       </>
        )
      }
        </div>

    </div>
  )
}

export default Nav
