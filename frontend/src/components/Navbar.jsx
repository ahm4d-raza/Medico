import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import logoImg from '../assets/Logonew.png'

const Navbar = () => {
  const navigate = useNavigate()

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [token, setToken] = useState(true)

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 bg-white border-b border-b-gray-400'>
      
      <img
        onClick={() => navigate('/')}
        className='w-44 cursor-pointer'
        src={logoImg}
        alt='Logo'
      />

      {/* Desktop Menu */}
      <ul className='hidden md:flex items-center gap-5 font-medium text-gray-700'>
        <NavLink to='/'>
          {({ isActive }) => (
            <li className='cursor-pointer flex flex-col items-center gap-1'> HOME
              <hr
                className={`w-4/5 border-none h-0.5 bg-blue-600 ${
                  isActive ? 'block' : 'hidden'
                }`}
              />
            </li>
          )}
        </NavLink>

        <NavLink to='/doctors'>
          {({ isActive }) => (
            <li className='cursor-pointer flex flex-col items-center gap-1'>ALL DOCTORS
              <hr
                className={`w-4/5 border-none h-0.5 bg-blue-600 ${
                  isActive ? 'block' : 'hidden'
                }`}
              />
            </li>
          )}
        </NavLink>

        <NavLink to='/about'>
          {({ isActive }) => (
            <li className='cursor-pointer flex flex-col items-center gap-1'>ABOUT
              <hr
                className={`w-4/5 border-none h-0.5 bg-blue-600 ${
                  isActive ? 'block' : 'hidden'
                }`}
              />
            </li>
          )}
        </NavLink>

        <NavLink to='/contact'>
          {({ isActive }) => (
            <li className='cursor-pointer flex flex-col items-center gap-1'>CONTACT
              <hr
                className={`w-4/5 border-none h-0.5 bg-blue-600 ${
                  isActive ? 'block' : 'hidden'
                }`}
              />
            </li>
          )}
        </NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        {token ? (
          <div
            className='relative flex items-center gap-2 cursor-pointer'
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img className='w-8 rounded-full' src={assets.profile_pic} alt='Profile'/>
            <img className='w-2.5' src={assets.dropdown_icon} alt='Dropdown'/>

            <div
              className={`absolute top-full right-0 mt-2 z-20 ${ showProfileMenu ? 'block' : 'hidden'}`} >
              <div className='min-w-48 bg-white rounded-lg flex flex-col gap-3 p-4 shadow-lg border border-gray-200'>
                <p onClick={() => {navigate('/my-profile'); setShowProfileMenu(false) }} className='cursor-pointer hover:text-black'> My Profile </p>
                <p onClick={() => {navigate('/my-appointments'); setShowProfileMenu(false) }} className='cursor-pointer hover:text-black'>My Appointments</p>
                <p onClick={() => { setToken(false) ; setShowProfileMenu(false)}} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')}className='bg-blue-600 text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-blue-700 transition'>Create Account</button>
        )}

        {/* Mobile Menu Button */}
        <img onClick={() => setShowMobileMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt='Menu'/>

        {/* Mobile Menu */}
        <div className={`${showMobileMenu ? 'fixed inset-0 w-full' : 'w-0 h-0'} md:hidden right-0 top-0 z-30 overflow-hidden bg-white transition-all duration-300`}>
          <div className='flex items-center justify-between px-5 py-6 border-b'>
            <img className='w-36' src={logoImg} alt='Logo' />
            <img className='w-7 cursor-pointer' onClick={() => setShowMobileMenu(false)} src={assets.cross_icon} alt='Close'  />
          </div>

          <ul className='flex flex-col items-center gap-3 mt-8 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMobileMenu(false)} to='/' className={({ isActive }) => `px-5 py-2 rounded-md ${  isActive   ? 'bg-blue-600 text-white' : 'text-gray-700' }` }>
              HOME
            </NavLink>

            <NavLink onClick={() => setShowMobileMenu(false)} to='/doctors' className={({ isActive }) =>`px-5 py-2 rounded-md ${  isActive ? 'bg-blue-600 text-white' : 'text-gray-700' }` }>
              ALL DOCTORS
            </NavLink>

            <NavLink onClick={() => setShowMobileMenu(false)} to='/about' className={({ isActive }) => `px-5 py-2 rounded-md ${  isActive? 'bg-blue-600 text-white' : 'text-gray-700' }` } >
              ABOUT
            </NavLink>

            <NavLink onClick={() => setShowMobileMenu(false)} to='/contact' className={({ isActive }) => `px-5 py-2 rounded-md ${  isActive  ? 'bg-blue-600 text-white' : 'text-gray-700' }`} >
              CONTACT
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar