'use client';

import React, { useState, useEffect } from 'react';
import ServiceCard from '../../components/Services/ServiceCard'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/firebase';
import { fetchUserData } from '../../utils/userData';
import { useSession } from 'next-auth/react';

const Services = () => {
  const { data: session, status } = useSession();
  const [services, setServices] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newService, setNewService] = useState({
    image: '',
    title: '',
    description: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // State for fetching services
  const [, setImageUploaded] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUserData(session?.user?.email);
      setIsAdmin(data?.isAdmin || false);
    };

    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setFetching(false); // Set fetching to false when done
      }
    };

    getUserData();
    fetchServices();
  }, [session?.user?.email]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (ev) => {
    const file = ev.target.files[0];
    if (file) {
      setLoading(true);
      handleUpload(file);
    }
  };

  const handleUpload = (file) => {
    const fileRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.error('Error uploading file:', error);
        setLoading(false);
        setImageUploaded(false);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setNewService((prev) => ({ ...prev, image: downloadUrl }));
        setLoading(false);
        setImageUploaded(true);
      }
    );
  };

  const saveOrUpdateService = async () => {
    if (newService._id) {
      const response = await fetch('/api/services', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });

      const updatedService = await response.json();
      setServices((prev) =>
        prev.map((service) =>
          service._id === updatedService._id ? updatedService : service
        )
      );
    } else {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });

      const addedService = await response.json();
      setServices((prev) => [...prev, addedService]);
    }

    setNewService({ image: '', title: '', description: '' });
    setShowForm(false);
    setImageUploaded(false);
  };

  // Update service
  const updateService = (index) => {
    const serviceToUpdate = services[index];
    setNewService(serviceToUpdate);
    setShowForm(true);
  };

  // Delete service
  const deleteService = async (index) => {
    const serviceToDelete = services[index];
    const response = await fetch('/api/services', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: serviceToDelete._id }),
    });

    if (response.ok) {
      setServices((prev) => prev.filter((_, i) => i !== index));
    }
  };

  if (status === 'loading' || fetching) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div className="mt-20 text-red-500">You are not admin</div>;
  }

  return (
    <div className='mt-20 m-10 '>
      <h1 className='text-xl font-bold mb-6'>Services</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className='mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
      >
        {showForm ? 'Close Form' : 'Add Service'}
      </button>

      {showForm && (
        <div className='bg-gray-100 p-6 rounded-lg mb-8 lg:w-1/2'>
          <h2 className='text-lg font-semibold mb-4'>Add New Service</h2>
          <div className='mb-4'>
            <label className='block mb-2'>Image</label>
            <input type='file' onChange={handleFileChange} />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Title</label>
            <input
              type='text'
              name='title'
              value={newService.title}
              onChange={handleInputChange}
              className='w-full border rounded px-2 py-1'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Description</label>
            <textarea
              name='description'
              value={newService.description}
              onChange={handleInputChange}
              className='w-full border rounded px-2 py-1'
            />
          </div>
          <button
            onClick={saveOrUpdateService}
            disabled={loading}
            className={`px-4 py-2 ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded hover:bg-blue-600`}
          >
            {loading ? 'Uploading...' : newService._id ? 'Update Service' : 'Add Service'}
          </button>
        </div>
      )}

      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
        {services.map((service) => (
          <div key={service._id} className='relative'>
            <ServiceCard
              image={service.image}
              title={service.title}
              description={service.description}
            />
            <div className='absolute top-2 right-2'>
              <button
                onClick={() => updateService(services.indexOf(service))}
                className='mr-2 text-green-600'
              >
                Edit
              </button>
              <button
                onClick={() => deleteService(services.indexOf(service))}
                className='text-red-600'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
