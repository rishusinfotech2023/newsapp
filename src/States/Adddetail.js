import React, { useState } from 'react';
import { useAuth } from '../Admineditor.js/AuthProvider';
import axios from 'axios';

const Adddetail = ({ onAddnews }) => {
  const [addImage, setAddImage] = useState(null);
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const { isAuthenticated, token } = useAuth();

  const AddImage = async () => {
    const formData = new FormData();
    formData.append('file', addImage);
    formData.append('headline', headline);
    formData.append('description', description);
    formData.append('state', state);
    formData.append('district', district);
    formData.append('city', city);

    try {
      const response = await axios.post(
        'https://news-dyf7.onrender.com/news', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.data;
      onAddnews({ image: { url: URL.createObjectURL(addImage) }, headline: headline, description: description, state: state, district: district, city: city });
      setAddImage('');
      setHeadline('');
      setDescription('');
      setState('');
      setDistrict('');
      setCity('');
    } catch (error) {
      console.log(`Error adding image:${error.message}`);
      setError(`Error adding image: ${error.message}`);
    }
  }

  return (
    <>
      <div className="image-uploader">
        <h2>Add New state district city image heading description News</h2>
        <input type="file" accept='image/*' onChange={(e) => setAddImage(e.target.files[0])} />
        <input type="text" placeholder='Add Headline' value={headline} onChange={(e) => setHeadline(e.target.value)} /><br />
        <input type="text" placeholder='Add Description' value={description} onChange={(e) => setDescription(e.target.value)} /><br />
        <input type="text" placeholder='Add State' value={state} onChange={(e) => setState(e.target.value)} /><br />
        <input type="text" placeholder='Add District' value={district} onChange={(e) => setDistrict(e.target.value)} /><br />
        <input type="text" placeholder='Add City' value={city} onChange={(e) => setCity(e.target.value)} /><br />
        <button className='Rounded bg-green-500 h-8 w-36' onClick={AddImage}>Add Here</button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </>
  )
}

export default Adddetail;