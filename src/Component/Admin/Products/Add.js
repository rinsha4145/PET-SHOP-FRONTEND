import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Add.css'; 
import axiosInstance from '../../../AxiosIntance';


function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title:'',
    productName: '',
    price: '',
    actualPrice:'',
    productDescription: '',
    category: '',
  });
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
};

  const handleChange = (event) => {
    const { name, value } = event.target;
  
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', image);
      Object.keys(product).forEach((key) => {
          formData.append(key, product[key]);
      });

    const response = await axiosInstance.post('admin/addproduct', formData)
    if (response.status === 200) {
      alert('Product added successfully');
      setProduct(null);
      setImage(null);
      navigate('/products');
    }
   
  }catch(error) {
        console.error('Error adding product:', error.message);
        setError('Error adding product');
      };
  };

  return (
    <div className="add-product-container p-8 bg-white rounded-lg shadow-md w-full max-w-2xl mx-auto">
  <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add New Product</h1>
  <form onSubmit={handleSubmit} className="space-y-6">
    
    {/* Product Name and Title */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="productName">Product Name:</label>
        <input
          type="text"
          name="productName"
          value={product.productName}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>

    {/* Price and Actual Price */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="actualPrice">Actual Price:</label>
        <input
          type="number"
          name="actualPrice"
          value={product.actualPrice}
          onChange={handleChange}
          placeholder="Actual Price"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>

    {/* Description */}
    <div>
      <label className="block text-gray-700 font-medium mb-2" htmlFor="productDescription">Description:</label>
      <textarea
        name="productDescription"
        value={product.productDescription}
        onChange={handleChange}
        placeholder="Description"
        required
        rows="4"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    {/* Category */}
    <div>
      <label className="block text-gray-700 font-medium mb-2" htmlFor="category">Category:</label>
      <input
        type="text"
        name="category"
        value={product.category}
        onChange={handleChange}
        placeholder="Category"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    {/* Image */}
    <div>
      <label className="block text-gray-700 font-medium mb-2" htmlFor="image">Image:</label>
      <input
        type="file"
        name="image"
        onChange={handleImageChange}
        required
        className="w-full text-sm text-gray-500 file:py-3 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 hover:file:bg-gray-200 focus:outline-none"
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Add Product
    </button>
  </form>

  {/* Error Message */}
  {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
</div>

  );
}

export default AddProduct;
