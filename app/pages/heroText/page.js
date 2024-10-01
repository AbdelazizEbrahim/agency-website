'use client'

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { fetchUserData } from '../../utils/userData';
import toast from 'react-hot-toast';

const HeroText = () => {
  const { data: session, status } = useSession();
  const [, setUserData] = useState(null);
  const [heroTextData, setHeroTextData] = useState({ title: '', text: '', image: '' });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      if (session?.user?.email) {
        try {
          const data = await fetchUserData(session.user.email);
          setUserData(data);
          setIsAdmin(data?.isAdmin || false);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    const fetchHeroText = async () => {
      try {
        const response = await fetch('/api/heroText');
        if (response.ok) {
          const data = await response.json();
          setHeroTextData(data);
        } else {
          throw new Error('Failed to fetch hero text');
        }
      } catch (error) {
        toast.error('Failed to fetch hero text');
        console.error('Error fetching hero text:', error);
      }
    };

    getUserData();
    fetchHeroText();
  }, [session?.user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/heroText', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heroTextData),
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: 'Saving hero text...',
      success: 'Hero text updated successfully!',
      error: 'Error updating hero text',
    });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div className="mt-20 text-red-500">You are not admin</div>;
  }

  return (
    <div className="mt-20 ml-5 mr-5 flex flex-col lg:w-3/5 overflow-hidden">
      <div className="lg:w-2/3 sm:w-full mb-6 sm:ml-8 sm:mr-8">
        <h1 className="text-xl font-bold mb-4">Update Hero Text</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Title</label>
            <textarea
              value={heroTextData.title}
              onChange={(e) =>
                setHeroTextData((prev) => ({ ...prev, title: e.target.value }))
              }
              rows={3}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block mb-1">Text</label>
            <textarea
              value={heroTextData.text}
              onChange={(e) =>
                setHeroTextData((prev) => ({ ...prev, text: e.target.value }))
              }
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Hero Text
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroText;
