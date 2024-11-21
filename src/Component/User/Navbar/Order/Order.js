import React,{useState,useEffect, useContext} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import axiosInstance from '../../../../AxiosIntance';
import { MyCartContext } from "../../Context/CartContext";
import { toast } from 'react-toastify';
import handleAsync from '../../../../HandleAsync';

function Order() {
  const [orders,setorder]=useState([])
  const [oneOrders,setOneOrder]=useState([])

  const navigate=useNavigate()

  useEffect(()=>{
    
    const fetchorders=  async() => {
    try{
      const response = await axiosInstance.get(`/vieworder`)
    //   console.log("ssss",response.data.allOrders);  
      setorder(response.data.allOrders) 
    
    }catch (error) {
      console.error("Error fetching cart items:", error);
  }
}
    fetchorders()
  },[orders._id])

//   useEffect(()=>{
//     const fetchorders=  async() => {
//     try{
//       const response = await axiosInstance.get(`/oneorder`)
//     //   console.log("ssss",response.data.oneOrder);  
//       setOneOrder(response.data.oneOrder) 
    
//     }catch (error) {
//       console.error("Error fetching cart items:", error);
//   }
// }
//     fetchorders()
//   },[oneOrders])

  const {sessionid}= useParams()
  useEffect(()=>{
    if(sessionid){
        verify()
      }
  },[sessionid])

  const verify= handleAsync(async()=>{
    const respons= await axiosInstance.post("/verifyorder",{session_ID:sessionid})
    if (respons.status === 200 && respons.status < 300) {
        toast.success('payment completed and verified');
    }else{
        throw new Error(`Error: ${respons.data.message || 'An error occurred'}`);
    }

  
    
  })
  //cancel the order
  const handleCancel = async (id) => {
    try {
        setorder((prevOrders) => prevOrders.filter(order => order.id !== id));

        const response = await axiosInstance.post(`/ordercancel/${id}`);
        
        if (response.status >= 200 && response.status < 300) {
            toast.success("Order cancelled successfully", response.data);
        } else {
            throw new Error(`Error: ${response.data.message || 'An error occurred'}`);
        }
    } catch (error) {
        if (error.response && error.response.status >= 500) {
            toast.error('Server error, please try again later');
        } else {
            toast.error(error.response.data.message || 'Something went wrong!');
        }
    }
};


  return(  <>
    
            {/* <section className="py-24 relative"> */}
            {/* {oneOrders && oneOrders.map((order) => (
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
                    Payment Successful
                </h2>
                <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">Thanks for making a purchase
                    you can
                    check our order summary from below</p>

                    
                        
                <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                    <div
                        className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                        <div className="data">
                            <p className="font-semibold text-base leading-7 text-black">Order Id: <span className="text-indigo-600 font-medium">{order._id}</span></p>
                            <p className="font-semibold text-base leading-7 text-black mt-4">Order Payment : <span className="text-gray-400 font-medium"> {new Date(order.purchaseDate).toLocaleDateString()}</span></p>
                        </div>
                        {/* <button
                            className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">Track
                            Your Order</button> */}
                    {/* </div>
                    {order.products && order.products.map((product, index) => (
                    <div className="w-full px-3 min-[400px]:px-6">
                        <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                            <div className="img-box max-lg:w-full">
                                <img src={product.productId.image} alt="product" 
                                    className="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover"/>
                            </div>
                            <div className="flex flex-row items-center w-full ">
                                <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                    <div className="flex items-center">
                                        <div className="">
                                            <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                                                {product.productId.productName}</h2>
                                            <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                                                By: paw shop</p>
                                            <div className="flex items-center ">
                                                <p className="font-medium text-base leading-7 text-black ">Qty: <span
                                                        className="text-gray-500">{product.quantity}</span></p>
                                            </div>
                                        </div>
    
                                    </div>
                                    <div className="grid grid-cols-5">
                                        <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                            <div className="flex gap-3 lg:block">
                                                <p className="font-medium text-sm leading-7 text-black">₹ price</p>
                                                <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">₹{product.productId.price}</p>
                                            </div>
                                        </div>
                                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                            <div className="flex gap-3 lg:block">
                                                <p className="font-medium text-sm leading-7 text-black">shipping Status
                                                </p>
                                                <p
                                                    className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                                    {order.shippingStatus}</p>
                                            </div>
                                           
    
                                        </div>
                                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                            <div className="flex gap-3 lg:block">
                                                <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                                    Expected Delivery Time</p>
                                                <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                                {new Date(order.expectedDeliveryTime).toLocaleDateString()}</p>
                                            </div>
    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))} */}
                
                    {/* <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                        <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                            <button onClick={()=>handleCancel(order.sessionID)}
                                className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-white">
                                <svg className="stroke-black transition-all duration-500 group-hover:stroke-white " xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                    fill="none">
                                    <path d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5" stroke="" stroke-width="1.6"
                                        strokeLinecap="round" />
                                </svg>
                                Cancel Order
                            </button>
                            <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">Paid using  Card <span className="text-gray-500"></span></p>
                        </div>
                        <p className="font-semibold text-lg text-black py-6">Total Price: <span className="text-indigo-600"> ₹{order.amount}</span></p>
                    </div>
    
                </div>
               
            </div>
             ))}
        
        </section> */} 
        
                                           
    <div className="mt-5 bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center mb-10 mt-12 text-gray-800">Ordered History</h1>
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
                                            <p className="text-gray-600">Price: ₹{product.productId.price}</p>
                                            <p className="text-gray-600">Quantity: {product.quantity}</p>
                                            <p className="text-gray-600">Brand: {product.productId.brand}</p>
                                            <p className="text-gray-600">paymentStatus:{order.paymentStatus}</p>
                                            <p className="text-gray-600">shippingStatus:{order.shippingStatus}</p>
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
                        {/* <button onClick={()=>handleCancel(order.sessionID)}>cancel order</button> */}
                        <p className="text-right mt-6 text-gray-700 font-medium">
                            Total Amount: ${order.amount}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                            <button onClick={()=>handleCancel(order.sessionID)}
                                className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-white">
                                <svg className="stroke-black transition-all duration-500 group-hover:stroke-white " xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                    fill="none">
                                    <path d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5" stroke="" stroke-width="1.6"
                                        strokeLlinecap="round" />
                                </svg>
                                Cancel Order
                            </button>
                        </div>
                    </div>
                ))}
                       
            </div>
        </div>
         </>
  )
}

export default Order