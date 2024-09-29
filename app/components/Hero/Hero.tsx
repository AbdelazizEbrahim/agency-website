import React, { useEffect, useState } from 'react';
import ButtonBlue from '../Buttons/ButtonBlue';
import ButtonRed from '../Buttons/ButtonRed';
import HeroImg from '@/public/hero.svg';
import Image from 'next/image';

const Hero = () => {
  const [heroTextData, setHeroTextData] = useState({ title: '', text: '' });

  useEffect(() => {
    const fetchHeroText = async () => {
      try {
        const response = await fetch('/api/heroText');
        if (response.ok) {
          const data = await response.json();
          setHeroTextData(data);
          console.log("hero text data: ", data);
        } else {
        }
      } catch (error) {
        console.error('Error fetching hero text:', error);
      }
    };

    fetchHeroText();
  },[])

  return (
    <div className='h-[75vh] lg:h-[66vh] md:h-[96vh] sm:h-[80vh] flex items-center flex-col justify-center mt-[5rem]'>
      <div className='grid grid-cols-1 lg:grid-cols-5 items-center w-[80%] mx-auto'>
        <div className='col-span-2'>
          <h1    
            data-aos='fade-right'
            className='text-[27px] md:text-[35px] lg:text-[40px] mb-[1rem] font-bold text-[#02073e] leading-[2.4rem] md:leading-[4rem]'>
            {heroTextData.title}
          </h1>
          <p 
            data-aos='fade-left'
            dat-aut-delay='200'
            className='md:text-[17px] text-[15px] mb-[2rem] text-black opacity-90 font-[400]'>
              {heroTextData.text}
          </p>
          <div 
             data-aos = 'zoom-in'
             data-aos-delay = '400'
             className='flex items-center space-x-4 md:space-x-6'>
            <ButtonBlue text="Get Started" 
            />
            <ButtonRed text="Explore Features" />
          </div>
        </div>
        <div 
           data-aos = 'zoom-in'
           data-aos-delay = '600'
           className='col-span-3 hidden sm:block'>
          <Image src={HeroImg} alt="hero" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
