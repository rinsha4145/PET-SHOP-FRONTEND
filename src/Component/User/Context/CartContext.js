import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../AxiosIntance';
import { DataContext } from '../Context/DataContext';
import { toast } from 'react-toastify';
import  handleAsync from '../../../HandleAsync'

export const MyCartContext = createContext();

function Cartcontext({ children }) {

  const { current } = useContext(DataContext); 
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [wish, setWish] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',phoneNumber: '',
    alternatePhoneNumber: '',email:'',pincode: '',
    state: '',city: '',country:'',
    buildingName: '',roadAreaColony: '',landmark:''});
  const [address,setAddress]=useState()

  const [clientSecret,setClientSecret]=useState()

  //fetch cart 
  useEffect(() => {
    if(current){
      const fetchCart = async () => {
        try {
          const response = await axiosInstance.get(`/viewcart`);
          const products = response.data.cart.products;
          setCart(products);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      } 
      fetchCart();
    };
  }, [current]);

  //fetch wish
  useEffect(() => {
    if(current){
      const fetchWish = async () => {
        try {
          const response = await axiosInstance.get(`/wishlist`);
          const products = response.data.getwishlist.products;
          setWish(products);   
        } catch (error) {
          console.error("Error fetching cart items:", error); 
        }
      } 
      fetchWish();
    } 
  }, [current]);

  //add to cart
  const addToCart = handleAsync(async (product) => {
      if(current){
        const response = await axiosInstance.post("/addtocart",{productId:product});
        if (response.status >= 200 && response.status < 300) {
          if(response.data.updatedcart){
          setCart(response.data.updatedcart.products)
          }else if(response.data.cartsend){
          setCart(response.data.cartsend.products)
          }
        toast.success(response.data.message)
      } else {
        throw new Error(`Error: ${response.data.message || 'An error occurred'}`);
      }
      }else{
        navigate('/login')
        toast.alert("please login")
      }
  })
    
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
  const handleremove = handleAsync(async (productId) => {
      const response = await axiosInstance.delete('/deleteitem',{data:{productId:productId}})
      setCart(response.data.cartdata.products)
      if (response.status === 200 && response.status < 300) {
        toast.success('Product removed successfully', response.data);
      }else {
        throw new Error(`Error: ${response.data.message || 'An error occurred'}`);
      }
  });

// checkout the cartpage and go to the orderaddress page
  const handlecheckout = handleAsync(async () => {
    if (cart.length > 0) {
      const responses=await axiosInstance.post('/createorder')
      setClientSecret(responses.data.data.clientsecret)
      navigate('/orderaddress');
      if (responses.status >= 200 && responses.status < 300) {
        toast.success(responses.data.message);
      } else {
        throw new Error(responses.data.message || 'An error occurred');
      }
    }
  });

  // add to wishlist
  const addToWishlist = handleAsync(async (product) => {
      if (current) {
        const response = await axiosInstance.post("/addwish", { productId: product });
        if (response.status >= 200 && response.status < 300) {
          if (response.data.updatedwish) {
            setWish(response.data.updatedwish.products);
          } else if (response.data.wishlist) {
            setWish(response.data.wishlist.products);
          }
          toast.success(response.data.message || 'Product added to wishlist successfully');
        } else {
          throw new Error(`Error: ${response.data.message || 'An error occurred'}`);
        }
      } else {
        navigate('/login');
        toast.info("Please login to add items to your wishlist");
      }
    
  });
  
      
// remove item from wishlist
  const removewish = handleAsync(async (productId) => {
    const response = await axiosInstance.delete('/removewish',{data:{productId:productId}})
    if (response.status === 200 && response.status < 300) {
      setWish(response.data.data.products)
      toast.success('Product removed successfully', response.data);
    }else {
      throw new Error(`Error: ${response.data.message || 'An error occurred'}`);
    }
  });

//posting the orderAddress and orders to the orderpage
  const handledelivary= handleAsync(async()=>{
    const response = await axiosInstance.post(`/createaddress`,formData)
    setAddress(response.data.newAddress.products)    
    navigate('/payment')
    if (response.status >= 200 && response.status < 300) {
      toast.success(response.data.message);
    } else {
      throw new Error(response.data.message || 'An error occurred');
    }
  }) 

  //cancel a order
 


  return (
    <MyCartContext.Provider value={{  cart, setCart, addToCart, handleremove, incrementQuantity, decrementQuantity, handlecheckout,wish,setWish,addToWishlist,removewish,formData,setFormData,handledelivary,clientSecret, }}>
      {children}
    </MyCartContext.Provider>
  );
}

export default Cartcontext;
