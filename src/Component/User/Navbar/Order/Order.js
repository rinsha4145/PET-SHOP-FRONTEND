import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../AxiosIntance';

function Order() {
  const [orders,setorder]=useState([])
  const navigate=useNavigate()

  useEffect(()=>{
    const fetchorders=  async() => {
    try{
      const response = await axiosInstance.get(`/vieworder`)
      console.log("ssss",response.data.allOrders);  
      setorder(response.data.allOrders) 
    
    }catch (error) {
      console.error("Error fetching cart items:", error);
  }
}
    fetchorders()
  },[])

//   const handleClick = (e) => {
//     e.preventDefault();
//     try{
//         const response =  axiosInstance.post(`/vieworder`)
//     }catch (error) {
//         console.error(error);

//   };


  // const handleViewDetails = (productId) => {
  //   navigate(/orderdetailes/${productId})
  //   console.log("View details for product:", productId);
  // };
  return(   
<div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center mb-10 mt-12 text-gray-800">Ordered Products</h1>
            <div className="max-w-4xl mx-auto space-y-8">
                {orders && orders.map((order) => (
                    <div key={order._id} className="bg-white rounded-lg shadow-md p-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Order ID: <span className="text-indigo-600">{order._id}</span>
                            </h2>
                            <p className="text-gray-600">
                                Purchase Date: {new Date(order.purchaseDate).toLocaleDateString()}
                            </p>
                        </div>
                        <h3 className="text-lg font-bold text-gray-700 mb-4">Products:</h3>
                        <div className="space-y-6">
                            {order.products && order.products.map((product, index) => (
                                <div 
                                    key={index} 
                                    className="bg-gray-50 p-4 rounded-md shadow-sm flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img 
                                            src={product.productId.image} 
                                            alt={product.productId.name} 
                                            className="w-20 h-20 rounded-lg object-cover mr-6" 
                                        />
                                        <div>
                                            <h4 className="font-semibold text-gray-700 text-lg">
                                                {product.productId.name}
                                            </h4>
                                            <p className="text-gray-600">Price: ${product.productId.price}</p>
                                            <p className="text-gray-600">Quantity: {product.quantity}</p>
                                            <p className="text-gray-600">Brand: {product.productId.brand}</p>
                                        </div>
                                    </div>
                                    
                                    {/* View Details Button with Right Arrow Icon */}
                                    {/* <button 
                                        onClick={() => handleViewDetails(product.productId._id)} 
                                        className="text-indigo-600 hover:text-indigo-800 flex items-center"
                                    >
                                        <span className="mr-2">View Details</span>
                                        <i className="fa-solid fa-chevron-down fa-rotate-270 text-lg"></i>
                                    </button> */}
                                </div>
                            ))}
                        </div>
                        {/* <button onClick={handleClick}>cancel order</button> */}
                        <p className="text-right mt-6 text-gray-700 font-medium">
                            Total Amount: ${order.amount}
                        </p>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Order