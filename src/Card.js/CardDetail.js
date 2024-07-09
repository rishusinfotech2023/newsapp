import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CardDetail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [error, setError]= useState('');

  // console.log("a",id)

  useEffect(() => {
    const getCard = async () => {
      try {
        const response = await axios.get(`https://news-dyf7.onrender.com/getonecard/${id}`);
        setCard(response.data);
        console.log(response.data)
      } catch (error) {
        setError('Error fetching card details');
      }
    };
  
    getCard();
  }, [id]);
  

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="max-w-xl mx-auto p-4">
      <img src={card.image.url} alt={card.headline} className="w-full h-auto object-cover mb-4" />
      <h2 className="text-2xl font-bold mb-2">{card.headline}</h2>
      <p className="text-base text-gray-700">{card.description}</p>
    </div>
    </>
  );
};
export default CardDetail;
