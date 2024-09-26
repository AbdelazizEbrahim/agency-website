import React from 'react'

const Footer = () => {
  return (
    <div className='pt-[3rem] pb-[3rem]'>
      <div className='w-[80%] mx-auto grid grid-cols-1 border-b-[1.5px] border-b-slate-400 pb-[2rem]
      md:grid-cols-2 lg:grid-cols-3  gap-[2rem] items-start'>
        <div className='md:mx-auto mx-0'> 
            <h1 className='text-[17px] text-gray-900 font-semibold mb-[1.5rem] '>
                Company
            </h1>
            <p className='text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer
            hover:text-yellow-600'> About </p>
            <p className='text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer
            hover:text-yellow-600'> Afillate </p>
            <p className='text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer
            hover:text-yellow-600'> Carrers & Culture </p>
            <p className='text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer
            hover:text-yellow-600'> Blogs </p>
        </div>
        <div className='md:mx-auto mx-0'> 
            <h1 className='text-[17px] text-gray-900 font-semibold mb-[1.5rem] '>
                My Account
            </h1>
            <p className='text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer
            hover:text-yellow-600'> Press Inquiries </p>
            <p className='text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer
            hover:text-yellow-600'> Social media </p>
            <p className='text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer
            hover:text-yellow-600'> Directories</p>
            <p className='text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer
            hover:text-yellow-600'> Image & B-roll </p>
        </div>
        <div className='md:mx-auto mx-0'> 
            <h1 className='text-[17px] text-gray-900 font-semibold mb-[1.5rem] '>
                About Us
            </h1>
            <p className='text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer
            hover:text-yellow-600'> Support Center </p>
            <p className='text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer
            hover:text-yellow-600'> Customer Support </p>
            <p className='text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer
            hover:text-yellow-600'> Copyright </p>
            <p className='text-black opacity-80 mb-[1rem] text-[15px] cursor-pointer
            hover:text-yellow-600'> Populars </p>
        </div>
      </div>
      <div className='w-[80%] mx-auto mt-[1rem] text-[15px] opacity-75' >
        Copyright @2024 By Abdelaziz E.
       </div>
    </div>
  )
}

export default Footer
