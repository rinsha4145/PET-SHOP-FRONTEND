import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Add.css'; 

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: '',
    price: '',
    productDescription: '',
    category: '',
    src: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'price') {
      const formattedPrice = value.replace(/£/g, '');
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: `£${formattedPrice}`,
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/newProducts', product)
      .then((response) => {
        alert('Product added successfully!');
        navigate('/products'); 
      })
      .catch((error) => {
        console.error('Error adding product:', error.message);
        setError('Error adding product');
      });
  };

  return (
    <div className="add-product-container">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            placeholder='Product Name:'
            required
          />
        <br />
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder='Price:'
            required
          />
        <br />
          <textarea
            name="productDescription"
            value={product.productDescription}
            onChange={handleChange}
            placeholder='Description:'
            required
          />
        <br />
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder='Category:'
            required
          />
        <br />
          <input
            type="text"
            name="src"
            value={product.src}
            onChange={handleChange}
            placeholder='Image URL:'
            required
          />
        <br />
        <button type="submit">Add Product</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default AddProduct;
