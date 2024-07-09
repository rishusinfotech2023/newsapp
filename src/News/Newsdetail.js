import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Newsdetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const getnewDetail = async () => {
      try {
        const response = await axios.get(`https://news-dyf7.onrender.com/getonecard/${id}`);
        console.log("response", response.data);

        if (response.data) {
          setNews(response.data);
        } else {
          console.error('Card not found:', response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getnewDetail();
  }, [id]);

  if (!news) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <img src={news.image.url} alt={news.headline}  className="w-full h-auto object-cover mb-4" loading="lazy" />
      <div className="p-2">
        <h2 className="text-2xl font-bold mb-2">{news.headline}</h2>
        <p className="text-base text-gray-700">{news.description}</p>
      </div>
    </div>
  );
}

export default Newsdetail;
