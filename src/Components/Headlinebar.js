import React, { useState, useEffect, useMemo } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';

const HeadlineBar = () => {
  const [dateTime, setDateTime] = useState({
    date: new Date().toLocaleString(),
    day: new Date().toLocaleDateString('en-US', { weekday: 'short' })
  });

  const memoizedDateTime = useMemo(() => dateTime, [dateTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime({
        date: new Date().toLocaleString(),
        day: new Date().toLocaleDateString('en-US', { weekday: 'short' })
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-800 flex flex-col md:flex-row items-center text-white p-2 md:justify-between h-auto w-full">
      <div className="text-sm md:text-sm sm:text-2xm flex space-x-2 mb-2 md:mb-0">
        <p>{memoizedDateTime.day}</p>
        <p>{memoizedDateTime.date}</p>
      </div>
      <div className="hidden md:flex flex-1 justify-center text-md md:text-xl lg:text-2xl mb-2 md:mb-0">
        <h1>Times Now India 24/7</h1>
      </div>
      <div className="flex space-x-2 ml-auto">
        <a href='https://chat.whatsapp.com/DD0oWIgXwGt9UmSdLFT3Lf'>
        <WhatsAppIcon className="text-lg md:text-xl lg:text-2xl" /></a>
        <a href='https://www.instagram.com/timesnowindia24.7/?igsh=dDlycmZuMjB2dXpt'>
        <InstagramIcon className="text-lg md:text-xl lg:text-2xl" /></a>
        <a href='https://www.facebook.com/profile.php?id=61559795540453&mibextid=ZbWKwL'>
        <FacebookIcon className="text-lg md:text-xl lg:text-2xl" /></a>
        <a href='https://youtube.com/@timesnowindia24?si=LtdAhUUnoef8rhhW'>
        <YouTubeIcon className="text-lg md:text-xl lg:text-2xl" /></a>
        <TelegramIcon className="text-lg md:text-xl lg:text-2xl" />
      </div>
    </div>
  );
};
export default HeadlineBar;
