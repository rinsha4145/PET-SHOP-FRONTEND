import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import handleAsync from '../../../HandleAsync';

const SignUp = () => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    phone: '',
    gender: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
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
    return Object.keys(errors).length === 0;
  };

  const handleSubmit =handleAsync( async (e) => {
    e.preventDefault();
    if (validate()) {
      
        const response = await axios.post("http://localhost:4000/signup", inputs);
        setInputs({
          name: '',
          email: '',
          password: '',
          cpassword: '',
          phone: '',
          gender: '',
          address: '',
        });
        if (response.status === 200 && response.status < 300) {
          toast.success('Registration successfully completed',response.data);
        navigate('/login');
        }else {
          throw new Error(`Error: ${response.data.message || 'An error occurred'}`);
        }
      
    }  
  });

  const handlesign = () => {
    navigate('/login');
  };

  // Toggle password visibility
  const togglePasswordVisibility = (type) => {
    if (type === 'password') {
      setShowPassword(prevState => !prevState);
    } else if (type === 'cpassword') {
      setShowCPassword(prevState => !prevState);
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center text-gray-600 bg-gray-50">
      <div className="relative">
        {/* Background SVG Patterns */}
        <div className="hidden sm:block h-56 w-56 text-orange absolute a-z-10 -left-20 -top-20">
          <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.6) rotate(0)'>
                <path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' fill='currentColor'/>
              </pattern>
            </defs>
            <rect width='800%' height='800%' fill='url(#a)'/>
          </svg>
        </div>
        <div className="hidden sm:block h-28 w-28 text-orange absolute a-z-10 -right-20 -bottom-20">
          <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'>
                <path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' fill='currentColor'/>
              </pattern>
            </defs>
            <rect width='800%' height='800%' fill='url(#b)'/>
          </svg>
        </div>

        {/* SignUp Form */}
        <div className="relative flex flex-col sm:w-[30rem] rounded-lg bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            <div className="mb-10 flex items-center justify-center">
              <span className="text-3xl font-black text-orange">paw shop.</span>
            </div>
            <h4 className="mb-2 font-medium text-gray-700 text-xl">Create Your Account</h4>
            <p className="mb-6 text-gray-500">Please sign up to start your journey with us!</p>

            <form onSubmit={handleSubmit} className="mb-4">
              <div className="mb-4">
                <label htmlFor="name" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Name</label>
                <input
                  type="text"
                  className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:shadow"
                  id="name"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  autoFocus
                />
                {errors.name && <p className="text-gray">{errors.name}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Email</label>
                <input
                  type="email"
                  className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:shadow"
                  id="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-gray">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Password</label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:shadow"
                    id="password"
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                    placeholder="············"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('password')}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                {errors.password && <p className="text-gray">{errors.password}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="cpassword" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Confirm Password</label>
                <div className="relative flex items-center">
                  <input
                    type={showCPassword ? 'text' : 'password'}
                    className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:shadow"
                    id="cpassword"
                    name="cpassword"
                    value={inputs.cpassword}
                    onChange={handleChange}
                    placeholder="············"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('cpassword')}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    <FontAwesomeIcon icon={showCPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                {errors.cpassword && <p className="text-gray">{errors.cpassword}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Phone Number</label>
                <input
                  type="text"
                  className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:shadow"
                  id="phone"
                  name="phone"
                  value={inputs.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-gray">{errors.phone}</p>}
              </div>

              <div className="mb-4">
                <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Gender</label>
                <div className="flex gap-4">
                  <div>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="Male"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="male" className="text-sm">Male</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="Female"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="female" className="text-sm">Female</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="Female"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="female" className="text-sm">Other</label>
                  </div>
                </div>
                {errors.gender && <p className="text-gray">{errors.gender}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Address</label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:shadow"
                  value={inputs.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                ></textarea>
                {errors.address && <p className="text-gray">{errors.address}</p>}
              </div>

              <div className="flex justify-between mb-4">
                <button type="submit" className="w-full bg-orange text-white py-2 px-4 rounded-md hover:bg-orange-700">
                  Sign Up
                </button>
              </div>

              <div className="flex justify-center">
                <p className="text-sm">
                  Already have an account?{' '}
                  <button
                    onClick={handlesign}
                    className="text-orange font-semibold"
                  >
                    Login here
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
