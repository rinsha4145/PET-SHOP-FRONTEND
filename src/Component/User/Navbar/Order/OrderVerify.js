import React, { useContext, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MyCartContext } from "../../Context/CartContext";
import axiosInstance from '../../../../AxiosIntance';
import handleAsync from '../../../../HandleAsync';
import { DataContext } from '../../Context/DataContext';
import { toast } from 'react-toastify';

const OrderVerify = () => {
  const [data, setData] = useState(null);
  const { current, setCurrent } = useContext(DataContext);
  const { cart, setCart,handlecheckout,address ,latestAddress} = useContext(MyCartContext);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
      // Logging the first address
      console.log(address)
        setData(latestAddress);  // Set the first address data
      
  }, []);

  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white"><br/><br/><br/>
      <h1 className="text-2xl font-semibold text-indigo-600 mb-2">Order Summary</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Shipping & Billing Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-semibold text-lg">Shipping & Billing Info</h2>
            <ArrowUpRight className="w-4 h-4 text-gray-500" />
          </div>
          
          <div className="space-y-4">
            {data ? (
              <>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p>{data.fullName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p>{data.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">PhoneNumber</p>
                  <p>{data.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Alternate PhoneNumber</p>
                  <p>{data.alternatePhoneNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Shipping Address</p>
                  <p>Country : {data.country}</p>
                  <p>State : {data.state}</p>
                  <p>Building Name : {data.buildingName}</p>
                  <p>Road/Area/Colony : {data.roadAreaColony}</p>
                  <p>Landmark : {data.landmark}</p>
                </div>
              </>
            ) : (
              <p>Loading data...</p>
            )}
          </div>
        </div>

        {/* Payment Method
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-semibold text-lg">Payment Method</h2>
            <ArrowUpRight className="w-4 h-4 text-gray-500" />
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Payment</p>
              <p>Cash on Delivery</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium">Shipping Method</h3>
                <ArrowUpRight className="w-4 h-4 text-gray-500" />
              </div>
              <p className="text-sm text-gray-500">Shipping</p>
              <p>Post Service (1-3 Work Day)</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Note</p>
              <p className="text-sm">Please notify me once the order has been shipped, and provide the tracking information for my reference.</p>
            </div>
          </div>
        </div> */}

        {/* Shopping Cart */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-semibold text-lg">Items in your Shopping Cart</h2>
            <ArrowUpRight className="w-4 h-4 text-gray-500" />
          </div>
          
          <div className="space-y-6">
            {cart.map((product) => (
            <div className="flex gap-4">
              <div key={product.productId._id} className="w-20 h-20 bg-gray-100 rounded-lg"></div>
              <div className="flex-1">
                <h3 className="font-medium">{product.productId.productName}</h3>
                <p className="text-sm text-gray-500">Dust Studios</p>
                <div className="flex justify-between mt-1">
                  <p className="text-sm">Price: ₹{product.productId.price}</p>
                  <p className="text-indigo-600">Quantity: {product.quantity}</p>
                </div>
              </div>
            </div>
            ))}

            {/* Total Price */}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <p className="font-medium">Total Price:</p>
                <p className="text-lg font-semibold text-indigo-600">$360.00</p>
              </div>
            </div>
          </div>
          <button
      type="submit"
      onClick={handleSubmit}
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-blue-600"
    >
                 Proceed to Payment

    </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-lg font-medium">Thank you for shopping with us!</p>
        <p className="text-indigo-600 mt-2">Team Pagedone</p>
      </div>
    </div>
  );
};

export default OrderVerify;
