import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../AxiosIntance';

function ViewAddress() {
  const [data, setData] = useState(null);
  const { _id } = useParams();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axiosInstance.get(`admin/address/${_id}`);
        console.log('API Response:', response.data.addressID); // Check the response structure
        setData(response.data.addressID); // Use addressID if it contains the address details
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    fetchAddress();
  }, [_id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-details mx-auto max-w-3xl mt-5 pl-10 ml-[200px] p-6 border border-gray-300 rounded-lg bg-white shadow-md text-start">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">User Address Details</h1>
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
        <strong className="font-medium text-gray-800">City:</strong> {data.city || 'N/A'}
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
    </div>
  );
}

export default ViewAddress;
