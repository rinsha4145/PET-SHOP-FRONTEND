import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    phone: '',
    gender: '',
    address: '',
    admin: false,
    blocked: false,
    orderdetails: {},
    cart: []
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
   
  };

  const validate = () => {
    let errors = {};

   
    if (!inputs.name) {
      errors.name = 'Name is required.';
    }

    
    if (!inputs.email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      errors.email = 'Email address is invalid.';
    }

   
    if (!inputs.password) {
      errors.password = 'Password is required.';
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(inputs.password)
    ) {
      errors.password =
        'Password must be 8-16 characters long, with at least one uppercase letter, one lowercase letter, one digit, and one special character.';
    }

   
    if (!inputs.cpassword) {
      errors.cpassword = 'Confirm password is required.';
    } else if (inputs.password !== inputs.cpassword) {
      errors.cpassword = 'Passwords do not match.';
    }

  
    if (!inputs.phone) {
      errors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(inputs.phone)) {
      errors.phone = 'Phone number must be 10 digits.';
    }

    if (!inputs.gender) {
      errors.gender = 'Gender is required.';
    }

    if (!inputs.address) {
      errors.address = 'Address is required.';
    }

    setErrors(errors);
    console.log("Validation Errors: ", errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted");

    if (validate()) {
      console.log("Form is valid, proceeding with email check");

      try {
       
        const emailCheckResponse = await axios.get(`http://localhost:3000/Users?email=${inputs.email}`);

        if (emailCheckResponse.data.length > 0) {
          setErrors({ email: 'Email is already registered.' });
          console.log("Email already exists");
          return;
        } 
        const response = await axios.post("http://localhost:3000/Users", inputs);
        console.log('User registered:', response.data);
        setInputs({
          name: '',
          email: '',
          password: '',
          cpassword: '',
          phone: '',
          gender: '',
          address: '',
          admin: false,
          blocked: false,
          cart: []
        });

        alert('Registration successfully completed');
        navigate('/login');

      } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred during registration. Please try again.');
      }
    } else {
      console.log("Form is invalid, not submitting");
    }
  };

  const handlesign = () => {
    navigate('/login');
  };

  return (
    <div className='con'>
      <div className="sign-up">
        <h1>Create Account</h1>
        <p>Use your email for registration:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <p className="error-text">{errors.name}</p>}

          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <input
            type="password"
            name="cpassword"
            value={inputs.cpassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
          {errors.cpassword && <p className="error-text">{errors.cpassword}</p>}

          <input
            type="text"
            name="phone"
            value={inputs.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="error-text">{errors.phone}</p>}

          <select
            name="gender"
            value={inputs.gender}
            onChange={handleChange}
            placeholder="Select your gender"
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="error-text">{errors.gender}</p>}

          <input
            type="text"
            name="address"
            value={inputs.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
          {errors.address && <p className="error-text">{errors.address}</p>}

          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <button onClick={handlesign}>Sign In</button></p>
      </div>
    </div>
  );
};

export default SignUp;
