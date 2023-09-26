import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <a href="/" className="logo">
          
        </a>
        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/Products" className="nav-link">
            Products
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
        
        </nav>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products"
            className="search-input"
          />
          <button className="search-button"></button>
        </div>
      </div>
    </header>
  );
};

export default Header;
