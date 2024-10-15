import React, { useState, useContext } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../../Assets/logo.png';
import { DataContext } from '../Context/DataContext';

const Login = () => {
  const { handleChange, handleSubmit, datas } = useContext(DataContext);
  const [showPassword, setShowPassword] = useState(false);
  
// Toggle password 
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="Company Logo" className="logo" />
        <h2>PET SHOP</h2>
      </div>
      <div className="login-right">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group-login">
            <input
              type="text" 
              name="email" 
              value={datas.email} 
              onChange={handleChange} 
              placeholder="Enter your email" 
            />
          </div>
          <div className="form-group password-container">
            <input 
              type={showPassword ? 'text' : 'password'}  
              name="password" 
              value={datas.password} 
              onChange={handleChange} 
              placeholder="Enter your password" 
            />
            <button 
              type="button" 
              className="toggle-password-btn" 
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="forgot">
            <br/><Link to='/forgot-password'>Forgot password?</Link>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
          <div className="register-link">
            <p>Don't have an account? <Link to='/sign'>Register Here</Link></p><br/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
