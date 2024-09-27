import React, { useState, useEffect } from 'react';
import './Products.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

function Products() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filter, setFilter] = useState('all'); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Fetching data from http://localhost:3000/newProducts'); 
    axios.get('http://localhost:3000/newProducts')
      .then(response => {
        console.log('Data fetched successfully:', response.data); 
        setData(response.data);
        setFilteredData(response.data);
        
        const uniqueCategories = Array.from(new Set(response.data.map(product => product.category)));
        setCategories(['All', ...uniqueCategories]);
      })
      .catch(error => {
        console.error('Fetch error:', error.message); 
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    
    let updatedData = data;

    if (selectedCategory !== 'All') {
      updatedData = updatedData.filter(product => product.category === selectedCategory);
    }

    if (filter !== 'all') {
      updatedData = updatedData.filter(product => product.productName.toLowerCase().includes(filter));
    }

    setFilteredData(updatedData);
  }, [selectedCategory, filter, data]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  

  
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete product with ID ${id}?`)) {
      axios.delete(`http://localhost:3000/newProducts/${id}`)
        .then(() => {
          
          setData(prevData => prevData.filter(product => product.id !== id));
          setFilteredData(prevFilteredData => prevFilteredData.filter(product => product.id !== id));
          alert('Product deleted successfully');
        })
        .catch(error => {
          console.error('Delete error:', error.message);
          setError(error.message);
        });
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="table-container">
      <div className="filter-container">
        <label htmlFor="category-filter">Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button className="add-btn" onClick={()=>navigate('/add')}>
          Add Product
        </button>
        <button onClick={() => navigate('/admin')} className='back'>Go Back</button>
      </div>
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Category</th>
            <th className="name-header">Name</th>
            <th>Price</th>
            <th className="description-header">Description</th>
            <th colSpan={2}>Action</th>
            
          </tr>
        </thead>
        <tbody>
          {filteredData.map((product, index) => (
            <tr key={`${product.id}-${index}`}>
              <td>{product.id}</td>
              <td><img src={product.src} alt={product.productName} /></td>
              <td>{product.category}</td>
              <td className="name-cell">{product.productName}</td>
              <td>{product.price}</td>
              <td className="description-cell">{product.productDescription}</td>
              <td>
                <button className="update-btn" onClick={() => navigate(`/update/${product.id}`)}>
                  Update
                </button>
              </td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default Products;
