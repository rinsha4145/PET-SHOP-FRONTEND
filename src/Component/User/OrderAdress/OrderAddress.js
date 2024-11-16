import React, { useState, useContext } from "react";
import "./Payment.css";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import { MyCartContext } from "../Context/CartContext";
import axiosInstance from "../../../AxiosIntance";

function OrderAddress() {
  const { current, setCurrent } = useContext(DataContext);
  const { cart, setCart, formData, setFormData, handledelivary } =
    useContext(MyCartContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(async () => {
      const response = await axiosInstance.delete("/clearcart");
      setCurrent(response.data.cart);
      alert("Payment successful!");
      navigate("/payment");
    }, 2000);
  };

  // setTimeout(async () => {
  //   try {

  //     const response = await axios.put(`http://localhost:3000/Users/${current.id}`, updatedUser);
  //     console.log('Order and user details updated successfully:', response.data);

  //     setCart([]);
  //     localStorage.removeItem('cartData');

  //     alert('Payment successful! Your order has been saved.');
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Error submitting order and updating user:', error);
  //     alert('There was an issue with your payment. Please try again.');
  //   }
  // }, 100);

  return (
    <div className="payment-container">
      <div className="form-group">
        <h2>Payment Page</h2>
        <form onSubmit={handleSubmit} className="payment-form">
          <div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name*"
              required
            />
          </div>

          <div className="row">
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number*"
              required
            />
            <input
              type="tel"
              name="alternatePhoneNumber"
              value={formData.alternatePhoneNumber}
              onChange={handleChange}
              placeholder="Alternate Phone Number"
            />
          </div>

          <div className="row">
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="PIN Code*"
              required
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City*"
              required
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State*"
              required
            />
          </div>

          <div>
            <textarea
              name="buildingName"
              value={formData.buildingName}
              onChange={handleChange}
              placeholder="Building Name*"
              required
            />
          </div>

          <div>
            <textarea
              name="roadAreaColony"
              value={formData.roadAreaColony}
              onChange={handleChange}
              placeholder="Road/Area/Colony*"
              required
            />
          </div>

          <div>
            <textarea
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Landmark (optional)"
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            onClick={handledelivary}
          >
            Submit It
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderAddress;
