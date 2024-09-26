import React from 'react';
import ButtonBlue from '../Buttons/ButtonBlue';
import ButtonRed from '../Buttons/ButtonRed';
import HeroImg from '@/public/hero.svg';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className='h-[75vh] lg:h-[66vh] md:h-[96vh] sm:h-[80vh] flex items-center flex-col justify-center mt-[5rem] md:mt-[7rem]'>
      <div className='grid grid-cols-1 lg:grid-cols-5 items-center w-[80%] mx-auto'>
        <div className='col-span-2'>
          <h1 className='text-[27px] md:text-[35px] lg:text-[40px] mb-[1rem] font-bold text-[#02073e] leading-[2.4rem] md:leading-[4rem]'>
            Exploring Innovative Paths to Cultivate Your Business
          </h1>
          <p className='md:text-[17px] text-[15px] mb-[2rem] text-black opacity-90 font-[400]'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro officiis accusamus eum inventore? Tempore, dolores voluptatem unde, commodi ut odio, sit quod eius placeat perspiciatis ullam? Magni ex officia perspiciatis?
          </p>
          <div className='flex items-center space-x-4 md:space-x-6'>
            <ButtonBlue text="Get Started" />
            <ButtonRed text="Explore Features" />
          </div>
        </div>
        <div className='col-span-3 hidden sm:block'>
          <Image src={HeroImg} alt="hero" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
