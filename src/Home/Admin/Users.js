import React, { useState, useEffect } from 'react';
import './Users.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Users() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
const navigate=useNavigate();
  useEffect(() => {
    fetch('http://localhost:3000/Users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
       
        const nonAdminUsers = data.filter(user => user.admin === false);
        setData(nonAdminUsers);
      })
      .catch(error => setError(error.message));
  }, []);

  const handleBlock = (id) => {
    if (window.confirm(`Are you sure you want to block user with ID ${id}?`)) {
      axios.patch(`http://localhost:3000/Users/${id}`, { blocked: true })
        .then(() => {
          alert(`User with ID ${id} has been blocked`);
       
          setData(prevData => prevData.map(user => 
            user.id === id ? { ...user, blocked: true } : user
          ));
        })
        .catch(error => {
          alert(`Failed to block user: ${error.message}`);
        });
    }
  };

  const handleUnBlock = (id) => {
    if (window.confirm(`Are you sure you want to Unblock user with ID ${id}?`)) {
      axios.patch(`http://localhost:3000/Users/${id}`, { blocked: false })
        .then(() => {
          alert(`User with ID ${id} has been Unblocked`);
          setData(prevData => prevData.map(user => 
            user.id === id ? { ...user, blocked: false } : user
          ));
        })
        .catch(error => {
          alert(`Failed to block user: ${error.message}`);
        });
    }
  };
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
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><button onClick={()=>navigate(`/view/${user.id}`)}>View</button></td>
              <td>
              {user.blocked === false ? (
                  <button className="block-btn" onClick={() => handleBlock(user.id)}>
                    Block
                  </button>
                ) : (
                  <button className="unblock-btn" onClick={() => handleUnBlock(user.id)}>
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
