import React, { useState, useEffect } from 'react';
import { useAuth } from '../Admineditor.js/AuthProvider';
import { Link } from 'react-router-dom';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import WebStoriesIcon from '@mui/icons-material/WebStories';
import CollectionsIcon from '@mui/icons-material/Collections';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import TextsmsIcon from '@mui/icons-material/Textsms';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ControlAdmin from './ControlAdmin';
import axios from 'axios';

const Breakingn = () => {
  const { isAuthenticated, token } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoadingImages(true);
      const response = await axios.get('https://news-dyf7.onrender.com/getbreakingnews', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data && Array.isArray(response.data.file)) {
        const reversedImages = response.data.file.reverse();
        setImages(reversedImages);
      } else {
        console.error('API response is not as expected:', response.data);
        setError('Failed to fetch breaking news. Please try again later.');
      }
    } catch (error) {
      console.error('Failed to fetch breaking news:', error);
      setError('Failed to fetch breaking news. Please try again later.');
    } finally {
      setLoadingImages(false);
    }

    try {
      setLoadingVideo(true);
      const response = await axios.get('https://news-dyf7.onrender.com/getlink', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setVideo(response.data);
    } catch (error) {
      console.error('Failed to fetch video links:', error);
      setError('Failed to fetch video links. Please try again later.');
    } finally {
      setLoadingVideo(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);

  const deletenews = async (_id) => {
    if (!_id) {
      console.error('Delete request failed: id is undefined');
      return;
    }
    try {
      await axios.delete(`https://news-dyf7.onrender.com/deletebreakingnews/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setImages((prevImages) => prevImages.filter((image) => image._id !== _id));
    } catch (error) {
      console.error('Failed to delete breaking news:', error);
    }
  };

  const deletevideo = async (_id) => {
    if (!_id) {
      console.error('Delete request failed: id is undefined');
      return;
    }

    try {
      await axios.delete(`https://news-dyf7.onrender.com/deletelink/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setVideo((prevVideo) => prevVideo.filter((v) => v._id !== _id));
    } catch (error) {
      console.error('Failed to delete video:', error);
    }
  };

  if (loadingImages || loadingVideo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-between w-full mx-auto mt-8 space-y-4 lg:space-y-0 lg:space-x-8">
      {error && <div className="error-message">{error}</div>}

      {/* Sidebar - Hidden on small screens */}
      <div className="hidden md:block w-full md:w-80 h-[34rem] bg-white rounded-lg shadow-lg pl-4 pt-4 lg:pl-8 lg:pt-8">
        <form className="space-y-4 text-black">
          <p>
            <LiveTvIcon /> लाइव टीवी
          </p>
          <p>
            <VideoCallIcon /> वीडियो
          </p>
          <p>
            <VideoLibraryIcon /> शॉर्ट वीडियो
          </p>
          <p>
            <RecordVoiceOverIcon /> पॉडकास्ट
          </p>
          <p>
            <WebStoriesIcon /> वेब स्टोरीज
          </p>
          <p>
            <CollectionsIcon /> फोटो गैलरी
          </p>
          <p>
            <SportsEsportsIcon /> खेल
          </p>
          <p>
            <LocalMoviesIcon /> मूवी रिव्यू
          </p>
          <p>
            <TextsmsIcon /> ओपिनियन
          </p>
        </form>
      </div>

      {/* Breaking News Images */}
      <div className="w-full md:w-2/4 relative rounded-lg shadow-lg p-4 mb-4 md:mb-0">
        {Array.isArray(images) && images.length > 0 ? (
          <>
            <div className="flex overflow-hidden mt-4 md:mt-8">
              <div
                className="flex transition-transform duration-1000"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  width: `${images.length * 100}%`
                }}
              >
                {images.map((item, index) => (
                  <div key={index} className="w-full flex-shrink-0 flex flex-col items-center space-y-4">
                    <Link to={`/breaking/${item._id}`} className="w-full">
                      {item.file && item.file.url && (
                        <img
                          src={item.file.url}
                          alt={item.url}
                          className="h-48 sm:h-64 md:h-64 lg:h-80 w-full object-cover"
                          loading="lazy"
                        />
                      )}
                      {item.headline && (
                        <h2 className="text-center pt-4 font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl text-black break-words whitespace-normal">
                          {item.headline}
                        </h2>
                      )}
                    </Link>
                    {isAuthenticated && (
                      <button
                        className="h-8 w-20 bg-red-500 mt-2 text-white rounded"
                        onClick={() => {
                          console.log('Attempting to delete card with id:', item._id);
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
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {images.slice(0, 3).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                  onClick={() => setCurrentIndex(index)}
                ></button>
              ))}
            </div>
          </>
        ) : (
          <p>No images available</p>
        )}
      </div>

      {/* Video Section */}
      <div className="w-full md:w-2/4 bg-white rounded-lg shadow-lg p-4 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {video.map((vid, id) => (
            <div key={id} className="flex flex-col h-full">
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${vid.url}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <Link
                  to={vid.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm overflow-hidden"
                >
                  {vid.url}
                </Link>
                {isAuthenticated && (
                  <button
                    className="h-8 w-20 bg-red-500 mt-2 text-white rounded"
                    onClick={() => {
                      console.log('Attempting to delete video with id:', vid._id);
                      deletevideo(vid._id);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Control */}
      {isAuthenticated && (
        <div className="w-full md:w-1/4 bg-white rounded-lg shadow-lg p-4">
          <ControlAdmin />
        </div>
      )}
    </div>
  );
};

export default Breakingn;



