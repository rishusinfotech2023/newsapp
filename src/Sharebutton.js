import React from 'react'
import Tech1 from './Technology/Tech1';

const Sharebutton = () => {
    const shareUrl = window.location.href;
  return (
    <div className="flex justify-center items-center h-screen">
      <Tech1 shareUrl={shareUrl} />
    </div>
  )
}

export default Sharebutton;
