
import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import './DisplayItem.css';
import { useNavigate } from 'react-router-dom';

function Shop() {
  const context = useContext(DataContext);
  const navigate=useNavigate()

  if (!context) {
    return <p>Context not available</p>;
  }

  const { data, error } = context;

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="top-products">
      <h2>SHOP IT NOW</h2>
      <div className="product-list">
        {data.map((product) => (
            <div key={product.id} className="product-card">
              {product.title==='Offer'? <div className="offer-tag">Offer</div>:""}
              <img src={product.src} alt={product.productName} onClick={() => navigate(`/productdetails/${product.id}`)} />
              <p>{product.productName}</p>
              <p className="price">{product.price}</p>
            </div>
          ))}
          
      </div>
    </div>
  );
}

export default Shop;
