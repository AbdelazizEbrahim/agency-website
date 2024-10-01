'use client'; // Ensure you have this at the top if using Next.js app directory

import { useState } from 'react';
import React, { ChangeEvent, FormEvent } from 'react';
import SupportTeam from '@/public/supportteam.jpg';
import Image from 'next/image';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      // Update the keys to match what the API expects
      const formDataToSend = {
        fullName: formData.fullname,
        phoneNumber: formData.phone,
        email: formData.email,
        message: formData.message,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend), // Send the updated object
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSuccess(true);
      setFormData({
        fullname: '',
        phone: '',
        email: '',
        message: '',
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    } // Close the try-catch block here
  };

  return (
    <div className='pt-[7rem] pb-[3rem]'>
      <div className='w-[80%] mx-auto items-center grid grid-cols-1 lg:grid-cols-2 gap-[rem]'>
        <div className='w-[80%] mx-auto mt-[3rem]'>
          <h2 className='text-[27px] mb-[1rem] font-bold text-[#02073e]'>Contact Us</h2>
          <form onSubmit={handleSubmit} className='bg-gray-100 p-6 rounded-lg'>
            {success && <p className='text-green-500 mb-2'>Message sent successfully!</p>}
            {error && <p className='text-red-500 mb-2'>{error}</p>}

            <div className='mb-4'>
              <label className='block mb-1' htmlFor='fullname'>Full Name</label>
              <input
                type='text'
                id='fullname'
                name='fullname'
                value={formData.fullname}
                onChange={handleChange}
                className='w-full border rounded px-3 py-2'
                required
              />
            </div>

            <div className='mb-4'>
              <label className='block mb-1' htmlFor='phone'>Phone</label>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='w-full border rounded px-3 py-2'
                required
              />
            </div>

            <div className='mb-4'>
              <label className='block mb-1' htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full border rounded px-3 py-2'
                required
              />
            </div>

            <div className='mb-4'>
              <label className='block mb-1' htmlFor='message'>Message</label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                className='w-full border rounded px-3 py-2'
                rows={4}
                required
              />
            </div>

            <button
              type='submit'
              className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </div>
        <div className='hidden'>
          <Image
            data-aos='fade-right'
            data-aos-delay='200'
            data-aos-anchor-placement='top-center'
            src={SupportTeam}
            alt='Support'
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
