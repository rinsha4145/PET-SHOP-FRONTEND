import React, { useState, useContext } from 'react';
import './Payment.css';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import { DataContext } from '../Context/DataContext';
import { MyCartContext } from '../Context/CartContext';

function Payment() {
  const { current } = useContext(DataContext);
  const { cart, setCart } = useContext(MyCartContext); 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    pinCode: '',
    city: '',
    state: '',
    address: '',
    orderedproducts: [] 
  });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Payment details submitted:', formData);

    if (!current || !current.id) {
      alert('You must be logged in to complete the payment.');
      navigate('/login'); 
      return;
    }

    
    const updatedFormData = {
      ...formData,
      orderedproducts: cart 
    };

    const updatedUser = {
      ...current, 
      orderDetails: updatedFormData 
    };

    setTimeout(async () => {
      try {
       
        const response = await axios.put(`http://localhost:3000/Users/${current.id}`, updatedUser);
        console.log('Order and user details updated successfully:', response.data);
        
        setCart([]); 
        localStorage.removeItem('cartData'); 

        alert('Payment successful! Your order has been saved.');
        navigate('/');
      } catch (error) {
        console.error('Error submitting order and updating user:', error);
        alert('There was an issue with your payment. Please try again.');
      }
    }, 100);
  };

  return (
    <div className='payment-container'>
      <div className="form-group">
        <h2>Payment Page</h2>
        <form onSubmit={handleSubmit} className="payment-form">
          <div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder='First Name*'
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder='Last Name*'
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Email ID*'
              required
            />
          </div>

          <div className='row'>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder='Phone Number*'
              required
            />
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              placeholder='PIN Code*'
              required
            />
          </div>

          <div className='row'>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder='City*'
              required
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder='State*'
              required
            />
          </div>

          <div>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder='Address (House No, Building, Street, Area)*'
              required
            />
          </div>
          
          <button type="submit" className="submit-button">Pay Now</button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
