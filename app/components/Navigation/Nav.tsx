'use client'

import Link from 'next/link'
import React from 'react'
import ButtonBlue from '../Buttons/ButtonBlue'
import ButtonRed from '../Buttons/ButtonRed'
import { Bars3BottomRightIcon } from '@heroicons/react/16/solid'
import { useSession, signOut } from 'next-auth/react' // Import useSession and signOut

interface Props {
    openNav: () => void;
}

const Nav = ({ openNav }: Props) => {
  const { data: session, status } = useSession(); // Get session and status
  console.log(session); // Log the session to check its contents

  const handleLogout = () => {
    signOut(); // Sign the user out
  };

  return (
    <div className='h-[12vh] bg-white shadow-md '>
      <div className='w-[85%] flex items-center justify-between mx-auto h-[12vh]'>
        <h1 className='text-[16px] md:text-[25px] font-bold text-slate-800'>
          <span className='text-[27px] md:text-[40px] text-red-600'>R</span>
          ihla
        </h1>
        <ul className='hidden lg:flex items-center space-x-10'>
          <li className='text-[17px] cursor-pointer text-red-500'>
            <Link href={'/'}>Home</Link>
          </li>
          <li className='text-[17px] cursor-pointer hover:text-red-500 transition-all duration-all'>
            <Link href={'/about'}>About</Link>
          </li>
          <li className='text-[17px] cursor-pointer hover:text-red-500 transition-all duration-all'>
            <Link href={'/services'}>Services</Link>
          </li>
          <li className='text-[17px] cursor-pointer hover:text-red-500 transition-all duration-all'>
            <Link href={'/customers'}>Customers</Link>
          </li>
          <li className='text-[17px] cursor-pointer hover:text-red-500 transition-all duration-all'>
            <Link href={'/blogs'}>Blogs</Link>
          </li>
        </ul>
        <div className='flex items-center space-x-2 md:space-x-5'>
          {/* Conditionally render Login/SignUp or Logout based on authentication status */}
          {status === 'authenticated' ? (
            <>
              <ButtonBlue text="Logout" onClick={handleLogout} /> {/* Logout button */}
            </>
          ) : (
            <>
              <Link href='/signin'><ButtonBlue text="Login" /></Link>
              <Link href='/signup'><ButtonRed text="Sign Up" /></Link>
            </>
          )}
          <Bars3BottomRightIcon onClick={openNav} className="w-[1.5rem] lg:hidden h-[1.5rem] text-slate-900 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Nav;
