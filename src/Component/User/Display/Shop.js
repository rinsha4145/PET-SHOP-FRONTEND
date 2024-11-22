import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import { MyCartContext } from '../Context/CartContext';
import './DisplayItem.css'; // Ensure the styles are compatible
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function Shop() {
  const context = useContext(DataContext);
  const { addToWishlist, wish, removewish } = useContext(MyCartContext);
  const navigate = useNavigate();

  if (!context) {
    return <p>Context not available</p>;
  }

  const { data, error } = context;

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  const handleWishlistToggle = (product) => {
    const isProductInWishlist = wish.some(item => item._id === product._id);
    if (isProductInWishlist) {
      removewish(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  return (
    <section className="py-[40px]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-4xl text-black mb-8 max-lg:text-center">
          SHOP IT NOW
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.length > 0 ? (
            data.map((product) => (
              <div key={product._id} className="product-card bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 relative">
                {/* Offer Badge */}
                {product.title === 'Offer' && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-br-lg">
                    Offer
                  </div>
                )}

                {/* Wishlist Icon */}
                <div
                  className={`absolute top-2 right-2 cursor-pointer ${wish.some(item => item._id === product._id) ? 'text-red-500' : 'text-gray-400'}`}
                  onClick={() => handleWishlistToggle(product)}
                >
                  {wish.some(item => item._id === product._id) ? <FaHeart className="w-6 h-6" /> : <FaRegHeart className="w-6 h-6" />}
                </div>

                <div className="mx-auto sm:ml-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                  <div>
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="w-full aspect-square rounded-2xl object-cover"
                    />
                  </div>
                  <div className="mt-5">
                    <h6 className="font-semibold text-medium leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                      {product.productName}
                    </h6>
                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">
                      ₹{product.price || product.actualPrice}
                    </h6>
                    <button
                      className="mt-2 px-4 py-2 text-white bg-indigo-600 rounded-md"
                      onClick={() => navigate(`/productdetails/${product._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Shop;
