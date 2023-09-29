import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../Redux/ProductSlice';
import './ProductList.css'

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
  
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.imageurl && <img src={product.imageurl} alt={product.name} style={{ width: '200px', height: '200px' }} />}
            <br />
            {product.name} - ${product.price}
            <br />
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
