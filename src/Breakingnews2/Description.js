
import React from 'react';
import { useLocation } from 'react-router-dom';

function Description() {
  const location = useLocation();
  const { description, imageUrl, headline } = location.state || { description: 'No description available', imageUrl: '', headline: '' };

  return (
    <div className="container mx-auto p-4">
      {headline && <h1 className="text-3xl font-bold mb-4">{headline}</h1>}
      {imageUrl && <img src={imageUrl} alt={headline} className="w-3/4 h-auto mb-4 justify-center"/>}
      <p className="text-lg text-gray-700">{description}</p>
    </div>
  );
}

export default Description;
