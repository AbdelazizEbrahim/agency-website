import { XMarkIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import React from 'react';

interface Props {
  nav: boolean;
  closeNav: () => void;
}

const MobileNav = ({ nav, closeNav }: Props) => {
  const NavOpenStyle = nav ? "translate-x-0" : "translate-x-[-100%]";

  return (
    <div
      className={`transform transition-transform duration-500 ${NavOpenStyle} fixed top-0 left-0 z-[200] h-[100vh] right-0 bg-[#6d096b]`}
      role="navigation"
      aria-hidden={!nav}
    >
      <XMarkIcon
        onClick={closeNav}
        className='w-[2rem] h-[2rem] absolute top-[2rem] text-white z-[202] right-[2rem] cursor-pointer'
        aria-label="Close navigation"
      />
      <ul className='relative z-[201] space-y-10 flex flex-col justify-center h-full items-center'>
        <li className='text-[25px] cursor-pointer text-white transition-colors duration-200 hover:text-yellow-300'>
          <Link href={'/'}>Home</Link>
        </li>
        <li className='text-[25px] cursor-pointer text-white transition-colors duration-200 hover:text-yellow-300'>
          <Link href={'#services'}>Services</Link>
        </li>
        <li className='text-[25px] cursor-pointer text-white transition-colors duration-200 hover:text-yellow-300'>
          <Link href={'#about'}>About</Link>
        </li>
        <li className='text-[25px] cursor-pointer text-white transition-colors duration-200 hover:text-yellow-300'>
          <Link href={'#blogs'}>Blogs</Link>
        </li>
        <li className='text-[25px] cursor-pointer text-white transition-colors duration-200 hover:text-yellow-300'>
          <Link href={'#contactUs'}>Contact Us</Link>
        </li>
      </ul>
    </div>
  );
}

export default MobileNav;
