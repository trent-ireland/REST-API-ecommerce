import React from 'react';
import './Home.css';
import ProductList from '../Product List/ProductList';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Ecommerce Application</h1>
      <ProductList />
    </div>
  );
}

export default Home;
