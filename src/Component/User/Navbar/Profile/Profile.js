import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { DataContext } from '../../Context/DataContext';
import './Profile.css';
import { MyCartContext } from '../../Context/CartContext';
import axios from 'axios';



function Profile() {
    const { current,setCurrent  } = useContext(DataContext);
    const {clearCart}=useContext(MyCartContext)
    const navigate=useNavigate();
    
        const handleLogout = async (e) => {
            e.preventDefault();
            try {
              await axios.post('http://localhost:4000/logout',{},{withCredentials:true});
              setCurrent(null)
              alert('Logout successful');
              navigate("/")
            } catch (error) {
              console.error('Error occurred during logout:', error.response);
              alert(error.response?.data?.message || 'Logout failed');
            }
          };
      
    
   

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <FaUser className="profile-icon" />
                </div>
                <h2 className="profile-title">{current.name}</h2>
                <p className="profile-text">An active user</p>
                <p className="profile-email">Email Address: {current.email}</p>
                <button className="btn btn-danger profile-button" onClick={handleLogout}>Log out</button>
                <Link to="/" className="btn btn-primary profile-button">
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

export default Profile;
