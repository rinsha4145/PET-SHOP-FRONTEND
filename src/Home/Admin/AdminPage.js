import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css'; // Import the CSS file
import users from '../../Assets/users.png'
import products from '../../Assets/product.png'

function AdminPage() {
  const navigate = useNavigate();

  return (
    <div className="card-container">
      <div className="card">
        <img src={users} alt="Users" />
        <h3>Manage Users</h3>
        <p>View and manage user accounts</p>
        <button onClick={() => navigate('/users')}>VIEW USERS</button>
      </div>

      <div className="card">
        <img src={products} alt="Products" />
        <h3>Manage Products</h3>
        <p>View and manage product listings</p>
        <button onClick={() => navigate('/products')}>VIEW PRODUCTS</button>
      </div>
    </div>
  );
}

export default AdminPage;