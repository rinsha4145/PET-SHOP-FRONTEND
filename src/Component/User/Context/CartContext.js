import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import axiosInstance from '../../../AxiosIntance';
import { DataContext } from '../Context/DataContext';
// import Cookies from 'js-cookie'

export const MyCartContext = createContext();

function Cartcontext({ children }) {
  const navigate = useNavigate();
  const { current } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [wish, setWish] = useState([]);
  const [looading, setLooading] = useState(true);

  //cart context
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        // const token = Cookies.get("token");
        // console.log("token",token)
        // if (!token) {
        //   throw new Error('No token found, please log in.');
        // }
        const response = await axiosInstance.get(`/viewcart`);
        const products = response.data.cart.products;
        console.log("Produ1234cts:", products);

        setCart(products);
        // console.log("cart22",cart)  // Ensure it's an empty array if undefined
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching cart items:", error);
        // alert('You are not authorized to view the cart.');
        setLoading(false);  // Stop loading even if there's an error
      }
    };

    fetchCart();
  }, [current]);
  useEffect(() => {
    const fetchWish = async () => {
      try {
        const response = await axiosInstance.get(`/wishlist`);
        const products = response.data.getwishlist.products;
        console.log("Produ1234cts:", products);

        setWish(products);
        // console.log("cart22",cart)  // Ensure it's an empty array if undefined
        setLooading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching cart items:", error);
        // alert('You are not authorized to view the cart.');
        setLooading(false);  // Stop loading even if there's an error
      }
    };

    fetchWish();
  }, [current]);


  if (loading) {
    return <div>Loading...</div>;
  }
  
 
  if (looading) {
    return <div>Loading...</div>;
  }
  const clearCart = () => {
    setCart([]);
  };
console.log("cart..............",cart)
  

  const addToCart = async (product) => {
    console.log("product123",product)
        try {
          if(current){
            const response = await axiosInstance.post("/addtocart",{productId:product});
            // console.log("cartsend.products",response.data.cartsend)
            // console.log("updateCart.products",response.data.updatedcart)
            if(response.data.updatedcart){
              setCart(response.data.updatedcart.products)
            }else if(response.data.cartsend){
              setCart(response.data.cartsend.products)
            }
            alert(response.data.message)
          }else{
            navigate('/login')
            alert("please login")
          }
        } catch (error) {
          console.error("Error updating cart", error);
        }
      }
    

  const updateCart = async ( productId,action ) => {
    try {
      const response=await axiosInstance.put(`/cartupdate`, { productId,action });
      console.log("23456",response.data.updatecart.products)
      setCart(response.data.updatecart.products);
    } catch (error) {
      console.error("Error updating cart", error);
    }
  };
  const incrementQuantity = async (productId) => {
    updateCart(productId,'increment')
    
    
  };

  const decrementQuantity = async (productId) => {
    updateCart(productId,'decrement')
    
    
  };

  const handleremove = async (productId) => {
    console.log("first",productId)
    const response = await axiosInstance.delete('/deleteitem',{data:{productId:productId}})
    console.log("remo",response.data);
    setCart(response.data.cartdata.products)
  };

  // const incrementQuantity = (productId) => {
  //   const updatedCart = cart.map((item) =>
  //     item.id === productId ? { ...item, qty: item.qty + 1 } : item
  //   );
  //   setCart(updatedCart);
  // };

  // const decrementQuantity = (productId) => {
  //   const updatedCart = cart.map((item) =>
  //     item.id === productId && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
  //   );
  //   setCart(updatedCart);
  // };

  const handlecheckout = () => {
    if (cart.length > 0) {
      navigate('/payment');
    } else {
      alert("Your cart is empty.");
    }
  };


  //wishlist context
  
  
  const addToWishlist = async (product) => {
    console.log("product12344",product)
        try {
          if(current){
            const response = await axiosInstance.post("/addwish",{productId:product});
            console.log("newWishlist.products",response)
            console.log("wishlist.products",response.data.wishlist)
            if(response.data.updatedwish){
              setWish(response.data.updatedwish.products)
            }else if(response.data.wishlist){
              setWish(response.data.wishlist.products)
            }
            console.log("first",response.data.message)
            alert(response.data.message)
          }else{
            navigate('/login')
            alert("please login")
          }
        } catch (error) {
          console.error("Error updating wishlist", error);
        }
      }
      const removewish = async (productId) => {
        console.log("first",productId)
        const response = await axiosInstance.delete('/removewish',{data:{productId:productId}})
        console.log("remo",response.data.data.products);
        
        setWish(response.data.data.products)
      };
  return (
    <MyCartContext.Provider value={{  cart, setCart, addToCart, handleremove, incrementQuantity, decrementQuantity, handlecheckout, clearCart,wish,setWish,addToWishlist,removewish }}>
      {children}
    </MyCartContext.Provider>
  );
}

export default Cartcontext;
