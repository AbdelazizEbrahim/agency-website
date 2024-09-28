'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ButtonBlue from '../components/Buttons/ButtonBlue';
import Image from 'next/image';
import { signIn } from 'next-auth/react'; // Import signIn from next-auth/react

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading effect
    setError(''); // Clear any previous error message

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), 
    });

    setLoading(false); // Stop loading effect

    if (response.ok) {
      const data = await response.json();
      console.log('Sign Up Success:', data);
      window.location.href = '/'; 
    } else {
      const errorData = await response.json();
      console.error('Sign Up Failed:', errorData);
      setError(errorData.message || 'Sign Up Failed. Please try again.'); // Set error message
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' }); // Redirect to home page after sign in
  };

  return (
    <div className='min-h-screen bg-gray-100 py-10 overflow-hidden'>
      <div className='flex items-center justify-center h-[80vh]'>
        <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
          <h2 className='text-2xl font-bold mb-4 text-center'>Sign Up</h2>
          <form className='space-y-4' onSubmit={handleSignUp}>
            <input
              type='email'
              placeholder='Email'
              className='w-full p-2 border border-gray-300 rounded'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              className='w-full p-2 border border-gray-300 rounded'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='flex justify-center mt-6'>
              <ButtonBlue text={loading ? 'Signing Up...' : 'Sign Up'} disabled={loading} />
            </div>
            {error && <p className='text-red-500 text-center'>{error}</p>} {/* Error message */}
          </form>

          <div className='flex items-center justify-center mt-4'>
            <button 
              onClick={handleGoogleSignIn} // Call handleGoogleSignIn on click
              className='border border-double flex items-center gap-2 justify-center p-2 rounded w-full'
            >
              <Image src={'/google.png'} alt='Google Logo' width='24' height='24' />
              <p className='text-center'>Login with Google</p>
            </button>
          </div>

          <p className='mt-4 text-center text-gray-600'>
            Already have an account?{' '}
            <Link href='/signin' className='text-blue-500 hover:underline'>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
