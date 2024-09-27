// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


// function UsecustomCart() {
//   const navigate = useNavigate();

//   // Get the current user from localStorage
//   const storedCurrentUser = JSON.parse(localStorage.getItem('current'));
//   const [current, setCurrent] = useState(storedCurrentUser || null);

//   // Get the cart from localStorage or set it to an empty array if not found
//   const storedCart = JSON.parse(localStorage.getItem('cartData')) || [];
//   const [cart, setCart] = useState(storedCart);

//   useEffect(() => {
//     // Save the cart to localStorage whenever it changes
//     localStorage.setItem('cartData', JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = async (product) => {

//     if (current) {
//       setCart((prevCart) => {
//         const existProduct = prevCart.find((item) => item.id === product.id);

//         // If the product already exists, do nothing
//         if (existProduct) {
//           alert('Product is already in the cart');
//           return prevCart;
//         } 

//         // Add the new product with qty 1
//         const updatedCart = [...prevCart, { ...product, qty: 1 }];

//         // Update user's cart locally
//         const updatedUser = {...current, cart: updatedCart};

//         // Save updated user to localStorage
//         setCurrent(updatedUser);
//         localStorage.setItem('current', JSON.stringify(updatedUser));

//         // Update cart on the backend
//         updateCartOnBackend(updatedUser);

//         return updatedCart;
//       });
//     } else {
//       alert('Please login');
//       navigate('/login');
//     }
//   };
//   const handleremove = async (itemid) => {
//     const updatedCart = cart.filter((item) => item.id !== itemid);
//     setCart(updatedCart);

//     if (current) {
//       const updatedUser = {
//         ...current,
//         cart: updatedCart,
//       };
//       setCurrent(updatedUser);
//       localStorage.setItem('current', JSON.stringify(updatedUser));

//       await updateCartOnBackend(updatedUser);
//     }
//   };

//   // Function to update cart on the backend
//   const updateCartOnBackend = async (updatedUser) => {
//     try {
//       await axios.put('http://localhost:3000/users/${updatedUser.id}',updatedUser);
//       console.log('Cart updated successfully on the backend');
//     } catch (error) {
//       console.error('Error updating cart:', error);
//     }
//   };
//   const handleBuyNow = () => {
//     navigate('/payment');  // Navigate to the payment page
//   };
//   const handlecheckout=()=>{
//     navigate('/payment')
//   }
//   const incrementQuantity = (productId) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === productId ? { ...item, qty: item.qty + 1 } : item
//       )
//     );
//   };

//   const decrementQuantity = (productId) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === productId && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
//       )
//     );
//   };

//   return { cart,setCart, updateCartOnBackend, addToCart, current,handleremove,handleBuyNow,handlecheckout,incrementQuantity,decrementQuantity};
// }
// export default UsecustomCart