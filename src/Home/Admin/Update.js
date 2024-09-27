import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './Update.css'; // Import your CSS file

function ProductUpdate() {
  const { id } = useParams(); // Get the product ID from URL parameters
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/newProducts/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Fetch error:', error.message); 
        setError(error.message);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update logic here
    axios.put(`http://localhost:3000/newProducts/${id}`, product, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      alert('Product updated successfully');
      navigate('/products'); 
    })
    .catch(error => {
      console.error('Update error:', error.message);
      setError(error.message);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="update-container">
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="productDescription"
            value={product.productDescription}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="src"
            value={product.src}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default ProductUpdate;
