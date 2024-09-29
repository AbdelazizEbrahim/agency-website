'use client';

import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import ButtonBlue from '../Buttons/ButtonBlue';
import ButtonRed from '../Buttons/ButtonRed';
import { Bars3BottomRightIcon } from '@heroicons/react/16/solid';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

interface Props {
  openNav: () => void;
}

const Nav = ({ openNav }: Props) => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Fetch user data from the API when the session is available
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/signup?email=${encodeURIComponent(session.user.email)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Error fetching user data');
          }

          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [session?.user?.email]);

  const handleLogout = () => {
    signOut();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="h-[12vh] bg-white shadow-md">
      <div className="w-[85%] flex items-center justify-between mx-auto h-[12vh]">
        <h1 className="text-[16px] md:text-[25px] font-bold text-slate-800">
          <span className="text-[27px] md:text-[40px] text-red-600">R</span>
          ihla
        </h1>

        <ul className="hidden lg:flex items-center space-x-10">
          <li className="text-[17px] cursor-pointer text-red-500">
            <Link href="/">Home</Link>
          </li>
          <li className="text-[17px] cursor-pointer hover:text-red-500 transition-all duration-all">
            <Link href="#services">Services</Link>
          </li>
          <li className="text-[17px] cursor-pointer hover:text-red-500 transition-all duration-all">
            <Link href="#about">About</Link>
          </li>
          <li className="text-[17px] cursor-pointer hover:text-red-500 transition-all duration-all">
            <Link href="#blogs">Blogs</Link>
          </li>
          <li className="text-[17px] cursor-pointer hover:text-red-500 transition-all duration-all">
            <Link href="#contactUs">Contact Us</Link>
          </li>
        </ul>

        <div className="flex items-center space-x-2 md:space-x-5">
          {status === 'authenticated' ? (
            <>
              <ButtonBlue text="Logout" onClick={handleLogout} />
              {userData?.image && (
                <Image
                  src={userData.image}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
              )}
              <div className="relative" ref={dropdownRef}>
                {userData?.isAdmin && dropdownOpen && (
                  <div className="absolute -right-10 mt-8 w-32 bg-white rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Link href="/pages/dashboard">Dashboard</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Link href="/pages/heroText">Hero Text</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Link href="/pages/services">Services</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Link href="/pages/about">About Page</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Link href="/pages/blogs">Blogs</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/pages/signin">
                <ButtonBlue text="Login" />
              </Link>
              <Link href="/pages/signup">
                <ButtonRed text="Sign Up" />
              </Link>
            </>
          )}
          <Bars3BottomRightIcon onClick={openNav} className="w-[1.5rem] lg:hidden h-[1.5rem] text-slate-900 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
