import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='w-full h-[50px] bg-blue-400 flex justify-between items-center px-5 shadow-md'>
      <Link to='/' className='text-2xl font-bold text-white'>
        GT
      </Link>
      <span>
        <p className='text-white text-xl font-semibold'>Test</p>
      </span>
    </header>
  )
}

export default Header
