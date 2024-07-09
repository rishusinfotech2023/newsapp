import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Admineditor.js/AuthProvider';

const ControlAdmin = () => {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [newHeadline, setNewHeadline] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [error, setError] = useState('');
  const [videos, setVideos] = useState([]);
  const [newVideoLink, setNewVideoLink] = useState('');

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
        'https://news-dyf7.onrender.com/breakingnews',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );
  
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = response.data;
      setImages(prevImages => [...prevImages, { image: URL.createObjectURL(newImage), headline: newHeadline, description: newDescription }]);
      setNewImage('');
      setNewHeadline('');
      setNewDescription('');
    } catch (error) {
      console.error(`Error adding image: ${error.message}`);
      setError(`Error adding image: ${error.message}`);
    }
  };

  const addVideo = async () => {
    if (!newVideoLink) return;
    try {
      const response = await axios.post(
        'https://news-dyf7.onrender.com/link',
        { url: newVideoLink },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVideos((prevVideos) => [...prevVideos, response.data]);
      setNewVideoLink('');
    } catch (error) {
      console.error('Error adding video:', error);
    }
  };

  return (
    <>
    <div className="image-uploader">
      <h2>Add New Breaking News</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setNewImage(e.target.files[0])}
      />
      <input
        type="text"
        placeholder="Headline"
        value={newHeadline}
        onChange={(e) => setNewHeadline(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button className='rounded bg-green-500 h-8 w-36' onClick={addImage}>Upload</button>
    </div>

     <div className="flex flex-col items-center space-y-2">
         <input
           type="text"
           value={newVideoLink}
           onChange={(e) => setNewVideoLink(e.target.value)}
           placeholder="Enter video link"
           className="w-full p-2 border rounded"
      />
     <button className="bg-blue-500 text-white p-2 rounded" onClick={addVideo}>
       Add Video
     </button>
     </div>
</>
  );
};

export default ControlAdmin;
