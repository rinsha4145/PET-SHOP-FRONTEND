import React, { useState, useEffect } from 'react';
import './Users.css'; 
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../AxiosIntance';

function Users() {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const[block,setBlock]=useState()
const navigate=useNavigate();

useEffect(()=>{
  const fetchusers=  async() => {
  try{
    const response = await axiosInstance.get(`admin/viewusers`)
    const nonAdminUsers = response.data.users
    setData(nonAdminUsers);
  }catch (error) {
    console.error("Error fetching cart items:", error);
}
}
fetchusers()
},[])
  
  const handleBlock = (id) => {
    try{
    if (window.confirm(`Are you sure you want to block user with ID ${id}?`)) {
      const response=axiosInstance.post(`/admin/updateuser/${id}`)
      console.log("fghjkvbn",response.data)
      setBlock(response.data)
       
          alert(`User with ID ${id} has been blocked`);
       
    }

        
        }catch(error) {
          alert("dafsgdhgm");
        };
    
  };

  // const handleUnBlock = (id) => {
  //   if (window.confirm(`Are you sure you want to Unblock user with ID ${id}?`)) {
  //     axios.patch(`http://localhost:3000/Users/${id}`, { blocked: false })
  //       .then(() => {
  //         alert(`User with ID ${id} has been Unblocked`);
  //         setData(prevData => prevData.map(user => 
  //           user.id === id ? { ...user, blocked: false } : user
  //         ));
  //       })
  //       .catch(error => {
  //         alert(`Failed to block user: ${error.message}`);
  //       });
  //   }
  // };
  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen mt-2 ml-6">
    <button
      onClick={() => navigate("/admin")}
      className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
    >
      Go Back
    </button>
    <div className="overflow-x-auto w-full">
      <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden border-collapse border border-gray-300">
        <thead className="bg-gray-900">
          <tr className="text-white text-left">
            <th className="font-semibold text-sm uppercase px-6 py-4">ID</th>
            <th className="font-semibold text-sm uppercase px-6 py-4">Name</th>
            <th className="font-semibold text-sm uppercase px-6 py-4">Email</th>
            <th
              className="font-semibold text-sm uppercase px-6 py-4 text-center"
              colSpan={2}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4">{user._id}</td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => navigate(`/view/${user._id}`)}
                  className="text-blue-600 hover:underline"
                >
                  View
                </button>
              </td>
              <td className="px-6 py-4 text-center">
                {block === false ? (
                  <button
                    className="text-white text-sm w-14 pb-1 bg-red-600 font-semibold  rounded-full hover:bg-red-700"
                    onClick={() => handleBlock(user._id)}
                  >
                    Block
                  </button>
                ) : (
                  <button
                    className="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full hover:bg-green-700"
                    onClick={() => handleBlock(user._id)}
                  >
                    Unblock
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}

export default Users;
