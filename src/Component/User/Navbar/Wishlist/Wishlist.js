import React, { useContext,useParams } from 'react';
import { DataContext } from '../../Context/DataContext';
import { MyCartContext } from '../../Context/CartContext';

function Wishlist() {
 const context = useContext(DataContext); 

  const { data, error } = context;
  const { wish,removewish,addToCart} = useContext(MyCartContext);
  console.log("wish",wish)

 
  // console.log("first",_id)
  

  const handleAddToCart = (item) => {
    if (addToCart) {
      addToCart(item); 
      removewish(item);
    } else {
      console.error('addToCart function is not available in context');
    }
  };
  return (
    <div className=" mx-auto py-10"><br/><br/><br/><br/><br/>
  <h1 className="text-2xl font-bold mb-8">Favourites</h1>
  {wish.length === 0 ? (
    <main class="grid place-items-center  px-5 py-20 sm:py-30 lg:px-8">
    <div class="text-center">
      
      <h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Your wishlist is empty.</h1>
      <p class="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Oops!!! you don't have anything in your cart.</p>
      <p class="text-base font-semibold text-indigo-600">let's add something</p>
      <div class="mt-10 flex flex-row items-center justify-center gap-x-6">
      {/* <Link to='/' class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">back to home</Link> */}
        {/* <Link to='/shop' class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">shop it</Link> */}
      </div>
    </div>
  </main>
   ) : (
  <div className="grid grid-cols-4 gap-8">
    {/* Product cards will go here */}
    {wish.map((item) => (
  <div key={item._id} className="bg-white rounded-lg shadow-md p-6 relative">
    <img src={item.image} alt={item.productName} className="w-full h-48 object-contain mb-4" />
    <h2 className="text-lg font-semibold mb-2">{item.productName}</h2>
    <p className="text-gray-500 mb-4">${item.actualPrice}</p>
    <button className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 mb-1" onClick={()=>handleAddToCart(item._id)}>Add to cart</button>
    <button
      className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      onClick={() => removewish(item._id)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
))}
  </div>
  )}
  </div>
  );
}

export default Wishlist