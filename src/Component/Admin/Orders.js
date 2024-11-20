import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxiosIntance';

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('admin/vieworder');
        console.log('Data fetched successfully:', response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Function to handle shipping status update
  const handleShippingStatusChange = async (id, newStatus) => {
    try {
      // Send the updated shipping status to the backend
      const response = await axiosInstance.put(`admin/updateShippingStatus/${id}`, { shippingStatus: newStatus });
      console.log('Shipping status updated:', response.data);

      // Update the local state to reflect the change
      setOrders((prevOrders) => 
        prevOrders.map((order) => 
          order._id === id ? { ...order, shippingStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating shipping status:', error);
    }
  };

  return (
    <div className="min-h-screen mt-2 ml-6">
      <div className="overflow-x-auto w-full">
        <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden border-collapse border border-gray-300">
          <thead className="bg-gray-900">
            <tr className="text-white text-left">
              <th className="font-semibold text-sm uppercase px-6 py-4">Order Id</th>
              <th className="font-semibold text-sm uppercase px-6 py-4">User Id & Name</th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">Products</th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">Amount</th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">Payment Status</th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center">Shipping Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4">
                  <p>{product._id}</p>
                </td>
                <td className="px-6 py-4">
                  {product.userID && (
                    <>
                      {/* Rendering user properties */}
                      <p>{product.userID._id}</p>
                      <p className="text-gray-500 text-sm font-semibold tracking-wide">{product.userID.name}</p>
                    </>
                  )}
                </td>
                
                <td className="px-6 py-4 text-center">
                  <button onClick={() => navigate(`/viewproducts/${product._id}`)} className="text-purple-800 hover:bg-white hover:underline">
                    View Products
                  </button>
                </td>
                <td className="px-6 py-4 text-center">₹{product.amount}</td>
                <td className="px-6 py-4 text-center">
                  <span className="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full">
                    {product.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {/* Shipping Status Select Dropdown */}
                  <select
                    value={product.shippingStatus}
                    onChange={(e) => handleShippingStatusChange(product._id, e.target.value)}
                    className="text-sm font-semibold bg-gray-100 rounded-full px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
