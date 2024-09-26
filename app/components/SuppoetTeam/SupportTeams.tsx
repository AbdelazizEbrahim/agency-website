import React from 'react'
import icon1 from '@/public/icon1.png'
import icon2 from '@/public/icon2.png'
import SupportTeam from'@/public/supportteam.jpg'
import Image from 'next/image'
import CustomerSupport from '@/public/customerSupport.jpg'

const SupportTeams = () => {
  return (
    <div className='pt-[7rem] pb-[3rem]'>
      <div className='w-[80%] mx-auto items-center grid grid-cols-1 lg:grid-cols-2 gap-[rem]'>
        <div>
            <h1 className='text-[27px] md:text-[35px] lg:text-[40px] mb-[1rem] font-bold text-[#02073e]
            leading-[2.4rem] md:leading-[4rem]'>
                Do you need help? Our Support Team ready to you.
            </h1>
            <p className='md:w-[70%] w-[90%] text-[15px] text-black opacity-85'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
                 autem ipsa ratione officiis, nobis molestiae nemo.
            </p>
            <div className='flex items-center space-x-6 mt-[2rem]'>
              <Image src={icon1} alt='icon' width={60} height={60} />
              <div>
                  <h1 className='text-[18px] text-gray-900 font-[500] mb-[0.5rem]'>
                      Email Service
                  </h1>
                  <p className='md:w-[70%] w-[90%] text-[15px] text-black opacity-85'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, hic 
                    omnis! Minus voluptates eligendi, 
                  </p>
              </div>
            </div>
            <div className='flex items-center space-x-6 mt-[2rem]'>
              <Image src={icon2} alt='icon' width={60} height={60} />
              <div>
                  <h1 className='text-[18px] text-gray-900 font-[500] mb-[0.5rem]'>
                      Live Ticket Support
                  </h1>
                  <p className='md:w-[70%] w-[90%] text-[15px] text-black opacity-85'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, hic 
                    omnis! Minus voluptates eligendi, 
                  </p>
              </div>
            </div>
        </div>
        <div>
          <Image         
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-anchor-placement="top-center"
              src={SupportTeam} alt='Support' 
            />
        </div>
      </div>
    </div>
  )
}

export default SupportTeams
