import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDisplay.css";
import { MyCartContext } from "../Context/CartContext";
import { DataContext } from "../Context/DataContext";

const ProductDisplay = () => {
  const context = useContext(DataContext); 
  const { _id } = useParams();
  const { data, error } = context;
  const { addToCart } = useContext(MyCartContext);

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
  // console.log("first",_id)
  if (!product) {
    return <p>Product not found</p>;
  }

  // Find related products
  const relatedProducts = data.filter(
    (item) => item.id !== _id && item.category === product.category ).slice(0, 6); // Limit to 6 related products

  const handleAddToCart = (product) => {
    if (addToCart) {
      addToCart(product._id); 
    } else {
      console.error('addToCart function is not available in context');
    }
  };

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
      <button className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" onClick={()=>handleAddToCart(product)}>Add to cart</button>
    </div>
  </div>
</div>

      {/* Related Products Section */}
      <div className="related-products">
        <h2>Related Products</h2>
        <div className="related-products-list">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct._id} className="related-product">
              <img src={relatedProduct.image} alt={relatedProduct.productName} />
              <p>{relatedProduct.productName}</p>
              <p className="price">{relatedProduct.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
