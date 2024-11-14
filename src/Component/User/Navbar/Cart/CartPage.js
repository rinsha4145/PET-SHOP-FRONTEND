import React, { useContext, useEffect } from 'react';
import './CartPage.css';
import { MyCartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';



function Cart() {
  
  const { cart ,  incrementQuantity, decrementQuantity, handlecheckout ,handleremove} =useContext(MyCartContext);
  console.log("cart--------",cart)
 
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
      const itemSubtotal = parseFloat(item.productId.actualPrice) * parseInt(item.quantity, 10);

      
      console.log("Item subtotal for", item.productId.productName, ":", itemSubtotal);

      return sum + (isNaN(itemSubtotal) ? 0 : itemSubtotal);
    }, 0);

    
    console.log("Total price:", total);
    
    return total.toFixed(2);
  };


  useEffect(() => {
    console.log("Cart data:", cart);
  }, [cart]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8"><br/><br/><br/>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Left Column - Cart Items */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-3">Shopping Cart</h2>
          {cart.length === 0 ? (
           <main class="grid place-items-center  px-5 py-20 sm:py-30 lg:px-8">
           <div class="text-center">
             
             <h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Your cart is empty.</h1>
             <p class="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Oops!!! you don't have anything in your cart.</p>
             <p class="text-base font-semibold text-indigo-600">let's add something</p>
             <div class="mt-10 flex flex-row items-center justify-center gap-x-6">
             <Link to='/' class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">back to home</Link>
               <Link to='/shop' class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">shop it</Link>
             </div>
           </div>
         </main>
          ) : (
            <div className="space-y-8">
              {cart.map((item,index) => (
                <div key={item._id} className="flex items-start gap-6 border-b border-gray-200 pb-6">
                  <img key={item._id} src={item.productId.image} alt="productimage" className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold">{item.productId.productName}</h4>
                    
                    <p className="text-gray-900 font-semibold mt-2">₹{item.productId.actualPrice}</p>
                    <div className="flex items-center mt-3">
                      <button 
                        onClick={() => decrementQuantity(item.productId._id)} 
                        className="px-3 py-1 border rounded-l bg-gray-100 hover:bg-gray-200 mr-2">
                        -
                      </button>
                      <input
                        // type="number"
                        value={item.quantity}
                        min="1"
                        readOnly
                        className="w-[40px] h-[30px] text-center border-2 rounded-md border-gray-300 p-2 bg-white text-lg"
                      />
                      <button 
                        onClick={() => incrementQuantity(item.productId._id)} 
                        className="px-3 py-1 border rounded-r bg-gray-100 hover:bg-gray-200 ml-2">
                        +
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <button
                        className="text-sm text-red-500 hover:text-red-500 hover:bg-white"
                        onClick={() => handleremove(item.productId._id)}
                      >
                        Remove
                      </button>
                      <p className="font-semibold text-gray-900">Subtotal: ₹{calculateSubtotal(item.productId.actualPrice, item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
                 {/* Right Column - Order Summary */}
        <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Order summary</h3>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Total price</span>
              <span>₹{calculateTotalPrice()}</span>
            </div>
           
          </div>
          <div className="flex justify-between text-gray-900 font-semibold mt-4">
            <span>Order total</span>
            <span>₹{(parseFloat(calculateTotalPrice())).toFixed(2)}</span>
          </div>
          <button 
            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
            onClick={handlecheckout}
          >
            Checkout
          </button>
        </div>
            </div>
          )}
        </div>

     
      </div>
    </div>
  );
}

export default Cart;

