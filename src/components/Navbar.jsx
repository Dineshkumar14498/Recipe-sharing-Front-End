import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import InputForm from './InputForm';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  let token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? false : true);
  let user = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(false); // State to control the modal
  const [menuOpen, setMenuOpen] = useState(false); // State to control the navbar menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu open state
  };

  useEffect(() => {
    setIsLogin(token ? false : true); // Update login state based on token presence
  }, [token]);

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true); // Log the user out
    } else {
      setIsOpen(true); // Open the login modal if the user is not logged in
    }
  };

  return (
    <>
      <header>
        <nav className='navbar'>
          <div className="navbar-logo">TastyVault</div>
          <div className="navbar-toggle" onClick={toggleMenu}>
            ☰ {/* You can replace this with an icon */}
          </div>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><NavLink to="/">Home</NavLink></li>
            <li onClick={() => isLogin && setIsOpen(true)}><NavLink to={!isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink></li>
            <li onClick={() => isLogin && setIsOpen(true)}><NavLink to={!isLogin ? "/favRecipe" : "/"}>Favourites</NavLink></li>
            <li onClick={checkLogin}><p className='login'>{(isLogin) ? "Login" : "Logout"}{user?.email ? `(${user?.email})` : ""}</p></li>
          </div>
        </nav>
      </header>
      {(isOpen) && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>}
    </>
  );
}
