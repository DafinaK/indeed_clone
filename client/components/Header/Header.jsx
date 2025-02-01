import React, { useState } from 'react';
import { FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Search from './Search';

const Header = ({ userData, setUserData, isLoggedOut, setIsLoggedOut }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //funksion per te vendosur stilin aktiv per linkun aktual
  const getLinkClassName = (path) => {
    return location.pathname === path ? 'text-white' : 'hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-white cursor-pointer text-white';
  };

  // Funksion për të hapur/mbyllur menunë në modalitetin mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={`${location.pathname !== '/find-jobs' ? 'md:sticky md:top-0' : ''} bg-[#4D85C7]`} style={{ zIndex: 200 }}>
        <div className='p-[15px]'>
          <div className='max-w-[1200px] mx-auto my-0 px-[15px] py-0 flex items-center justify-between'>

            {/* Logo ose linku për në Home */}
            <Link to='/' className={getLinkClassName('/')}>
              Home
            </Link>

            {/* Navigimi për Desktop */}
            <div className='hidden md:flex items-center space-x-4'>
              <Link to='/find-jobs' className={getLinkClassName('/find-jobs')}>
                Find Jobs
              </Link>
              <Link to='/pricing' className={getLinkClassName('/pricing')}>
                Pricing
              </Link>
              <Link to='/about' className={getLinkClassName('/about')}>
                About
              </Link>
              <Link to='/contact' className={getLinkClassName('/contact')}>
                Contact
              </Link>

               {/* Navigimi për Desktop */}
            <div className='hidden md:flex items-center space-x-4'>
              <Link to='/find-jobs' className={getLinkClassName('/find-jobs')}>
                Find Jobs
              </Link>
              <Link to='/pricing' className={getLinkClassName('/pricing')}>
                Pricing
              </Link>
              <Link to='/about' className={getLinkClassName('/about')}>
                About
              </Link>
              <Link to='/contact' className={getLinkClassName('/contact')}>
                Contact
              </Link>

{/* Komponenti i kërkimit */}
<Search userData={userData} setUserData={setUserData} isLoggedOut={isLoggedOut} setIsLoggedOut={setIsLoggedOut} />
      </div>
    </>
  );
};

export default Header;
