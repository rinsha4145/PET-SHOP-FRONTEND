import React from 'react';



const ProfilePage = () => {
    const registeredEmail = localStorage.getItem('registeredEmail');
    const registeredName = localStorage.getItem('registeredName');
    const user = {name:registeredName,email:registeredEmail}
  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};
export default ProfilePage;
