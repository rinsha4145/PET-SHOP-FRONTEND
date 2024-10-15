import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './View.css'; 

const View = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user details by ID
    axios.get(`http://localhost:3000/Users/${id}`)
      .then(response => setUser(response.data))
      .catch(error => setError(error.message));
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="view-container">
      <div className="user-details">
        <h1>User Details</h1>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
        <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
        <p><strong>Address:</strong> {user.address || 'N/A'}</p>
        <p><strong>Blocked:</strong> {user.blocked ? 'Yes' : 'No'}</p>

        {/* Conditionally show Order Details if present */}
        <h1>Order Details</h1>
        {user.orderDetails ? (
          <>
            
            <div className="order-details">
              <p><strong>First Name:</strong> {user.orderDetails.firstName}</p>
              <p><strong>Last Name:</strong> {user.orderDetails.lastName}</p>
              <p><strong>Email:</strong> {user.orderDetails.email}</p>
              <p><strong>Phone Number:</strong> {user.orderDetails.phoneNumber}</p>
              <p><strong>PIN Code:</strong> {user.orderDetails.pinCode}</p>
              <p><strong>City:</strong> {user.orderDetails.city}</p>
              <p><strong>State:</strong> {user.orderDetails.state}</p>
              <p><strong>Address:</strong> {user.orderDetails.address}</p>
            </div>
          </>
        ) : (
          <p style={{textAlign:'center'}}>No order details available.</p>
        )}
      </div>

      <div className="cart-products">
        <h1>Ordered Products</h1>

        {/* Conditionally show Cart Items if present */}
        {user.orderDetails && user.orderDetails.orderedproducts && user.orderDetails.orderedproducts.length > 0 ? (
          <ul>
            {user.orderDetails.orderedproducts.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.src} alt={item.productName} className="cart-item-image" />
                <div className="cart-item-details">
                  <strong>Product Name:</strong> {item.productName}<br/>
                  <strong>Price:</strong> ${item.price}<br/>
                  <strong>Quantity:</strong> {item.qty}<br/>
                  <strong>Total:</strong> ${(item.price * item.qty).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{textAlign:'center'}}>No products in the cart.</p>
        )}

        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    </div>
  );
};

export default View;
