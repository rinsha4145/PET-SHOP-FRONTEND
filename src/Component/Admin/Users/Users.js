import React, { useState, useEffect } from "react";
import "./Users.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../AxiosIntance";
import handleAsync from "../../../HandleAsync";
import { toast } from "react-toastify";

function Users() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("admin/viewusers");
        const nonAdminUsers = response.data.users;
        setData(nonAdminUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleBlock = handleAsync(async (id) => {
      const response = await axiosInstance.post(`/admin/updateuser/${id}`);
      const updatedUser = response.data.user;
      setData((prevData) =>
        prevData.map((user) =>
          user._id === updatedUser._id ? { ...user, blocked: updatedUser.blocked } : user
        )
      );
      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data.message)
      } else {
        throw new Error(response.data.message || 'An error occurred');
      }
  });

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen mt-2 ml-6">
      <button
        onClick={() => navigate("/admin")}
        className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
        Go Back
      </button>
      <div className="overflow-x-auto w-full">
        <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden border-collapse border border-gray-300">
          <thead className="bg-gray-900">
            <tr className="text-white text-left">
              <th className="font-semibold text-sm uppercase px-6 py-4">ID</th>
              <th className="font-semibold text-sm uppercase px-6 py-4">Name</th>
              <th className="font-semibold text-sm uppercase px-6 py-4">Email</th>
              <th className="font-semibold text-sm uppercase px-6 py-4 text-center" colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4">{user._id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => navigate(`/view/${user._id}`)}className="text-sm bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400">View</button>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className={`text-white text-sm px-4 py-2 rounded-md ${user.blocked? "bg-yellow-500 hover:bg-yellow-400": "bg-red-600 hover:bg-red-700"}`}
                    onClick={() => handleBlock(user._id)}>
                    {user.blocked ? "Unblock" : "Block"}
                  </button>
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
