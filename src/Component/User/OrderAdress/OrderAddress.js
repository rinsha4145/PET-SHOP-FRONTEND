import React, { useState, useContext } from "react";
import "./Payment.css";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import { MyCartContext } from "../Context/CartContext";
import axiosInstance from "../../../AxiosIntance";
import handleAsync from "../../../HandleAsync";
import { toast } from "react-toastify";

function OrderAddress() {
  const { current, setCurrent } = useContext(DataContext);
  const { cart, setCart, formData, setFormData, handledelivary, handlecheckout} =useContext(MyCartContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit =handleAsync(async (e) => {
    e.preventDefault();
    setLoading(true);
    handlecheckout()
      const response = await axiosInstance.delete("/clearcart");
      setCurrent(response.data.cart); // Assuming the cart data comes here
      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data.message);
      } else {
        throw new Error(response.data.message || 'An error occurred');
      }
  });

  return (
    <>
    <form  className="payment-form">
    <section className="py-20 relative" >
      <div className="w-[1000px] max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full flex-col justify-center items-center gap-4 inline-flex">
          <h2 className="text-center text-gray-900 text-4xl font-bold font-manrope leading-normal">
            Order Billing
          </h2>
          <p className="text-center text-gray-500 text-base font-normal leading-relaxed">
            Order billing is the process of generating invoices or bills for
            goods or services purchased by customers.
          </p>
        </div>

        {/* Form for collecting address info */}
        <div className="lg:my-14 my-8 grid lg:grid-cols-2 grid-cols-1 gap-8">
          <div className="w-full flex-col justify-start items-start gap-6 inline-flex">
            <h4 className="text-gray-900 text-xl font-semibold leading-8">
              Basic Information
            </h4>
            <div className="w-full flex-col justify-start items-start gap-8 flex">
              {/* Full Name Field */}
              <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                <label className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={formData.fullName}
                  required
                  onChange={handleChange}
                  name="fullName"
                  className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                />
              </div>

              {/* Phone Number Fields */}
              <div className="w-full justify-start items-start gap-7 flex sm:flex-row flex-col">
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <label className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    name="phoneNumber"
                    placeholder="Phone Number"
                    required
                    className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-sm font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                  />
                </div>
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <label className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">
                    Alternative Phone Number
                  </label>
                  <input
                    type="tel"
                    name="alternatePhoneNumber"
                    value={formData.alternatePhoneNumber}
                    onChange={handleChange}
                    placeholder="Alternate PhoneNumber"
                    className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-sm font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                <label className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-sm font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                />
              </div>
              <div className="w-full flex justify-center items-center gap-4 mt-[80px]">
          <button
            type="submit"
            onClick={handledelivary}
            disabled={loading}
            className={`w-full px-6 py-3 text-lg text-white rounded-lg bg-indigo-600 shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            save the Address
          </button>
        </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="w-full flex-col justify-start items-start gap-6 inline-flex">
            <h4 className="text-gray-900 text-xl font-semibold leading-8">
              Address Information
            </h4>
            <div className="w-full flex-col justify-start items-start gap-8 flex">
              <div className="w-full justify-start items-start gap-7 flex sm:flex-row flex-col">
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <label className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={handleChange}
                    name="country"
                    placeholder="country"
                    required
                    className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                  />
                </div>
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <label className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    name="state"
                    placeholder="State"
                    required
                    className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                  />
                </div>
              </div>

              {/* Zip Code Field */}
              <div className="w-full justify-start items-start gap-7 flex sm:flex-row flex-col">
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <label className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    name="city"
                    placeholder="City"
                    required
                    className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                  />
                </div>
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <label className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={handleChange}
                    name="pincode"
                    placeholder="Pincode"
                    required
                    className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                  />
                </div>
              </div>
              <div className="w-full justify-start items-start gap-7 flex sm:flex-row flex-col">
              
              <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <label className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">
                    Building Name
                  </label>
                  <input
                    type="text"
                    value={formData.buildingName}
                    onChange={handleChange}
                    name="buildingName"
                    placeholder="Building Name"
                    required
                    className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                  />
                </div>
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <label className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">
                    Road/Area/Colony
                  </label>
                  <input
                    type="text"
                    value={formData.roadAreaColony}
                    onChange={handleChange}
                    name="roadAreaColony"
                    placeholder="Road/Area/Colony"
                    required
                    className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                  />
                </div>
                </div>
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <label className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">
                  Landmark
                  </label>
                  <textarea
                    type="text"
                    value={formData.landmark}
                    onChange={handleChange}
                    name="landmark"
                    placeholder="Landmark"
                    required
                    className="w-full h-[100px] focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                  />
                </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
    </form>
    
    {/* <div>
    <h3 className="text-xl font-semibold mb-2">Your Ordered Products</h3>
    <div className="space-y-4">
      {cart.map((product) => (
        <div
          key={product.productId._id}
          className="flex items-center border p-4 rounded-md"
        >
          <img
            src={product.productId.image}
            alt={product.productId.productName}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div className="ml-4 flex-1">
            <h4 className="font-bold">{product.productId.productName}</h4>
            <p>Price: ₹{product.productId.price}</p> */}
            {/* <p>Quantity: {product.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  <button
      type="submit"
      onClick={handleSubmit}
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-blue-600"
    >
                 {loading ? "Processing..." : "Proceed to Payment"}

    </button> */}
    </>
  );
}

export default OrderAddress;
