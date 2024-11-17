import React, { useState, useEffect } from 'react';
import './Users.css'; 
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../AxiosIntance';

function Users() {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
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
  
  // const handleBlock = (id) => {
  //   try{
  //   if (window.confirm(`Are you sure you want to block user with ID ${id}?`)) {
  //     const response=axiosInstance.post(`/admin/updateuser/${id}`)
  //     console.log("fghjkvbn",response.data)
       
  //         alert(`User with ID ${id} has been blocked`);
       
  //         setData(prevData => prevData.map(user => 
  //           user._id === id ? { ...user, blocked: true } : user
  //         ));
        
  //       }catch(error) {
  //         alert("dafsgdhgm");
  //       };
    
  // };

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
    <div className="table-container">
       <button onClick={() => navigate('/admin')} className='backbutton'>Go Back</button>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><button onClick={()=>navigate(`/view/${user._id}`)}>View</button></td>
              <td>
              {user.blocked === false ? (
                  <button className="block-btn" onClick={() => handleBlock(user._id)}>
                    Block
                  </button>
                ) : (
                  <button className="unblock-btn" onClick={() => handleBlock(user._id)}>
                    Unblock
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
