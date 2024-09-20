import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import social media icons


export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Tastyvault All rights reserved.</p>
      
      <div className="social-media">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
}
