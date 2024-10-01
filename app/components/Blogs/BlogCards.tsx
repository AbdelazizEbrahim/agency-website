import React from 'react';
import Image from 'next/image';

interface Props {
  image: string;
  title: string;
  content: string;
  date: string; 
  author: string;
}

const BlogCard = ({ image, title, content, author, date }: Props) => {
  return (
    <div className='text-center bg-white px-2 py-6 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer m-5'>
      <Image
        src={image}
        alt='blog post image'
        width={200} 
        height={150} 
        className='mx-auto' 
      />
      <div className='flex text-[24px] mt-4 font-[600] text-[#02073e]'>
        <label className='mr-2'>Title: </label>
        <h1 className=''>{title}</h1>
      </div>
      <div className='flex mt-2 text-gray-600 text-[14px]'>
        <label className='mr-2'>Content: </label>
        <p className=''>{content}</p>
      </div>
      <div className='flex mt-2 text-gray-600 text-[14px]'>
        <label className='mr-2'>Date: </label>
        <p className=''>{date}</p>
      </div>
      <div className='flex mt-2 text-gray-400 text-[14px] text-right justify-end'>
        <label className=' mr-2'> Author: </label>
        <p className=''>{author}</p>
      </div>
    </div>
  );
};

export default BlogCard;
