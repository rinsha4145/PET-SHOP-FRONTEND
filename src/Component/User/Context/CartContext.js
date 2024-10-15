import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataContext } from '../Context/DataContext';

export const MyCartContext = createContext();

function Cartcontext({ children }) {
  const navigate = useNavigate();
  const { current } = useContext(DataContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (current) {
      const fetchCart = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/Users/${current.id}`);
          setCart(response.data.cart);
        } catch (error) {
          alert(error);
        }
      };
      fetchCart();
    }
  }, [current]);

  const clearCart = () => {
    setCart([]);
  };

  const addToCart = async (product) => {
    if (current) {
      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
        alert("This item is already in your cart");
      } else {
        const newItem = { ...product, qty: 1 };
        const updatedCart = [...cart, newItem];

        try {
          await axios.put(`http://localhost:3000/Users/${current.id}`, { ...current, cart: updatedCart });
          setCart(updatedCart);
          alert('Item added to the cart');
        } catch (error) {
          console.error("Error updating cart", error);
        }
      }
    } else {
      navigate("/login");
      alert("Please login");
    }
  };

  const updateCart = async (updatedCart) => {
    try {
      await axios.patch(`http://localhost:3000/Users/${current.id}`, { cart: updatedCart });
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating cart", error);
    }
  };

  const handleremove = async (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    await updateCart(updatedCart);
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updatedCart);
  };

  const decrementQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    );
    setCart(updatedCart);
  };

  const handlecheckout = () => {
    if (cart.length > 0) {
      navigate('/payment');
    } else {
      alert("Your cart is empty.");
    }
  };

  return (
    <MyCartContext.Provider value={{ addToCart, cart, setCart, handleremove, incrementQuantity, decrementQuantity, handlecheckout, clearCart }}>
      {children}
    </MyCartContext.Provider>
  );
}

export default Cartcontext;
