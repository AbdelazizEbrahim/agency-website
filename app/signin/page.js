'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react'; // Import useSession to check user session
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import ButtonBlue from '../components/Buttons/ButtonBlue';
import Image from 'next/image';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession(); // Get the current session

  // Redirect to home if user is already authenticated
  if (session) {
    router.push('/');
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else {
      // Successful login, redirect to home page
      router.push('/');
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 py-10'>
      <div className='flex items-center justify-center h-[80vh]'>
        <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
          <h2 className='text-2xl font-bold mb-4 text-center'>Sign In</h2>
          <form className='space-y-4' onSubmit={handleSignIn}>
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
              <ButtonBlue text={loading ? 'Signing In...' : 'Sign In'} disabled={loading} />
            </div>
            {error && <p className='text-red-500 text-center'>{error}</p>}
          </form>
          <div className='flex items-center justify-center mt-4'>
            <button 
              onClick={() => signIn('google', { callbackUrl: '/' })} 
              className='border border-double flex items-center gap-2 justify-center p-2 rounded w-full'
            >
              <Image 
                src='/google.png' 
                alt='Google Logo' 
                width='24' 
                height='24' 
              />
              <p className='text-center'>Login with Google</p>
            </button>
          </div>
          <p className='mt-4 text-center text-gray-600'>
            Don’t have an account?{' '}
            <Link href='/signup' className='text-blue-500 hover:underline'>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
