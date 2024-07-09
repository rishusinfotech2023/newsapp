import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Admineditor.js/AuthProvider';
import Addelection from './Addelection';
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  WhatsappIcon
} from "react-share";
import ShareIcon from '@mui/icons-material/Share';

function Election1() {
  const { isAuthenticated, token } = useAuth();
  const [election, setElection] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://news-dyf7.onrender.com/getelection');
        console.log('response', response.data);

        if (response.data && Array.isArray(response.data.file)) {
            setElection(response.data.file);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleAddelection = (card) => {
    setElection((prevelection) => [...prevelection, card]);
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };

  const deleteCard = async (_id) => {
    if (!_id) {
      console.error('Delete request failed: id is undefined');
      return;
    }

    try {
      await axios.delete(`https://news-dyf7.onrender.com/deleteelection/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setElection((prevelection) => prevelection.filter((card) => card._id !== _id));
    } catch (error) {
      console.log('AxiosError', error);
    }
  };

  const toggleReadMore = (_id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [_id]: !prev[_id],
    }));
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
    <div className="container mx-auto p-4">
      {isAuthenticated && <Addelection onAddeducation={handleAddelection} />}
      <div className="grid grid-cols-1 gap-4 mt-4">
        {Array.isArray(election) && election.length > 0 ? (
          election.map((item, index) => (
            <div key={item._id} className="flex flex-col md:flex-row border rounded-lg shadow-lg p-4">
              <img
                src={item.file.url}
                alt={item.url}
                className="w-full md:w-1/3 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="ml-0 md:ml-4 w-full md:w-2/3 mt-4 md:mt-0">
                {openDropdowns[index] && (
                  <div className="absolute flex left-24 bg-white shadow-lg">
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
                  className="justify-between"
                  onClick={() => toggleDropdown(index)}
                >
                  <ShareIcon />
                </button>
                <span className="block font-semibold text-lg">{item.headline}</span>
                <span className="block text-gray-700">
                  {expandedItems[item._id]
                    ? item.description
                    : truncateDescription(item.description, 50)}
                  <button
                    className="text-blue-500 ml-2"
                    onClick={() => toggleReadMore(item._id)}
                  >
                    {expandedItems[item._id] ? 'Read Less' : 'Read More'}
                  </button>
                </span>
                {isAuthenticated && (
                  <button
                    className="h-8 w-20 bg-red-500 mt-2"
                    onClick={() => {
                      console.log('Attempting to delete card with id:', item._id);
                      deleteCard(item._id);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No cards available</p>
        )}
      </div>
    </div>
  );
}

export default Election1;
