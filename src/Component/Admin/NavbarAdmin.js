import React from 'react';
import './NavbarAdmin.css';  
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { DataContext } from '../User/Context/DataContext';
import { useNavigate } from 'react-router-dom';

const NavbarAdmin = () => {
    const {setAdmin}=useContext(DataContext)
    const navigate = useNavigate();
  const handleAdminLogout = () => {
        localStorage.removeItem('admin');
setAdmin(null)
        alert("you logged out")
        navigate('/login');
        
  };

  return (
    <nav className="navbara">
      <div className="navbar-content">
        <FaUserCircle className="profile"onClick={()=>navigate('/admin')} />
        <span className="admin-text">Admin logged in</span>
        <div className="logout-section" onClick={handleAdminLogout}>
          <FaSignOutAlt className="logout-icon" />
          <span className="logout-text">Logout</span>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
