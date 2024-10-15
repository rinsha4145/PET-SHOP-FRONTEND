import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDisplay.css";
import { MyCartContext } from "../Context/CartContext";
import { DataContext } from "../Context/DataContext";

const ProductDisplay = () => {
  const context = useContext(DataContext); 
  const { productId } = useParams();
  const { data, error } = context;
  const { addToCart } = useContext(MyCartContext);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [productId]); // Depend on productId to ensure it runs when the product changes

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  const product = data.find((item) => item.id === productId);

  if (!product) {
    return <p>Product not found</p>;
  }

  // Find related products
  const relatedProducts = data.filter(
    (item) => item.id !== productId && item.category === product.category 
  ).slice(0, 6); // Limit to 6 related products

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(product); 
    } else {
      console.error('addToCart function is not available in context');
    }
  };

  return (
    <>
      <div className="product-page">
        <div className="product-info">
          <div className="product-image">
            <img src={product.src} alt={product.productName} />
          </div>
        </div>
        <div className="product-details">
          <h1 className="product-title">{product.productName}</h1>
          <p className="product-brand">by Pets at Home</p>
          <p>{product.productDescription}</p>
          <p>{product.size}</p>
          {product.title === 'Offer' ? (
            <p className="price">{product.price}</p>
          ) : (
            <p className="price">{product.actualPrice}</p>
          )}
          <button className="add-to-basket" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="related-products">
        <h2>Related Products</h2>
        <div className="related-products-list">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="related-product">
              <img src={relatedProduct.src} alt={relatedProduct.productName} />
              <p>{relatedProduct.productName}</p>
              <p className="price">{relatedProduct.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
