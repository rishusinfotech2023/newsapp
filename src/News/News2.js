import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  WhatsappIcon
} from "react-share";
import ShareIcon from '@mui/icons-material/Share';

const News2 = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://news-dyf7.onrender.com/getnews");
        console.log("response", response.data);

        if (response.data && response.data.file && Array.isArray(response.data.file)) {
          setNews(response.data.file);
        } else {
          console.error('Expected an array but got:', response.data);
          setError('Invalid data structure');
        }
      } catch (error) {
        console.log(error);
        setError('Failed to fetch news');
      }
    };
    getData();
  }, []);

  if (error) {
    return <div className="container mx-auto">Error: {error}</div>;
  }

  const truncateDescription = (description, length) => {
    if (description.length <= length) return description;
    return `${description.substring(0, length)}...`;
  };

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
          news.map((item,index) => (
            <div key={item._id} className="card flex flex-col">
              {/* <Link to={`/news2/${item._id}`} className="flex-1"> */}
                {item.file && item.file.url ? (
                  <img
                    src={item.file.url}
                    alt={item.headline || 'News image'}
                    className="w-full h-40 object-cover rounded-t-lg"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span>No Image</span>
                  </div>
                )}
                <div className="p-2">
                <div className='flex justify-end mt-2'>
                {openDropdowns[index] && (
                    <div className="absolute flex left-20  bg-white shadow-lg rounded">
                      <div className="p-2">
                        <FacebookShareButton url={item.file.url}
                        quote={`${item.headline} - ${item.description}`}
                        onClick={() => closeDropdown(index)}>
                          <FacebookIcon size={30} round={true} />
                        </FacebookShareButton>
                      </div>
                      <div className="p-2">
                        <WhatsappShareButton url={item.file.url}
                        title={`${item.headline} - ${item.description}`}
                        separator=" - "
                        onClick={() => closeDropdown(index)}>
                          <WhatsappIcon size={30} round={true} />
                        </WhatsappShareButton>
                      </div>
                      <div className="p-2">
                        <EmailShareButton url={item.file.url}
                        subject={item.headline}
                        body={`${item.headline}\n\n${item.description}\n\n${item.file.url}`}
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
                  <h2 className="text-xl font-semibold">{item.headline}</h2>
                  <p className="text-gray-700">{truncateDescription(item.description, 50)}</p>
                  <Link to={`/news2/${item._id}`} className="flex-1">
                  <button
                    onClick={() => navigate(`/news/${item._id}`)}
                    className="text-blue-500 hover:underline"
                  >
                    Read more
                  </button>
                  </Link>
                </div>
              
              {console.log(item._id)}
            </div>
          ))
        ) : (
          <p>No cards available</p>
        )}
      </div>
    </div>
  );
}

export default News2;
