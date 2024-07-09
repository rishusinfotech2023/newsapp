import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const News2detail = () => {
  const { id } = useParams();
  const [news2, setNews2] = useState(null);

  useEffect(() => {
    const getnew2Detail = async () => {
      try {
        const response = await axios.get(`https://news-dyf7.onrender.com/getonenews/${id}`);
        console.log("response", response.data);

        if (response.data) {
            setNews2(response.data);
        } else {
          console.error('Card not found:', response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getnew2Detail();
  }, [id]);

  if (!news2) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <img src={news2.file.url} alt={news2.headline}  className="w-full h-auto object-cover mb-4" loading="lazy" />
      <div className="p-2">
        <h2 className="text-2xl font-bold mb-2">{news2.headline}</h2>
        <p className="text-base text-gray-700">{news2.description}</p>
      </div>
    </div>
  );
}

export default News2detail;
