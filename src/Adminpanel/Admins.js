

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Admins({ isAuthenticated, handleLogout }) {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout();
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      {isAuthenticated ? (
        <button
          onClick={onLogoutClick}
          className="mt-32 mb-32 block mx-auto px-4 py-2 w-36 h-12 bg-green-500 hover:bg-green-600 text-white text-lg text-center font-medium rounded-md shadow-md transition duration-300 ease-in-out"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="mt-32 mb-32 block mx-auto px-4 py-2 w-64 h-12 bg-blue-500 hover:bg-blue-600 text-lg text-center text-white font-medium rounded-md shadow-md transition duration-300 ease-in-out"
        >
          Login
        </Link>
      )}
    </div>
  );
}

export default Admins;



