'use client';

import React, { useState, useEffect } from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/20/solid';
import { fetchUserData } from '../../utils/userData';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import toast from "react-hot-toast";

const AdminAboutPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter(); // Initialize useRouter
    const [texts, setTexts] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [coreValues, setCoreValues] = useState([]);
    const [coreValueInput, setCoreValueInput] = useState('');
    const [showTextForm, setShowTextForm] = useState(false);
    const [showCoreValueForm, setShowCoreValueForm] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            const data = await fetchUserData(session?.user?.email);
            setIsAdmin(data?.isAdmin || false);
            setIsSuperAdmin(data?.isSuperAdmin || false);

            if (!data?.isAdmin && !data?.isSuperAdmin) {
                router.push('/'); 
            }
        };

        if (session) {
            getUserData();
            fetchAboutTexts();
            fetchCoreValues();
        }
    }, [session]);

    const fetchAboutTexts = async () => {
        const response = await fetch('/api/aboutText');
        const data = await response.json();
        setTexts(data);
    };

    const fetchCoreValues = async () => {
        const response = await fetch('/api/coreValues');
        const data = await response.json();
        setCoreValues(data);
    };

    const handleAddText = async () => {
        const newText = { title, description, _id: editId };

        if (isEditing) {
            await toast.promise(updateText(newText), {
                loading: 'Updating text...',
                success: 'Text updated successfully!',
                error: 'Error updating text',
            });
            setIsEditing(false);
            setEditId(null);
        } else {
            await toast.promise(createText(newText), {
                loading: 'Saving text...',
                success: 'Text saved successfully!',
                error: 'Error saving text',
            });
        }

        resetForm();
        fetchAboutTexts();
    };

    const createText = async (newText) => {
        await fetch('/api/aboutText', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newText.title, description: newText.description }),
        });
    };

    const updateText = async (updatedText) => {
        await fetch('/api/aboutText', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: updatedText._id, title: updatedText.title, description: updatedText.description }),
        });
    };

    const deleteText = async (_id) => {
        await toast.promise(
            fetch('/api/aboutText', {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id }),
            }),
            {
                loading: 'Deleting text...',
                success: 'Text deleted successfully!',
                error: 'Error deleting text',
            }
        );
        fetchAboutTexts();
    };

    const editText = (index) => {
        const textToEdit = texts[index];
        setTitle(textToEdit.title);
        setDescription(textToEdit.description);
        setEditId(textToEdit._id);
        setIsEditing(true);
        setShowTextForm(true);
    };

    const handleAddCoreValue = async () => {
        if (coreValueInput.trim()) {
            await toast.promise(createCoreValue(coreValueInput), {
                loading: 'Adding core value...',
                success: 'Core value added successfully!',
                error: 'Error adding core value',
            });
            setCoreValueInput('');
            fetchCoreValues();
        }
    };

    const createCoreValue = async (coreValue) => {
        await fetch('/api/coreValues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coreValue }),
        });
    };

    const deleteCoreValue = async (_id) => {
        await toast.promise(
            fetch(`/api/coreValues`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id }),
            }),
            {
                loading: 'Deleting core value...',
                success: 'Core value deleted successfully!',
                error: 'Error deleting core value',
            }
        );
        fetchCoreValues();
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setShowTextForm(false);
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if ( isAdmin || isSuperAdmin){
        return (
            <div className='pt-[5rem] pb-[3rem] w-[80%] mx-auto lg:w-1/2'>
                <h1 className='text-2xl font-bold mb-5'>Admin About Page Management</h1>
    
                {/* Add About Page Text Form */}
                <div className='mb-5'>
                    <button
                        onClick={() => {
                            resetForm();
                            setShowTextForm(!showTextForm);
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
                            <button
                                onClick={handleAddText}
                                className='bg-green-600 text-white rounded px-4 py-2'>
                                {isEditing ? 'Update Text' : 'Save Text'}
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
                        onClick={() => setShowCoreValueForm(!showCoreValueForm)}
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
                                Save Core Value
                            </button>
                        </div>
                    )}
                    {coreValues.map((coreValue) => (
                        <div key={coreValue._id} className='flex justify-between items-center border-b py-2'>
                            <p>{coreValue.coreValue}</p>
                            <button onClick={() => deleteCoreValue(coreValue._id)} className='text-red-600'>
                                <TrashIcon className='w-5 h-5' />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default AdminAboutPage;
