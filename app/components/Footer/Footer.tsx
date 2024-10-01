import React from 'react';
import Link from 'next/link'; // Import the Link component
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='pt-[3rem] pb-[3rem] bg-gray-100'>
      <div className='w-[80%] mx-auto grid grid-cols-1 border-b-[1.5px] border-b-slate-400 pb-[2rem]
        md:grid-cols-3 gap-[2rem] items-start'>
        
        {/* Socials Column */}
        <div className='md:mx-auto mx-0'> 
          <h1 className='text-[17px] text-gray-900 font-semibold mb-[1.5rem]'>
            Follow Us
          </h1>
          <div className='flex flex-col space-y-2'>
            <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer' className='flex items-center text-black opacity-80 hover:text-yellow-600'>
              <FaFacebook size={24} className='mr-2' /> Facebook
            </a>
            <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer' className='flex items-center text-black opacity-80 hover:text-yellow-600'>
              <FaInstagram size={24} className='mr-2' /> Instagram
            </a>
            <a href='https://www.tiktok.com' target='_blank' rel='noopener noreferrer' className='flex items-center text-black opacity-80 hover:text-yellow-600'>
              <FaTiktok size={24} className='mr-2' /> TikTok
            </a>
            <a href='https://www.youtube.com' target='_blank' rel='noopener noreferrer' className='flex items-center text-black opacity-80 hover:text-yellow-600'>
              <FaYoutube size={24} className='mr-2' /> YouTube
            </a>
          </div>
        </div>

        {/* Links Column */}
        <div className='md:mx-auto mx-0'> 
          <h1 className='text-[17px] text-gray-900 font-semibold mb-[1.5rem]'>
            Links
          </h1>
          <Link href='/' className='block text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-yellow-600'> Home </Link>
          <Link href='/#services' className='block text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-yellow-600'> Services </Link>
          <Link href='/#blogs' className='block text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-yellow-600'> Blogs </Link>
          <Link href='/#about' className='block text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-yellow-600'> About </Link>
        </div>

        {/* About Us Column */}
        <div className='md:mx-auto mx-0'> 
          <h1 className='text-[17px] text-gray-900 font-semibold mb-[1.5rem]'>
            About
          </h1>
          <Link href='https://en.wikipedia.org/wiki/Hajj' target='_blank' className='block text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-yellow-600'> Hajj </Link>
          <Link href='https://en.wikipedia.org/wiki/Umrah' target='_blank' className='block text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-yellow-600'> Ummrah </Link>
          <Link href='https://en.wikipedia.org/wiki/Ethiopia' target='_blank' className='block text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-yellow-600'> Ethiopia </Link>
          <Link href='https://en.wikipedia.org/wiki/Africa' target='_blank' className='block text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer hover:text-yellow-600'> Africa </Link>
        </div>
      </div>

      <div className='w-[80%] mx-auto mt-[1rem] text-[15px] opacity-75 text-center'>
        Copyright @2024 By Abdelaziz E.
      </div>
    </div>
  );
}

export default Footer;
