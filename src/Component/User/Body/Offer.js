import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import './Offer.css';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa'; 

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
            <div className="icon-container">
              <i className="wishlist-icon"><FaHeart className="icon wishlist-icon" title="Add to Wishlist" /></i> {/* Replace with actual wishlist icon */}
              <i className="cart-icon"><FaShoppingCart className="icon cart-icon" title="Add to Cart" /></i> {/* Replace with actual cart icon */}
            </div>
            <img 
              src={product.image} 
              alt={product.productName} 
            />
            <p>{product.productName}</p>
            <p className="price">{"$" + product.actualPrice}</p>
            <button onClick={() => navigate(`/productdetails/${product.id}`)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offer;
