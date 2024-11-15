import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../AxiosIntance';
import { DataContext } from '../Context/DataContext';

export const MyCartContext = createContext();

function Cartcontext({ children }) {

  const { current } = useContext(DataContext); 
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [wish, setWish] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',phoneNumber: '',
    alternatePhoneNumber: '',pincode: '',
    state: '',city: '',
    buildingName: '',roadAreaColony: '',landmark:''});
  const [address,setAddress]=useState()
  const [order,setOrder]=useState()
  const [clientSecret,setClientSecret]=useState()

  //fetch cart 
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get(`/viewcart`);
        const products = response.data.cart.products;
        setCart(products);
        setLoading(false);  
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    };
    fetchCart();
  }, [current]);

  //fetch wish
  useEffect(() => {
    const fetchWish = async () => {
      try {
        const response = await axiosInstance.get(`/wishlist`);
        const products = response.data.getwishlist.products;
        setWish(products); 
        setLoading(false);  
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);  
      }
    };
    fetchWish();
  }, [current]);

//loading process
  if (loading) {
    return <div>Loading...</div>;
  }
  
  //add to cart
  const addToCart = async (product) => {
    try {
      if(current){
        const response = await axiosInstance.post("/addtocart",{productId:product});
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
    
//update cart
  const updateCart = async ( productId,action ) => {
    try {
      const response=await axiosInstance.put(`/cartupdate`, { productId,action });
      setCart(response.data.updatecart.products);
    } catch (error) {
      console.error("Error updating cart", error);
    }
  };

  //icrement the quantity
  const incrementQuantity = async (productId) => {
    updateCart(productId,'increment')
  };

  //decrement the quantity
  const decrementQuantity = async (productId) => {
    updateCart(productId,'decrement')
  };

  //remove item from cart
  const handleremove = async (productId) => {
    console.log("first",productId)
    const response = await axiosInstance.delete('/deleteitem',{data:{productId:productId}})
    console.log("remo",response.data);
    setCart(response.data.cartdata.products)
  };

// checkout the cartpage and go to the orderaddress page
  const handlecheckout = () => {
    if (cart.length > 0) {
      navigate('/orderaddress');
    } else {
      alert("Your cart is empty.");
    }
  };

  // add to wishlist
  const addToWishlist = async (product) => {
    try {
      if(current){
        const response = await axiosInstance.post("/addwish",{productId:product});
        if(response.data.updatedwish){
          setWish(response.data.updatedwish.products)
        }else if(response.data.wishlist){
          setWish(response.data.wishlist.products)
        }
        alert(response.data.message)
      }else{
        navigate('/login')
        alert("please login")
      }
    } catch (error) {
        console.error("Error updating wishlist", error);
    }
  }
      
// remove item from wishlist
  const removewish = async (productId) => {
    const response = await axiosInstance.delete('/removewish',{data:{productId:productId}})
    setWish(response.data.data.products)
  };

//posting the orderAddress and orders to the orderpage
  const handledelivary= async()=>{
    const response = await axiosInstance.post(`/createaddress`,formData)
    setAddress(response.data.newAddress.products)    
    const responses=await axiosInstance.post('/createorder')
    setClientSecret(responses.data.data.clientsecret)
    navigate('/payment')
    
  } 

  return (
    <MyCartContext.Provider value={{  cart, setCart, addToCart, handleremove, incrementQuantity, decrementQuantity, handlecheckout,wish,setWish,addToWishlist,removewish,formData,setFormData,handledelivary,clientSecret }}>
      {children}
    </MyCartContext.Provider>
  );
}

export default Cartcontext;
