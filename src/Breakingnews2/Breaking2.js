// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import {
//   EmailShareButton,
//   FacebookShareButton,
//   WhatsappShareButton,
//   EmailIcon,
//   FacebookIcon,
//   WhatsappIcon
// } from "react-share";
// import ShareIcon from '@mui/icons-material/Share';

// function Breaking2() {
//   const [images, setImages] = useState([]);
//   const [loading,setLoading] = useState("");
//   const [openDropdowns, setOpenDropdowns] = useState({});

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const response = await axios.get("https://news-dyf7.onrender.com/getbreakingnews");
//         console.log("API Response:", response.data);

//         if (response.data && Array.isArray(response.data.file)) {
//           setImages(response.data.file);
//         } else {
//           console.error("API response is not as expected:", response.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch breaking news:", error);
//       }
//     };
//     getData();
//   }, []);
//   if (!images) {
//     return <div>Loading...</div>;
//   }

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

//   const fourthImage = images[3];

//   return (
//     <div className="flex justify-center space-x-4">
//       {fourthImage ? (
        
//         <Link
//           to="/description"
//           state={{
//             description: fourthImage.description,
//             imageUrl: fourthImage.file?.url,
//             headline: fourthImage.headline
//           }}
//           className="block text-gray-700 w-full md:w-auto"
//         >
//           <div className="flex flex-col md:flex-row items-center">
//             {fourthImage.file && fourthImage.file.url && (
//                <img
//                src={fourthImage.file.url}
//                alt={fourthImage.url}
//                className="w-96 h-auto object-cover rounded"
//                loading="lazy"
//         />
//      )}  
//             <div className="md:ml-4 mt-4 md:mt-0">
//               {fourthImage.headline && (
//                 <span className="block text-left font-bold text-3xl text-black text-red-500 overflow-hidden md:text-2xl lg:text-3xl">
//                   {fourthImage.headline}
//                 </span>
//               )}
//             </div>
//           </div>
//         </Link>
//       ) : (
//         <p>{loading}</p>
//       )}
//     </div>
//   );
// }
// export default Breaking2;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Breaking2() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://news-dyf7.onrender.com/getbreakingnews");
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data.file)) {
          setImages(response.data.file);
        } else {
          console.error("API response is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch breaking news:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const fourthImage = images[3];

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
  //   <div className="flex justify-center space-x-4">
  //   {fourthImage ? (
  //     <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
  //       <Link
  //         to="/description"
  //         state={{
  //           description: fourthImage.description,
  //           imageUrl: fourthImage.file?.url,
  //           headline: fourthImage.headline
  //         }}
  //         className="block text-gray-700 w-full md:w-auto"
  //       >
  //         <div className="flex flex-col md:flex-row items-center">
  //           {fourthImage.file && fourthImage.file.url && (
  //             <img
  //               src={fourthImage.file.url}
  //               alt={fourthImage.url}
  //               className="w-full md:w-96 h-auto object-cover rounded"
  //               loading="lazy"
  //             />
  //           )}
  //           <div className=" md:mt-0 md:ml-2">
  //             {fourthImage.headline && (
  //               <span className="block text-left font-bold text-2xl md:text-3xl text-red-500 overflow-hidden">
  //                 {fourthImage.headline}
  //               </span>
  //             )}
  //           </div>
  //         </div>
  //       </Link>
  //     </div>
  //   ) : (
  //     <p>No breaking news available</p>
  //   )}
  // </div>
  
<div className="flex justify-center space-x-4">
  {fourthImage ? (
    <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
      <Link
        to="/description"
        state={{
          description: fourthImage.description,
          imageUrl: fourthImage.file?.url,
          headline: fourthImage.headline,
        }}
        className="block text-gray-700 w-full md:w-auto"
      >
        <div className="flex flex-col md:flex-row items-center">
          {fourthImage.file && fourthImage.file.url && (
            <img
              src={fourthImage.file.url}
              alt={fourthImage.url}
              className="w-full md:w-96 h-auto object-cover rounded"
              loading="lazy"
            />
          )}
          <div className="mt-2 md:mt-0 md:ml-2 text-center md:text-left">
            {fourthImage.headline && (
              <span className="block font-bold sm:text-xl md:text-2xl lg:text-3xl text-red-500 break-words whitespace-normal">
                {fourthImage.headline}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  ) : (
    <p>No breaking news available</p>
  )}
</div>


  );
}

export default Breaking2;
