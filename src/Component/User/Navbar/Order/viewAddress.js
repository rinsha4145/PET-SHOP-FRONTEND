import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../AxiosIntance';
import { useParams } from 'react-router-dom';

function ViewAddre() {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
     

        const response = await axiosInstance.get(`/getorderdetails/${id}`);
        console.log("Fetching details for ID:", id);
        console.log("Address ID:", response.data.addressID);  // Logging the first address
        setData(response.data.addressID);  // Set the first address data
      } catch (error) {
        console.error("Error fetching address details:", error);
      }
    };
    fetchOrders();
  }, [id]);

  return (
    <div className="user-details mx-auto max-w-3xl mt-5 pl-10 ml-[200px] p-6 mt-[100px] border border-gray-300 rounded-lg bg-white shadow-md text-start">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">ordered Address Details</h1>

      {/* Check if data exists before rendering */}
      {data ? (
        <>
          <p className="text-lg mb-3 text-gray-600">
            <strong className="font-medium text-gray-800">ID:</strong> {data._id}
          </p>
          <p className="text-lg mb-3 text-gray-600">
            <strong className="font-medium text-gray-800">Full Name:</strong> {data.fullName}
          </p>
          <p className="text-lg mb-3 text-gray-600">
            <strong className="font-medium text-gray-800">Email:</strong> {data.email}
          </p>
          <p className="text-lg mb-3 text-gray-600">
            <strong className="font-medium text-gray-800">Phone Number:</strong> {data.phoneNumber || 'N/A'}
          </p>
          <p className="text-lg mb-3 text-gray-600">
            <strong className="font-medium text-gray-800">Alternate Phone Number:</strong> {data.alternatePhoneNumber || 'N/A'}
          </p>
          <p className="text-lg mb-3 text-gray-600">
            <strong className="font-medium text-gray-800">Country:</strong> {data.country || 'N/A'}
          </p>
          <p className="text-lg mb-3 text-gray-600">
            <strong className="font-medium text-gray-800">City:</strong> {data.country  || 'N/A'}
          </p>
          <p className="text-lg mb-3 text-gray-600">
            <strong className="font-medium text-gray-800">State:</strong> {data.state || 'N/A'}
          </p>
          <p className="text-lg mb-3 text-gray-600">
            <strong className="font-medium text-gray-800">Pincode:</strong> {data.pincode || 'N/A'}
          </p>
          <p className="text-lg mb-3 text-gray-600">
            <strong className="font-medium text-gray-800">Building Name:</strong> {data.buildingName || 'N/A'}
          </p>
          <p className="text-lg mb-3 text-gray-600">
            <strong className="font-medium text-gray-800">Road/Area/Colony:</strong> {data.roadAreaColony || 'N/A'}
          </p>
          <p className="text-lg mb-3 text-gray-600">
            <strong className="font-medium text-gray-800">Landmark:</strong> {data.landmark || 'N/A'}
          </p>
        </>
      ) : (
        <p>Loading address details...</p>
      )}
    </div>
  );
}

export default ViewAddre;
