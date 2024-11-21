import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../AxiosIntance';
import { useParams } from 'react-router-dom';
import './View.css'; 

const View = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState([]);
  const [error, setError] = useState(null);

  //view user by id
  useEffect(()=>{
    const fetchusersbyid=  async() => {
      try{
        const response = await axiosInstance.get(`/admin/viewuserbyid/${id}`)
        setUser(response.data.userbyid)
      }catch (error) {
        console.error("Error fetching cart items:", error);
      }
    }
    fetchusersbyid()
  },[id])    

  //view orders by user id
  useEffect(()=>{
    const fetchusersbyid=  async() => {
    try{
      const response = await axiosInstance.get(`/admin/orderbyuserid/${id}`)
      console.log("asdfgh",response.data.orderofuser)
      setOrder(response.data.orderofuser)
    }catch (error) {
      console.error("Error fetching cart items:", error);
  }
  }
  fetchusersbyid()
  },[id])
  
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
   <>
    <div className="user-details mx-auto max-w-3xl mt-5 pl-10 p-6 border border-gray-300 rounded-lg bg-white shadow-md text-start">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">User Personal Details</h1>
      <p className="text-lg mb-3 text-gray-600">
        <strong className="font-medium text-gray-800">ID:</strong> {user._id}
      </p>
      <p className="text-lg mb-3 text-gray-600">
        <strong className="font-medium text-gray-800">Name:</strong> {user.name}
      </p>
      <p className="text-lg mb-3 text-gray-600">
        <strong className="font-medium text-gray-800">Email:</strong> {user.email}
      </p>
      <p className="text-lg mb-3 text-gray-600">
        <strong className="font-medium text-gray-800">Phone:</strong> {user.phone || 'N/A'}
      </p>
      <p className="text-lg mb-3 text-gray-600">
        <strong className="font-medium text-gray-800">Gender:</strong> {user.gender || 'N/A'}
      </p>
      <p className="text-lg mb-3 text-gray-600">
        <strong className="font-medium text-gray-800">Address:</strong> {user.address || 'N/A'}
      </p>
      <p className="text-lg mb-3 text-gray-600">
        <strong className="font-medium text-gray-800">Blocked:</strong> {user.blocked ? 'Yes' : 'No'}
      </p>



        {/* Conditionally show Order Details if present */}
        {/* <h1>Order Details</h1>
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
        )} */}
    </div>

    <div className="py-24 relative">
      {order.length > 0 ? (
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">User Orders</h2>
          {order.map((order) => (
            <div key={order._id} className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full mb-8 ml-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                <div className="data flex flex-wrap gap-6">
                  {/* Order ID */}
                  <div className="w-full">
                    <p className="font-semibold text-base leading-7 text-black">
                      Order ID: <span className="text-indigo-600 font-medium">{order._id}</span>
                    </p>
                  </div>
                  {/* Row with Purchase Date, Payment Status, Shipping Status, and Total Amount */}
                  <div className="w-full flex flex-wrap justify-between items-center">
                    <p className="font-semibold text-base leading-7 text-black">
                      Purchase Date:{" "}<span className="text-gray-400 font-medium">{new Date(order.purchaseDate).toLocaleDateString()}</span>
                    </p>
                    <p className="font-semibold text-base leading-7 text-black">
                      Payment Status: <span className="text-gray-400">{order.paymentStatus}</span>
                    </p>
                    <p className="font-semibold text-base leading-7 text-black">
                      Shipping Status: <span className="text-gray-400">{order.shippingStatus}</span>
                    </p>
                    <p className="font-semibold text-base leading-7 text-black">
                      Total Amount: <span className="text-gray-400">${order.amount}</span>
                    </p>
                  </div>
                </div>
              </div>
              {order.products.map((product) => (
                <div key={product._id} className="w-full px-3 min-[400px]:px-6">
                  <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                    <div className="img-box max-lg:w-full">
                    <img src={product.productId.image} alt={product.productId.productName} className="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover"/>
                  </div>
                  <div className="flex flex-row items-center w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                      <div className="flex items-center">
                        <div>
                          <h2 className="font-semibold text-xl leading-8 text-black mb-3">{product.productId.productName}</h2>
                          <p className="font-normal text-lg leading-8 text-gray-500 mb-3">By: paw shop</p>
                          <div className="flex items-center">
                            <p className="font-medium text-base leading-7 text-black">Qty: <span className="text-gray-500">{product.quantity}</span></p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-5">
                        <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                          <div className="flex gap-3 lg:block">
                            <p className="font-medium text-sm leading-7 text-black">Price</p>
                            <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">${product.productId.price}</p>
                          </div>
                        </div>
                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                          <div className="flex gap-3 lg:block">
                            <p className="font-medium text-sm leading-7 text-black">Status</p>
                            <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">{order.shippingStatus}</p>
                          </div>
                        </div>
                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                          <div className="flex gap-3 lg:block">
                            <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">Expected Delivery Time</p>
                            <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">{new Date(order.expectedDeliveryTime).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500">No orders found.</p>
    )}
  </div>
  </>
  );
};

export default View;
