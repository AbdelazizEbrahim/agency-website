import React from 'react';
import Image from 'next/image';

interface Props {
  image: string;
  title: string;
  description: string;
}

const ServiceCard = ({ image, title, description }: Props) => {
  return (
    <div className='text-center bg-gray-100 p-4 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105'>
      <Image
        src={image}
        alt='service icon'
        width={90}
        height={90}
        className='mx-auto rounded-full'
      />
      <h1 className='text-[20px] mt-[1.4rem] font-[500] text-[#02073e]'>{title}</h1>
      <p className='mt-[1rem] text-black opacity-90 text-[15px]'>{description}</p>
    </div>
  );
};

export default ServiceCard;
