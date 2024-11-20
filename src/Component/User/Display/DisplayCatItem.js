
import React, { useContext, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import './DisplayItem.css';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 
import { MyCartContext } from '../Context/CartContext';
function DisplayCatItem() {
  const context = useContext(DataContext);
  const navigate = useNavigate();

  const [filterOption, setFilterOption] = useState('all');
  const{addToWishlist,wish,removewish}=useContext(MyCartContext)


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

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  const handleWishlistToggle = (product) => {
    const isProductInWishlist = wish.some(item => item._id === product._id);
    if (isProductInWishlist) {
      // Remove from wishlist
    removewish(product._id)
    } else {
      addToWishlist(product._id)
     
    }
  };

  
  const filteredProducts = data
    .filter(product => product.category === 'cat')
    .filter(product => {
      if (filterOption === 'toy') {
        return product.productName.toLowerCase().includes('toy');
      } else if (filterOption === 'food') {
        return product.productName.toLowerCase().includes('food');
      } else {
        return true; 
      }
    });

  return (
    <section className="py-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-4xl text-black mb-8 max-lg:text-center">
          Product list
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-card bg-white rounded-lg shadow-md hover:shadow-xl column-gap-[60px] transition-all duration-300 relative">
                {product.title === 'Offer' && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-br-lg">
                    Offer
                  </div>
                )}
                
                {/* Heart Icon for Wishlist */}
                <div 
                  className={`absolute top-2 right-2 cursor-pointer ${wish.some(item => item._id === product._id) ? 'text-red-500' : 'text-gray-400'}`}
                  onClick={() => handleWishlistToggle(product)}
                >
                  {wish.some(item => item._id === product._id) ? <FaHeart className='w-6 h-6'/> : <FaRegHeart className='w-6 h-6'/>}
                </div>

                <a  className="mx-auto sm:ml-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                  <div className="">
                    <img src={product.image} alt={product.productName} className="w-full aspect-square rounded-2xl object-cover" />
                  </div>
                  <div className="mt-5">
                    <h6 className="font-semibold text-medium leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                      {product.productName}
                    </h6>
                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">₹{product.price}</h6>
                    <button onClick={() => navigate(`/productdetails/${product._id}`)}>View Details</button>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <p>No products found for the selected filter.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default DisplayCatItem;
