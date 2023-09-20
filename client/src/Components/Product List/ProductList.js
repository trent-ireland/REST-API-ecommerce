// ProductList.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from './actions'; // Create this action

function ProductList({ products, fetchProducts }) {
  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, [fetchProducts]);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            {/* Add more product details here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Connect the component to the Redux store
const mapStateToProps = (state) => ({
  products: state.products, // Assuming you have a products reducer
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()), // Action to fetch products
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
