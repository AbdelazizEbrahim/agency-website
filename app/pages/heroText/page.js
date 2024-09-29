'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { storage } from '../utils/firebase'; 
import { fetchUserData } from '../../utils/userData';

const HeroText = () => {
  const { data: session, status } = useSession();
  const [, setUserData] = useState(null);
  const [heroTextData, setHeroTextData] = useState({ title: '', text: '', image: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUserData(session?.user?.email);
      setUserData(data);
      setIsAdmin(data?.isAdmin || false);
    };

    const fetchHeroText = async () => {
      try {
        const response = await fetch('/api/heroText');
        if (response.ok) {
          const data = await response.json();
          setHeroTextData(data);
        }
      } catch (error) {
        console.error('Error fetching hero text:', error);
      }
    };

    getUserData();
    fetchHeroText();
  }, [session?.user?.email]);

  // const handleFileChange = (ev) => {
  //   setLoading(true);
  //   const file = ev.target.files[0];
  //   if (file) {
  //     handleUpload(file);
  //   }
  // };

  // const handleUpload = (file) => {
  //   const fileRef = ref(storage, `images/${file.name}`);
  //   const uploadTask = uploadBytesResumable(fileRef, file);

  //   uploadTask.on(
  //     'state_changed',
  //     null,
  //     (error) => {
  //       console.error('Error uploading file:', error);
  //       setLoading(false); // Stop loading in case of an error
  //     },
  //     async () => {
  //       const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
  //       setHeroTextData((prev) => ({ ...prev, image: downloadUrl }));
  //       setLoading(false); // Stop loading after successful upload
  //     }
  //   );
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/heroText', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heroTextData),
      });

      if (!response.ok) {
        throw new Error('Failed to update hero text');
      }

      // const data = await response.json();
      // console.log('Updated hero text successfully:', data);
    } catch (error) {
      console.error('Error submitting hero text:', error);
    } finally {
      setLoading(false); 
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (heroTextData && !isAdmin) {
    return <div className="mt-20 text-red-500">You are not admin</div>;
  }

  return (
    <div className="mt-20 ml-5 mr-5 flex flex-col lg:w-3/5 overflow-hidden">
      {/* Text Section */}
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
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Update Hero Text'}
          </button>
        </form>
      </div>
      {/* Image Section */}
      {/* <div className="w-2/3 sm:w-full pr-4">
        {heroTextData.image ? (
          <img
            src={heroTextData.image}
            alt="Hero"
            className="w-full h-auto rounded mb-4"
          />
        ) : (
          <div className="h-32 bg-gray-300 flex items-center justify-center mb-4 rounded">
            No Image
          </div>
        )}
        <input type="file" onChange={handleFileChange} className="mb-2" />
      </div> */}
    </div>

  );
};

export default HeroText;
