import React, { useState, useContext } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const Login = () => {
  const { handleChange, handleSubmit, datas } = useContext(DataContext);
  const [showPassword, setShowPassword] = useState(false);
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
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

        {/* Login Form */}
        <div className="relative flex flex-col sm:w-[30rem] rounded-lg bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            <div className="mb-10 flex items-center justify-center">
              <span className="text-3xl font-black text-orange">paw shop.</span>
            </div>
            <h4 className="mb-2 font-medium text-gray-700 text-xl">Welcome to paw shop!</h4>
            <p className="mb-6 text-gray-500">Please sign-in to access your account</p>

            <form onSubmit={handleSubmit} className="mb-4">
              <div className="mb-4">
                <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Email</label>
                <input
                  type="text"
                  className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:shadow"
                  id="email"
                  name="email"
                  value={datas.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoFocus
                />
              </div>

              <div className="mb-4">
                <div className="flex justify-between">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700" htmlFor="password">Password</label>
                  <Link to="/forgot-password" className="text-orange text-xs">Forgot Password?</Link>
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm focus:border-indigo-500 focus:shadow"
                    id="password"
                    name="password"
                    value={datas.password}
                    onChange={handleChange}
                    placeholder="············"
                  />
                   <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500  focus:outline-none hover:bg-transparent "
              aria-label="Toggle password visibility" >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
                </div>
              </div>

              <div className="mb-4">
                <input
                  className="mr-2 h-5 w-5 rounded border border-gray-300 text-orange focus:border-indigo-500"
                  type="checkbox"
                  id="remember-me"
                />
                <label className="inline-block text-gray-700" htmlFor="remember-me">Remember Me</label>
              </div>

              <div className="mb-4">
                <button className="w-full rounded-md border border-orange bg-orange py-2 text-sm text-white hover:bg-gray-600 focus:bg-gray-600">
                  Sign in
                </button>
              </div>
            </form>

            <p className="text-center">
              New on paw?{' '}
              <Link to="/sign" className="text-orange">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
