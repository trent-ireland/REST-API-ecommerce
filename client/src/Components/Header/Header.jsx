import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <a href="/" className="logo">
          Ecommerce App
        </a>
        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Products
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          {/* Add more navigation links as needed */}
        </nav>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products"
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
