import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../../../AxiosIntance';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import  handleAsync from '../../../HandleAsync'


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
    fetch('http://localhost:4000/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

//get cookies
  useEffect(() => {
    const userCookie = Cookies.get("user");
    const adminCookie = Cookies.get("admin");
    if (userCookie ) {
      // Check if the cookie starts with 'j:' and remove it
      const userJson = userCookie.startsWith("j:") ? userCookie.slice(2) : userCookie;
      try {
        const user = JSON.parse(userJson);
        setCurrent(user)
      } catch (error) {
      }
    }else if(adminCookie){
      const adminJson = adminCookie.startsWith("j:") ? adminCookie.slice(2) : adminCookie;
      try {
        const admin = JSON.parse(adminJson);
        setAdmin(admin)
      } catch (error) {
      }
    } else {
      console.log("User cookie not found");
    }
  },[datas]);

//handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatas({ ...datas, [name]: value });
  };

  //login submit
  const handleSubmit = handleAsync(async (e) => {
    e.preventDefault();
      const response = await axiosInstance.post('/login', {email: datas.email, password: datas.password});
      if (response.status === 200 && response.status < 300) {
        toast.success('Login successful');
        setDatas({ email: '', password: '' });
        navigate('/')
      }else{
        throw new Error(`Error: ${response.data.message || 'An error occurred'}`);
      }
  });
 
  return (
    <DataContext.Provider value={{ data, error, handleChange, handleSubmit, datas, current, setCurrent,admin,setAdmin }}>
      {children}
    </DataContext.Provider>
  );
}
