import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
// import "./ProductDisplay.css";
import { MyCartContext } from "../../User/Context/CartContext";
import { DataContext } from '../../User/Context/DataContext';

const ViewProductDetails = () => {
  const context = useContext(DataContext); 
  const { _id } = useParams();
  const { data, error } = context;


  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [_id]); // Depend on _id to ensure it runs when the product changes

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  const product = data.find((item) => item._id === _id);
  console.log("first1234567890",product)
  if (!product) {
    return <p>Product not found</p>;
  }

 
  

  return (
    <>
    <div className="flex justify-center bg-gray-50 items-center h-screen">
  <div className="grid grid-cols-2 gap-8 max-w-6xl bg-white shadow-md ">
    <div className="relative">
      <img src={product.image} alt={product.productName} className="w-[400px] h-[400px] object-cover rounded-lg " />
    </div>
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-black pr-8">{product.productName}</h2>
      <p className="text-lg text-gray-500 dark:text-gray-400">price: ${product.actualPrice}</p>
      <p className="text-xl text-gray-900 dark:text-black">{product.productDescription}</p>
     
    </div>
  </div>
</div>

    </>
  );
};

export default ViewProductDetails;
