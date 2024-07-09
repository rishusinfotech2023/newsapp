import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from '../Admineditor.js/AuthProvider';
import Adddetail from "./Adddetail";
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  WhatsappIcon
} from "react-share";
import ShareIcon from '@mui/icons-material/Share';

const State = () => {
  const [products, setProducts] = useState([]);
  const { isAuthenticated, token } = useAuth();
  const [query, setQuery] = useState("");
  const [searchNews, setSearchNews] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const response = await axios.get("https://news-dyf7.onrender.com/getnews");
      console.log(response.data, "response");

      if (response.data && Array.isArray(response.data.file)) {
        setProducts(response.data.file);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > 50) {
      return words.slice(0, 50).join(' ') + '...';
    }
    return description;
  };

  const searchBar = async () => {
    try {
      const result = await axios.get(`https://news-dyf7.onrender.com/search?news=${query}`);
      console.log(result.data);
      setSearchNews(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletenews = async (_id) => {
    if (!_id) {
      console.error('Delete request failed: id is undefined');
      return;
    }
  
    try {
      const response = await axios.delete(`https://news-dyf7.onrender.com/deletenews/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Delete response:', response.data); // Add this line to debug the response
      setProducts(prevproduct => prevproduct.filter(news => news._id !== _id));
    } catch (error) {
      console.log('AxiosError', error);
      console.log('Error response data:', error.response?.data); // Add this line to debug the error response
    }
  };
  const handleAddnews = (news) => {
    setProducts(prevproducts => [...prevproducts, news]);
  };

   const navigateData = (id) =>{
      navigate(`/newsdetails/${id}`)
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
    <div className="container mx-auto p-4">
  {isAuthenticated && <Adddetail onAddnews={handleAddnews} />}
  
  <div className="flex items-center border rounded w-full mt-0">
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="p-2 rounded-l w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Search your city..."
    />
    <button
      onClick={searchBar}
      className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <SearchIcon />
    </button>
  </div>
  
  <div className="grid grid-cols-1 gap-4 mt-4">
    {(searchNews.length > 0 ? searchNews : products).map((item, id) => (
      <div key={id} className="flex flex-col md:flex-row border rounded-lg shadow-lg p-4">
          {item.file && (
            <img
              className="w-full md:w-1/3 object-cover rounded-lg"
              src={item.file.url}
              alt={item.headline}
            />
          )}
          <div className="ml-0 md:ml-4 w-full md:w-2/3 mt-4 md:mt-0">
                 {openDropdowns[id] && (
                    <div className="flex bg-white shadow-lg rounded absolute left-80 ml-2">
                      <div className="p-2">
                        <FacebookShareButton url={item.file.url}
                        quote={`${item.headline} - ${item.description}`}
                        onClick={() => closeDropdown(id)}>
                          <FacebookIcon size={30} round={true} />
                        </FacebookShareButton>
                      </div>
                      <div className="p-2">
                        <WhatsappShareButton url={item.file.url}
                        title={`${item.headline} - ${item.description}`}
                        separator=" - "
                        onClick={() => closeDropdown(id)}>
                          <WhatsappIcon size={30} round={true} />
                        </WhatsappShareButton>
                      </div>
                      <div className="p-2">
                        <EmailShareButton url={item.file.url}
                         subject={item.headline}
                         body={`${item.headline}\n\n${item.description}\n\n${item.file.url}`}
                        onClick={() => closeDropdown(id)}>
                          <EmailIcon size={30} round={true} />
                        </EmailShareButton>
                      </div>
                    </div>
                  )}
                 <button
                    type="button"
                    className=""
                    onClick={() => toggleDropdown(id)}
                  >
                    <ShareIcon />
                  </button>
            <p className="text-xl font-bold mb-2">{item.headline}</p>
            <p className="text-gray-700">{truncateDescription(item.description, 50)}</p>
            <p className="text-gray-500">{item.city}, {item.state}</p>
            <Link to={`/newsdetail/${item._id}`} className="flex flex-1 flex-col md:flex-row">
            <button
              onClick={() => navigateData(item._id)}
              className="text-blue-500 hover:underline"
            >
              Read more
            </button>
            </Link>
          </div>
        
        {isAuthenticated && (
          <button
            className='h-8 w-36 bg-red-500 mt-2'
            onClick={() => {
              deletenews(item._id);
            }}
          >
            Delete
          </button>
        )}
      </div>
    ))}
  </div>
</div>
  );
};

export default State;
