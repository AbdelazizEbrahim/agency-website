'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchUserData } from '../../utils/userData';
import { useSession } from 'next-auth/react'; 
import toast from 'react-hot-toast'; 
import { useRouter } from 'next/navigation';

const DashBoard = () => {
  const { data: session } = useSession(); 
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      if (session?.user?.email) {
        try {
          const data = await fetchUserData(session.user.email);
          setUserData(data);
          setIsAdmin(data?.isAdmin || data?.isSuperAdmin || false);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/signup', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        setUsers(data); // Set the fetched users
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    getUserData().then(() => {
      fetchUsers();
    });
  }, [session]); // Depend on session to re-fetch if it changes

  // Redirect if the user is not an admin or super admin
  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/'); // Redirect to home page
    }
  }, [loading, isAdmin, router]);

  // Handle the change of the admin checkbox
  const handleAdminToggle = async (userId, currentIsAdmin) => {
    const newIsAdmin = !currentIsAdmin; // Toggle the admin status

    // Update the local state immediately
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, isAdmin: newIsAdmin } : user
      )
    );

    // Show loading toast
    const loadingToast = toast.loading(`Updating admin status...`);

    try {
      const response = await fetch(`/api/signup`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: userId, isAdmin: newIsAdmin }),
      });

      if (!response.ok) {
        throw new Error('Failed to update admin status');
      }

      // Show success notification
      toast.success(`Admin status updated successfully`, {
        id: loadingToast,
      });
    } catch (error) {
      console.error('Error updating admin status:', error);

      // Optionally revert back to the previous state if the update fails
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isAdmin: currentIsAdmin } : user
        )
      );

      // Show error notification
      toast.error('Error updating admin status', {
        id: loadingToast,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-20'>
      <h1 className='font-semibold text-lg ml-10'>Admin DashBoard</h1>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className='text-center p-5 border rounded-lg'>
              <Image
                src={user.image || '/user.png'}
                alt={user.name}
                width={100}
                height={100}
                className='rounded-full'
              />
              <p className='font-semibold'>{user.name}</p>
              <p>{user.email}</p>
              <label className='flex items-center justify-center gap-2'>
                <input
                  type='checkbox'
                  checked={user.isAdmin}
                  onChange={() => handleAdminToggle(user._id, user.isAdmin)}
                />
                <span>Make Admin</span>
              </label>
            </div>
          ))
        ) : (
          <div>No users found</div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
