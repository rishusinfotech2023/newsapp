// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const Detail = () => {
//   const { id } = useParams();
//   const [news, setNews] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getNewsDetail = async () => {
//       try {
//         const response = await axios.get(`https://news-dyf7.onrender.com/getonenews/${id}`);
//         if (response.data) {
//           setNews(response.data);
//           setError(null);
//         } else {
//           setError('News not found');
//         }
//       } catch (error) {
//         setError('Failed to fetch news');
//       } finally {
//         setLoading(false);
//       }
//     };

//     getNewsDetail();
//   }, [id]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   if (!news) {
//     return <p>News not found</p>;
//   }

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <img src={news.file.url} alt={news.headline} className="w-full h-auto object-cover mb-4" loading="lazy" />
//       <div className="p-2">
//         <h2 className="text-2xl font-bold mb-2">{news.headline}</h2>
//         <p className="text-base text-gray-700">{news.description}</p>
//         <p className="text-gray-500">{news.city}, {news.state}</p>
//       </div>
//     </div>
//   );
// }
// export default Detail;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const Detail = () => {
//   const { id } = useParams();
//   const [newsDetail, setNewsDetail] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   console.log("id is :", id)

//   useEffect(() => {
//     const getNewsDetail = async () => {
//       try {
//         const response = await axios.get(`https://news-dyf7.onrender.com/getonenews/${id}`);
//         console.log('Response:', response.data); 
//         if (response.data) {
//           setNewsDetail(response.data);
//           setError(null);
//         } else {
//           setError('News not found');
//         }
//       } catch (error) {
//         console.error('Error fetching news:', error);
//         if (error.response && error.response.status === 404) {
//           setError('News not found (404)');
//         } else {
//           setError('Failed to fetch news');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     getNewsDetail();
//   }, [id]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   if (!newsDetail) {
//     return <p>News not found</p>;
//   }

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <img src={newsDetail?.file?.url} alt={newsDetail?.headline} className="w-full h-auto object-cover mb-4" loading="lazy" />
//       <div className="p-2">
//         <h2 className="text-2xl font-bold mb-2">{newsDetail?.headline}</h2>
//         <p className="text-base text-gray-700">{newsDetail?.description}</p>
//         <p className="text-gray-500">{newsDetail?.city}, {newsDetail?.state}</p>
//       </div>
//     </div>
//   );
// }

// export default Detail;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  WhatsappIcon
} from "react-share";
import ShareIcon from '@mui/icons-material/Share';

const Detail = () => {
  const { id } = useParams();
  const [newsDetail, setNewsDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShareIcons, setShowShareIcons] = useState(false); // State to manage visibility

  useEffect(() => {
    const getNewsDetail = async () => {
      try {
        const response = await axios.get(`https://news-dyf7.onrender.com/getonenews/${id}`);
        console.log('Response:', response.data); 
        if (response.data) {
          setNewsDetail(response.data);
          setError(null);
        } else {
          setError('News not found');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        if (error.response && error.response.status === 404) {
          setError('News not found (404)');
        } else {
          setError('Failed to fetch news');
        }
      } finally {
        setLoading(false);
      }
    };

    getNewsDetail();
  }, [id]);

  const shareUrl = newsDetail?.file?.url || '';

  const toggleShareIcons = () => {
    setShowShareIcons(!showShareIcons);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!newsDetail) {
    return <p>News not found</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <img src={newsDetail.file.url} alt={newsDetail.headline} className="w-full h-auto object-cover mb-4" loading="lazy" />
      <div className="p-2 relative">
        <div className="absolute top-0 right-0">
          {showShareIcons && (
            <div className="flex bg-white shadow-lg rounded">
              <div className="p-2">
                <FacebookShareButton url={shareUrl} quote={`${newsDetail.headline} - ${newsDetail.description}`}>
                  <FacebookIcon size={30} round={true} />
                </FacebookShareButton>
              </div>
              <div className="p-2">
                <WhatsappShareButton url={shareUrl} title={`${newsDetail.headline} - ${newsDetail.description}`} separator=" - ">
                  <WhatsappIcon size={30} round={true} />
                </WhatsappShareButton>
              </div>
              <div className="p-2">
                <EmailShareButton url={shareUrl} subject={newsDetail.headline} body={`${newsDetail.headline}\n\n${newsDetail.description}\n\n${shareUrl}`}>
                  <EmailIcon size={30} round={true} />
                </EmailShareButton>
              </div>
            </div>
          )}
        </div>
        <button className="absolute top-0 right-0 mt-2 mr-2" onClick={toggleShareIcons}>
          <ShareIcon />
        </button>
        <h2 className="text-2xl font-bold mb-2">{newsDetail.headline}</h2>
        <p className="text-base text-gray-700">{newsDetail.description}</p>
        <p className="text-gray-500">{newsDetail.city}, {newsDetail.state}</p>
      </div>
    </div>
  );
}

export default Detail;


