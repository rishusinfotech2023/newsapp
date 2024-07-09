// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../Admineditor.js/AuthProvider';
// import Addsiksha from './Addsiksha';
// import {
//   EmailShareButton,
//   FacebookShareButton,
//   WhatsappShareButton,
//   EmailIcon,
//   FacebookIcon,
//   WhatsappIcon
// } from "react-share";
// import ShareIcon from '@mui/icons-material/Share';

// function Educations() {
//   const { isAuthenticated, token } = useAuth();
//   const [education, setEducation] = useState([]);
//   const [expandedItems, setExpandedItems] = useState({});
//   const [openDropdowns, setOpenDropdowns] = useState({});

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const response = await axios.get('https://news-dyf7.onrender.com/geteducation');
//         console.log('response', response.data);

//         if (response.data && Array.isArray(response.data.file)) {
//           setEducation(response.data.file);
//         } else {
//           console.error('Expected an array but got:', response.data);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getData();
//   }, []);

//   const handleAddeducation = (newCard) => {
//     setEducation((preveducation) => [...preveducation, newCard]);
//   };

//   const truncateDescription = (description, wordLimit) => {
//     const words = description.split(' ');
//     if (words.length > wordLimit) {
//       return words.slice(0, wordLimit).join(' ') + '...';
//     }
//     return description;
//   };

//   const deleteCard = async (_id) => {
//     if (!_id) {
//       console.error('Delete request failed: id is undefined');
//       return;
//     }

//     try {
//       await axios.delete(`https://news-dyf7.onrender.com/deleteeducation/${_id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setEducation((preveducation) => preveducation.filter((card) => card._id !== _id));
//     } catch (error) {
//       console.log('AxiosError', error);
//     }
//   };

//   const toggleReadMore = (_id) => {
//     setExpandedItems((prev) => ({
//       ...prev,
//       [_id]: !prev[_id],
//     }));
//   };

//   const toggleDropdown = (index) => {
//     setOpenDropdowns((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   const closeDropdown = (index) => {
//     setOpenDropdowns((prev) => ({
//       ...prev,
//       [index]: false,
//     }));
//   };

//   return (
//     <div className="flex justify-center space-x-4">
//       {isAuthenticated && <Addsiksha onAddeducation={handleAddeducation} />}
//   <div className="flex flex-row items-center">
//     {Array.isArray(education) && education.length > 0 ? (
//       <div className="m-4 p-4 border rounded-lg shadow-lg w-full">
//         {education.map((item, index) => (
//           <div key={item._id} className="mb-4">
//             <img
//               src={item.file.url}
//               alt={item.url}
//               className="block w-80 h-auto object-cover rounded mb-2"
//               loading="lazy"
//             />
//             {openDropdowns[index] && (
//                     <div className="absolute flex left-20  bg-white shadow-lg rounded">
//                       <div className="p-2">
//                         <FacebookShareButton url={item.file.url}
//                         quote={`${item.headline} - ${item.description}`}
//                         onClick={() => closeDropdown(index)}>
//                           <FacebookIcon size={30} round={true} />
//                         </FacebookShareButton>
//                       </div>
//                       <div className="p-2">
//                         <WhatsappShareButton url={item.file.url}
//                         title={`${item.headline} - ${item.description}`}
//                         separator=" - "
//                         onClick={() => closeDropdown(index)}>
//                           <WhatsappIcon size={30} round={true} />
//                         </WhatsappShareButton>
//                       </div>
//                       <div className="p-2">
//                         <EmailShareButton url={item.file.url} 
//                         subject={item.headline}
//                         body={`${item.headline}\n\n${item.description}\n\n${item.file.url}`}
//                         onClick={() => closeDropdown(index)}>
//                           <EmailIcon size={30} round={true} />
//                         </EmailShareButton>
//                       </div>
//                     </div>
//                   )}
//                  <button
//                     type="button"
//                     className=""
//                     onClick={() => toggleDropdown(index)}
//                   >
//                     <ShareIcon />
//                   </button>
//            <span className="block font-semibold">{item.headline}</span>
//               <span className="block text-gray-700">
//                 {expandedItems[item._id]
//                   ? item.description
//                   : truncateDescription(item.description, 50)}
//                 <button
//                   className="text-blue-500 ml-2"
//                   onClick={() => toggleReadMore(item._id)}
//                 >
//                   {expandedItems[item._id] ? 'Read Less' : 'Read More'}
//                 </button>
//               </span>
//             {isAuthenticated && (
//               <button
//                 className="h-8 w-20 bg-red-500 mt-2"
//                 onClick={() => {
//                   console.log('Attempting to delete card with id:', item._id);
//                   deleteCard(item._id);
//                 }}
//               >
//                 Delete
//               </button>
//             )}
//             {index < education.length - 1 && <hr className="my-4" />}
//           </div>
//         ))}
//       </div>
//     ) : (
//       <p>No cards available</p>
//     )}
//   </div>
// </div>


//   );
// }

// export default Educations;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Admineditor.js/AuthProvider';
import Addsiksha from './Addsiksha';
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  WhatsappIcon
} from "react-share";
import ShareIcon from '@mui/icons-material/Share';

function Educations() {
  const { isAuthenticated, token } = useAuth();
  const [education, setEducation] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [openDropdowns, setOpenDropdowns] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://news-dyf7.onrender.com/geteducation');
        console.log('response', response.data);

        if (response.data && Array.isArray(response.data.file)) {
          setEducation(response.data.file);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleAddeducation = (newCard) => {
    setEducation((preveducation) => [...preveducation, newCard]);
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
      await axios.delete(`https://news-dyf7.onrender.com/deleteeducation/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEducation((preveducation) => preveducation.filter((card) => card._id !== _id));
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
    <div className="flex flex-col items-center space-y-4">
      {isAuthenticated && <Addsiksha onAddeducation={handleAddeducation} />}
      <div className="flex flex-row items-center w-full">
        {Array.isArray(education) && education.length > 0 ? (
          <div className="m-4 p-4 border rounded-lg shadow-lg w-full">
            {education.map((item, index) => (
              <div key={item._id} className="mb-4">
                <img
                  src={item.file.url}
                  alt={item.url}
                  className="block w-80 h-auto object-cover rounded mb-2"
                  loading="lazy"
                />
                {openDropdowns[index] && (
                  <div className="absolute flex left-20  bg-white shadow-lg rounded">
                    <div className="p-2">
                      <FacebookShareButton
                        url={item.file.url}
                        quote={`${item.headline} - ${item.description}`}
                        onClick={() => closeDropdown(index)}
                      >
                        <FacebookIcon size={30} round={true} />
                      </FacebookShareButton>
                    </div>
                    <div className="p-2">
                      <WhatsappShareButton
                        url={item.file.url}
                        title={`${item.headline} - ${item.description}`}
                        separator=" - "
                        onClick={() => closeDropdown(index)}
                      >
                        <WhatsappIcon size={30} round={true} />
                      </WhatsappShareButton>
                    </div>
                    <div className="p-2">
                      <EmailShareButton
                        url={item.file.url}
                        subject={item.headline}
                        body={`${item.headline}\n\n${item.description}\n\n${item.file.url}`}
                        onClick={() => closeDropdown(index)}
                      >
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
                <span className="block font-semibold">{item.headline}</span>
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
                {index < education.length - 1 && <hr className="my-4" />}
              </div>
            ))}
          </div>
        ) : (
          <p>No cards available</p>
        )}
      </div>
    </div>
  );
}

export default Educations;

