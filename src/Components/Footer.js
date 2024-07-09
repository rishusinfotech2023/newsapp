import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-red-900 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <a href="/" className="flex items-center space-x-8">
            <img src="img/Tni 1.png" className="h-32" alt="Times Now India Logo" loading="lazy" />
              <span className="space-x-12 text-2xl font-semibold">Times Now India</span>
            </a>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/news" className="hover:underline">
              News
            </Link>
            <Link to="/state" className="hover:underline">
              State
            </Link>
            <Link to="/election" className="hover:underline">
              Election
            </Link>
            <Link to="/entertainment" className="hover:underline">
              Entertainment/Game
            </Link>
            <Link to="/tech" className="hover:underline">
              Technology
            </Link>
            <Link to="/education" className="hover:underline">
              Education
            </Link>
            <Link to="/admin" className="hover:underline">
              Admin Panel
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <a href="https://rishusinfotech.in/">
            <p className="text-sm">&copy; 2024.Rishus Infotech</p>
            </a>
            <div className="flex space-x-4 mt-4 md:mt-0">
          <span className="flex space-x-8 name-icon">
             <p>Shubham Meena</p>
             <p className="phone-number">9926890112</p>
         </span>
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
