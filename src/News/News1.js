import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  WhatsappIcon
} from "react-share";
import ShareIcon from '@mui/icons-material/Share';

const News1 = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://news-dyf7.onrender.com/getcard");
        console.log("response", response.data);

        if (response.data && Array.isArray(response.data.photos)) {
          setNews(response.data.photos);
        } else {
          console.error('Expected an array but got:', response.data);
          setError('Invalid data format');
        }
      } catch (error) {
        console.log(error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const toggleDropdown = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const closeDropdown = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.isArray(news) && news.length > 0 ? (
          news.map((item, index) => {
            return (
              <div key={item._id} className="relative border rounded-lg shadow-lg p-4">
                <img src={item.image.url} alt={item.url} className="w-full h-64 object-cover rounded-t-lg" loading="lazy" />
                <div className='flex justify-end mt-2'>
                {openDropdowns[index] && (
                    <div className="absolute flex left-20  bg-white shadow-lg rounded">
                      <div className="p-2">
                        <FacebookShareButton url={item.image.url}
                        quote={`${item.headline} - ${item.description}`}
                        onClick={() => closeDropdown(index)}>
                          <FacebookIcon size={30} round={true} />
                        </FacebookShareButton>
                      </div>
                      <div className="p-2">
                        <WhatsappShareButton url={item.image.url}
                        title={`${item.headline} - ${item.description}`}
                        separator=" - "
                        onClick={() => closeDropdown(index)}>
                          <WhatsappIcon size={30} round={true} />
                        </WhatsappShareButton>
                      </div>
                      <div className="p-2">
                        <EmailShareButton url={item.image.url}
                        subject={item.headline}
                        body={`${item.headline}\n\n${item.description}\n\n${item.image.url}`}
                        onClick={() => closeDropdown(index)}>
                          <EmailIcon size={30} round={true} />
                        </EmailShareButton>
                      </div>
                    </div>
                  )}
                 <button
                    type="button"
                    className=""
                    onClick={() => toggleDropdown(index)}
                  >
                    <ShareIcon />
                  </button>
                </div>
                <Link 
                  to={`/news/${item._id}`} 
                  className="block mt-4"
                >
                  <div className="p-2">
                    <h2 className="text-xl font-semibold">{item.headline}</h2>
                    <p className="text-gray-700">{item.description.slice(0, 50)}...</p>
                    <p className="text-blue-500 hover:underline">Read more</p>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p>No cards available</p>
        )}
      </div>
    </div>
  );
}

export default News1;

