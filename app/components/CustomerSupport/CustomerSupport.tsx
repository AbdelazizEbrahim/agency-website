import React from 'react'
import SupportImg from '@/public/support.jpg'
import Image from 'next/image'
import { CheckIcon } from '@heroicons/react/16/solid'

const CustomerSupport = () => {
  return (
    <div>
      <div className='pt-[5rem] pb-[3rem]'>
        <div className='w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[4rem] items-center'>
          <div className='order-2 lg:order-1'>
            <Image src={SupportImg} alt='support'/>
          </div>
          <div className='order-1 lg:order-2'>
            <h1 className='text-[20px] md:text-[25] lg:text-[28px] text-[#02073e] font-bold leading-[2rem] 
            md:leading-[3rem]'>
              Customer support is our main priority with their hundred percent satisfaction
            </h1>
            <p className='mt-[1.5rem] mb-[1.5rem] text-black opacity-90 text-[15px] md:text-[16px] '>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti nam ipsum esse ad doloribu
              s fuga repellendus recusandae aliquam ducimus tempore, ipsa quisquam quod nostrum facere laudantium 
              a doloremque distinctio incidunt.
            </p>
            <div className='flex items-center mb-[1rem] space-x-3 '>
              <CheckIcon className='w-[1.3rem] h-[1.3rem] text-red-600'/>
              <p className='text-[17px] text-[#02073e] font-[500]'>
                Visa and Passport
              </p>
            </div>
            <div className='flex items-center mb-[1rem] space-x-3 '>
              <CheckIcon className='w-[1.3rem] h-[1.3rem] text-red-600'/>
              <p className='text-[17px] text-[#02073e] font-[500]'>
                Visa and Passport
              </p>
            </div>
            <div className='flex items-center mb-[1rem] space-x-3 '>
              <CheckIcon className='w-[1.3rem] h-[1.3rem] text-red-600'/>
              <p className='text-[17px] text-[#02073e] font-[500]'>
                Visa and Passport
              </p>
            </div>
            <div className='flex items-center mb-[1rem] space-x-3 '>
              <CheckIcon className='w-[1.3rem] h-[1.3rem] text-red-600'/>
              <p className='text-[17px] text-[#02073e] font-[500]'>
                Visa and Passport
              </p>
            </div>
            <div className='flex items-center mb-[1rem] space-x-3 '>
              <CheckIcon className='w-[1.3rem] h-[1.3rem] text-red-600'/>
              <p className='text-[17px] text-[#02073e] font-[500]'>
                Visa and Passport
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerSupport
