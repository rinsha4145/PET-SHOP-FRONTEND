import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import './DisplayItem.css';  // Make sure the styles are compatible
import { useNavigate,Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';  // Import heart icons

function Shop() {
  const context = useContext(DataContext);
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

  return (
    <section className="py-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-4xl text-black mb-8 max-lg:text-center">
          SHOP IT NOW
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.length > 0 ? (
            data.map((product) => (
              <div key={product.id} className="product-card bg-white rounded-lg shadow-md hover:shadow-xl column-gap-[60px] transition-all duration-300 relative">
                {product.title === 'Offer' && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-br-lg">
                    Offer
                  </div>
                )}

                {/* Heart Icon for Wishlist */}
                <div className={`absolute top-2 right-2 cursor-pointer text-gray-400`}>
                  <FaRegHeart className="w-6 h-6" />
                </div>

                <Link className="mx-auto sm:ml-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                  <div>
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="w-full aspect-square rounded-2xl object-cover"
                      onClick={() => navigate(`/productdetails/${product.id}`)}
                    />
                  </div>
                  <div className="mt-5">
                    <h6 className="font-semibold text-medium leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                      {product.productName}
                    </h6>
                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">₹{product.price}</h6>
                    <button
                      className="mt-2 px-4 py-2 text-white bg-indigo-600 rounded-md"
                      onClick={() => navigate(`/productdetails/${product._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </Link>
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
