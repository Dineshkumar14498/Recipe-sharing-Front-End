import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import InputForm from './InputForm'
import { NavLink } from 'react-router-dom'


export default function Navbar() {
  let token = localStorage.getItem("token")
  const [isLogin, setIsLogin] = useState(token ? false : true)
  let user = JSON.parse(localStorage.getItem("user"))
  const [isOpen, setIsOpen] = useState(false)


  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }


  useEffect(() => {
    setIsLogin(token ? false : true)
  }, [token])

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)

    }
    else {
      setIsOpen(true)
    }
  }




  return (
    <>
      <header>
        <nav className='navbar'>
          <div className='logo'>
            <h2> <img src="" alt="" />Tastyvault</h2>
          </div>

          {/* Toggle button for small screens */}
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>

          <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
            <li><NavLink to="/">Home</NavLink></li>
            <li onClick={() => isLogin && setIsOpen(true)}><NavLink to={!isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink></li>
            <li onClick={() => isLogin && setIsOpen(true)}><NavLink to={!isLogin ? "/favRecipe" : "/"}>Favourites</NavLink></li>
            <li onClick={checkLogin}><p className='login'>{(isLogin) ? "Login" : "Logout"}{user?.email ? `(${user?.email})` : ""}</p></li>
          </ul>
        </nav>
      </header>
      {(isOpen) && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>}
    </>
  )
}