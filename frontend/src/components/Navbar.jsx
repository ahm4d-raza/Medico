import React, { useState } from 'react'
import { assets } from '../assets/assets' 
import { NavLink, useNavigate } from 'react-router-dom' 
import logoImg from '../assets/Logonew.png'

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false)
  const [token, setToken] = useState(true)
  
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 bg-white border-b border-b-gray-400'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={logoImg} alt="Logo" />
      
      {/* Cleaned up layout wrapper hierarchy */}
      <ul className='hidden md:flex items-center gap-5 font-medium text-gray-700'>
        
        <NavLink to='/' className="py-1 relative group">
          {({ isActive }) => (
            <li className='cursor-pointer flex flex-col items-center gap-1'>
              HOME
              <hr className={`w-4/5 border-none h-0.5 bg-blue-600 transition-all duration-300 ${isActive ? 'block' : 'hidden'}`} />
            </li>
          )}
        </NavLink>

        <NavLink to='/doctors' className="py-1 relative group">
          {({ isActive }) => (
            <li className='cursor-pointer flex flex-col items-center gap-1'>
              ALL DOCTORS
              <hr className={`w-4/5 border-none h-0.5 bg-blue-600 transition-all duration-300 ${isActive ? 'block' : 'hidden'}`} />
            </li>
          )}
        </NavLink>

        <NavLink to='/about' className="py-1 relative group">
          {({ isActive }) => (
            <li className='cursor-pointer flex flex-col items-center gap-1'>
              ABOUT
              <hr className={`w-4/5 border-none h-0.5 bg-blue-600 transition-all duration-300 ${isActive ? 'block' : 'hidden'}`} />
            </li>
          )}
        </NavLink>

        <NavLink to='/contact' className="py-1 relative group">
          {({ isActive }) => (
            <li className='cursor-pointer flex flex-col items-center gap-1'>
              CONTACT
              <hr className={`w-4/5 border-none h-0.5 bg-blue-600 transition-all duration-300 ${isActive ? 'block' : 'hidden'}`} />
            </li>
          )}
        </NavLink>

      </ul>

      <div className='flex items-center gap-4'>
        {
          token ? (
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={() => setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className='bg-blue-600 text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-opacity-90 transition-all duration-200'>Create Account</button>
          )
        }
      </div>
    </div>
  )
}

export default Navbar