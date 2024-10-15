import React, { useContext, useEffect } from 'react';
import './CartPage.css';
import { MyCartContext } from '../../Context/CartContext';



function Cart() {
  
  const { cart,  incrementQuantity, decrementQuantity, handlecheckout ,handleremove} =useContext(MyCartContext);

 
  const calculateSubtotal = (price, qty) => {
    const validPrice = parseFloat(price);
    const validQty = parseInt(qty, 10);

   
    console.log("Item price:", price, "Parsed price:", validPrice);
    console.log("Item qty:", qty, "Parsed qty:", validQty);

    if (isNaN(validPrice) || isNaN(validQty)) {
      return 0; 
    }
    return (validPrice * validQty).toFixed(2);
  };

  
  const calculateTotalPrice = () => {
    const total = cart.reduce((sum, item) => {
      const itemSubtotal = parseFloat(item.actualPrice) * parseInt(item.qty, 10);

      
      console.log("Item subtotal for", item.productName, ":", itemSubtotal);

      return sum + (isNaN(itemSubtotal) ? 0 : itemSubtotal);
    }, 0);

    
    console.log("Total price:", total);
    
    return total.toFixed(2);
  };


  useEffect(() => {
    console.log("Cart data:", cart);
  }, [cart]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p style={{textAlign:"center"}}>Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.src} alt={item.productName} className="cart-item-image" />
              <div className="cart-item-details">
                <h4>{item.productName}</h4>
                <p className="text-danger">Price: ₹{item.actualPrice}</p>
                <div className="quantity-buttons">
                  <button onClick={() => decrementQuantity(item.id)}>-</button>
                  <input
                    type="number"
                    value={item.qty}
                    min="1"
                    readOnly
                  />
                  <button onClick={() => incrementQuantity(item.id)}>+</button>
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleremove(item.id)}
                  >
                    Remove
                  </button>
                  <p className="fw-bold mb-0">
                    Subtotal: ₹{calculateSubtotal(item.actualPrice, item.qty)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div>
            <h3>Total Price: ₹{calculateTotalPrice()}</h3>
            <button className="buy-now-button" onClick={handlecheckout}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
