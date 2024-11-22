import React, { useContext, useState,useEffect,useRef } from 'react';
import logo from '../../../Assets/logo.png';


import { useNavigate, Link } from 'react-router-dom';
import { DataContext } from '../Context/DataContext'; 
import { MyCartContext } from '../Context/CartContext';
import {
  User,
  ShoppingBag,
  Heart,
  ClipboardList,
  Settings,
  HelpCircle,
  FileText,
  LogOut
} from 'lucide-react';
import axiosInstance from '../../../AxiosIntance';
import handleAsync from '../../../HandleAsync';
import { toast } from 'react-toastify';


const Navbar = () => {
  const navigate = useNavigate();
  const { current, data,setCurrent } = useContext(DataContext); 
  
  const { cart,wish } = useContext(MyCartContext); 
  // const { wishlist } = useContext(WishlistContext); // Use WishlistContext
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfile = () => {
    if (current) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      navigate('/login'); 
    }
  };
  const handleLogout = handleAsync( async (e) => {
    e.preventDefault();
      const  response=await axiosInstance.post('/logout',{},{withCredentials:true});
      setCurrent(null)
      if (response.status >= 200 && response.status < 300) {
        toast.success('Logout successful', response.data);
        navigate("/login")
      } else {
        throw new Error(response.data.message || 'An error occurred');
      }
      setIsDropdownOpen(false);
      navigate('/login');
    
  });
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
        <div className="flex items-center space-x-6">
            {current && (
              <>
                {/* Wishlist */}
                <div className="relative">
                  <button 
                    onClick={() => navigate('/wishlistpage')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <Heart className="h-6 w-6 text-gray-700" />
                    {totalItemsInWishlist > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {totalItemsInWishlist}
                      </span>
                    )}
                  </button>
                </div>

                {/* Cart */}
                <div className="relative">
                  <button 
                    onClick={() => navigate('/cartpage')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <ShoppingBag className="h-6 w-6 text-gray-700" />
                    {totalItemsInCart > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {totalItemsInCart}
                      </span>
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleProfile}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <User className="h-6 w-6 text-gray-700" />
                {current && (
                  <span className="text-sm font-medium text-gray-700">{current.name}</span>
                )}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && current && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100 transition-all duration-200">
                  <div className="p-2">
                    {/* User Info */}
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">{current.name}</p>
                      <p className="text-sm text-gray-500">{current.email}</p>
                    </div>
                    
                    <div className="border-t border-gray-100">
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                        >
                          <User className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                          Profile
                        </Link>
                        
                        <Link
                          to="/order"
                          className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                        >
                          <ClipboardList className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                          My Orders
                        </Link>

                        <Link
                          to="/support"
                          className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                        >
                          <HelpCircle className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                          Help & Support
                        </Link>

                        {/* <Link
                          to="/terms"
                          className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                        >
                          <FileText className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                          Terms & Policies
                        </Link> */}
                      </div>
                    </div>

                    <div className="border-t border-gray-100">
                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                        >
                          <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
