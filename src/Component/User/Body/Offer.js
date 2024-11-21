import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import './Offer.css';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';  
import { MyCartContext } from '../Context/CartContext';

function Offer() {
  const context = useContext(DataContext);
  const { data, error } = context;
  const{addToWishlist,wish,removewish}=useContext(MyCartContext)
  const navigate = useNavigate();

  const handleWishlistToggle = (product) => {
    const isProductInWishlist = wish.some(item => item._id === product._id);
    if (isProductInWishlist) {
    removewish(product._id)
    } else {
      addToWishlist(product._id)
     
    }
  };

  if (!context) {
    return <p>Context not available</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  const offerProducts = data.filter(product => product.title === 'Offer');

  return (
    <section className="py-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-4xl text-black mb-8 max-lg:text-center">OFFER PRODUCT</h2>
        <p className="text-center text-lg mb-8">Here are some of our offer products</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerProducts.length > 0 ? (
            offerProducts.map((product) => (
              <div key={product._id} className="product-card bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute top-0 left-0 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-br-lg">Offer</div>
                <div className={`absolute top-2 right-2 cursor-pointer ${wish.some(item => item._id === product._id) ? 'text-red-500' : 'text-gray-400'}`}
                  onClick={() => handleWishlistToggle(product)}>
                  {wish.some(item => item._id === product._id) ? <FaHeart className='w-6 h-6'/> : <FaRegHeart className='w-6 h-6'/>}
                </div>

            {/* Cart Icon */}
            {/* <div className="absolute top-2 right-12 cursor-pointer text-gray-400">
              <FaShoppingCart className="w-6 h-6" title="Add to Cart" />
            </div> */}

                <a  className="mx-auto sm:ml-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                  <div className="">
                    <img src={product.image} alt={product.productName} className="w-full aspect-square rounded-2xl object-cover" />
                  </div>
                  <div className="mt-5">
                    <h6 className="font-semibold text-medium leading-8 text-black transition-all duration-50 group-hover:text-[#b78829]">{product.productName}</h6>
                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">₹{product.actualPrice}</h6>
                    <button onClick={() => navigate(`/productdetails/${product._id}`)}>View Details</button>
                  </div>
                </a>
            </div>
          ))
          ) : (
            <p>No offer products found.</p>
          )}
        </div>
    </div>
  </section>
  );
}

export default Offer;
