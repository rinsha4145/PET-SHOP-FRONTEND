import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
import axiosInstance from '../../../AxiosIntance';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

export const DataContext = createContext();
export function FetchData({ children }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [datas, setDatas] = useState({email: '',password: ''});
  const [current, setCurrent] = useState();
  const [admin, setAdmin] = useState();

  const navigate = useNavigate();


  //product fetching
  useEffect(() => {
    console.log('Fetching data from http://localhost:4000/products'); // Debugging
    fetch('http://localhost:4000/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data fetched successfully:', data); // Debugging
        setData(data);
      })
      .catch(error => {
        console.error('Fetch error:', error.message); // Debugging
        setError(error.message);
      });
  }, []);


  useEffect(() => {
    // Retrieve the cookie value
    const userCookie = Cookies.get("user");
    const adminCookie = Cookies.get("admin");

    console.log("Cookie value:", adminCookie);
  
    if (userCookie ) {
      // Check if the cookie starts with 'j:' and remove it
      const userJson = userCookie.startsWith("j:") ? userCookie.slice(2) : userCookie;
  
      try {
        const user = JSON.parse(userJson);
        // console.log("Parsed User Object:", user);
        // console.log("Username:", user.email);
        setCurrent(user)
      } catch (error) {
        // console.error("Failed to parse user cookie:", error);
      }
    }else if(adminCookie){
      const adminJson = adminCookie.startsWith("j:") ? adminCookie.slice(2) : adminCookie;
      try {
        const admin = JSON.parse(adminJson);
        // console.log("Parsed User Object:", user);
        // console.log("Username:", user.email);
        setAdmin(admin)
      } catch (error) {
        // console.error("Failed to parse user cookie:", error);
      }
    } else {
      console.log("User cookie not found");
    }
  },[datas]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatas({ ...datas, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axiosInstance.post('/login', {
        email: datas.email, 
        password: datas.password
      });
      console.log('Login successful');
      setDatas({ email: '', password: '' });
      navigate('/')
    } catch (error) {
      // console.log("", error);
     console.log('Error occurred during login:',error.response  );
      
      alert(error.response.data.message || 'Login failed');

    }
  };
  
  

 
 
  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <DataContext.Provider value={{ data, error, handleChange, handleSubmit, handleCreateAccount, datas, current, setCurrent,admin,setAdmin }}>
      {children}
    </DataContext.Provider>
  );
}
