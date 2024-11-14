import React, { useContext, useState } from 'react';
import logo from '../../../Assets/logo.png';
import cartimg from '../../../Assets/cart.png';
import userIcon from '../../../Assets/user.png';
import wishblack from '../../../Assets/wishlistblack.png';
import profile from '../../../Assets/profile.png';
import order from '../../../Assets/order.png'

import { useNavigate, Link } from 'react-router-dom';
import { DataContext } from '../Context/DataContext'; 
import { MyCartContext } from '../Context/CartContext';


const Navbar = () => {
  const navigate = useNavigate();
  const { current, data } = useContext(DataContext); 
  
  
  const { cart,wish } = useContext(MyCartContext); 
  // const { wishlist } = useContext(WishlistContext); // Use WishlistContext
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const handleProfile = () => {
    if (current) {
      navigate('/profile'); 
    } else {
      navigate('/login'); 
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = searchQuery.toLowerCase();

      if (query === 'dog') {
        navigate('/dog');
      } else if (query === 'cat') {
        navigate('/cat');
      } else {
        const product = data.find(
          (product) => product.productName.toLowerCase() === query
        );

        if (product) {
          navigate(`/productdetails/${product.id}`);
        } else {
          navigate('/search');
        }
      }
      setExpanded(false);
      setSearchQuery('');
      console.log('Searching for:', searchQuery);
    }
  };

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);
  console.log("totalItemsInCart",totalItemsInCart);
  
  const totalItemsInWishlist = wish.length; 

  return (
    <nav className="navbar flex justify-around items-center bg-white w-full z-[1000] h-20 shadow-[0_2px_4px_rgba(0,0,0,0.1)] fixed pt-2.5 left-0 top-0">
      <div className="navbar-logo flex items-center gap-2">
        <img
          src={logo}
          alt="Petshop logo"
          className="h-[50px] cursor-pointer mb-[5px]"
          onClick={() => navigate('/')}
        />
      </div>

      <ul className="navbar-menu flex gap-8 m-0 p-0 list-none">
        <li>
          <Link
            to="/shop"
            className="text-black no-underline transition-[color] duration-[0.3s] ease-[ease] hover:text-[#b78829] font-verdana text-lg"
          >
            SHOP
          </Link>
        </li>
        <li>
          <Link
            to="/pets"
            className="text-black no-underline transition-[color] duration-[0.3s] ease-[ease] hover:text-[#b78829] font-verdana text-lg"
          >
            MY PETS
          </Link>
        </li>
        <li>
          <Link
            to="/support"
            className="text-black no-underline transition-[color] duration-[0.3s] ease-[ease] hover:text-[#b78829] font-verdana text-lg"
          >
            SUPPORT
          </Link>
        </li>
        <li>
          <a
            href="#booking"
            className="text-black no-underline transition-[color] duration-[0.3s] ease-[ease] hover:text-[#b78829] font-verdana text-lg"
          >
            BOOKINGS
          </a>
        </li>
      </ul>

      <div className="navbar-actions flex items-center gap-5">
        {/* Search Bar */}
        <div className="search-container flex items-center space-x-2 mt-[2px] mb-[5px] mr-10 ">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch} // Search on keydown
            className="rounded bg-[#c7c7c748] mr-2 p-2 border-none"
          />
          <button
            onClick={handleSearch}
            className="ounded bg-[#555] text-white cursor-pointer mt-0.5 px-4 py-2 border-none hover:bg-[#777]"
          >
            Search
          </button>
        </div>

        {/* Profile Section */}
        <div className="profile-container bg-transparent relative">
          {/* Conditionally render profile and icons based on user login */}
          {current ? (
            <>
              

              {/* Wishlist Icon */}
              <div className="wishlist-icon relative">
                <img
                  src={wishblack}
                  alt="Wishlist"
                  onClick={() => navigate(`/wishlistpage`)}
                  className="h-[35px] cursor-pointer transition-transform duration-[0.3s] ease-[ease] hover:scale-110 mr-4"
                />
                {totalItemsInWishlist > 0 && (
                  <span className="wishlist-count absolute bg-red-500 text-white text-[10px]  px-[5px] py-[1px] rounded-full right-[10px] top-[-10px]">
                    {totalItemsInWishlist}
                  </span>
                )}
              </div>

              {/* Cart Icon */}
              <div className="cart-icon relative">
                <img
                  src={cartimg}
                  alt="Cart"
                  onClick={() => navigate('/cartpage')}
                  className="h-[35px] cursor-pointer transition-transform duration-[0.3s] ease-[ease] hover:scale-110 mb-1 mr-4"
                />
                {totalItemsInCart > 0 && (
                  <span className="cart-count absolute bg-red-500 text-white text-[10px] px-[5px] py-[1px] rounded-full right-[10px] top-[-8px]">
                    {totalItemsInCart}
                  </span>
                )}
              </div>
              {/* Profile with user name */}
              <div className="profile-info">
                <img
                  src={profile}
                  alt="User profile"
                  onClick={handleProfile}
                  className="h-[35px] cursor-pointer transition-transform duration-[0.3s] ease-[ease] hover:scale-110 mr-4 mt-3 "/>
                <span className="text-[11.5px] ml-3 mt-2">{current.name}</span>
              </div>
              {/* order Icon */}
              <div className="cart-icon relative">
                <img
                  src={order}
                  alt="order"
                  onClick={() => navigate('/order')}
                  className="h-[35px] cursor-pointer transition-transform duration-[0.3s] ease-[ease] hover:scale-110 mb-1"
                />
              </div>
            </>
          ) : (
            // Show login icon if no user is logged in
            <img
              src={userIcon}
              onClick={handleProfile}
              alt="Login"
              className="h-[40px] cursor-pointer transition-transform duration-[0.3s] ease-[ease] hover:scale-110"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
