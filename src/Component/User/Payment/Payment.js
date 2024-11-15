import React, { useContext } from 'react';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { MyCartContext } from '../Context/CartContext';


const stripePromise = loadStripe('pk_test_51QKzMGJjGSQ3GfldznCwn0EbnxRGKAXlYpdQDqm1s4HnOqxcw43Xtjb7xN85QkeIgAwpHnDEsBdld53eM5zrTYTJ00neyv4X3K');
function Payment() {

  const { clientSecret } = useContext(MyCartContext)
  const option = { clientSecret }

  return (
    <div className='bg-gray-50'>
      <div className="m-auto max-w-3xl p-5 text-orange-900 pt-20 bg-gray-50">
        <h1 className="text-2xl py-3 text-center">Payment</h1>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={option}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>

  )
}
export default Payment