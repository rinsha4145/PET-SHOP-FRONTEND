import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../Context/DataContext';
import './Profile.css';
import axiosInstance from '../../../../AxiosIntance';
import { toast } from 'react-toastify';
import handleAsync from '../../../../HandleAsync';

function Profile() {
    const { current,setCurrent  } = useContext(DataContext);
    const navigate=useNavigate();
    const handleLogout = handleAsync( async (e) => {
        e.preventDefault();
          const  response=await axiosInstance.post('/logout',{},{withCredentials:true});
          setCurrent(null)
          if (response.status >= 200 && response.status < 300) {
            toast.success('Logout successful', response.data);
            navigate("/login")
          } else {
            throw new Error(response.data.message || 'An error occurred');
          }
          navigate('/login');
        
      });
      
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-transperant">
            <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
                <div className="rounded-t-lg h-32 overflow-hidden">
                    <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
                </div>
                <div className="mx-auto w-32 h-32 relative -mt-10 border-4 border-white rounded-full overflow-hidden">
                    <img className="object-cover object-center h-32" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Woman looking front' />
                </div>
                <div className="text-center mt-2 ">
                    <h2 className="font-semibold">{current.name}</h2>
                    <p className="text-gray-500">An active user</p>
                    <p className="font-semibold">{current.email}</p>
                </div>
                <div className="p-4 border-t mx-8 mt-2">
                    <button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2" onClick={handleLogout}>
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
}
    
export default Profile;