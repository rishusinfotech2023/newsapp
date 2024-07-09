import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Description from './Breakingnews2/Description';
import CardDetail from './Card.js/CardDetail';
import Breakingrow from './Components/Breakingrow';
import Login from './Adminpanel/Login';
import Admins from './Adminpanel/Admins';
import React, { useState, useEffect } from 'react';
import Mainnews from './News/Mainnews';
import Newsdetail from './News/Newsdetail';
import State from './States/State';
import Mainentertaint from './Entertainment/Mainentertaint';
import Maintech from './Technology/Maintech';
import Mainsiksha from './Education/Mainsiksha'; 
import Mainelection from './Election/Mainelection';
import CardDetails from './Card1/CardDetails';
import News2details from './News/News2details';
import Details from './States/Details';
import { FloatingWhatsApp } from 'react-floating-whatsapp'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <>
      <Navbar />
      <Breakingrow />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route Route path="/breaking/:id" element={<CardDetails />}></Route>
          <Route path="/description" element={<Description />} />
          <Route path="/card/:id" element={<CardDetail />} />
          <Route path="/news" element={<Mainnews />} />
          <Route path="/news/:id" element={<Newsdetail />} />
          <Route path='/news2/:id' element={<News2details />}></Route>
          <Route path="/state" element={<State />}/>
          <Route path='/newsdetail/:id' element={<Details />}></Route>
          <Route path='/election' element={<Mainelection />} />
          <Route path='/entertainment' element={<Mainentertaint />}></Route>
          <Route path='/tech' element={<Maintech />}></Route>
          <Route path="/education" element={<Mainsiksha />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/admin" element={<Admins isAuthenticated={isAuthenticated} handleLogout={handleLogout} />} />
        </Routes>
      </div>
      <div>
      <FloatingWhatsApp
        className='h-4 w-8'
        textReply="Welcome To Times Now India 24/7, how can I help you?"
        phoneNumber="+919926890112"
        accountName="Shubham Meena"
        profileImage="/img/Tni 1.png"
      />
      </div>
      <Footer />
    </>
  );
};
export default App;