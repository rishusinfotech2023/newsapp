import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Admineditor.js/AuthProvider';

const Addtech = () => {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [newHeadline, setNewHeadline] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [error, setError] = useState('');

  const { isAuthenticated, token } = useAuth(); 
  
  const addImage = async () => {
    if (!newImage || !newHeadline || !newDescription) {
      setError('Please fill out all fields');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', newImage);
    formData.append('headline', newHeadline);
    formData.append('description', newDescription);
  
    try {
      const response = await axios.post(
        'https://news-dyf7.onrender.com/technology',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );
  
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = response.data;
      setImages(prevImages => [
        ...prevImages,
        { 
          image: URL.createObjectURL(newImage), 
          headline: newHeadline, 
          description: newDescription 
        }
      ]);
      setNewImage(null);
      setNewHeadline('');
      setNewDescription('');
    } catch (error) {
      console.error(`Error adding image: ${error.message}`);
      setError(`Error adding image: ${error.message}`);
    }
  };

  return (
    <div className="image-uploader space-y-4">
      <h2>Add New Technology News</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setNewImage(e.target.files[0])}
       />
      <input
        type="text"
        className='p-2'
        placeholder="Headline"
        value={newHeadline}
        onChange={(e) => setNewHeadline(e.target.value)}
      />
      <input
        type="text"
        className='h-auto p-8'
        placeholder="Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button className='rounded bg-green-500 h-8 w-36' onClick={addImage}>Upload</button>
    </div>
  );
};

export default Addtech;