import React, { useState, useEffect } from 'react';
import './Products.css'; 
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../AxiosIntance';
import handleAsync from '../../../HandleAsync';
import { toast } from 'react-toastify';

function Products() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of products per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(`admin/viewproducts`);
        console.log('Data fetched successfully:', response); 
        setData(response.data.product);
        setFilteredData(response.data.product);
        const uniqueCategories = Array.from(new Set(response.data.product.map(product => product.category)));
        setCategories(['All', ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = async (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);

    if (selectedCategory === 'All') {
      setFilteredData(data);
    } else {
      try {
        const response = await axiosInstance.get(`admin/viewproductsbycategory/${selectedCategory}`);
        setFilteredData(response.data.product);
        setCurrentPage(1); // Reset to the first page when category changes
      } catch (error) {
        console.error('Error fetching category products:', error);
      }
    }
  };
  const handleDelete = handleAsync(async (id) => {
    if (window.confirm(`Are you sure you want to delete the product with ID ${id}?`)) {
        const response = await axiosInstance.delete(`admin/deleteproduct/${id}`);
        setData(prevData => prevData.filter(product => product._id !== id));
        if (response.status >= 200 && response.status < 300) {
          toast.success('Product deleted successfully');
          navigate('/products');
        } else {
          throw new Error(response.data.message || 'An error occurred');
        }
    }
  });
  

  // Pagination 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen mt-2 ml-6 mt-5">
      <div className="flex items-center mb-4 space-x-4 ml-4">
        <label htmlFor="category-filter" className="text-sm font-medium ml-[150px]">
          Category:
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          onClick={() => navigate("/add")}
        >
          Add Product
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          Go Back
        </button>
      </div>
      <div className="overflow-x-auto w-full ml-[150px]">
        <table className="w-[300px] whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden border-collapse border border-gray-300">
          <thead className="bg-gray-900">
            <tr className="text-white text-left">
              <th className="font-semibold text-sm uppercase px-2 py-2">ID</th>
              <th className="font-semibold text-sm uppercase px-2 py-2">Image</th>
              <th className="font-semibold text-sm uppercase px-4 py-2">Category</th>
              <th className="font-semibold text-sm uppercase px-2 py-2">Name</th>
              <th className="font-semibold text-sm uppercase px-2 py-2">Price</th>
              <th className="font-semibold text-sm uppercase px-2 py-2">View</th>
              <th className="font-semibold text-sm uppercase px-2 py-2">Update</th>
              <th className="font-semibold text-sm uppercase px-2 py-2">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((product) => (
              <tr key={product._id}>
                <td className="px-2 py-2">{product._id}</td>
                <td className="px-4 py-2">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-2 py-2 pl-6">{product.category}</td>
                <td className="px-6 py-2">{product.productName}</td>
                <td className="px-2 py-2">₹{product.price}</td>
                <td className="px-2 py-2 text-center">
                  <button
                    className="text-sm bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
                    onClick={() => navigate(`/ViewProductDetails/${product._id}`)}
                  >
                    View
                  </button>
                </td>
                <td className="px-2 py-2 text-center">
                  <button
                    className="text-sm bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-400"
                    onClick={() => navigate(`/update/${product._id}`)}
                  >
                    Update
                  </button>
                </td>
                <td className="px-2 py-2 text-center">
                  <button
                    className="text-sm bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
