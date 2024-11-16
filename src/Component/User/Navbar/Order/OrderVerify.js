import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MyCartContext } from "../../Context/CartContext";


const OrderVerify = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white"><br/><br/><br/>
      <h1 className="text-2xl font-semibold text-indigo-600 mb-2">Order Summary</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Shipping & Billing Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-semibold text-lg">Shipping & Billing Info</h2>
            <ArrowUpRight className="w-4 h-4 text-gray-500" />
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p>Christine Johnson</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p>christine@email.com</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p>+1 (987) 654 3210</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Shipping Address</p>
              <p>Suite 971 8413 Simonis Gateway,</p>
              <p>East Marybethberg,</p>
              <p>NE 40805-7949</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-semibold text-lg">Payment Method</h2>
            <ArrowUpRight className="w-4 h-4 text-gray-500" />
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Payment</p>
              <p>Cash on Delivery</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium">Shipping Method</h3>
                <ArrowUpRight className="w-4 h-4 text-gray-500" />
              </div>
              <p className="text-sm text-gray-500">Shipping</p>
              <p>Post Service (1-3 Work Day)</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Note</p>
              <p className="text-sm">Please notify me once the order has been shipped, and provide the tracking information for my reference.</p>
            </div>
          </div>
        </div>

        {/* Shopping Cart */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-semibold text-lg">Items in your Shopping Cart</h2>
            <ArrowUpRight className="w-4 h-4 text-gray-500" />
          </div>
          
          <div className="space-y-6">
            {/* Item 1 */}
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg"></div>
              <div className="flex-1">
                <h3 className="font-medium">White V neck shirt</h3>
                <p className="text-sm text-gray-500">Dust Studios</p>
                <div className="flex justify-between mt-1">
                  <p className="text-sm">Size: M Qty: 1</p>
                  <p className="text-indigo-600">$120.00</p>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg"></div>
              <div className="flex-1">
                <h3 className="font-medium">White t-shirt and brown leather boots</h3>
                <p className="text-sm text-gray-500">Dust Studios</p>
                <div className="flex justify-between mt-1">
                  <p className="text-sm">Size: M Qty: 1</p>
                  <p className="text-indigo-600">$120.00</p>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg"></div>
              <div className="flex-1">
                <h3 className="font-medium">ZNY Black crew neck t-shirt</h3>
                <p className="text-sm text-gray-500">Dust Studios</p>
                <div className="flex justify-between mt-1">
                  <p className="text-sm">Size: M Qty: 1</p>
                  <p className="text-indigo-600">$120.00</p>
                </div>
              </div>
            </div>

            {/* Total Price */}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <p className="font-medium">Total Price:</p>
                <p className="text-lg font-semibold text-indigo-600">$360.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-lg font-medium">Thank you for shopping with us!</p>
        <p className="text-indigo-600 mt-2">Team Pagedone</p>
      </div>
    </div>
  );
};

export default OrderVerify;