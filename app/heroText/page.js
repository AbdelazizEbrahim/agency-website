'use client'

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const HeroText = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [heroTextData, setHeroTextData] = useState({ title: '', text: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [formMode, setFormMode] = useState('POST');
  

  useEffect(() => {
    // Fetch user data and check if the user is admin
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/signup?email=${encodeURIComponent(session.user.email)}`);
          const data = await response.json();

          setUserData(data);
          console.log("data:", data);
          setIsAdmin(data?.isAdmin || false); // Check if the user is an admin
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    // Fetch the hero text data from the API
    const fetchHeroText = async () => {
      try {
        const response = await fetch('/api/heroText');
        if (response.ok) {
          const data = await response.json();
          setHeroTextData(data);
          console.log("hero text data: ", data);
          setFormMode('PUT'); 
        } else {
          setFormMode('POST'); 
        }
      } catch (error) {
        console.error('Error fetching hero text:', error);
      }
    };

    fetchUserData();
    fetchHeroText();
  }, [session?.user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/heroText', {
        method: formMode,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heroTextData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${formMode === 'POST' ? 'create' : 'update'} hero text`);
      }

      const data = await response.json();
      console.log(`${formMode === 'POST' ? 'Created' : 'Updated'} hero text successfully:`, data);
    } catch (error) {
      console.error('Error submitting hero text:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div className="mt-20 text-red-500">You are not admin</div>;
  }

  return (
    <div className="mt-20 ml-20">
      <h1 className="text-xl font-bold mb-4">{formMode === 'POST' ? 'Create Hero Text' : 'Update Hero Text'}</h1>

      <form onSubmit={handleSubmit} className="space-y-4 w-2/3 ">
        <div>
          <label htmlFor="title" className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-2 border border-gray-300 rounded"
            value={heroTextData.title}
            onChange={(e) => setHeroTextData({ ...heroTextData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="text" className="block font-semibold mb-2">Text</label>
          <textarea
            id="text"
            name="text"
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            value={heroTextData.text}
            onChange={(e) => setHeroTextData({ ...heroTextData, text: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {formMode === 'POST' ? 'Create Hero Text' : 'Update Hero Text'}
        </button>
      </form>
    </div>
  );
};

export default HeroText;
