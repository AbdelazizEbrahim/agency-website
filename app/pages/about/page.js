'use client';

import React, { useState, useEffect } from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/20/solid';
import { fetchUserData } from '../../utils/userData';
import { useSession } from 'next-auth/react';

const AdminAboutPage = () => {
  const { data: session, status } = useSession();
  const [texts, setTexts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [, setEditIndex] = useState(null);
  const [coreValues, setCoreValues] = useState([]);
  const [coreValueInput, setCoreValueInput] = useState('');
  const [showTextForm, setShowTextForm] = useState(false);
  const [showCoreValueForm, setShowCoreValueForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUserData(session?.user?.email);
      setIsAdmin(data?.isAdmin || false);
    };
    getUserData();
    fetchAboutTexts();
    fetchCoreValues();
  }, [session]);

  const fetchAboutTexts = async () => {
    const response = await fetch('/api/aboutText');
    const data = await response.json();
    console.log("about texts: ", data);
    setTexts(data);
  };

  const fetchCoreValues = async () => {
    // Replace with your API call
    const response = await fetch('/api/coreValues');
    const data = await response.json();
    console.log("core data: ", data);
    setCoreValues(data);
  };

  const handleAddText = async () => {
    const newText = {
      title,
      description,
      orderNumber: Number(orderNumber),
    };

    if (isEditing) {
      await updateText(newText); 
      setIsEditing(false);
      setEditIndex(null);
    } else {
      await createText(newText); 
    }

    resetForm();
    fetchAboutTexts(); // Refresh the list
  };


  const createText = async (newText) => {
    // Replace with your API call
    console.log("new text: ", newText);
    await fetch('/api/aboutText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title: newText.title, description: newText.description, orderNumber: newText.orderNumber }),
    });
  };

  const updateText = async (updatedText) => {
    // Replace with your API call
    console.log("updated text: ", updatedText);
    await fetch('/api/aboutText', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({_id: updatedText._id, title: updatedText.title, description: updatedText.description, orderNumber: updatedText.orderNumber}),
    });
  };

  const deleteText = async (_id) => {
    // Replace with your API call
    await fetch('/api/aboutText', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({_id})
    })
    fetchAboutTexts(); // Refresh the list
  };

  const editText = (index) => {
    const textToEdit = texts[index];
    setTitle(textToEdit.title);
    setDescription(textToEdit.description);
    setOrderNumber(textToEdit.orderNumber);
    setIsEditing(true);
    setEditIndex(index);
    setShowTextForm(true);
  };

  const handleAddCoreValue = async () => {
    if (coreValueInput.trim()) {
      await createCoreValue(coreValueInput); // Core value API call
      setCoreValueInput('');
      fetchCoreValues(); // Refresh the list
    }
  };

  const createCoreValue = async (coreValue) => {
    console.log("new core: ", coreValue);
    await fetch('/api/coreValues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({coreValue }), 
    });
    fetchCoreValues(); 
  };
  

  const deleteCoreValue = async (_id) => {
    try {
      console.log("Deleting core value ID: ", _id);
      
      const response = await fetch(`/api/coreValues`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id }), // Ensure this is an object
      });
      
      if (response.ok) {
        console.log("Core value deleted successfully");
        fetchCoreValues(); // Refresh the list
      } else {
        console.error("Failed to delete core value");
      }
    } catch (error) {
      console.error("Error deleting core value:", error);
    }
  };
  

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setOrderNumber('');
    setShowTextForm(false); // Hide the form after adding/updating
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    console.log(isAdmin);
    return <div className="mt-20 text-red-500">You are not admin</div>;
  }

  return (
    <div className='pt-[5rem] pb-[3rem] w-[80%] mx-auto lg:w-1/2'>
      <h1 className='text-2xl font-bold mb-5'>Admin About Page Management</h1>

      {/* Add About Page Text Form */}
      <div className='mb-5'>
        <button
          onClick={() => {
            resetForm();
            setShowTextForm(!showTextForm); // Toggle form visibility
          }}
          className='bg-blue-600 text-white rounded px-4 py-2 mb-2'>
          {showTextForm ? 'Cancel' : 'Add Text'}
        </button>

        {showTextForm && (
          <div className='flex flex-col mb-5'>
            <input
              type='text'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border border-gray-300 rounded p-2 mb-2'
            />
            <textarea
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='border border-gray-300 rounded p-2 mb-2'
              rows='4'
            />
            <input
              type='number'
              placeholder='Order Number'
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className='border border-gray-300 rounded p-2 mb-2'
            />
            <button
              onClick={handleAddText}
              className='bg-green-600 text-white rounded px-4 py-2'>
              {isEditing ? 'Update' : 'Add Text'}
            </button>
          </div>
        )}
      </div>

      {/* List of About Page Texts */}
      <div className='mb-5'>
        <h2 className='text-xl font-bold'>About Page Texts</h2>
        {texts.map((text, index) => (
          <div key={index} className='flex justify-between items-center border-b py-2'>
            <div>
              <div className='flex'>
                <label className='mr-3'>Title:  </label>
                <h3 className='font-semibold'>{text.title}</h3>
              </div>
              <div className='flex'>
                <label className='mr-3'>Description: </label>
                <p>{text.description}</p>
              </div>
            </div>
            <div className='flex space-x-2'>
              <button onClick={() => editText(index)} className='text-green-600'>
                <PencilIcon className='w-5 h-5' />
              </button>
              <button onClick={() => deleteText(text._id)} className='text-red-600'>
                <TrashIcon className='w-5 h-5' />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Core Value */}
      <div className='mb-5'>
        <h2 className='text-xl font-bold'>Core Values</h2>
        <button
          onClick={() => setShowCoreValueForm(!showCoreValueForm)} // Toggle form visibility
          className='bg-blue-600 text-white rounded px-4 py-2 mb-2'>
          {showCoreValueForm ? 'Cancel' : 'Add Core Value'}
        </button>

        {showCoreValueForm && (
          <div className='flex mb-2'>
            <input
              type='text'
              placeholder='New Core Value'
              value={coreValueInput}
              onChange={(e) => setCoreValueInput(e.target.value)}
              className='border border-gray-300 rounded p-2 mr-2'
            />
            <button
              onClick={handleAddCoreValue}
              className='bg-green-600 text-white rounded px-4 py-2'>
              Add Core Value
            </button>
          </div>
        )}
          {coreValues.map((coreValue, index) => (
            <div key={index} className='flex justify-between items-center border-b py-2'>
              <p>{coreValue.coreValue}</p> 
              <button onClick={() => deleteCoreValue(coreValue._id)} className='text-red-600'>
                <TrashIcon className='w-5 h-5' />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminAboutPage;
