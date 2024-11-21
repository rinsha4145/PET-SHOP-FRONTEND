import React, { useContext, useEffect } from 'react';
import './CartPage.css';
import { MyCartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; // Import the 'X' icon

function Cart() {
  const { cart, incrementQuantity, decrementQuantity, handlecheckout, handleremove } = useContext(MyCartContext);

  const calculateSubtotal = (price, qty) => {
    const validPrice = parseFloat(price);
    const validQty = parseInt(qty, 10);

    if (isNaN(validPrice) || isNaN(validQty)) {
      return 0;
    }
    return (validPrice * validQty).toFixed(2);
  };

  const calculateTotalPrice = () => {
    const total = cart.reduce((sum, item) => {
      const itemSubtotal = parseFloat(item.productId.price) * parseInt(item.quantity, 10);
      return sum + (isNaN(itemSubtotal) ? 0 : itemSubtotal);
    }, 0);

    return total.toFixed(2);
  };

  useEffect(() => {
    console.log("Cart data:", cart);
  }, [cart]);

  return (
    <div className="min-h-screen px-4 md:px-8">
      <br /><br /><br />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Column - Cart Items */}
        <div className="flex-1 bg-white  p-6">
          <h2 className="text-2xl font-semibold mb-3">Shopping Cart</h2>
          {cart.length === 0 ? (
            <main className="grid place-items-center px-5 py-20 sm:py-30 lg:px-8">
              <div className="text-center">
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Your cart is empty.</h1>
                <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl/8">Oops!!! you don't have anything in your cart.</p>
                <p className="text-base font-semibold text-indigo-600">Let's add something</p>
                <div className="mt-10 flex flex-row items-center justify-center gap-x-6">
                  <Link to='/' className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Back to Home</Link>
                  <Link to='/shop' className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Shop It</Link>
                </div>
              </div>
            </main>
          ) : (
            <div className="space-y-8">
              {cart.map((item) => (
                <div key={item._id} className="flex items-start gap-6 border-b border-gray-200 pb-6">
                  <img src={item.productId.image} alt="productimage" className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-lg font-semibold">{item.productId.productName}</h4>
                      <button
                        className="text-gray-400 hover:bg-white hover:text-red-500"
                        onClick={() => handleremove(item.productId._id)}
                      >
                        <FaTimes className="w-5 h-5" title="Remove" />
                      </button>
                    </div>
                    <p className="text-gray-900 font-semibold mt-2">₹{item.productId.actualPrice}</p>
                    <div className="flex items-center mt-3">
                      <button
                        onClick={() => decrementQuantity(item.productId._id)}
                        className="px-3 py-1 border rounded-l bg-gray-100 hover:bg-gray-200 mr-2">
                        -
                      </button>
                      <input
                        value={item.quantity}
                        readOnly
                        className="w-[40px] h-[30px] text-center border-2 rounded-md border-gray-300 p-2 bg-white text-lg"
                      />
                      <button
                        onClick={() => incrementQuantity(item.productId._id)}
                        className="px-3 py-1 border rounded-r bg-gray-100 hover:bg-gray-200 ml-2">
                        +
                      </button>
                    </div>
                    <p className="font-semibold text-gray-900 mt-4">Subtotal: ₹{calculateSubtotal(item.productId.actualPrice, item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Order Summary */}
        {cart.length > 0 && (
          <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Total Price</span>
                <span>₹{calculateTotalPrice()}</span>
              </div>
            </div>
            <div className="flex justify-between text-gray-900 font-semibold mt-4">
              <span>Order Total</span>
              <span>₹{(parseFloat(calculateTotalPrice())).toFixed(2)}</span>
            </div>
            <button
              className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
              onClick={handlecheckout}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
