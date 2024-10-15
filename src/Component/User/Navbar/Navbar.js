import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../../../Assets/logo.png';
import cartimg from '../../../Assets/cart.png';
import userIcon from '../../../Assets/user.png';
import { useNavigate, Link } from 'react-router-dom';
import { DataContext } from '../Context/DataContext'; 
import { MyCartContext } from '../Context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { current,data } = useContext(DataContext); 
  const { cart } = useContext(MyCartContext); 
  const [searchQuery, setSearchQuery] = useState('');
 
  const[expanded,setExpanded]=useState(false)
  
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
  
      // Convert search query to lowercase
      const query = searchQuery.toLowerCase();
  
      // Perform navigation based on query
      if (query === "dog") {
        navigate("/dog");
      } else if (query === "cat") {
        navigate("/cat");
      }  else {
        // Find product by name
        const product = data.find((product) => product.productName.toLowerCase() === query);
  
        if (product) {
          navigate(`/productdetails/${product.id}`);
        } else {
          navigate("/search");
        }
      }
  
      // Reset search query and collapse search bar (if applicable)
      setExpanded(false);
      setSearchQuery("");
  
      console.log('Searching for:', searchQuery);
    }
  };
  

  const totalItemsInCart = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Petshop logo" onClick={() => navigate('/')} />
      </div>
      <ul className="navbar-menu">
        <li><Link to="/shop">SHOP</Link></li>
        <li><Link to='/pets'>MY PETS</Link></li>
        <li><Link to="/support">SUPPORT</Link></li>
        <li><a href="#booking">BOOKINGS</a></li>
        {/* <li><a href="#findus">FIND US</a></li> */}
      </ul>
      <div className="navbar-actions">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="cart-icon">
          <img src={userIcon} onClick={handleProfile} alt="User profile" />
          {current && <span style={{ fontSize: '11.5px' }}>{current.name}</span>} 
        </div>
        {current &&
          <div className="cart-icon">
            <img src={cartimg} alt="Cart" onClick={() => navigate('/cartpage')} />
            {totalItemsInCart > 0 && <span className="cart-count">{totalItemsInCart}</span>} 
          </div>}
      </div>
    </nav>
  );
};

export default Navbar;
