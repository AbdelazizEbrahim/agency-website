'use client';
import React, { useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/16/solid';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  return (
    <div className='pt-[5rem] pb-[3rem]'>
      <div className='w-[80%] mx-auto grid grid-cols-1 gap-[4rem] items-start'>
        
        {/* Agency Overview */}
        <section data-aos="fade-right" data-aos-anchor-placement="top-center">
          <h1 className='text-[20px] md:text-[25px] lg:text-[28px] text-[#02073e] font-bold leading-[2rem] md:leading-[3rem]'>
            Welcome to Rihleti Agency
          </h1>
          <p className='mt-[1.5rem] mb-[1.5rem] text-black opacity-90 text-[15px] md:text-[16px]'>
            We are a passionate team of travel experts dedicated to creating unforgettable travel experiences. Whether you're looking for a relaxing vacation, an adventurous trip, or a cultural exploration, we are here to craft personalized journeys that fit your unique preferences. With years of experience and a global network, we ensure that every aspect of your travel is handled with care and professionalism.
          </p>
        </section>

        {/* Core Values & Commitment */}
        <section data-aos="fade-up" data-aos-anchor-placement="top-center">
          <h2 className='text-[20px] md:text-[22px] lg:text-[25px] text-[#02073e] font-bold leading-[2rem] md:leading-[3rem]'>
            Our Core Values & Commitment
          </h2>
          <p className='mt-[1.5rem] mb-[1.5rem] text-black opacity-90 text-[15px] md:text-[16px]'>
            We believe in delivering exceptional service with integrity, innovation, and sustainability. Our team is committed to providing:
          </p>
          {["Personalized Travel Experiences", "Sustainable & Responsible Tourism", "24/7 Customer Support & Guidance", "Expertise Across Global Destinations"].map((value, index) => (
            <div key={index} className='flex items-center mb-[1rem] space-x-3'>
              <CheckIcon className='w-[1.3rem] h-[1.3rem] text-red-600' />
              <p className='text-[17px] text-[#02073e] font-[500]'>
                {value}
              </p>
            </div>
          ))}
        </section>

        {/* Call to Action (CTA) */}
        <section data-aos="fade-left" data-aos-anchor-placement="top-center">
          <h2 className='text-[20px] md:text-[22px] lg:text-[25px] text-[#02073e] font-bold leading-[2rem] md:leading-[3rem]'>
            Ready to Explore the World?
          </h2>
          <p className='mt-[1.5rem] mb-[1.5rem] text-black opacity-90 text-[15px] md:text-[16px]'>
            Let us plan your dream vacation. Get in touch with our travel experts today and start your journey to amazing destinations across the globe.
          </p>
          <a href="#contactUs">
            <button 
              className='mt-[1rem] px-6 py-3 bg-red-600 text-white rounded-md text-[16px] font-bold transition duration-300 ease-in-out hover:bg-red-700'>
              Contact Us Now
            </button>
          </a>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
