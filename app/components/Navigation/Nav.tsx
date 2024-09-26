'use client'

import Link from 'next/link'
import React from 'react'
import ButtonBlue from '../Buttons/ButtonBlue'
import ButtonRed from '../Buttons/ButtonRed'
import { Bars3BottomRightIcon } from '@heroicons/react/16/solid'

interface Props {
    openNav: () => void;
}

const Nav = ({openNav}: Props) => {
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
                    <Link href={'/'}>About</Link>
                </li>
                <li className='text-[17px] cursor-pointer hover:text-red-500 transition-all duration-all'>
                    <Link href={'/'}>Services</Link>
                </li>
                <li className='text-[17px] cursor-pointer hover:text-red-500 transition-all duration-all'>
                    <Link href={'/'}>Customers</Link>
                </li>
                <li className='text-[17px] cursor-pointer hover:text-red-500 transition-all duration-all'>
                    <Link href={'/'}>Blogs</Link>
                </li>
            </ul>
            <div className='flex items-center space-x-2 md:space-x-5'>
               <ButtonBlue text="Login"/>
                <ButtonRed text="Sign Up"/>
                <Bars3BottomRightIcon onClick={openNav} className="w-[1.5rem] lg:hidden h-[1.5rem] text-slate-900 cursor-pointer "/>
            </div>
        </div>
    </div>
  )
}

export default Nav
