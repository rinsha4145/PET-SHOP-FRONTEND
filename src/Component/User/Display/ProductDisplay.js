import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDisplay.css";
import { MyCartContext } from "../Context/CartContext";
import { DataContext } from "../Context/DataContext";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Heart icons for wishlist

const ProductDisplay = () => {
  const context = useContext(DataContext);
  const { _id } = useParams();
  const { data, error } = context;
  const { addToCart, wish, addToWishlist, removewish } = useContext(MyCartContext); // Use wish context
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [_id]); // Depend on _id to ensure it runs when the product changes

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  const product = data.find((item) => item._id === _id);
  if (!product) {
    return <p>Product not found</p>;
  }

  // Handle wishlist toggle
  const handleWishlistToggle = (product) => {
    const isProductInWishlist = wish.some((item) => item._id === product._id);
    if (isProductInWishlist) {
      removewish(product._id); // Remove from wishlist
    } else {
      addToWishlist(product._id); // Add to wishlist
    }
  };

  // Find related products
  const relatedProducts = data
    .filter((item) => item._id !== _id && item.category === product.category)
    .slice(0, 6); // Limit to 6 related products

  const handleAddToCart = (product) => {
    if (addToCart) {
      addToCart(product._id);
    } else {
      console.error("addToCart function is not available in context");
    }
  };

  return (
    <>
      <div className="flex justify-center bg-gray-50 items-center h-screen">
        <div className="grid grid-cols-2 gap-8 max-w-6xl bg-white shadow-md ">
          <div className="relative">
            <img
              src={product.image}
              alt={product.productName}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-black pr-8">
              {product.productName}
            </h2>
            <div className="flex items-center gap-4">
              {product.title === "Offer" ? (
                <>
                  <p className="text-lg text-gray-500 dark:text-gray-400 line-through">
                    ₹{product.actualPrice}
                  </p>
                  <p className="text-lg text-gray-500 dark:text-gray-400 font-semibold">
                    ₹{product.price}
                  </p>
                </>
              ) : (
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  ₹{product.price}
                </p>
              )}
            </div>
            <p className="text-xl text-gray-900 dark:text-black">
              {product.productDescription}
            </p>

            {/* Button and Heart Icon on the same row */}
            <div className="flex items-center gap-4">
              {/* Heart Icon for Wishlist */}
              <div
                className={`cursor-pointer ${wish.some(
                  (item) => item._id === product._id
                )
                  ? "text-red-500"
                  : "text-gray-400"}`}
                onClick={() => handleWishlistToggle(product)}
              >
                {wish.some((item) => item._id === product._id) ? (
                  <FaHeart className="w-6 h-6" />
                ) : (
                  <FaRegHeart className="w-6 h-6" />
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                className="w-[400px] bg-orange text-white py-3 px-6 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </button>
            </div>
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
              <p className="price">₹{relatedProduct.price}</p>
              <button onClick={() => navigate(`/productdetails/${relatedProduct._id}`)}>View Details</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;