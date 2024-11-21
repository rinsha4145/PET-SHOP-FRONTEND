import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Update.css'; // Import your CSS file
import axiosInstance from '../../../AxiosIntance';
import handleAsync from '../../../HandleAsync';
import { toast } from 'react-toastify';

function ProductUpdate() {
  const { _id } = useParams(); // Get the product ID from URL parameters
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title:'',
    productName: '',
    price: '',
    actualPrice:'',
    productDescription: '',
    category: '',
    image: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch=async()=>{
      try{
        const response = await axiosInstance.get(`admin/viewproductsbyid/${_id}`)
        setProduct(response.data.product);   
      }catch(error) {
        setError(error.message);
      };
    }
    fetch() 
  }, [_id]);

  const handleSubmit = handleAsync( (e) => {
    const update=async()=>{
    e.preventDefault();
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      const value = product[key];
      if (value instanceof File) {
        formData.append(key, value); 
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value)); 
      } else {
        formData.append(key, value);
      }
    });
    
    // Update logic here
    const response= await axiosInstance.patch(`admin/updateproduct/${_id}`, formData )
    if (response.status >= 200 && response.status < 300) {
      toast.success('Product updated successfully');
      navigate(`/products`);
    }
  }
  update()
  });

  const handleChange = (event) => {
    const { name, value,type,files } = event.target;
    setProduct(prevProduct => ({...prevProduct,[name]:type === "file" ? files[0] : value, }));
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
        <label>
          Actual Price:
          <input
            type="text"
           name="actualPrice"
            value={product.actualPrice}
            onChange={handleChange}
          />
        </label>
        <br />    
        <label>
          Title:
          <textarea
            name="title"
            value={product.title}
            onChange={handleChange}
          />
        </label> 
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
            type="file"
            name="image"
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
