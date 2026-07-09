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
              <div className='absolute top-full right-0 pt-2 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-md border border-gray-200'>
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
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} />
        {/* ---Mobile Menu---- */}
        <div className={` ${showMenu ? 'fixed w-full ' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`} >
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="" />
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium w-full'>

            <NavLink
              onClick={() => setShowMenu(false)} to='/'className={({ isActive }) =>
                `text-center px-4 py-2 rounded inline-block transition-colors duration-200 ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700'}`
              }
              > HOME
            </NavLink>

            <NavLink
              onClick={() => setShowMenu(false)} to='/doctors'className={({ isActive }) =>
                ` text-center px-4 py-2 rounded inline-block transition-colors duration-200 ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700'}`
              }
            >ALL DOCTORS
            </NavLink>

            <NavLink
              onClick={() => setShowMenu(false)} to='/about' className={({ isActive }) =>
                `text-center px-4 py-2 rounded inline-block transition-colors duration-200 ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700'}`
              }
            > ABOUT
            </NavLink>

            <NavLink
              onClick={() => setShowMenu(false)} to='/contact' className={({ isActive }) =>
                `text-center px-4 py-2 rounded inline-block transition-colors duration-200 ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700'}`
              }
            > CONTACT
            </NavLink>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar