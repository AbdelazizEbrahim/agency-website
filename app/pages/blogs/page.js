'use client';

import React, { useState, useEffect } from 'react';
import BlogCard from '../../components/Blogs/BlogCards';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/firebase';
import { fetchUserData } from '../../utils/userData';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const Blog = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newPost, setNewPost] = useState({ image: '', title: '', content: '' });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchUserDataAndPosts = async () => {
      const userData = await fetchUserData(session?.user?.email);
      setIsAdmin(userData?.isAdmin || false);
      setAuthor(userData?.name.split(' ')[0]);
      
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setFetching(false);
      }
    };
    
    fetchUserDataAndPosts();
  }, [session?.user?.email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleUpload(file);
  };

  const handleUpload = (file) => {
    const fileRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.error('Error uploading file:', error);
        toast.error('Error uploading image');
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setNewPost((prev) => ({ ...prev, image: downloadUrl }));
        toast.success('Image uploaded successfully');
      }
    );
  };

  const saveOrUpdatePost = async () => {
    const method = newPost._id ? 'PUT' : 'POST';
    newPost.author = author;
    const response = await fetch('/api/blog', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    });

    const savedPost = await response.json();
    setPosts((prev) => newPost._id ? prev.map(post => post._id === savedPost._id ? savedPost : post) : [...prev, savedPost]);
    toast.success(newPost._id ? 'Post updated successfully' : 'Post added successfully');

    // Reset form
    setNewPost({ image: '', title: '', content: '' });
    setShowForm(false);
  };

  const updatePost = (index) => {
    setNewPost(posts[index]);
    setShowForm(true);
  };

  const deletePost = async (index) => {
    const postToDelete = posts[index];
    const response = await fetch('/api/blog', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: postToDelete._id }),
    });

    if (response.ok) {
      setPosts((prev) => prev.filter((_, i) => i !== index));
      toast.success('Post deleted successfully');
    }
  };

  if (status === 'loading' || fetching) return <div>Loading...</div>;
  if (!isAdmin) return <div className="mt-20 text-red-500">You are not admin</div>;

  return (
    <div className='mt-20 m-10'>
      <h1 className='text-xl font-bold mb-6'>Blog Posts</h1>
      <button onClick={() => setShowForm(!showForm)} className='mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
        {showForm ? 'Close Form' : 'Add Post'}
      </button>

      {showForm && (
        <div className='bg-gray-100 px-2 py-6 rounded-lg mb-8 lg:w-2/3 lg:flex md:flex'>
         <div>
          <h2 className='text-lg font-semibold mb-4'>Add New Post</h2>
            <div className='mb-4'>
              <label className='block mb-2'>Image</label>
              <input type='file' onChange={handleFileChange} />
              {newPost.image && <img src={newPost.image} alt="Uploaded" className="mt-2 w-1/2 h-auto" />}
            </div>
         </div>
          <div>
            <div className='mb-4'>
              <label className='block mb-2'>Title</label>
              <input type='text' name='title' value={newPost.title} onChange={handleInputChange} className='w-full border rounded px-2 py-1' />
            </div>
            <div className='mb-4'>
              <label className='block mb-2'>Content</label>
              <textarea name='content' value={newPost.content} onChange={handleInputChange} className='w-full border rounded px-2 py-1' />
            </div>
            <button onClick={saveOrUpdatePost} disabled={loading} className={`px-4 py-2 ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded hover:bg-blue-600`}>
              {loading ? 'Uploading...' : newPost._id ? 'Update Post' : 'Add Post'}
            </button>
          </div>
        </div>
      )}

      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
        {posts.map((post) => (
          <div key={post._id} className='relative'>
            <BlogCard image={post.image} title={post.title} content={post.content} date={post.date} author={post.author} />
            <div className='absolute top-2 right-2'>
              <button onClick={() => updatePost(posts.indexOf(post))} className='mr-2 text-green-600'>Edit</button>
              <button onClick={() => deletePost(posts.indexOf(post))} className='text-red-600'>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
