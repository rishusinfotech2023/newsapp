// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const CardDetails = () => {
//   const { id } = useParams();
//   const [breaking, setBreaking] = useState(null);
//   const [error, setError]= useState('');

//   console.log('Breaking News:', breaking);

//   useEffect(() => {
//     const getbreakingnews = async () => {
//       try {
//         const response = await axios.get(`https://news-dyf7.onrender.com/getonebreakingnews/${id}`);
//         setBreaking(response.data);
//         console.log(response.data)
//       } catch (error) {
//         setError('Error fetching card details');
//       }
//     };
  
//     getbreakingnews ();
//   }, [id]);
  

//   if (!breaking) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//     <div className="max-w-xl mx-auto p-4">
//     <img src={breaking.file.url} alt={breaking.headline} className="w-full h-auto object-cover mb-4" />
//     <h2 className="text-2xl font-bold mb-2">{breaking.headline}</h2>
//      <p className="text-base text-gray-700">{breaking.description}</p>

//     </div>
//     </>
//   );
// };
// export default CardDetails;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
import ShareIcon from '@mui/icons-material/Share';

const CardDetails = () => {
  const { id } = useParams();
  const [breaking, setBreaking] = useState(null);
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const getBreakingNews = async () => {
      try {
        const response = await axios.get(`https://news-dyf7.onrender.com/getonebreakingnews/${id}`);
        setBreaking(response.data);
        console.log(response.data);
      } catch (error) {
        setError('Error fetching card details');
      }
    };

    getBreakingNews();
  }, [id]);

  if (!breaking) {
    return <div>Loading...</div>;
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <img src={breaking.file.url} alt={breaking.headline} className="w-full h-auto object-cover mb-4" />
      <div className="relative">
        <button
          type="button"
          className="flex items-center space-x-2 p-2 bg-gray-100 rounded shadow mb-4 relative"
          onClick={toggleDropdown}
        >
          <ShareIcon />
         
          {/* Share icons container */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded w-36 py-2 flex justify-around">
              <FacebookShareButton url={breaking.file.url} quote={breaking.headline} onClick={closeDropdown}>
                <FacebookIcon size={30} round={true} />
              </FacebookShareButton>
              <WhatsappShareButton url={breaking.file.url} title={breaking.headline} onClick={closeDropdown}>
                <WhatsappIcon size={30} round={true} />
              </WhatsappShareButton>
              <EmailShareButton url={breaking.file.url} subject={breaking.headline} body={breaking.description} onClick={closeDropdown}>
                <EmailIcon size={30} round={true} />
              </EmailShareButton>
            </div>
          )}
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-2">{breaking.headline}</h2>
      <p className="text-base text-gray-700 mb-4">{breaking.description}</p>
    </div>
  );
};

export default CardDetails;
