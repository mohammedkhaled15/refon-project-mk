import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { FaClipboardList } from 'react-icons/fa';
import { BsInfoCircle ,BsFillBellFill} from 'react-icons/bs';
import { MdFavorite } from 'react-icons/md';
import { ImExit } from 'react-icons/im'
import { BiMenuAltRight } from 'react-icons/bi'
import "../styles/components/Sidebar.scss"

const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();



  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsOpen(screenWidth > 768); // Adjust the breakpoint as needed



    };




    // Set the initial isOpen value based on the screen width
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  }
  const handleLogout = (e) => {
    e.preventDefault();
    // Remove the access_token from cookies
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Navigate to the login page
    window.location.reload();
    navigate('/');
  };
  const imageSize = `${isOpen ? "100px" : "30px"}`;
  const active = `${isOpen ? "active" : ""}`;

  return (
    <div className='sidebar' style={{ width: isOpen ? "200px" : "50px" }}>
      <div className="toggle__icon" onClick={toggle}>
        <span>
          <BiMenuAltRight />
        </span>
      </div>
      <div className="sidebar__user">
        <img src="/profile.png" alt="" style={{ width: imageSize, height: imageSize }} />
        <h4 style={{ display: isOpen ? "block" : "none" }}>Mohamed</h4>
      </div>
      <ul className='sidebar__list'>
        <li>
            <span>
            <Link to="/userinfo"><BsInfoCircle size={30} /></Link>
            </span>
            <Link to="/userinfo" style={{ display: isOpen ? "block" : "none" }}>User Info</Link>
        </li>
        <li>
          <span className='d-flex justify-content-center'>
            <Link to="/userorders"><FaClipboardList size={30} /></Link>
            </span>
            <Link to="/userorders" style={{ display: isOpen ? "block" : "none" }}>User Orders</Link>
        </li>
        <li>
          <span className='d-flex justify-content-center'>
            <Link to="/*"><BsFillBellFill size={30} /></Link>
            </span>
            <Link to="/*" style={{ display: isOpen ? "block" : "none" }}>Offers</Link>
        </li>
    
        <li onClick={handleLogout}>
          <span><ImExit size={30} /></span>
          <a href="" style={{ display: isOpen ? 'block' : 'none' }} >
            Log Out
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar