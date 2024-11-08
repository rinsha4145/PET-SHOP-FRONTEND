import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
export const DataContext = createContext();

export function FetchData({ children }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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

  const [datas, setDatas] = useState({
    email: '',
    password: ''
  });
  const storedcurrent = localStorage.getItem("current");
  const [current, setCurrent] = useState(storedcurrent ? JSON.parse(storedcurrent) : null);

  const storedadmin = localStorage.getItem("admin");
  const [admin, setAdmin] = useState(storedadmin ? JSON.parse(storedadmin) : null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatas({ ...datas, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', {
        email: datas.email, 
        password: datas.password
      });
     
      Cookies.set('user',JSON.stringify(response.data.user))
      console.log(response.data.user)
      Cookies.set('token',JSON.stringify(response.data.userToken))
      console.log(response.data.userToken)
      console.log('Login successful');
      navigate('/');
      // const user = users.find((user) => user.email === datas.email && user.password === datas.password && !user.admin);
      // const adminUser = users.find((user) => user.email === datas.email && user.password === datas.password && user.admin);

      // if (user) {
      //   if(user.blocked===false){
      //   localStorage.setItem("current", JSON.stringify(user));
      //   setCurrent(user);
      //   alert('Login successfully completed');
      //   setDatas({ email: '', password: '' });
      //   navigate('/');
      //   }
      //   else{
      //     alert('Your account is blocked. Please contact support.');
          
      //   }
      // } else if (adminUser) {
      //   localStorage.setItem("admin", JSON.stringify(adminUser));
      //   setAdmin(adminUser);
      //   alert('Admin login successfully completed');
      //   setDatas({ email: '', password: '' });
      //   navigate('/admin');
      // } else {
      //   alert('Incorrect email or password');
      // }
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
