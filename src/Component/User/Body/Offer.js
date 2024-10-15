import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import './Offer.css';
import { useNavigate } from 'react-router-dom';

function Offer() {
  const context = useContext(DataContext);
  const navigate = useNavigate();
  
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
  
 
  const offerProducts = data.filter(product => product.title === 'Offer');

  return (
    <div className="top-products">
      <h2>OFFER PRODUCT</h2>
      <p>Here are some of our offer products</p>
      <div className="product-list">
        {offerProducts.map((product) => (
          <div key={product.id} className="product-card">
           <div className="offer-tag">Offer</div>
            <img 
              src={product.src} 
              alt={product.productName} 
              onClick={() => navigate(`/productdetails/${product.id}`)} 
            />
            <p>{product.productName}</p>
            <p className="price">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offer;
